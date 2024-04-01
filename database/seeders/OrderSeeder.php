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
        Order::factory(100)->state([
            'status' => OrderEnum::SUCCESS->value,
        ])->create();
        Order::factory(5)->state([
            'status' => OrderEnum::FAILED->value,
        ])->create();
        Order::factory(3)->state([
            'status' => OrderEnum::CANCEL->value,
        ])->create();
        Order::factory(2)->state([
            'status' => OrderEnum::PENDING->value,
        ])->create();

        Order::factory(3)->sequence(
            ['products_id' => 6, 'status' => OrderEnum::SUCCESS->value],
            ['products_id' => 7, 'status' => OrderEnum::SUCCESS->value],
        )->create();

        // Order::create([
        //     'user_id' => 6,
        //     'products_id' => 4,
        //     'payment_method_id' => 4,
        //     'order_code' => Order::generateOrderCode(),
        //     'quantity' => 1,
        //     'unit_price' => 124000,
        //     'status' => OrderEnum::SUCCESS->value,
        //     'form_result' => [
        //         "city" => "Malang",
        //         "place" => "Kafe 1",
        //         "topic" => "Topic 1",
        //         "add_on" => [],
        //         "schedule" => "2024-03-07"],
        // ]);

        // Order::create([
        //     'user_id' => 6,
        //     'products_id' => 6,
        //     'payment_method_id' => 4,
        //     'order_code' => Order::generateOrderCode(),
        //     'quantity' => 1,
        //     'unit_price' => 124000,
        //     'status' => OrderEnum::SUCCESS->value,
        //     'form_result' => [
        //         "city" => "Malang",
        //         "place" => "Kafe 1",
        //         "topic" => "Topic 1",
        //         "add_on" => [],
        //         "schedule" => "2024-03-07"],
        // ]);
        // Order::create([
        //     'user_id' => 2,
        //     'products_id' => 1,
        //     'payment_method_id' => 1,
        //     'order_code' => Order::generateOrderCode(),
        //     'quantity' => 1,
        //     'unit_price' => 10000,
        //     'status' => "Success",
        //     'form_result' => [
        //         "city" => "Malang",
        //         "place" => "Kafe 1",
        //         "topic" => "Topic 1",
        //         "add_on" => [],
        //         "schedule" => "2024-03-07"],
        // ]);
        // Order::create([
        //     'user_id' => 2,
        //     'products_id' => 1,
        //     'payment_method_id' => 1,
        //     'order_code' => Order::generateOrderCode(),
        //     'quantity' => 1,
        //     'unit_price' => 10000,
        //     'status' => "Success",
        //     'form_result' => [
        //         "city" => "Malang",
        //         "place" => "Kafe 1",
        //         "topic" => "Topic 1",
        //         "add_on" => [],
        //         "schedule" => "2024-03-07"],
        // ]);
        // Order::create([
        //     'user_id' => 2,
        //     'products_id' => 1,
        //     'payment_method_id' => 1,
        //     'order_code' => Order::generateOrderCode(),
        //     'quantity' => 1,
        //     'unit_price' => 10000,
        //     'status' => "Pending",
        //     'form_result' => [
        //         "city" => "Malang",
        //         "place" => "Kafe 1",
        //         "topic" => "Topic 1",
        //         "add_on" => [],
        //         "schedule" => "2024-03-07"],
        // ]);
        // Order::create([
        //     'user_id' => 2,
        //     'products_id' => 2,
        //     'payment_method_id' => 1,
        //     'order_code' => Order::generateOrderCode(),
        //     'quantity' => 1,
        //     'unit_price' => 10000,
        //     'status' => "Success",
        //     'form_result' => [
        //         "city" => "Malang",
        //         "place" => "Kafe 1",
        //         "topic" => "Topic 1",
        //         "add_on" => [],
        //         "schedule" => "2024-03-07"],
        // ]);
        // Order::create([
        //     'user_id' => 2,
        //     'products_id' => 2,
        //     'payment_method_id' => 1,
        //     'order_code' => Order::generateOrderCode(),
        //     'quantity' => 1,
        //     'unit_price' => 10000,
        //     'status' => "Success",
        //     'form_result' => [
        //         "city" => "Malang",
        //         "place" => "Kafe 1",
        //         "topic" => "Topic 1",
        //         "add_on" => [],
        //         "schedule" => "2024-03-07"],
        // ]);
        // Order::create([
        //     'user_id' => 2,
        //     'products_id' => 2,
        //     'payment_method_id' => 1,
        //     'order_code' => Order::generateOrderCode(),
        //     'quantity' => 1,
        //     'unit_price' => 10000,
        //     'status' => "Pending",
        //     'form_result' => [
        //         "city" => "Malang",
        //         "place" => "Kafe 1",
        //         "topic" => "Topic 1",
        //         "add_on" => [],
        //         "schedule" => "2024-03-07"],
        // ]);

        // Order::create([
        //     'user_id' => 2,
        //     'products_id' => 2,
        //     'payment_method_id' => 1,
        //     'order_code' => Order::generateOrderCode(),
        //     'quantity' => 1,
        //     'unit_price' => 10000,
        //     'status' => "Success",
        //     'form_result' => [
        //         "city" => "Malang",
        //         "place" => "Kafe 1",
        //         "topic" => "Topic 1",
        //         "add_on" => [],
        //         "schedule" => "2024-03-07"],
        // ]);

        // Order::create([
        //     'user_id' => 2,
        //     'products_id' => 2,
        //     'payment_method_id' => 1,
        //     'order_code' => Order::generateOrderCode(),
        //     'quantity' => 1,
        //     'unit_price' => 10000,
        //     'status' => "Success",
        //     'form_result' => [
        //         "city" => "Malang",
        //         "place" => "Kafe 1",
        //         "topic" => "Topic 1",
        //         "add_on" => [],
        //         "schedule" => "2024-03-07"],
        // ]);

        // Order::create([
        //     'user_id' => 2,
        //     'products_id' => 1,
        //     'payment_method_id' => 1,
        //     'order_code' => Order::generateOrderCode(),
        //     'quantity' => 1,
        //     'unit_price' => 10000,
        //     'status' => "Pending",
        //     'form_result' => [
        //         "city" => "Malang",
        //         "place" => "Kafe 1",
        //         "topic" => "Topic 1",
        //         "add_on" => [],
        //         "schedule" => "2024-03-07"],
        // ]);

        // Order::create([
        //     'user_id' => 2,
        //     'products_id' => 1,
        //     'payment_method_id' => 1,
        //     'order_code' => Order::generateOrderCode(),
        //     'quantity' => 1,
        //     'unit_price' => 10000,
        //     'status' => "Success",
        //     'form_result' => [
        //         "city" => "Malang",
        //         "place" => "Kafe 1",
        //         "topic" => "Topic 1",
        //         "add_on" => [],
        //         "schedule" => "2024-03-07"],
        // ]);

        // Order::create([
        //     'user_id' => 2,
        //     'products_id' => 1,
        //     'payment_method_id' => 1,
        //     'order_code' => Order::generateOrderCode(),
        //     'quantity' => 1,
        //     'unit_price' => 10000,
        //     'status' => "Success",
        //     'form_result' => [
        //         "city" => "Malang",
        //         "place" => "Kafe 1",
        //         "topic" => "Topic 1",
        //         "add_on" => [],
        //         "schedule" => "2024-03-07"],
        // ]);

    }
}
