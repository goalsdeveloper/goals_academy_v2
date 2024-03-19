<?php

namespace Database\Seeders;

use App\Enums\SkillEnum;
use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // SOFTSKILL
        Skill::create([
            'name' => 'Kreatif',
            'category' => SkillEnum::SOFTFKILL,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Skill::create([
            'name' => 'Komunikatif',
            'category' => SkillEnum::SOFTFKILL,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Skill::create([
            'name' => 'Bertanggungjawab',
            'category' => SkillEnum::SOFTFKILL,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Skill::create([
            'name' => 'Problem Solving',
            'category' => SkillEnum::SOFTFKILL,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Skill::create([
            'name' => 'Inovatif',
            'category' => SkillEnum::SOFTFKILL,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        //HARDSKILL
        Skill::create([
            'name' => 'Pemrograman',
            'category' => SkillEnum::HARDSKILL,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Skill::create([
            'name' => 'SPSS',
            'category' => SkillEnum::HARDSKILL,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Skill::create([
            'name' => 'Statistika',
            'category' => SkillEnum::HARDSKILL,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Skill::create([
            'name' => 'Kuantitatif',
            'category' => SkillEnum::HARDSKILL,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        Skill::create([
            'name' => 'Kualitatif',
            'category' => SkillEnum::HARDSKILL,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
