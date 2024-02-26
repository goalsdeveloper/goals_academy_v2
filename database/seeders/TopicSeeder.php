<?php

namespace Database\Seeders;

use App\Models\Topic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Topic::insert([
            ['topic' => 'topic 1'],
            ['topic' => 'topic 2'],
            ['topic' => 'topic 3'],
            ['topic' => 'topic 4'],
        ]);
    }
}
