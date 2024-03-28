<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Experience::create([
            'experience' => '0-1',
        ]);
        Experience::create([
            'experience' => '1-2',
        ]);
        Experience::create([
            'experience' => '2-5',
        ]);
        Experience::create([
            'experience' => '5-10',
        ]);
    }
}
