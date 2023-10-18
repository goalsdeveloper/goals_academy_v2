<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\CourseSession;
use App\Models\Products;
use App\Models\PromoCode;
use App\Models\User;
use App\Models\UserProfile;
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

        PromoCode::factory(10)->create();
    }
}
