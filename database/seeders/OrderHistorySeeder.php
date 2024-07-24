<?php

namespace Database\Seeders;

use App\Enums\OrderEnum;
use App\Models\Order;
use App\Models\OrderHistory;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class OrderHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // OrderHistory::create([
        //     'order_id' => 1,
        //     'status' => "selesai",
        //     'payload' => "INI PAYLOAD DATA",
        // ]);

        $orders = Order::all();
        foreach ($orders as $key => $value) {
            $payload = [
                "va_numbers" => [
                    ["va_number" => "559515376759064427",
                        "bank" => "bri"],
                ],
                "transaction_time" => Carbon::now()->format('Y-m-d H:i:s'),
                // "transaction_status" => "settlement",
                "transaction_status" => "pending",
                "transaction_id" => "f47657ee-124c-4d79-92f1-f9a996b4e1a6",
                "status_message" => "midtrans payment notification",
                "status_code" => "200",
                "signature_key" => "f1304f3c2bc24d393a095ac3c3bf019de9b88cf212f83b4e5ac88bdd96e4768ad3ab55becedb4344c9eaa03aefc7366ba0fc0b4a32b7f8d0141faf6d1e8463d8",
                "settlement_time" => Carbon::now()->addMinute(1)->format('Y-m-d H:i:s'),
                "payment_type" => "bank_transfer",
                "payment_amounts" => [
                ],
                "order_id" => $value->code,
                "merchant_id" => "G840655951",
                "gross_amount" => "76000.00",
                "fraud_status" => "accept",
                "expiry_time" => Carbon::now()->addDay(1)->format('Y-m-d H:i:s'),
                "currency" => "IDR",
            ];

            $pendingPayload = [
                "status_code" => "201",
                "status_message" => "Success, Bank Transfer transaction is created",
                "transaction_id" => "9ab26e0c-0990-4bf3-8458-686b47608610",
                "order_id" => $value->code,
                "merchant_id" => "G840655951",
                "gross_amount" => "76000.00",
                "currency" => "IDR",
                "payment_type" => "bank_transfer",
                "transaction_time" => $value->created_at->format('Y-m-d H:i:s'),
                "transaction_status" => "pending",
                "fraud_status" => "accept",
                "va_numbers" => [
                    ["bank" => "bri",
                        "va_number" => "559511756052614455"],
                ],
                "expiry_time" => Carbon::parse($value->created_at)->addDay(1)->format('Y-m-d H:i:s'),
            ];

            $pendingOrder = OrderHistory::create([
                'order_id' => $value->id,
                'status' => OrderEnum::PENDING->value,
                'payload' => $pendingPayload,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            switch ($value->status) {
                case 'Success':
                    $payload['transaction_status'] = 'settlement';
                    OrderHistory::create([
                        'order_id' => $value->id,
                        'status' => OrderEnum::SUCCESS->value,
                        'payload' => $payload,
                        'created_at' => Carbon::now()->addMinute(1),
                        'updated_at' => Carbon::now()->addMinute(1),
                    ]);
                    break;
                case 'Cancel':
                    $payload['transaction_status'] = 'cancel';
                    OrderHistory::create([
                        'order_id' => $value->id,
                        'status' => OrderEnum::CANCEL->value,
                        'payload' => $payload,
                        'created_at' => Carbon::now()->addMinute(1),
                        'updated_at' => Carbon::now()->addMinute(1),
                    ]);

                    break;
                case 'Failed':
                    $payload['transaction_status'] = 'failure';
                    OrderHistory::create([
                        'order_id' => $value->id,
                        'status' => OrderEnum::CANCEL->value,
                        'payload' => $payload,
                        'created_at' => Carbon::now()->addMinute(1),
                        'updated_at' => Carbon::now()->addMinute(1),
                    ]);
                    break;
            }
        }
    }
}
