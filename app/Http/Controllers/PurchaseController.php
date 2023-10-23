<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use Inertia\Inertia;
use Midtrans\Config;
use App\Models\Order;
use Midtrans\CoreApi;
use App\Models\Course;
use App\Enums\OrderEnum;
use App\Models\Products;
use App\Models\PromoCode;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // cek kondisi tanggal
        $endDate = Carbon::now()->addDays(7);

        $counts = Course::select('date')
            ->selectRaw('COUNT(*) as count')
            ->whereBetween('date', [Carbon::today(), $endDate])
            ->groupBy('date')
            ->havingRaw('COUNT(*) > 5')
            ->get();
        // end cek kondisi tanggal

        return Inertia::render('Purchase/Form', [
            'date' => $counts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        dd($request);
        $validateData = $request->validate([
            'schedule' => 'required|date',
            'init_price' => 'required',
            'purchase_method' => 'required',
        ]);

        $user = auth()->user();
        $quantity = 1;
        $adminFee = 0;
        $discount = 0;
        $responseMidtrans = null;
        $order_code = 'GA' . str(now()->format('YmdHis'));

        // cek kuota tanggal
        $cekDate = Course::where('date', $validateData['schedule'])->count();
        if ($cekDate > 7) {
            return response()->json(['kuota telah habis']);
        }

        $getProduct = Products::where('id', 1)->with('categories')->first();

        // cek user menggunakan kode promo
        if ($request->promo_code) {
            $cekPromo = PromoCode::where('promo_code', $request->promo_code)->first();
            if (!$cekPromo) {
                return response()->json(['message' => 'Promo tidak ditemukan!']);
            }
            if ($user->kodePromo()->where('promo_code_id', $cekPromo->id)->exists()) {
                return response()->json(['message' => 'Kode promo telah terpakai']);
            } else {
                //
                $promoCode = $user->kodePromo()->attach($cekPromo->id);
            }
        }

        // charge midtrans
        $price = $getProduct->price;
        $paymentType = $request['payment_type'];
        $phoneNumber = $user->profile->phone_number ?? '';

        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');

        switch ($validateData['payment_method']) {
            case "ewallet":
                switch ($paymentType) {
                    case "gopay":
                        $adminFee = (2 / 100) * $price;
                        break;
                    case "qris":
                        $adminFee = round((0.7 / 100) * $price);
                        break;
                    case "shopeePay":
                        $adminFee = (2 / 100) * $price;
                        break;
                }

                $grossAmount = $price - $discount + $adminFee;
                $params = array(
                    'payment_type' => $paymentType,
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
                $adminFee = 4000;
                $grossAmount = $price - $discount + $adminFee;
                $params = array(
                    'payment_type' => $paymentType,
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
                        'bank' => $request->bank
                    ),
                );
                try {
                    $responseMidtrans = CoreApi::charge($params);
                } catch (Exception $e) {
                    return response()->json(['message' => $e->getMessage()], 500);
                }

                return response()->json([
                    'data' => [
                        'Harga produk' => $price,
                        'Kupon' => $discount,
                        'Biaya Admin' => $adminFee,
                        'Total' => $grossAmount,
                        'response' => $responseMidtrans,
                    ]
                ]);
                break;
        }

        //cek produk bimbingan
        $produkDibimbing = false;
        foreach ($getProduct->categories as $category) {
            if (stripos($category->slug, 'dibimbing') !== false) {
                $produkDibimbing = true;
            }
        }

        $order = Order::create([
            'user_id' => $validateData['user_id'],
            'products_id' => $validateData['products_id'],
            'order_code' => $order_code,
            'quantity' => $quantity,
            'unit_price' => $getProduct->price,
            'status' => OrderEnum::PENDING->value,
            'notes' => $request['notes'],
        ]);

        // jika produk = bimbingan | store -> course
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
                // 'order history' => $orderHistory,
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
}
