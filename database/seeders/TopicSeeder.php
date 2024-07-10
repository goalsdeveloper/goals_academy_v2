<?php

namespace Database\Seeders;

use App\Models\Topic;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Topic::create([
            'topic' => 'Sesuai Permintaan',
            'slug' => Str::slug('Sesuai Permintaan'),
        ]);
        // Topic::create([
        //     'topic' => 'topic 2',
        //     'slug' => Str::slug('topic 2'),
        // ]);
        // Topic::create([
        //     'topic' => 'topic 3',
        //     'slug' => Str::slug('topic 3'),
        // ]);
        // Topic::create([
        //     'topic' => 'topic 4',
        //     'slug' => Str::slug('topic 4'),
        // ]);

    }
}
