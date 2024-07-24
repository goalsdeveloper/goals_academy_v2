<?php

namespace Database\Seeders;

use App\Enums\UserRoleEnum;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Seeder;

class TutorSkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tutors = User::where('user_role', UserRoleEnum::TUTOR->value)->get();
        foreach ($tutors as $key => $tutor) {
            for ($i = 0; $i < rand(2, 5); $i++) {
                $affected = false;
                do {
                    try {
                        $tutor->skills()->attach(Skill::inRandomOrder()->first());
                        $affected = true;
                    } catch (\Throwable $th) {

                    }
                } while ($affected == false);
            }
        }
    }
}
