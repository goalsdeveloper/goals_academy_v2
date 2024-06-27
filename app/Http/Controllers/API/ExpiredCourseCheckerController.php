<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ExpiredCourseCheckerController extends Controller
{
    public function index()
    {
        $day_now = Carbon::now();
        $courses = Course::whereNull('parent_id')->where("ongoing", "!=", "selesai")->get();
        foreach ($courses as $course) {
            $active_periode = $course->active_period;
            $tanggal_beli = Carbon::parse($course->order->created_at)->addDays($active_periode);
            if ($tanggal_beli < $day_now) {
                $course->is_moderator = true;
                if ($course->products->total_meet == "1") {
                    $course->ongoing = "selesai";
                }
                $course->update();
                $course->child()->update(["is_moderator", true]);
            };
        }
    }
}
