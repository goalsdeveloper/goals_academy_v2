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
        User::create([
            'name' => 'Widyana Rahma Cahyani',
            'username' => 'Widyana Rahma Cahyani',
            'email' => 'widyanarahma26@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Ulfa Nafisah',
            'username' => 'Ulfa Nafisah',
            'email' => 'nafisah637@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Moch. Shobastian Mahendra Muchtar',
            'username' => 'Moch. Shobastian Mahendra Muchtar',
            'email' => 'shobastianmuchtar@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Duffin Anggana',
            'username' => 'Duffin Anggana',
            'email' => 'daufquest@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Siti Jamilah Maghfiroh ',
            'username' => 'Siti Jamilah Maghfiroh ',
            'email' => 'jamilahmaghfiroh@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Ryka Yuliana',
            'username' => 'Ryka Yuliana',
            'email' => 'ryka.yuliana53@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Fatah Mario Andaru',
            'username' => 'Fatah Mario Andaru',
            'email' => 'marioxandaru@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Vania Frederica',
            'username' => 'Vania Frederica',
            'email' => 'vaniafredericaspil@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Nuzullaila Sitorus Pane',
            'username' => 'Nuzullaila Sitorus Pane',
            'email' => 'nuzullailaspane1@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Deddy Fardillah',
            'username' => 'Deddy Fardillah',
            'email' => 'dfkiptiyah06@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Irene Mega Mellyana',
            'username' => 'Irene Mega Mellyana',
            'email' => 'irenemega15@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Falah Salsabila',
            'username' => 'Falah Salsabila',
            'email' => 'encas9720@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Tarisyah Widi Shabira',
            'username' => 'Tarisyah Widi Shabira',
            'email' => 'tarisyahwidi@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Miranda Islami',
            'username' => 'Miranda Islami',
            'email' => 'mirandaislami01@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Syahida Usama Firdaus',
            'username' => 'Syahida Usama Firdaus',
            'email' => 'syahida.asa.16@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Larasati Dena Mardhika ',
            'username' => 'Larasati Dena Mardhika ',
            'email' => 'larasatidena@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Alifah Indalika Mulyadi Razak',
            'username' => 'Alifah Indalika Mulyadi Razak',
            'email' => 'koberirhamna@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Muhammad Hifni Sahila Rizqy ',
            'username' => 'Muhammad Hifni Sahila Rizqy ',
            'email' => 'muhammadhifni1717@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'Alyza Lailyah Putri',
            'username' => 'Alyza Lailyah Putri',
            'email' => 'alyzaputri06@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
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
        User::factory()
            ->count(15)
            ->state(new Sequence(
                ['user_role' => 'tutor'],
                // ['user_role' => 'moderator'],
                // ['user_role' => 'user'],
            ))
            ->create();
    }
}
