<?php

namespace Database\Seeders;

use App\Models\Education;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EducationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Education::create([
            'education' => 'SMP/sederajat',
        ]);
        Education::create([
            'education' => 'SMA/sederajat',
        ]);
        Education::create([
            'education' => 'D3',
        ]);
        Education::create([
            'education' => 'S1/D4',
        ]);
        Education::create([
            'education' => 'S2',
        ]);
    }
}
