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
use App\Models\OrderHistory;
use App\Models\Products;
use App\Models\PromoCode;
use Illuminate\Http\Request;
use App\Models\PaymentMethod;

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

        $paymentMethods = PaymentMethod::all();


        return Inertia::render('Purchase/Form', [
            'date' => $counts,
            'paymentMethods' => $paymentMethods,
            'dataProduct' => Products::where('id', 1)->first(),
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
        // dd($request);
        $user = auth()->user();
        $validateData = $request->validate([
            'schedule' => 'required|date',
            'init_price' => 'required',
            'purchase_method' => 'required',
        ]);

        $quantity = 1;
        $adminFee = 0;
        $discount = 0;
        $responseMidtrans = null;
        $order_code = 'GA' . str(now()->format('YmdHis'));

        $paymentMethod = PaymentMethod::where('name', $validateData['purchase_method'])->first();

        $getProduct = Products::where('id', $request['product_id'])->with('categories')->first();

        // cek date
        $cekDate = Course::where('date', $validateData['schedule'])->count();
        if ($cekDate > 7) {
            return response()->json(['kuota telah habis']);
        }

        // cek user menggunakan kode promo
        if ($request->promo) {
            $cekPromo = PromoCode::where('promo_code', $request->promo)->first();
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

        //cek produk bimbingan
        $produkDibimbing = false;
        foreach ($getProduct->categories as $category) {
            if (stripos($category->slug, 'dibimbing') !== false) {
                $produkDibimbing = true;
            }
        }

        $order = Order::create([
            'user_id' => $user->id,
            'products_id' => $getProduct->id,
            'payment_method_id' => $paymentMethod->id,
            'order_code' => $order_code,
            'quantity' => $quantity,
            'unit_price' => $getProduct->price,
            'status' => OrderEnum::PENDING->value,
            'notes' => $request['notes'],
        ]);

        OrderHistory::create([
            'order_id' => $order->id,
            'status' => 'pending',
            'payload' => json_encode($responseMidtrans)
        ]);

        // jika produk = bimbingan | store -> course
        if ($produkDibimbing) {
            if ($getProduct->features[0]['category'] == 'online') {
                $location = 'Zoom meeting';
            } elseif ($getProduct->features[0]['category'] == 'offline') {
                $location = 'Menunggu Lokasi';
            }

            $course = Course::create([
                'user_id' => $user->id,
                'products_id' => $request->product_id,
                'order_id' => $order->id,
                'date' => $validateData['schedule'],
                'location' => $location
            ]);
        }

        return redirect()->route('purchase.show', $order->order_code);
        // return response()->json([
        //     'message' => 'transaction charged',
        //     'data' => [
        //         'midtrans charge' => $responseMidtrans,
        //         'order' => $order,
        //         // 'order history' => $orderHistory,
        //     ]
        // ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $order)
    {
        $order = Order::where('order_code', $order)->with('orderHistory', 'paymentMethod')->first();

        $orderHistory = $order->orderHistory->where('status', 'pending')->first();
        $stringToJson = json_decode($orderHistory->payload);
        // dd($stringToJson);
        return Inertia::render('Purchase/Status', [
            'data' => $order,
            'orderHistory' => $stringToJson,
            'paymentMethod' => $order->paymentMethod,
        ]);
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
