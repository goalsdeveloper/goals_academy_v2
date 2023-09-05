<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\CourseSession;
use App\Models\Products;
use App\Models\User;
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
            'username' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'user_role' => 'admin'
        ]);
        User::create([
            'username' => 'tutor',
            'email' => 'tutor@gmail.com',
            'password' => Hash::make('password'),
            'user_role' => 'tutor'
        ]);
        User::create([
            'username' => 'moderator',
            'email' => 'moderator@gmail.com',
            'password' => Hash::make('password'),
            'user_role' => 'moderator'
        ]);
        User::factory(5)->create();
        $this->call(UserProfileSeeder::class);

        Products::create([
            'name' => 'Dibimbing Sekali',
            'slug' => 'dibimbing-sekali',
            'excerpt' => 'Lorem ipsum dolor sit amet.',
            'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, porro.',
            'features' => json_encode([
                'pertemuan' => '1x Pertemuan',
                'durasi' => '30-45 menit',
                'metode' => 'Online/Offline'
            ]),
            'price' => 47000,
        ]);
        Products::create([
            'name' => 'Dibimbing Tuntas',
            'slug' => 'dibimbing-tuntas',
            'excerpt' => 'Lorem ipsum dolor sit amet consectetur.',
            'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam modi nobis minima dolore mollitia impedit?',
            'features' => json_encode([
                'pertemuan' => '9x Pertemuan',
                'durasi' => '40-60 menit',
                'metode' => 'Online/Offline'
            ]),
            'price' => 649000,
        ]);
        Products::create([
            'name' => 'Dibimbing Olah Data',
            'slug' => 'dibimbing-olah-data',
            'excerpt' => 'Lorem ipsum dolor sit.',
            'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident dolorem optio eligendi?',
            'features' => json_encode([
                'pertemuan' => '1x Pertemuan',
                'durasi' => '40-60 menit',
                'metode' => 'Online/Offline'
            ]),
            'price' => 115000,
        ]);
        Products::create([
            'name' => 'E-Book Skripsi',
            'slug' => 'e-book-skripsi',
            'excerpt' => 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt?',
            'features' => json_encode([
                'e-book' => '1-4 E-book',
                'device' => 'Semua Device',
                'metode' => 'Bebas Unduh'
            ]),
            'price' => 9000,
        ]);
        CourseSession::create([
            'session' => '09:00'
        ]);
        CourseSession::create([
            'session' => '10:30'
        ]);
        CourseSession::create([
            'session' => '12:00'
        ]);
        CourseSession::create([
            'session' => '13:30'
        ]);
        CourseSession::create([
            'session' => '15:00'
        ]);
    }
}
