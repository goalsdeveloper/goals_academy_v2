<?php

namespace Database\Seeders;

use App\Models\WorkSystem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkSystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        WorkSystem::create([
            'worksystem' => 'onsite',
        ]);
        WorkSystem::create([
            'worksystem' => 'remote',
        ]);
        WorkSystem::create([
            'worksystem' => 'hybrid',
        ]);
    }
}
