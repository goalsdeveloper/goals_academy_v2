<?php

namespace App\Http\Controllers\API;

use Carbon\Carbon;
use Midtrans\Config;
use App\Models\Order;
use Midtrans\CoreApi;
use App\Models\Course;
use App\Enums\OrderEnum;
use App\Models\Products;
use App\Models\PromoCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\OrderHistory;
use Exception;
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // return response()->json($request);
        $validateData = $request->validate([
            'user_id' => 'required',
            'products_id' => 'required',
            'date' => 'required',
            'payment_method' => 'required',
            // 'notes' => 'sometimes',
        ]);

        $user = auth()->user();
        $quantity = 1;
        $adminFee = 0;
        $discount = 20;
        $responseMidtrans = null;
        $order_code = 'GA' . str(now()->format('YmdHis'));

        // cek date
        $cekDate = Course::where('date', $validateData['date'])->count();
        if ($cekDate > 7) {
            return response()->json(['kuota telah habis']);
        }

        $getProduct = Products::where('id', $validateData['products_id'])->with('categories')->first();

        // cek user menggunakan kode promo
        if ($request->promo_code) {
            $cekPromo = PromoCode::where('promo_code', $request->promo_code)->first();
            if (!$cekPromo) {
                return response()->json(['message' => 'Promo tidak ditemukan!']);
            }
            if ($user->kodePromo()->where('promo_code_id', $cekPromo->id)->exists()) {
                return response()->json(['message' => 'Kode promo telah terpakai']);
            } else {
                $promoCode = $user->kodePromo()->attach($cekPromo->id);
            }
            // return response()->json(['message' => 'Kode promo berhasil digunakan']);
        }

        // charge midtrans
        $price = $getProduct->price;
        $paymentType = $request['payment_type'];

        // Set your Merchant Server Key
        Config::$serverKey = config('midtrans.server_key');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        Config::$isProduction = config('midtrans.is_production');
        // Set sanitization on (default)
        Config::$isSanitized = config('midtrans.is_sanitized');
        // Set 3DS transaction for credit card to true
        Config::$is3ds = config('midtrans.is_3ds');

        if ($validateData['payment_method'] == 'ewallet') {

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

            $discount = ($price * $discount) / 100;
            $grossAmount = $price - $discount + $adminFee;

            $phoneNumber = $user->profile->phone_number ?? '';
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
            // return $responseMidtrans;
        } elseif ($validateData['payment_method'] == 'bank') {
            $adminFee = 4000;
            $discount = ($price * $discount) / 100;
            $grossAmount = $price - $discount + $adminFee;
            return response()->json([
                'data' => [
                    'Harga produk' => $price,
                    'Kupon' => $discount,
                    'Biaya Admin' => $adminFee,
                    'Total' => $grossAmount
                ]
            ]);
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
            'order_code' => $order_code,
            'quantity' => $quantity,
            'unit_price' => $getProduct->price,
            'status' => OrderEnum::PENDING->value,
            'notes' => $request['notes'],
        ]);

        // $orderHistory = OrderHistory::create([
        //     'order_id' => $order->id,
        //     'status' => $responseMidtrans->transaction_status,
        //     'payload' => json_encode($responseMidtrans),
        // ]);

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

    private function checkPromo()
    {
    }
}
