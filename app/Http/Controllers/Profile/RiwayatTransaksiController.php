<?php

namespace App\Http\Controllers\Profile;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class RiwayatTransaksiController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id)
            ->with('orderHistory', 'paymentMethod','products')
            ->get();
        // dd($order);
        return Inertia::render('Auth/User/RiwayatTransaksi/RiwayatTransaksi',[
            'dataOrder' => $order,
        ]);
    }
}
