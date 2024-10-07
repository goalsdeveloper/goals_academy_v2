<?php

namespace App\Http\Controllers\Purchase;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PurchaseStatusController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(string $order)
    {
        $order = Order::where('order_code', $order)->whereHas('orderHistory', function ($query) {
            $query->where('status', 'pending');
        })->with('orderHistory', 'paymentMethod', 'products')->first();
        $paymentName = Str::lower($order->paymentMethod->name);
        $payload = $order->orderHistory->first()->payload;
        $status = $order->orderHistory->last()->status;
        return Inertia::render('Purchase/Status', [
            'data' => $order,
            'orderHistory' => $payload,
            'status' => $status,
            'paymentMethod' => $order->paymentMethod,
            'bankName' => $order->paymentMethod->name,
            'paymentName' => $paymentName,
        ]);
    }
}
