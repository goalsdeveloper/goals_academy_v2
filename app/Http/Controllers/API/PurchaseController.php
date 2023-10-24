<?php

namespace App\Http\Controllers\API;

use Exception;
use Carbon\Carbon;
use Midtrans\Config;
use App\Models\Order;
use Midtrans\CoreApi;
use App\Models\Course;
use App\Enums\OrderEnum;
use App\Models\Products;
use App\Models\PromoCode;
use App\Models\OrderHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use Illuminate\Support\Facades\Auth;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $data = Order::all();

        // cek kondisi tanggal
        $endDate = Carbon::now()->addDays(7);

        $counts = Course::select('date')
            ->selectRaw('COUNT(*) as count')
            ->whereBetween('date', [Carbon::today(), $endDate])
            ->groupBy('date')
            ->havingRaw('COUNT(*) > 5')
            ->get();
        // end cek kondisi tanggal

        return response()->json(['data' => $counts]);

        // return response()->json([
        //     'user' => $user->name,
        //     'user purchase' => $data->where('user_id', $user->id)->count(),
        //     'items' => $data->where('user_id', $user->id)
        // ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Products $products)
    {
        return response()->json([
            'data' => $products
            ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // return response()->json($request);
        $user = auth()->user();

        $validateData = $request->validate([
            'user_id' => 'required',
            'products_id' => 'required',
            'date' => 'required',
            'payment_method' => 'required',
            // 'notes' => 'sometimes',
        ]);

        $quantity = 1;
        $adminFee = 0;
        $discount = 0;
        $responseMidtrans = null;
        $order_code = 'GA' . str(now()->format('YmdHis'));

        $paymentMethod = PaymentMethod::where('name', $validateData['payment_method'])->first();

        $getProduct = Products::where('id', $validateData['products_id'])->with('categories')->first();

        // cek date
        $cekDate = Course::where('date', $validateData['date'])->count();
        if ($cekDate > 7) {
            return response()->json(['kuota telah habis']);
        }

        // cek user menggunakan kode promo
        if ($request->promo_code) {
            $cekPromo = PromoCode::where('promo_code', $request->promo_code)->first();
            if (!$cekPromo) {
                return response()->json(['message' => 'Promo tidak ditemukan!']);
            }

            if ($user->kodePromo()->where('promo_code_id', $cekPromo->id)->exists()) {
                return response()->json(['message' => 'Kode promo telah terpakai']);
            } else {
                if ($cekPromo->is_price != true) {
                    $discount = ($getProduct->price * $cekPromo->value) / 100;
                } else {
                    $discount = $cekPromo->value;
                }
                $promoCode = $user->kodePromo()->attach($cekPromo->id);
            }
        }

        // charge midtrans
        $price = $getProduct->price;
        $phoneNumber = $user->profile->phone_number ?? '';

        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');

        switch ($paymentMethod->category) {
            case "ewallet":
                switch ($paymentMethod->payment_type) {
                    case "gopay":
                        $adminFee = ($paymentMethod->admin_fee / 100) * $price;
                        break;
                    case "qris":
                        $adminFee = round(($paymentMethod->admin_fee / 100) * $price);
                        break;
                    case "shopeePay":
                        $adminFee = ($paymentMethod->admin_fee / 100) * $price;
                        break;
                }

                $grossAmount = $price - $discount + $adminFee;
                $params = array(
                    'payment_type' => $paymentMethod->payment_type,
                    'transaction_details' => array(
                        'order_id' => $order_code,
                        'gross_amount' => $grossAmount
                    ),
                    'customer_details' => array(
                        'first_name' => $user->name,
                        'last_name' => '',
                        'email' => $user->email,
                        'phone' => $phoneNumber,
                    ),
                );
                try {
                    $responseMidtrans = CoreApi::charge($params);
                } catch (Exception $e) {
                    return response()->json(['message' => $e->getMessage()], 500);
                }
                break;

            case "bank_transfer":
                $adminFee = $paymentMethod->admin_fee;
                $grossAmount = $price - $discount + $adminFee;
                $params = array(
                    'payment_type' => 'bank_transfer',
                    'transaction_details' => array(
                        'order_id' => $order_code,
                        'gross_amount' => $grossAmount
                    ),
                    'customer_details' => array(
                        'first_name' => $user->name,
                        'last_name' => '',
                        'email' => $user->email,
                        'phone' => $phoneNumber,
                    ),
                    'bank_transfer' => array(
                        'bank' => $paymentMethod->payment_type,
                    ),
                );
                try {
                    $responseMidtrans = CoreApi::charge($params);
                } catch (Exception $e) {
                    return response()->json(['message' => $e->getMessage()], 500);
                }
                break;
        }

        // cek produk bimbingan
        $produkDibimbing = false;
        foreach ($getProduct->categories as $category) {
            if (stripos($category->slug, 'dibimbing') !== false) {
                $produkDibimbing = true;
            }
        }

        $order = Order::create([
            'user_id' => $validateData['user_id'],
            'products_id' => $validateData['products_id'],
            'payment_method_id' => $paymentMethod->id,
            'order_code' => $order_code,
            'quantity' => $quantity,
            'unit_price' => $getProduct->price,
            'status' => OrderEnum::PENDING->value,
            'notes' => $request['notes'],
        ]);

        // jika produk = bimbingan; maka masuk ke tabel course  
        if ($produkDibimbing) {
            if ($getProduct->features[0]['category'] == 'online') {
                $location = 'Zoom meeting';
            } elseif ($getProduct->features[0]['category'] == 'offline') {
                $location = 'Menunggu Lokasi';
            }

            $course = Course::create([
                'user_id' => $validateData['user_id'],
                'products_id' => $validateData['products_id'],
                'order_id' => $order->id,
                'date' => $validateData['date'],
                'location' => $location
            ]);
        }

        return response()->json([
            'message' => 'transaction charged',
            'data' => [
                'midtrans charge' => $responseMidtrans,
                'order' => $order,
            ]
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function checkPromo()
    {
    }
}
