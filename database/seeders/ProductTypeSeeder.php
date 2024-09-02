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
            'type' => 'Produk Digital',
            'slug' => 'produk-digital',
        ]);
        ProductType::create([
            'type' => 'Webinar',
            'slug' => 'webinar',
        ]);
        ProductType::create([
            'type' => 'E-Course',
            'slug' => 'ecourse',
        ]);
    }
}
