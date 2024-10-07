<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Paket Pertemuan',
            'slug' => 'paket-pertemuan',
            'is_visible' => true,
            'description' => 'Dibimbing Skripsi Hingga Tuntas',
            'product_type_id' => 1,
        ]);
        Category::create([
            'name' => 'Sekali Pertemuan',
            'slug' => 'sekali-pertemuan',
            'is_visible' => true,
            'description' => 'Dibimbing sekali online/offline',
            'product_type_id' => 1,
        ]);
        Category::create([
            'name' => 'Desk Review',
            'slug' => 'desk-review',
            'is_visible' => true,
            'description' => 'Dibimbing sekali desk review',
            'product_type_id' => 1,
        ]);
        // Category::create([
        //     'name' => 'Dibimbing Sekali Online',
        //     'slug' => 'dibimbing-sekali-online',
        //     'is_visible' => true,
        //     'description' => 'Dibimbing secara online',
        //     'product_type_id' => 1,
        // ]);
        // Category::create([
        //     'name' => 'Dibimbing Sekali Offline',
        //     'slug' => 'dibimbing-sekali-offline',
        //     'is_visible' => true,
        //     'description' => 'Dibimbing secara offline',
        //     'product_type_id' => 1,
        // ]);
        Category::create([
            'name' => 'Webinar',
            'slug' => 'webinar',
            'is_visible' => true,
            'description' => 'Pelaksanaan Webinar',
            'product_type_id' => 3,
        ]);
        Category::create([
            'name' => 'Webinar Series',
            'slug' => Str::slug('Webinar Series'),
            'is_visible' => true,
            'description' => 'Pelaksanaan Webinar',
            'product_type_id' => 3,
        ]);
        Category::create([
            'name' => 'Produk Digital',
            'slug' => Str::slug('Produk Digital'),
            'is_visible' => true,
            'description' => 'Produk Digital',
            'product_type_id' => 2,
        ]);
        Category::create([
            'name' => 'Special',
            'slug' => Str::slug('Special'),
            'is_visible' => false,
            'description' => 'Special',
            'product_type_id' => 1,
        ]);
        Category::create([
            'name' => 'Jasa Riset',
            'slug' => Str::slug('Jasa Riset'),
            'is_visible' => true,
            'description' => 'Jasa Riset',
            'product_type_id' => 4,
        ]);
        // Category::create([
        //     'name' => 'E-Course',
        //     'slug' => Str::slug('E-Course'),
        //     'is_visible' => true,
        //     'description' => 'E-Course',
        //     'product_type_id' => 4,
        // ]);
    }
}
