<?php

namespace Database\Seeders;

use App\Models\Products;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Products::create([
            'category_id' => 2,
            'name' => 'Dibimbing Olah Data',
            'slug' => Str::slug('Dibimbing Olah Data'),
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 30 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 155000,
            'product_image' => 'resources/img/program/dibimbing-online-30.png',
            'product_type_id' => 1,
            'contact_type' => 'online',
            'duration' => 60,
            'total_meet' => 1,
            'active_period' => 99,
            'number_list' => 1,
            'form_config' => [
                'schedule' => 1,
                'topic' => 1,
                'document' => 1,
            ],
        ]);
        Products::create([
            'category_id' => 2,
            'name' => 'Dibimbing Sekali Offline',
            'slug' => Str::slug('Dibimbing Sekali Offline'),
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 165000,
            'product_image' => 'resources/img/program/dibimbing-online-45.png',
            'product_type_id' => 1,
            'contact_type' => 'offline',
            'duration' => 75,
            'total_meet' => 1,
            'active_period' => 99,
            'number_list' => 2,
            'form_config' => [
                'schedule' => 1,
                'city' => 1,
                'place' => 1,
                'topic' => 1,
                'document' => 0,
            ],
        ]);
        Products::create([
            'category_id' => 2,
            'name' => 'Dibimbing Sekali Online',
            'slug' => Str::slug('Dibimbing Sekali Online'),
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 95000,
            'product_image' => 'resources/img/program/dibimbing-online-45.png',
            'product_type_id' => 1,
            'contact_type' => 'online',
            'duration' => 60,
            'total_meet' => 1,
            'active_period' => 99,
            'number_list' => 3,
            'form_config' => [
                'schedule' => 1,
                'topic' => 1,
                'document' => 0,
            ],
        ]);
        Products::create([
            'category_id' => 1,
            'name' => 'Prioritas Dibimbing Tuntas + Kado Hampers',
            'slug' => Str::slug('Prioritas Dibimbing Tuntas + Kado Hampers'),
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 1648000,
            'product_image' => 'resources/img/program/dibimbing-online-45.png',
            'product_type_id' => 1,
            'contact_type' => 'online',
            'duration' => 60,
            'total_meet' => 1,
            'active_period' => 90,
            'number_list' => 1,
            'form_config' => [
                'document' => 0,
            ],
        ]);
        Products::create([
            'category_id' => 1,
            'name' => 'Paket Dibimbing Olah Data Intensif',
            'slug' => Str::slug('Paket Dibimbing Olah Data Intensif'),
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 348000,
            'product_image' => 'resources/img/program/dibimbing-online-45.png',
            'product_type_id' => 1,
            'contact_type' => 'online',
            'duration' => 60,
            'total_meet' => 2,
            'active_period' => 7,
            'number_list' => 2,
            'form_config' => [
                'schedule' => 1,
                'topic' => 1,
                'document' => 1,
            ],
        ]);
        Products::create([
            'category_id' => 1,
            'name' => 'Paket Dibimbing Sebulan',
            'slug' => Str::slug('Paket Dibimbing Sebulan'),
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 650000,
            'product_image' => 'resources/img/program/dibimbing-online-45.png',
            'product_type_id' => 1,
            'contact_type' => 'online',
            'duration' => 60,
            'total_meet' => 4,
            'active_period' => 30,
            'number_list' => 3,
            'form_config' => [
                'document' => 0,
            ],
        ]);
        Products::create([
            'category_id' => 1,
            'name' => 'Paket Dibimbing Seminggu Online',
            'slug' => Str::slug('Paket Dibimbing Seminggu Online'),
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 318000,
            'product_image' => 'resources/img/program/dibimbing-online-45.png',
            'product_type_id' => 1,
            'contact_type' => 'online',
            'duration' => 60,
            'total_meet' => 2,
            'active_period' => 7,
            'number_list' => 4,
            'form_config' => [
                'document' => 0,
            ],
        ]);
        Products::create([
            'category_id' => 1,
            'name' => 'Paket Dibimbing Tuntas Online',
            'slug' => Str::slug('Paket Dibimbing Tuntas Online'),
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 988000,
            'product_image' => 'resources/img/program/dibimbing-online-45.png',
            'product_type_id' => 1,
            'contact_type' => 'online',
            'duration' => 60,
            'total_meet' => 8,
            'active_period' => 90,
            'number_list' => 5,
            'form_config' => [
                'document' => 0,
            ],
        ]);
        Products::create([
            'category_id' => 1,
            'name' => 'Paket Dibimbing Tuntas Hybrid',
            'slug' => Str::slug('Paket Dibimbing Tuntas Hybrid'),
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 1488000,
            'product_image' => 'resources/img/program/dibimbing-online-45.png',
            'product_type_id' => 1,
            'contact_type' => 'hybrid',
            'duration' => 75,
            'total_meet' => 8,
            'active_period' => 90,
            'number_list' => 6,
            'form_config' => [
                'document' => 0,
            ],
        ]);
        Products::create([
            'category_id' => 3,
            'name' => '[Desk Review] Skripsi/Jurnal Semua Jurusan',
            'slug' => Str::slug('[Desk Review] Skripsi/Jurnal Semua Jurusan'),
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
            'price' => 1488000,
            'product_image' => 'resources/img/program/dibimbing-online-45.png',
            'product_type_id' => 1,
            'contact_type' => 'other',
            'duration' => 60,
            'total_meet' => 1,
            'active_period' => 90,
            'number_list' => 1,
            'form_config' => [
                'document' => 1,
            ],
        ]);
        // Products::create([
        //     'category_id' => 4,
        //     'name' => 'Dibimbing Offline 60 Menit',
        //     'slug' => Str::slug('Dibimbing Offline 60 Menit'),
        //     'excerpt' => 'Bimbingan personal 1-on-1 secara tatap',
        //     'description' => 'Bimbingan personal 1-on-1 secara tatap muka selama 60 Menit, khusus area Kota Malang.',
        //     'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
        //     'price' => 120000,
        //     'product_image' => 'resources/img/program/dibimbing-offline-60.png',
        //     'product_type_id' => 1,
        //     'duration' => 60,
        //     'total_meet' => 1,
        //     'active_period' => 30,
        //     'number_list' => 3,
        //     'form_config' => [
        //         'schedule' => 1,
        //         'city' => 1,
        //         'place' => 1,
        //         'topic' => 1,
        //         'document' => 1,
        //     ],
        // ]);

        // Products::create([
        //     'category_id' => 1,
        //     'name' => 'Dibimbing Tuntas Offline 60 Menit',
        //     'slug' => Str::slug('Dibimbing Tuntas Offline 60 Menit'),
        //     'excerpt' => 'Bimbingan personal 1-on-1 secara tatap',
        //     'description' => 'Bimbingan personal 1-on-1 secara tatap muka selama 60 Menit, khusus area Kota Malang.',
        //     'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
        //     'price' => 120000,
        //     'product_image' => 'resources/img/program/dibimbing-offline-60.png',
        //     'product_type_id' => 1,
        //     'duration' => 60,
        //     'total_meet' => 5,
        //     'active_period' => 30,
        //     'number_list' => 6,
        //     'form_config' => [
        //         'city' => 1,
        //         'place' => 1,
        //         'topic' => 1,
        //         'document' => 1,
        //     ],
        // ]);

        // Products::create([
        //     'category_id' => 7,
        //     'name' => 'How To Survive Your Thesis? Start with Theme',
        //     'slug' => Str::slug('How To Survive Your Thesis? Start with Theme'),
        //     'excerpt' => '',
        //     'description' => ' ',
        //     'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
        //     'price' => 15000,
        //     'product_image' => 'resources/img/ebook/1.png',
        //     'product_type_id' => 2,
        //     'duration' => 60,
        //     'total_meet' => 1,
        //     'active_period' => 30,
        //     'number_list' => 4,
        //     'form_config' => [
        //         'schedule' => 0,
        //         'city' => 0,
        //         'place' => 0,
        //         'topic' => 0,
        //         'document' => 0,
        //     ],
        // ]);
        // Products::create([
        //     'category_id' => 5,
        //     'name' => 'Proposal Biar Diterima',
        //     'slug' => Str::slug('Proposal Biar Diterima'),
        //     'excerpt' => '',
        //     'description' => '',
        //     'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
        //     'price' => 49000,
        //     'product_image' => 'resources/img/webinar/1.png',
        //     'product_type_id' => 3,
        //     'duration' => 60,
        //     'total_meet' => 1,
        //     'active_period' => 30,
        //     'number_list' => 5,
        //     'webinar_properties' => [
        //         'start_date' => '2024-04-20',
        //         'end_date' => '2024-04-20',
        //         'time' => '18:00',
        //         'pemateri' => 'Mas Rian',
        //         'link' => 'https://www.google.com/',
        //         'files' => [
        //             ['title' => 'Analisis Kualitatif.pdf', 'path' => 'path-to-storage'],
        //             ['title' => 'Analisis Kuantitatif.pdf', 'path' => 'path-to-storage'],
        //         ],
        //     ],
        // ]);

        // Products::create([
        //     'category_id' => 6,
        //     'name' => 'Proposal biar diterima (Series)',
        //     'slug' => Str::slug('Proposal biar diterima (Series)'),
        //     'excerpt' => '',
        //     'description' => '',
        //     'facilities' => [['icon' => 'icon-text', 'text' => 'text-description']],
        //     'price' => 49000,
        //     'product_image' => 'resources/img/webinar/1.png',
        //     'product_type_id' => 3,
        //     'duration' => 60,
        //     'total_meet' => 1,
        //     'active_period' => 30,
        //     'number_list' => 5,
        //     'webinar_properties' => [
        //         'start_date' => '2024-04-20',
        //         'end_date' => '2024-04-24',
        //         'pemateri' => 'Mas Rian',
        //         'session' => [
        //             [
        //                 'title' => 'Cara melakukan penelitian',
        //                 'date' => '2024-04-20',
        //                 'time' => '18:00',
        //                 'link' => 'https://www.google.com/',
        //                 'files' => [
        //                     ['title' => 'Analisis Kualitatif.pdf', 'path' => 'path-to-storage'],
        //                     ['title' => 'Analisis Kuantitatif.pdf', 'path' => 'path-to-storage'],
        //                 ],
        //             ],
        //             [
        //                 'title' => 'Cara untuk Mengolah Data',
        //                 'date' => '2024-04-21',
        //                 'time' => '18:00',
        //                 'link' => 'https://www.google.com/',
        //                 'files' => [
        //                     ['title' => 'Analisis Kualitatif.pdf', 'path' => 'path-to-storage'],
        //                     ['title' => 'Analisis Kuantitatif.pdf', 'path' => 'path-to-storage'],
        //                 ],
        //             ],
        //         ],
        //     ],
        // ]);

        DB::insert('insert into category_products (category_id, products_id) values (2, 1)');
        DB::insert('insert into category_products (category_id, products_id) values (3, 1)');

        DB::table('products_topic')->insert(['products_id' => 1, 'topic_id' => 1]);
        DB::table('products_topic')->insert(['products_id' => 1, 'topic_id' => 2]);
        DB::table('products_topic')->insert(['products_id' => 1, 'topic_id' => 3]);
        DB::table('products_topic')->insert(['products_id' => 2, 'topic_id' => 1]);
        DB::table('products_topic')->insert(['products_id' => 2, 'topic_id' => 2]);
        DB::table('products_topic')->insert(['products_id' => 2, 'topic_id' => 3]);
    }
}
