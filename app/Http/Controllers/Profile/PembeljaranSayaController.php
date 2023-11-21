<?php

namespace App\Http\Controllers\Profile;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PembeljaranSayaController extends Controller
{
    public function index(string $order_code)
    {
        $data = Order::where('order_code', $order_code)
            ->with('user.profile', 'products', 'course.fileUploads', 'paymentMethod', 'orderHistory')
            ->first();
        return Inertia::render('Auth/User/DetailPesanan', [
            'dataDetail' => $data,
        ]);
    }
}
