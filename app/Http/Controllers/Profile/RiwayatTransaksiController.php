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
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('Auth/User/RiwayatTransaksi/RiwayatTransaksi',[
            'dataOrder' => $order,
        ]);
    }

    public function riwayatTransaksi(Request $request)
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id);
        switch ($request['status']) {
            case 'pending':
                $order = $order->where('status', OrderEnum::PENDING->value);
                break;
            case 'selesai':
                $order = $order->where('status', OrderEnum::SUCCESS->value);
                break;
            case 'gagal':
                $order = $order->where('status', OrderEnum::FAILED->value);
                break;
            case 'cancel':
                $order = $order->where('status', OrderEnum::CANCEL->value);
                break;
        }
        $order = $order->with('orderHistory', 'paymentMethod', 'products')->get();
        return Inertia::render('Auth/User/RiwayatTransaksi/RiwayatTransaksi', [
            'dataOrder' => $order,
        ]);
    }
}
