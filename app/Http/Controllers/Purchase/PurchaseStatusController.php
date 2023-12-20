<?php

namespace App\Http\Controllers\Purchase;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;

class PurchaseStatusController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(string $order)
    {
        $order = Order::where('order_code', $order)->with('orderHistory', 'paymentMethod')->first();
        $paymentName = Str::lower($order->paymentMethod->name);

        $orderHistory = $order->orderHistory->where('status', 'pending')->first();
        $stringToJson = json_decode($orderHistory->payload);
        // dd($order);
        // dd($stringToJson, $order->paymentMethod);
        return Inertia::render('Purchase/Status', [
            'data' => $order,
            'orderHistory' => $stringToJson,
            'paymentMethod' => $order->paymentMethod,
            'bankName' => $order->paymentMethod->name,
            'paymentName' => $paymentName,
        ]);
    }
}
