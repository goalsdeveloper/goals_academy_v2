<?php

namespace Database\Seeders;

use App\Models\Products;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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
            'slug' => Str::slug('Dibimbing Online 30 Menit'),
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 30 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 47000,
            'product_image' => 'resource/img/program/dibimbing-online-30.png',
            'product_type_id' => 1,
            'duration' => 30,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 1,
            'form_config' => [
                'schedule' => 1,
                'city' => 0,
                'place' => 0,
                'topic' => 1,
                'document' => 1,
                'add_on' => 1,
            ],
        ]);
        Products::create([
            'category_id' => 1,
            'name' => 'Dibimbing Online 45 Menit',
            'slug' => Str::slug('Dibimbing Online 45 Menit'),
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 69000,
            'product_image' => 'resource/img/program/dibimbing-online-45.png',
            'product_type_id' => 1,
            'duration' => 45,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 2,
            'form_config' => [
                'schedule' => 1,
                'city' => 0,
                'place' => 0,
                'topic' => 1,
                'document' => 1,
                'add_on' => 1,
            ],
        ]);
        Products::create([
            'category_id' => 1,
            'name' => 'Dibimbing Offline 60 Menit',
            'slug' => Str::slug('Dibimbing Offline 60 Menit'),
            'excerpt' => 'Bimbingan personal 1-on-1 secara tatap',
            'description' => 'Bimbingan personal 1-on-1 secara tatap muka selama 60 Menit, khusus area Kota Malang.',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 120000,
            'product_image' => 'resource/img/program/dibimbing-offline-60.png',
            'product_type_id' => 1,
            'duration' => 60,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 3,
            'form_config' => [
                'schedule' => 1,
                'city' => 1,
                'place' => 1,
                'topic' => 1,
                'document' => 1,
                'add_on' => 1,
            ],
        ]);

        Products::create([
            'category_id' => 1,
            'name' => 'Dibimbing Tuntas Offline 60 Menit',
            'slug' => Str::slug('Dibimbing Tuntas Offline 60 Menit'),
            'excerpt' => 'Bimbingan personal 1-on-1 secara tatap',
            'description' => 'Bimbingan personal 1-on-1 secara tatap muka selama 60 Menit, khusus area Kota Malang.',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 120000,
            'product_image' => 'resource/img/program/dibimbing-offline-60.png',
            'product_type_id' => 1,
            'duration' => 60,
            'total_meet' => 5,
            'active_period' => 30,
            'number_list' => 6,
            'form_config' => [
                'schedule' => 1,
                'city' => 1,
                'place' => 1,
                'topic' => 1,
                'document' => 1,
                'add_on' => 1,
            ],
        ]);

        Products::create([
            'category_id' => 1,
            'name' => 'How To Survive Your Thesis? Start with Theme',
            'slug' => Str::slug('How To Survive Your Thesis? Start with Theme'),
            'excerpt' => '',
            'description' => ' ',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 15000,
            'product_image' => 'resource/img/ebook/1.png',
            'product_type_id' => 2,
            'duration' => 60,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 4,
            'form_config' => [
                'schedule' => 0,
                'city' => 0,
                'place' => 0,
                'topic' => 0,
                'document' => 0,
                'add_on' => 0,
            ],
        ]);
        Products::create([
            'category_id' => 5,
            'name' => 'Webinar A',
            'slug' => Str::slug('Webinar A'),
            'excerpt' => ' ',
            'description' => ' ',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 49000,
            'product_image' => 'resource/img/webinar/1.png',
            'product_type_id' => 3,
            'duration' => 60,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 5,
            'form_config' => [
                'schedule' => 1,
                'city' => 0,
                'place' => 0,
                'topic' => 1,
                'document' => 1,
                'add_on' => 1,
            ],
        ]);
    }
}
