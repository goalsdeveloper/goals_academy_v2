<?php

namespace Database\Seeders;

use App\Models\ProductType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductType::create([
            'type' => 'Bimbingan',
            'slug' => 'bimbingan',
        ]);
        ProductType::create([
            'type' => 'E-book',
            'slug' => 'e-book',
        ]);
        ProductType::create([
            'type' => 'Webinar',
            'slug' => 'webinar',
        ]);
    }
}
