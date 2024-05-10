<?php

namespace Database\Seeders;

use App\Enums\CourseStatusEnum;
use App\Enums\OrderEnum;
use App\Models\Course;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $orders = Order::where('status', OrderEnum::SUCCESS->value)->get();
        foreach ($orders as $key => $value) {
            $tutor = User::where('user_role', 'tutor')->inRandomOrder()->first();
            $dataCourse = [
                'user_id' => $value->user_id,
                'products_id' => $value->products_id,
                'order_id' => $value->id,
                'ongoing'=>CourseStatusEnum::WAITING
            ];
            $session = 1;
            $parent = Course::create(array_merge($dataCourse, ['tutor_id' => $tutor->id, 'session' => $session]));
            $add_ons = $value->form_result['add_on'];
            foreach ($add_ons as $key => $addon) {
                if ($addon != "") {
                    $parent->addOns()->attach($addon['id']);
                }
            }
            for ($i = 0; $i < $value->products->total_meet - 1; $i++) {
                $dataCourse['parent_id'] = $parent->id;
                $dataCourse['session'] = ++$session;
                $course = Course::create($dataCourse);
            }
        }
    }
}
