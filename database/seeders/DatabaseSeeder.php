<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\CourseSession;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\Products;
use App\Models\PromoCode;
use App\Models\User;
use App\Models\UserProfile;
use Database\Factories\OrderSeederFactory;
use Database\Factories\UserProfileFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Ekadian Haris',
            'username' => 'Ayukuriii',
            'email' => 'ekadianharis@goalsacademy.id',
            'password' => Hash::make('qwe12334'),
            'user_role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // User::factory(50)->create();

        UserProfile::create([
            'user_id' => 1,
            'phone_number' => '087763420873',
            'university' => 'Politeknik Negeri Malang',
            'major' => 'Elektronika',
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
            'parent_id' => '1',
            'is_visible' => true,
            'description' => 'Dibimbing secara online',
        ]);
        Category::create([
            'name' => 'Dibimbing Sekali Offline',
            'slug' => 'dibimbing-sekali-offline',
            'parent_id' => '1',
            'is_visible' => true,
            'description' => 'Dibimbing secara offline',
        ]);
        Category::create([
            'name' => 'E-book',
            'slug' => 'e-book',
            'is_visible' => true,
            'description' => 'E-book yang dapat di download',
        ]);
        Category::create([
            'name' => 'Webinar',
            'slug' => 'webinar',
            'is_visible' => true,
            'description' => 'Webinar seru dan informatif',
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
            'date_end'  => today()->addWeek()
        ]);
        PromoCode::factory(9)->create();

        Products::create([
            'name' => 'Dibimbing Online 30 Menit',
            'slug' => 'dibimbing-online-30-menit',
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 30 menit, sesuai dengan permasalahan pada skripsimu.',
            'features' => '[{"times":"1","duration":"30","category":"online"}]',
            'price' => 47000,
            'product_image' => 'product_image/bhuEAMDWr1N08nbwk0I8LJdqM1LYUn-metaS2F0YWxvZyBQcm9ncmFtIC0gR29hbHMgQWNhZGVteS5wbmc=-.png',
        ]);
        Products::create([
            'name' => 'Dibimbing Online 45 Menit',
            'slug' => 'dibimbing-online-45-menit',
            'excerpt' => 'Capai kesuksesan skripsimu melalui bimbingan',
            'description' => 'Capai kesuksesan skripsimu melalui bimbingan personal 1-on-1 selama 45 menit, sesuai dengan permasalahan pada skripsimu.',
            'features' => '[{"times":"1","duration":"45","category":"online"}]',
            'price' => 69000,
            'product_image' => 'product_image/bhuEAMDWr1N08nbwk0I8LJdqM1LYUn-metaS2F0YWxvZyBQcm9ncmFtIC0gR29hbHMgQWNhZGVteS5wbmc=-.png',
        ]);
        Products::create([
            'name' => 'Dibimbing Offline 60 Menit',
            'slug' => 'dibimbing-offline-60-menit',
            'excerpt' => 'Bimbingan personal 1-on-1 secara tatap',
            'description' => 'Bimbingan personal 1-on-1 secara tatap muka selama 60 Menit, khusus area Kota Malang.',
            'features' => '[{"times":"1","duration":"60","category":"offline"}]',
            'price' => 120000,
            'product_image' => 'product_image/bhuEAMDWr1N08nbwk0I8LJdqM1LYUn-metaS2F0YWxvZyBQcm9ncmFtIC0gR29hbHMgQWNhZGVteS5wbmc=-.png',
        ]);
    }
}
