<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Order;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = Order::all();
        foreach ($orders as $key => $value) {
            $dataCourse = [
                'user_id' => 6,
                'products_id' => $value->products_id,
                'order_id' => $value->id,
            ];
            $parent = Course::create($dataCourse);
            for ($i = 0; $i < $value->products->total_meet - 1; $i++) {
                $dataCourse['parent_id'] = $parent->id;
                Course::create($dataCourse);
            }
        }
    }
}
