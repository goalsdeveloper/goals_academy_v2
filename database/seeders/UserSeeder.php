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
            'username' => 'Widyana Rahma Cahyani',
            'name' => 'Widyana Rahma Cahyani',
            'email' => 'widyanarahma26@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Ulfa Nafisah',
            'name' => 'Ulfa Nafisah',
            'email' => 'nafisah637@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Moch. Shobastian Mahendra Muchtar',
            'name' => 'Moch. Shobastian Mahendra Muchtar',
            'email' => 'shobastianmuchtar@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Duffin Anggana',
            'name' => 'Duffin Anggana',
            'email' => 'daufquest@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Siti Jamilah Maghfiroh ',
            'name' => 'Siti Jamilah Maghfiroh ',
            'email' => 'jamilahmaghfiroh@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Ryka Yuliana',
            'name' => 'Ryka Yuliana',
            'email' => 'ryka.yuliana53@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Fatah Mario Andaru',
            'name' => 'Fatah Mario Andaru',
            'email' => 'marioxandaru@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Vania Frederica',
            'name' => 'Vania Frederica',
            'email' => 'vaniafredericaspil@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Nuzullaila Sitorus Pane',
            'name' => 'Nuzullaila Sitorus Pane',
            'email' => 'nuzullailaspane1@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Deddy Fardillah',
            'name' => 'Deddy Fardillah',
            'email' => 'dfkiptiyah06@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Irene Mega Mellyana',
            'name' => 'Irene Mega Mellyana',
            'email' => 'irenemega15@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Falah Salsabila',
            'name' => 'Falah Salsabila',
            'email' => 'encas9720@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Tarisyah Widi Shabira',
            'name' => 'Tarisyah Widi Shabira',
            'email' => 'tarisyahwidi@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Miranda Islami',
            'name' => 'Miranda Islami',
            'email' => 'mirandaislami01@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Syahida Usama Firdaus',
            'name' => 'Syahida Usama Firdaus',
            'email' => 'syahida.asa.16@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Larasati Dena Mardhika ',
            'name' => 'Larasati Dena Mardhika ',
            'email' => 'larasatidena@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Alifah Indalika Mulyadi Razak',
            'name' => 'Alifah Indalika Mulyadi Razak',
            'email' => 'koberirhamna@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Muhammad Hifni Sahila Rizqy ',
            'name' => 'Muhammad Hifni Sahila Rizqy ',
            'email' => 'muhammadhifni1717@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'Alyza Lailyah Putri',
            'name' => 'Alyza Lailyah Putri',
            'email' => 'alyzaputri06@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
    }
}
