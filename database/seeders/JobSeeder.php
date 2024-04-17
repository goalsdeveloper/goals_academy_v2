<?php

namespace Database\Seeders;

use App\Models\Job;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Job::create([
            'division_id' => 1,
            'city_id' => 1,
            'work_system_id' => 1,
            'type_job_id' => 2,
            'experience_id' => 2,
            'education_id' => 3,
            'title' => 'Back-End Developer',
            'slug' => 'backend-developer',
            'image' => '/path/image.png',
            'requirement' => '1. Jago Ngoding 2. Fast Respon',
            'responsibility' => 'Ini responsibility',
        ]);
        Job::create([
            'division_id' => 1,
            'city_id' => 1,
            'work_system_id' => 1,
            'type_job_id' => 2,
            'experience_id' => 2,
            'education_id' => 3,
            'title' => 'Front End Developer',
            'slug' => 'frontend-developer',
            'image' => '/path/image.png',
            'requirement' => '1. Jago Slicing 2. Fast Respon',
            'responsibility' => 'Ini responsibility',
        ]);
    }
}
