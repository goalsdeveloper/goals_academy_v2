<?php

namespace App\Http\Controllers\API;

use App\Enums\CourseStatusEnum;
use App\Enums\OrderEnum;
use App\Models\Order;
use App\Models\OrderHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Notifications\MidtransNotifications\CancelNotification;
use App\Notifications\MidtransNotifications\ExpireNotification;
use App\Notifications\MidtransNotifications\SuccessNotification;

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

        if ($payload['transaction_status'] != 'pending') {
            OrderHistory::create([
                'order_id' => $getOrderId->id,
                'status' => $transactionStatus,
                'payload' => json_encode($payload),
            ]);
        }

        $order = Order::where('order_code', '=', $orderId)->first();
        if (!$order) {
            return response()->json([
                'message' => 'Invalid Order / Order not found!'
            ], 400);
        }

        switch ($transactionStatus) {
            case 'settlement':
                $order->status = OrderEnum::SUCCESS->value;
                $order->save();
                $order->user->notify(new SuccessNotification($order));
                Log::info("Transaksi {$order->order_code} telah berhasil pada " . now());
                break;
            case 'expire':
                $order->status = OrderEnum::FAILED->value;
                $order->save();
                $order->course->ongoing = CourseStatusEnum::CANCEL->value;
                $order->course->save();
                $order->user->notify(new ExpireNotification($order));
                Log::info("Transaksi {$order->order_code} telah gagal pada " . now());
                break;
            case 'cancel':
                $order->status = OrderEnum::CANCEL->value;
                $order->save();
                $order->course->ongoing = CourseStatusEnum::CANCEL->value;
                $order->course->save();
                $order->user->notify(new CancelNotification($order));
                Log::info("Transaksi {$order->order_code} telah dibatalkan pada " . now());
                break;
        }

        return response()->json(['message' => 'success'], 200);
    }
}
