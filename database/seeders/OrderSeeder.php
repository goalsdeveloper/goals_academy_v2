<?php

namespace Database\Seeders;

use App\Enums\OrderEnum;
use App\Models\Order;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Order::create([
            'user_id' => 6,
            'products_id' => 4,
            'payment_method_id' => 4,
            'order_code' => Order::generateOrderCode(),
            'quantity' => 1,
            'unit_price' => 124000,
            'status' => OrderEnum::SUCCESS->value,
            'form_result' => [
                "city" => "Malang",
                "place" => "Kafe 1",
                "topic" => "Topic 1",
                "add_on" => [],
                "schedule" => "2024-03-07"],
        ]);

        Order::create([
            'user_id' => 6,
            'products_id' => 6,
            'payment_method_id' => 4,
            'order_code' => Order::generateOrderCode(),
            'quantity' => 1,
            'unit_price' => 124000,
            'status' => OrderEnum::SUCCESS->value,
            'form_result' => [
                "city" => "Malang",
                "place" => "Kafe 1",
                "topic" => "Topic 1",
                "add_on" => [],
                "schedule" => "2024-03-07"],
        ]);
    }
}
