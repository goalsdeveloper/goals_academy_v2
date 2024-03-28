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
        })->with('orderHistory', 'paymentMethod')->first();
        $paymentName = Str::lower($order->paymentMethod->name);
        $stringToJson = $order->orderHistory->first()->payload;
        return Inertia::render('Purchase/Status', [
            'data' => $order,
            'orderHistory' => $stringToJson,
            'paymentMethod' => $order->paymentMethod,
            'bankName' => $order->paymentMethod->name,
            'paymentName' => $paymentName,
        ]);
    }
}
