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
        // User::create([
        //     'name' => 'Admin Goals',
        //     'username' => 'dev.admin',
        //     'email' => 'dev.admin@goalsacademy.id',
        //     'password' => Hash::make('dev.admin123'),
        //     'user_role' => 'admin',
        //     'email_verified_at' => now(),
        // ]);
        // User::create([
        //     'name' => 'Moderator Goals',
        //     'username' => 'dev.moderator',
        //     'email' => 'dev.moderator@goalsacademy.id',
        //     'password' => Hash::make('dev.moderator123'),
        //     'user_role' => 'moderator',
        //     'email_verified_at' => now(),
        // ]);
        // User::create([
        //     'name' => 'Tutor Goals',
        //     'username' => 'dev.tutor',
        //     'email' => 'dev.tutor@goalsacademy.id',
        //     'revenue_type_id' => 1,
        //     'password' => Hash::make('dev.tutor123'),
        //     'user_role' => 'tutor',
        //     'email_verified_at' => now(),
        // ]);
        // User::create([
        //     'name' => 'User Goals',
        //     'username' => 'dev.user',
        //     'email' => 'dev.user@goalsacademy.id',
        //     'password' => Hash::make('dev.user123'),
        //     'user_role' => 'user',
        //     'email_verified_at' => now(),
        // ]);
        User::create([
            'name' => 'Admin Goals Academy',
            'username' => 'admin',
            'email' => 'admin@goalsacademy.id',
            'password' => Hash::make('goalscorporate21'),
            'user_role' => 'admin',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'rara',
            'name' => 'Vira Alfita Yunia',
            'email' => 'viraalfita1813@gmail.com',
            'password' => Hash::make('password'),
            'user_role' => 'moderator',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'aninda',
            'name' => 'Aninda Waskita Devi',
            'email' => 'anindawaskitadevi@gmail.com',
            'password' => Hash::make('password'),
            'user_role' => 'moderator',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'widyanarahma26',
            'name' => 'Widyana Rahma Cahyani',
            'email' => 'widyanarahma26@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'nafisah637',
            'name' => 'Ulfa Nafisah',
            'email' => 'nafisah637@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'shobastianmuchtar',
            'name' => 'Moch. Shobastian Mahendra Muchtar',
            'email' => 'shobastianmuchtar@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'daufquest',
            'name' => 'Duffin Anggana',
            'email' => 'daufquest@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'jamilahmaghfiroh',
            'name' => 'Siti Jamilah Maghfiroh ',
            'email' => 'jamilahmaghfiroh@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'ryka.yuliana53',
            'name' => 'Ryka Yuliana',
            'email' => 'ryka.yuliana53@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'marioxandaru',
            'name' => 'Fatah Mario Andaru',
            'email' => 'marioxandaru@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'vaniafredericaspil',
            'name' => 'Vania Frederica',
            'email' => 'vaniafredericaspil@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'nuzullailaspane1',
            'name' => 'Nuzullaila Sitorus Pane',
            'email' => 'nuzullailaspane1@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'dfkiptiyah06',
            'name' => 'Deddy Fardillah',
            'email' => 'dfkiptiyah06@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'irenemega15',
            'name' => 'Irene Mega Mellyana',
            'email' => 'irenemega15@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'encas9720',
            'name' => 'Falah Salsabila',
            'email' => 'encas9720@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'tarisyahwidi',
            'name' => 'Tarisyah Widi Shabira',
            'email' => 'tarisyahwidi@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'mirandaislami01',
            'name' => 'Miranda Islami',
            'email' => 'mirandaislami01@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'syahida.asa.16',
            'name' => 'Syahida Usama Firdaus',
            'email' => 'syahida.asa.16@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'larasatidena',
            'name' => 'Larasati Dena Mardhika ',
            'email' => 'larasatidena@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'koberirhamna',
            'name' => 'Alifah Indalika Mulyadi Razak',
            'email' => 'koberirhamna@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'muhammadhifni1717',
            'name' => 'Muhammad Hifni Sahila Rizqy ',
            'email' => 'muhammadhifni1717@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
        User::create([
            'username' => 'alyzaputri06',
            'name' => 'Alyza Lailyah Putri',
            'email' => 'alyzaputri06@gmail.com',
            'revenue_type_id' => 1,
            'password' => Hash::make('password'),
            'user_role' => 'tutor',
            'email_verified_at' => now(),
        ]);
    }
}
