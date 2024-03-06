<?php

namespace Database\Seeders;

use App\Enums\OrderEnum;
use App\Models\Order;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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
        Order::create([
            'user_id' => 2,
            'products_id' => 1,
            'payment_method_id' => 1,
            'order_code' => Str::random(20),
            'quantity' => 1,
            'unit_price' => 10000,
            'status' => "Success",
            'topic_id' => 1,
            'add_ons' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
        ]);
        Order::create([
            'user_id' => 2,
            'products_id' => 1,
            'payment_method_id' => 1,
            'order_code' => Str::random(20),
            'quantity' => 1,
            'unit_price' => 10000,
            'status' => "Success",
            'topic_id' => 1,
            'add_ons' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
        ]);
        Order::create([
            'user_id' => 2,
            'products_id' => 1,
            'payment_method_id' => 1,
            'order_code' => Str::random(20),
            'quantity' => 1,
            'unit_price' => 10000,
            'status' => "Pending",
            'topic_id' => 1,
            'add_ons' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
        ]);
        Order::create([
            'user_id' => 2,
            'products_id' => 2,
            'payment_method_id' => 1,
            'order_code' => Str::random(20),
            'quantity' => 1,
            'unit_price' => 10000,
            'status' => "Success",
            'topic_id' => 1,
            'add_ons' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
        ]);
        Order::create([
            'user_id' => 2,
            'products_id' => 2,
            'payment_method_id' => 1,
            'order_code' => Str::random(20),
            'quantity' => 1,
            'unit_price' => 10000,
            'status' => "Success",
            'topic_id' => 1,
            'add_ons' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
        ]);
        Order::create([
            'user_id' => 2,
            'products_id' => 2,
            'payment_method_id' => 1,
            'order_code' => Str::random(20),
            'quantity' => 1,
            'unit_price' => 10000,
            'status' => "Pending",
            'topic_id' => 1,
            'add_ons' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
        ]);

        Order::create([
            'user_id' => 2,
            'products_id' => 2,
            'payment_method_id' => 1,
            'order_code' => Str::random(20),
            'quantity' => 1,
            'unit_price' => 10000,
            'status' => "Success",
            'topic_id' => 1,
            'add_ons' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
        ]);

        Order::create([
            'user_id' => 2,
            'products_id' => 2,
            'payment_method_id' => 1,
            'order_code' => Str::random(20),
            'quantity' => 1,
            'unit_price' => 10000,
            'status' => "Success",
            'topic_id' => 1,
            'add_ons' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
        ]);

        Order::create([
            'user_id' => 2,
            'products_id' => 1,
            'payment_method_id' => 1,
            'order_code' => Str::random(20),
            'quantity' => 1,
            'unit_price' => 10000,
            'status' => "Pending",
            'topic_id' => 1,
            'add_ons' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
        ]);

        Order::create([
            'user_id' => 2,
            'products_id' => 1,
            'payment_method_id' => 1,
            'order_code' => Str::random(20),
            'quantity' => 1,
            'unit_price' => 10000,
            'status' => "Success",
            'topic_id' => 1,
            'add_ons' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
        ]);

        Order::create([
            'user_id' => 2,
            'products_id' => 1,
            'payment_method_id' => 1,
            'order_code' => Str::random(20),
            'quantity' => 1,
            'unit_price' => 10000,
            'status' => "Success",
            'topic_id' => 1,
            'add_ons' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
        ]);

    }
}
