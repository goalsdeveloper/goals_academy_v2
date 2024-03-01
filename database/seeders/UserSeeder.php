<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
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
        User::create([
            'name' => 'Afan Oktafianto',
            'username' => 'AfanOkta',
            'email' => 'afanoktafianto99@gmail.com',
            'password' => Hash::make('password'),
            'user_role' => 'user',
            'email_verified_at' => now(),
        ]);
    }
}