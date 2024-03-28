<?php

namespace Database\Seeders;

use App\Models\TypeJob;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeJobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TypeJob::create([
            'type' => 'fulltime',
        ]);
        TypeJob::create([
            'type' => 'parttime',
        ]);
        TypeJob::create([
            'type' => 'internship',
        ]);
        TypeJob::create([
            'type' => 'freelance',
        ]);
    }
}
