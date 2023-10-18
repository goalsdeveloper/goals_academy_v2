<?php

namespace App\Http\Controllers\API;

use App\Enums\OrderEnum;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Order;
use App\Models\Products;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $data = Order::all();

        return response()->json([
            'user' => $user->name,
            'user purchase' => $data->where('user_id', $user->id)->count(),
            'items' => $data->where('user_id', $user->id)
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
        $validateData = $request->validate([
            'user_id' => 'required',
            'products_id' => 'required',
            // 'notes' => 'sometimes',
        ]);

        $quantity = 1;
        $getProduct = Products::where('id', $validateData['products_id'])->with('categories')->first();
        $produkDibimbing = false;

        // cek produk bimbingan
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

        if ($getProduct->features[0]['category'] == 'online') {
            $location = 'Zoom meeting';
        } elseif ($getProduct->features[0]['category'] == 'offline') {
            $location = 'Menunggu Approval';
        }

        // jika produk = bimbingan; maka masuk ke tabel course  
        if ($produkDibimbing) {
            $course = Course::create([
                'user_id' => $validateData['user_id'],
                'products_id' => $validateData['products_id'],
                'order_id' => $order->id,
                'date' => now()->addDay()->format('Ymd'),
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

    private function checkPromo(){
        
    }
}
