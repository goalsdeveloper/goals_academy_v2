<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AddOn;
use App\Models\Category;
use App\Models\PaymentMethod;
use App\Models\Products;
use App\Models\ProductType;
use App\Models\PromoCode;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin Goals',
            'username' => 'AdminGoals',
            'email' => 'admingoals@goalsacademy.id',
            'password' => Hash::make('password'),
            'user_role' => 'admin',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Ekadian Haris',
            'username' => 'Ayukuriii',
            'email' => 'ekadianharis@goalsacademy.id',
            'password' => Hash::make('qwe12334'),
            'user_role' => 'admin',
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Gilbert Timothy',
            'username' => 'Timo123',
            'email' => 'gilbert@goalsacademy.id',
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Wendi Ngotes',
            'username' => 'Wendingotes_',
            'email' => 'wendi@goalsacademy.id',
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Akhmad Roziqin',
            'username' => 'Iqin123',
            'email' => 'roziqin@goalsacademy.id',
            'password' => Hash::make('password'),
            'user_role' => 'moderator',
            'email_verified_at' => now(),
        ]);

        // User::factory(50)->create();

        UserProfile::create([
            'user_id' => 1,
        ]);
        UserProfile::create([
            'user_id' => 2,
            'phone_number' => '087763420873',
            'university' => 'Politeknik Negeri Malang',
            'major' => 'Elektronika',
        ]);
        UserProfile::create([
            'user_id' => 3,
            'phone_number' => '087763420872',
            'university' => 'Universitas Brawijaya',
            'major' => 'Hukum',
        ]);
        UserProfile::create([
            'user_id' => 4,
            'phone_number' => '087763420876',
            'university' => 'Universitas Brawijaya',
            'major' => 'Hukum',
        ]);
        UserProfile::create([
            'user_id' => 5,
            'phone_number' => '087763420871',
            'university' => 'Universitas Islam Malang',
            'major' => 'Matematika',
        ]);

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

        PaymentMethod::create([
            'name' => 'QRIS',
            'category' => 'ewallet',
            'payment_type' => 'qris',
            'admin_fee' => 0.7,
            'is_price' => false,
        ]);
        PaymentMethod::create([
            'name' => 'Gopay',
            'category' => 'ewallet',
            'payment_type' => 'gopay',
            'admin_fee' => 2,
            'is_price' => false,
        ]);
        PaymentMethod::create([
            'name' => 'BNI',
            'category' => 'bank_transfer',
            'payment_type' => 'bni',
            'admin_fee' => 4000,
            'is_price' => true,
        ]);
        PaymentMethod::create([
            'name' => 'BRI',
            'category' => 'bank_transfer',
            'payment_type' => 'bri',
            'admin_fee' => 4000,
            'is_price' => true,
        ]);
        PaymentMethod::create([
            'name' => 'Permata',
            'category' => 'bank_transfer',
            'payment_type' => 'permata',
            'admin_fee' => 4000,
            'is_price' => true,
        ]);
        PaymentMethod::create([
            'name' => 'Mandiri',
            'category' => 'bank_transfer',
            'payment_type' => 'echannel',
            'admin_fee' => 4000,
            'is_price' => true,
        ]);

        PromoCode::create([
            'promo_code' => 19283155,
            'description' => 'sauqweksdlaskd',
            'value' => 15000,
            'is_price' => true,
            'date_start' => today()->addDay(),
            'date_end' => today()->addWeek(),
        ]);
        PromoCode::factory(9)->create();

        Products::create([
            'name' => 'Dibimbing Online 30 Menit',
            'slug' => 'dibimbing-online-30-menit',
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 30 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => array(["times" => "1", "duration" => "30", "category" => "online"]),
            'price' => 47000,
            'product_image' => 'resource/img/program/dibimbing-online-30.png',
            'product_type_id' => 1,
            'duration' => 30,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 1,
        ]);
        Products::create([
            'name' => 'Dibimbing Online 45 Menit',
            'slug' => 'dibimbing-online-45-menit',
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.',
            'facilities' => array(["times" => "1", "duration" => "45", "category" => "online"]),
            'price' => 69000,
            'product_image' => 'resource/img/program/dibimbing-online-45.png',
            'product_type_id' => 1,
            'duration' => 45,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 2,
        ]);
        Products::create([
            'name' => 'Dibimbing Offline 60 Menit',
            'slug' => 'dibimbing-offline-60-menit',
            'excerpt' => 'Bimbingan personal 1-on-1 secara tatap',
            'description' => 'Bimbingan personal 1-on-1 secara tatap muka selama 60 Menit, khusus area Kota Malang.',
            'facilities' => json_encode([['icon'=> 'icon-text', 'text'=> 'text-description']]),
            'price' => 120000,
            'product_image' => 'resource/img/program/dibimbing-offline-60.png',
            'product_type_id' => 1,
            'duration' => 60,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 3,
        ]);
        Products::create([
            'name' => 'How To Survive Your Thesis? Start with Theme',
            'slug' => 'how-to-survive-your-thesis-?-start-with-theme',
            'excerpt' => '',
            'description' => ' ',
            'facilities' => json_encode([['icon'=> 'icon-text', 'text'=> 'text-description']]),
            'price' => 15000,
            'product_image' => 'resource/img/ebook/1.png',
            'product_type_id' => 2,
            'duration' => 60,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 4,
        ]);
        Products::create([
            'name' => 'Webinar A',
            'slug' => 'webinar-a',
            'excerpt' => ' ',
            'description' => ' ',
            'facilities' => json_encode([['icon'=> 'icon-text', 'text'=> 'text-description']]),
            'price' => 49000,
            'product_image' => 'resource/img/webinar/1.png',
            'product_type_id' => 3,
            'duration' => 60,
            'total_meet' => 1,
            'active_period' => 30,
            'number_list' => 5,
        ]);

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

        DB::insert('insert into category_products (category_id, products_id) values (2, 1)');
        DB::insert('insert into category_products (category_id, products_id) values (3, 1)');

        DB::insert('insert into add_on_products (add_on_id, products_id) values (1, 1)');
        DB::insert('insert into add_on_products (add_on_id, products_id) values (2, 1)');
        DB::insert('insert into add_on_products (add_on_id, products_id) values (3, 1)');
    }
}
