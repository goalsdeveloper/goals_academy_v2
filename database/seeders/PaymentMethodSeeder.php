<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PaymentMethod::create([
            'name' => 'QRIS',
            'category' => 'ewallet',
            'payment_type' => 'qris',
            'admin_fee' => 0.7,
            'is_price' => false,
        ]);
        PaymentMethod::create([
            'name' => 'Gopay',
            'category' => 'ewallet',
            'payment_type' => 'gopay',
            'admin_fee' => 2,
            'is_price' => false,
        ]);
        PaymentMethod::create([
            'name' => 'BNI',
            'category' => 'bank_transfer',
            'payment_type' => 'bni',
            'admin_fee' => 4000,
            'is_price' => true,
        ]);
        PaymentMethod::create([
            'name' => 'BRI',
            'category' => 'bank_transfer',
            'payment_type' => 'bri',
            'admin_fee' => 4000,
            'is_price' => true,
        ]);
        PaymentMethod::create([
            'name' => 'Permata',
            'category' => 'bank_transfer',
            'payment_type' => 'permata',
            'admin_fee' => 4000,
            'is_price' => true,
        ]);
        PaymentMethod::create([
            'name' => 'Mandiri',
            'category' => 'bank_transfer',
            'payment_type' => 'echannel',
            'admin_fee' => 4000,
            'is_price' => true,
        ]);
    }
}
