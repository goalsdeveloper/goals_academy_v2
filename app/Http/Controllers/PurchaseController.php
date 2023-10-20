<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Order;
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

        // cek kuota tanggal
        $cekDate = Course::where('date', $validateData['schedule'])->count();
        if ($cekDate > 7) {
            return response()->json(['kuota telah habis']);
        }

        $quantity = 1;
        $getProduct = Products::where('id', 1)->with('categories')->first();

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
            'order_code' => 'GA' . str(now()->format('YmdHis')),
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
                'products_id' => 1,
                'order_id' => $order->id,
                'date' => $validateData['schedule'],
                'location' => $location
            ]);
        }

        // cek user menggunakan kode promo
        if ($request->promo) {
            $user = auth()->user();

            $cekPromo = PromoCode::where('promo_code', $request->promo)->first();
            if (!$cekPromo) {
                // jika promo tidak valid
                return response()->json(['message' => 'Promo tidak ditemukan!']);
            }
            if ($user->kodePromo()->where('promo_code_id', $cekPromo->id)->exists()) {
                // user telah memakai promo yang sama
                return response()->json(['message' => 'Kode promo telah terpakai']);
            } else {
                // berhasil memakai promo
                $promoCode = $user->kodePromo()->attach($cekPromo->id);
            }
        }
        
        // charge midtrans
        
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
