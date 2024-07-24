<?php

namespace Database\Seeders;

use App\Enums\UserRoleEnum;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\Skill;
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

        // UserProfile::create([
        //     'user_id' => 5,
        //     'phone_number' => '087763420871',
        //     'university' => 'Universitas Islam Malang',
        //     'major' => 'Matematika',
        // ]);
        // UserProfile::create([
        //     'user_id' => 6,
        //     'phone_number' => '0877634208769',
        //     'university' => 'Universitas Brawijaya',
        //     'major' => 'TI',
        // ]);

        // $users = User::where('id', '>', 6)->get();
        // // $users->profile()->create();
        // foreach ($users as $key => $value) {
        //     $value->profile()->create();
        // }

        $users = User::where('user_role', UserRoleEnum::TUTOR->value)->where('id', '!=', 3)->get();

        foreach ($users as $user) {
            UserProfile::create(
                [
                    'user_id' => $user->id,
                    'phone_number' => fake()->phoneNumber(),
                    'university' => fake()->address(),
                    'major' => fake()->company(),
                    'faculty' => fake()->company(),
                    'profile_image' => 'user_profile_image/usrProfile41719849083.jpeg',
                ]
            );

            // $skills = Skill::all();
            // $loop = rand(1, count($skills));
            // // for ($i=0; $i < $loop; $i++) {
            //     $id = Skill::inRandomOrder()->limit($loop)->get();
            //     // array_map(function ($e) {
            //     //     return $e->id;
            //     // }, $id);
            //     $user->skills()->attach($id);
            // // }
        }
    }
}
