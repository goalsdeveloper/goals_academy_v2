<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create parent courses
        $parentCourse1 = Course::create([
            'user_id' => 2,
            'products_id' => 1,
            'order_id' => 1,
            'date' => now()->format('Y-m-d H:i:s'),
            'ongoing' => "berjalan",
            'place_id' => 1,
        ]);

        $parentCourse2 = Course::create([
            'user_id' => 3,
            'products_id' => 2,
            'order_id' => 2,
            'date' => now()->format('Y-m-d H:i:s'),
            'ongoing' => "berjalan",
            'place_id' => 2,
        ]);

        $childCourse1 = Course::create([
            'user_id' => 4,
            'products_id' => 3,
            'order_id' => 3,
            'date' => now()->format('Y-m-d H:i:s'),
            'ongoing' => "berjalan",
            'place_id' => 3,
            'parent_id' => $parentCourse1->id,
        ]);

        $childCourse2 = Course::create([
            'user_id' => 5,
            'products_id' => 4,
            'order_id' => 4,
            'date' => now()->format('Y-m-d H:i:s'),
            'ongoing' => "berjalan",
            'place_id' => 4,
            'parent_id' => $parentCourse2->id,
        ]);
        $course3 = Course::create([
            'user_id' => 3,
            'products_id' => 3,
            'order_id' => 2,
            'date' => now()->format('Y-m-d H:i:s'),
            'ongoing' => "berjalan",
            'place_id' => 2,
        ]);
    }
}
