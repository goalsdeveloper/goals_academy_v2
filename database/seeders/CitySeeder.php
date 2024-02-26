<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        City::insert([
            ['city' => 'Malang'],
            ['city' => 'Surabaya'],
            ['city' => 'Jakarta'],
        ]);
    }
}
