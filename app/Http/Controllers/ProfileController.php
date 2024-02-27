<?php

namespace App\Http\Controllers;

use App\Enums\OrderEnum;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::where('id', Auth::user()->id)->with('profile')->first();
        // dd($user);
        $orderBimbingan = Order::where('user_id', $user->id)
            ->where('status', OrderEnum::SUCCESS->value)
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

        return Inertia::render('Auth/User/Bimbingan', [
            'orderBimbingan' => $orderBimbingan,
        ]);
    }

    public function bimbingan()
    {
        $user = User::where('id', Auth::user()->id)->with('profile')->first();
        $orderBimbingan = Order::where('user_id', $user->id)
            ->where('status', OrderEnum::SUCCESS->value)
            ->whereHas('products.categories', function ($query) {
                $query->where('name', 'like', '%dibimbing%');
            })
            ->with('products.categories', 'course')
            ->get();

        return Inertia::render('Auth/User/Bimbingan/Bimbingan', [
            'orderBimbingan' => $orderBimbingan,
        ]);
    }
}
