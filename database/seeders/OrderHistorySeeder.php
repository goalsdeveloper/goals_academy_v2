<?php

namespace Database\Seeders;

use App\Models\OrderHistory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OrderHistory::create([
            'order_id' => 1,
            'status' => "selesai",
            'payload' => "INI PAYLOAD DATA",
        ]);
    }
}
