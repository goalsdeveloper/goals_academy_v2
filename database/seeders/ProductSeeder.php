<?php

namespace Database\Seeders;

use App\Models\Products;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Products::create([
            'category_id' => 1,
            'name' => 'Dibimbing Online 30 Menit',
            'slug' => 'dibimbing-online-30-menit',
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 30 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
            'price' => 47000,
            'product_image' => 'resource/img/program/dibimbing-online-30.png',
            'product_type_id' => 1,
            'duration' => 30,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 1,
        ]);
        Products::create([
            'category_id' => 1,
            'name' => 'Dibimbing Online 45 Menit',
            'slug' => 'dibimbing-online-45-menit',
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
            'price' => 69000,
            'product_image' => 'resource/img/program/dibimbing-online-45.png',
            'product_type_id' => 1,
            'duration' => 45,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 2,
        ]);
        Products::create([
            'category_id' => 1,
            'name' => 'Dibimbing Offline 60 Menit',
            'slug' => 'dibimbing-offline-60-menit',
            'excerpt' => 'Bimbingan personal 1-on-1 secara tatap',
            'description' => 'Bimbingan personal 1-on-1 secara tatap muka selama 60 Menit, khusus area Kota Malang.',
            'facilities' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
            'price' => 120000,
            'product_image' => 'resource/img/program/dibimbing-offline-60.png',
            'product_type_id' => 1,
            'duration' => 60,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 3,
        ]);
        Products::create([
            'category_id' => 1,
            'name' => 'How To Survive Your Thesis? Start with Theme',
            'slug' => 'how-to-survive-your-thesis-?-start-with-theme',
            'excerpt' => '',
            'description' => ' ',
            'facilities' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
            'price' => 15000,
            'product_image' => 'resource/img/ebook/1.png',
            'product_type_id' => 2,
            'duration' => 60,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 4,
        ]);
        Products::create([
            'category_id' => 1,
            'name' => 'Webinar A',
            'slug' => 'webinar-a',
            'excerpt' => ' ',
            'description' => ' ',
            'facilities' => json_encode([['icon' => 'icon-text', 'text' => 'text-description']]),
            'price' => 49000,
            'product_image' => 'resource/img/webinar/1.png',
            'product_type_id' => 3,
            'duration' => 60,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 5,
        ]);
    }
}
