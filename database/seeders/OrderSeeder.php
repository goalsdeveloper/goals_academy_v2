<?php

namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            'user_id' => 2,
            'products_id' => 1,
            'payment_method_id' => 1,
            'order_code' =>  Str::random(20),
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
            'order_code' =>  Str::random(20),
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
            'order_code' =>  Str::random(20),
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
            'order_code' =>  Str::random(20),
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
            'order_code' =>  Str::random(20),
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
            'order_code' =>  Str::random(20),
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
            'order_code' =>  Str::random(20),
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
            'order_code' =>  Str::random(20),
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
            'order_code' =>  Str::random(20),
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
            'order_code' =>  Str::random(20),
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
            'order_code' =>  Str::random(20),
            'quantity' => 1,
            'unit_price' => 10000,
            'status' => "Success",
            'topic_id' => 1,
            'add_ons' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
        ]);



    }
}
