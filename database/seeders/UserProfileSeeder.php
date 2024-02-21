<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
        
        // $users = User::all();

        // foreach ($users as $user) {
        //     UserProfile::factory()->create(
        //         [
        //             'user_id' => $user->id
        //         ]
        //     );
        // }
    }
}
