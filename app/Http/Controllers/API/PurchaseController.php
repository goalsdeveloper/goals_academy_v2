<?php

namespace App\Http\Controllers\API;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Course;
use App\Enums\OrderEnum;
use App\Models\Products;
use App\Models\PromoCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
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
            ->whereBetween('date', [Carbon::now(), $endDate])
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
        $validateData = $request->validate([
            'user_id' => 'required',
            'products_id' => 'required',
            'date' => 'required',
            // 'notes' => 'sometimes',
        ]);

        $quantity = 1;
        $getProduct = Products::where('id', $validateData['products_id'])->with('categories')->first();

        // cek user menggunakan kode promo
        if ($request->promo_code) {
            $user = auth()->user();

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

        // cek date
        $cekDate = Course::where('date', $validateData['date'])->count();
        if ($cekDate > 7) {
            return response()->json(['kuota telah habis']);
        }

        $order = Order::create([
            'user_id' => $validateData['user_id'],
            'products_id' => $validateData['products_id'],
            'order_code' => 'GA' . str(now()->format('YmdHis')),
            'quantity' => $quantity,
            'unit_price' => $getProduct->price,
            'status' => OrderEnum::PENDING->value,
            'notes' => $request['notes'],
        ]);

        if ($getProduct->features[0]['category'] == 'online') {
            $location = 'Zoom meeting';
        } elseif ($getProduct->features[0]['category'] == 'offline') {
            $location = 'Menunggu Lokasi';
        }

        // cek produk bimbingan
        $produkDibimbing = false;
        foreach ($getProduct->categories as $category) {
            if (stripos($category->slug, 'dibimbing') !== false) {
                $produkDibimbing = true;
            }
        }
        // jika produk = bimbingan; maka masuk ke tabel course  
        if ($produkDibimbing) {
            $course = Course::create([
                'user_id' => $validateData['user_id'],
                'products_id' => $validateData['products_id'],
                'order_id' => $order->id,
                'date' => $validateData['date'],
                'location' => $location
            ]);
            return response()->json(['message' => Course::where('id', $course->id)->first()]);
        } else {
            return response()->json(['message' => 'produk bukan dibimbing']);
        }
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
