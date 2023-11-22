<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
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
                $query->where('name', 'like', '%dibimbing%');
            })
            ->with('products.categories', 'course')
            ->get();
        $orderEbook = Order::where('user_id', $user->id)
            ->whereHas('products.categories', function ($query) {
                $query->where('name', 'ebook');
            })
            ->with('products.categories')
            ->get();
        $orderWebinar = Order::where('user_id', $user->id)
            ->whereHas('products.categories', function ($query) {
                $query->where('name', 'webinar');
            })
            ->with('products.categories')
            ->get();


        return Inertia::render('Auth/User/Index', [
            'orderBimbingan' => $orderBimbingan,
        ]);
    }

    public function pembelajaranSaya()
    {
        $user = User::find(auth()->user()->id)->with('profile')->first();
        $orderBimbingan = Order::where('user_id', $user->id)
            ->whereHas('products.categories', function ($query) {
                $query->where('name', 'like', '%dibimbing%');
            })
            ->with('products.categories', 'course')
            ->get();

        return Inertia::render('Auth/User/PembelajaranSaya', [
            'orderBimbingan' => $orderBimbingan,
        ]);
    }
}
