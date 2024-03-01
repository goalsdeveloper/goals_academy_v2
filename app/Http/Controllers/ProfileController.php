<?php

namespace App\Http\Controllers;

use App\Enums\OrderEnum;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
            ->whereHas('products.category', function ($query) {
                $query->where('name', 'like', '%dibimbing%');
            })
            ->with('products.category', 'course')
            ->get();
        // dd($orderBimbingan);
        return Inertia::render('Auth/User/Index', [
            'orderBimbingan' => $orderBimbingan,
        ]);
    }

    public function pembelajaranSaya()
    {
        $user = Auth::user();
        $orderBimbingan = Order::where('user_id', $user->id)
            ->where('status', OrderEnum::SUCCESS->value)
            ->whereHas('products.category', function ($query) {
                $query->where('name', 'like', '%dibimbing%');
            })
            ->with('products.category', 'course')
            ->get();

        return Inertia::render('Auth/User/PembelajaranSaya', [
            'orderBimbingan' => $orderBimbingan,
        ]);
    }
}
