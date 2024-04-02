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
            'name' => 'Dibimbing Tuntas',
            'slug' => 'dibimbing-tuntas',
            'is_visible' => true,
            'description' => 'Dibimbing Skripsi Hingga Tuntas',
        ]);
        Category::create([
            'name' => 'Dibimbing Sekali',
            'slug' => 'dibimbing-sekali',
            'is_visible' => true,
            'description' => 'Dibimbing sekali online/offline',
        ]);
        Category::create([
            'name' => 'Dibimbing Sekali Online',
            'slug' => 'dibimbing-sekali-online',
            'is_visible' => true,
            'description' => 'Dibimbing secara online',
        ]);
        Category::create([
            'name' => 'Dibimbing Sekali Offline',
            'slug' => 'dibimbing-sekali-offline',
            'is_visible' => true,
            'description' => 'Dibimbing secara offline',
        ]);
        Category::create([
            'name' => 'Webinar',
            'slug' => 'webinar',
            'is_visible' => true,
            'description' => 'Pelaksanaan Webinar',
        ]);
        Category::create([
            'name' => 'Webinar Series',
            'slug' => Str::slug('Webinar Series'),
            'is_visible' => true,
            'description' => 'Pelaksanaan Webinar',
        ]);
    }
}
