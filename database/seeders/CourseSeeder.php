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
        $date = date_create("2013-03-15");
        Course::create([
            'user_id' => 2,
            'products_id' => 1,
            'order_id' => 1,
            'date' =>  date_format($date, "Y/m/d H:i:s"),
            'ongoing' => "berjalan",
            'place_id' => 1,
        ]);
    }
}
