<?php

namespace Database\Seeders;

use App\Models\RevenueType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RevenueTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RevenueType::create([
            'type' => 40,
        ]);
        RevenueType::create([
            'type' => 50,
        ]);
    }
}
