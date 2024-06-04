<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
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
            'username' => 'dev.admin',
            'email' => 'dev.admin@goalsacademy.id',
            'password' => Hash::make('dev.admin123'),
            'user_role' => 'admin',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Moderator Goals',
            'username' => 'dev.moderator',
            'email' => 'dev.moderator@goalsacademy.id',
            'password' => Hash::make('dev.moderator123'),
            'user_role' => 'moderator',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Tutor Goals',
            'username' => 'dev.tutor',
            'email' => 'dev.tutor@goalsacademy.id',
            'revenue_type_id' => 1,
            'password' => Hash::make('dev.tutor123'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'User Goals',
            'username' => 'dev.user',
            'email' => 'dev.user@goalsacademy.id',
            'password' => Hash::make('dev.user123'),
            'user_role' => 'user',
            'email_verified_at' => now(),
        ]);
        // User::create([
        //     'name' => 'Admin Goals',
        //     'username' => 'AdminGoals',
        //     'email' => 'admingoals@goalsacademy.id',
        //     'password' => Hash::make('password'),
        //     'user_role' => 'admin',
        //     'email_verified_at' => now(),
        // ]);
        // User::create([
        //     'name' => 'Ekadian Haris',
        //     'username' => 'Ayukuriii',
        //     'email' => 'ekadianharis@goalsacademy.id',
        //     'password' => Hash::make('qwe12334'),
        //     'user_role' => 'admin',
        //     'email_verified_at' => now(),
        // ]);

        // User::create([
        //     'name' => 'Gilbert Timothy',
        //     'username' => 'Timo123',
        //     'email' => 'gilbert@goalsacademy.id',
        //     'password' => Hash::make('password'),
        //     'user_role' => 'tutor',
        //     'email_verified_at' => now(),
        // ]);
        // User::create([
        //     'name' => 'Wendi Ngotes',
        //     'username' => 'Wendingotes_',
        //     'email' => 'wendi@goalsacademy.id',
        //     'password' => Hash::make('password'),
        //     'user_role' => 'tutor',
        //     'email_verified_at' => now(),
        // ]);
        // User::create([
        //     'name' => 'Akhmad Roziqin',
        //     'username' => 'Iqin123',
        //     'email' => 'roziqin@goalsacademy.id',
        //     'password' => Hash::make('password'),
        //     'user_role' => 'moderator',
        //     'email_verified_at' => now(),
        // ]);
        // User::create([
        //     'name' => 'Afan Oktafianto',
        //     'username' => 'AfanOkta',
        //     'email' => 'afanoktafianto99@gmail.com',
        //     'password' => Hash::make('password'),
        //     'user_role' => 'user',
        //     'email_verified_at' => now(),
        // ]);
        // User::create([
        //     'name' => 'Mohammad Ilham Arkan',
        //     'username' => 'IlhamArkan',
        //     'email' => 'ilhamarkan2004@gmail.com',
        //     'password' => Hash::make('password'),
        //     'user_role' => 'moderator',
        //     'email_verified_at' => now(),
        // ]);
        // User::create([
        //     'name' => 'Naufal Romero',
        //     'username' => 'rmvs',
        //     'email' => 'naufalromero@gmail.com',
        //     'password' => Hash::make('password'),
        //     'user_role' => 'admin',
        //     'email_verified_at' => now(),
        // ]);
        // User::factory()
        //     ->count(20)
        //     ->state(new Sequence(
        //         ['user_role' => 'tutor'],
        //         ['user_role' => 'moderator'],
        //         ['user_role' => 'user'],
        //     ))
        //     ->create();
    }
}
