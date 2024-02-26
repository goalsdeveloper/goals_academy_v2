<?php

namespace Database\Seeders;

use App\Models\AddOn;
use Illuminate\Database\Seeder;

class AddOnSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        AddOn::create([
            'name' => '+ Durasi 20 Menit',
            'slug' => 'durasi-20-menit',
            'price' => 15000,
        ]);
        AddOn::create([
            'name' => 'Record',
            'slug' => 'record',
            'price' => 10000,
        ]);
        AddOn::create([
            'name' => 'Desk Review',
            'slug' => 'desk-review',
            'price' => 25000,
        ]);
    }
}
