<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::find(auth()->user()->id)->with('profile')->first();
        $orderBimbingan = Order::where('user_id', $user->id)
            ->whereHas('products.categories', function ($query) {
                $query->where('name', 'webinar');
            })
            ->with('products.categories')
            ->get();
        $orderEbook = Order::where('user_id', $user->id)
            ->whereHas('products.categories', function ($query) {
                $query->where('name', 'webinar');
            })
            ->with('products.categories')
            ->get();
        $orderWebinar = Order::where('user_id', $user->id)
            ->whereHas('products.categories', function ($query) {
                $query->where('name', 'webinar');
            })
            ->with('products.categories')
            ->get();


        //return ke dashboard user
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
        //
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
