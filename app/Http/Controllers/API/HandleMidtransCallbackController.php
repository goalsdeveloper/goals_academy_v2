<?php

namespace App\Http\Controllers\API;

use App\Enums\OrderEnum;
use App\Models\Order;
use App\Models\OrderHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class HandleMidtransCallbackController extends Controller
{
    public function handlePayment(Request $request)
    {
        $payload = $request->all();

        Log::info('incoming-midtrans', [
            'payload' => $payload
        ]);

        $orderId = $payload['order_id'];
        $statusCode = $payload['status_code'];
        $grossAmount = $payload['gross_amount'];

        $signatureKey = $payload['signature_key'];
        $serverKey = config('midtrans.server_key');

        $signature = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

        if ($signature != $signatureKey) {
            return response()->json([
                'message' => 'Invalid Operation!'
            ], 401);
        }

        $transactionStatus = $payload['transaction_status'];
        $getOrderId = Order::where('order_code', $orderId)->first();
        OrderHistory::create([
            'order_id' => $getOrderId->id,
            'status' => $transactionStatus,
            'payload' => json_encode($payload),
        ]);

        $order = Order::where('order_code', '=', $orderId)->first();
        if (!$order) {
            return response()->json([
                'message' => 'Invalid Order / Order not found!'
            ], 400);
        }

        if ($transactionStatus == 'settlement') {
            $order->status = OrderEnum::SUCCESS->value;
            $order->save();
        } else if ($transactionStatus == 'expire') {
            $order->status = OrderEnum::FAILED->value;
            $order->save();
        }

        return response()->json(['message' => 'success'], 200);
    }
}
