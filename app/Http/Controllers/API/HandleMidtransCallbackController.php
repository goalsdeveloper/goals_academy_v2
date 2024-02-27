<?php

namespace App\Http\Controllers\API;

use App\Enums\OrderEnum;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\FileUpload;
use App\Models\Order;
use App\Models\OrderHistory;
use App\Notifications\MidtransNotifications\ExpireNotification;
use App\Notifications\MidtransNotifications\SuccessNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class HandleMidtransCallbackController extends Controller
{
    public function handlePayment(Request $request)
    {
        $payload = $request->all();

        Log::info('incoming-midtrans', [
            'payload' => $payload,
        ]);

        $orderId = $payload['order_id'];
        $statusCode = $payload['status_code'];
        $grossAmount = $payload['gross_amount'];

        $signatureKey = $payload['signature_key'];
        $serverKey = config('midtrans.server_key');

        $signature = hash('sha512', $orderId . $statusCode . $grossAmount . $serverKey);

        if ($signature != $signatureKey) {
            return response()->json([
                'message' => 'Invalid Operation!',
            ], 401);
        }

        $transactionStatus = $payload['transaction_status'];
        $getOrderId = Order::where('order_code', $orderId)->first();

        if ($payload['transaction_status'] != 'pending') {
            OrderHistory::create([
                'order_id' => $getOrderId->id,
                'status' => $transactionStatus,
                'payload' => $payload,
            ]);
        }

        $order = Order::where('order_code', '=', $orderId)->first();
        if (!$order) {
            return response()->json([
                'message' => 'Invalid Order / Order not found!',
            ], 400);
        }

        switch ($transactionStatus) {
            case 'settlement':
                $status = OrderEnum::SUCCESS->value;
                $notificationInstance = new SuccessNotification($order);
                Log::info("Transaksi {$order->order_code} telah berhasil pada " . now());
                if ($order->products->productType->type == "Bimbingan") {
                    $count_course = $order->products->total_meet;
                    $dataCourse = [
                        'user_id' => $order->user_id,
                        'products_id' => $order->products_id,
                        'order_id' => $order->id,
                    ];
                    for ($i = 0; $i < $count_course; $i++) {
                        if ($i == 0) {
                            $parentCourse = Course::create($dataCourse);
                        }
                        if ($i > 0) {
                            $dataCourse['parent_id'] = $parentCourse->id;
                            Course::create($dataCourse);
                        } else {

                        }
                    }
                    $form_result = $order->form_result;
                    if (array_key_exists('document', $form_result)) {
                        foreach ($form_result['document'] as $idx => $key) {
                            FileUpload::create([
                                'course_id' => $parentCourse->id,
                                'slug' => $key['file_name'],
                                'filename' => $key['file_name'],
                                'mime_type' => $key['mime_type'],
                                'size' => $key['size'],
                                'path' => '/file_uploads/' . $key['file_name'],
                            ]);
                        }
                    }
                }
                break;
            case 'expire':
                $status = OrderEnum::FAILED->value;
                $notificationInstance = new ExpireNotification($order);
                Log::info("Transaksi {$order->order_code} telah gagal pada " . now());
                break;
            case 'cancel':
                $status = OrderEnum::CANCEL->value;
                Log::info("Transaksi {$order->order_code} telah dibatalkan pada " . now());
                break;
        }
        $order->status = $status;
        $order->user->notify($notificationInstance);
        $order->save();
        OrderHistory::create([
            'order_id' => $order->id,
            'status' => $status,
            'payload' => $payload,
        ]);

        return response()->json(['message' => 'success'], 200);
    }
}
