<?php

namespace App\Console\Commands;

use App\Models\Moodle;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ExpiredEcourseCheckerCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ecourse:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cron untuk checking ecourse pengguna expired atau tidak';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        info("Checking Ecourse running at " . now());
        try {
            $moodle = new Moodle();
            // if(true) {
            //     $res = $moodle->delete_user_from_cohort(5);
            // }
            $day_now = Carbon::now();
            $courses = Course::whereNull('parent_id')->where("ongoing", "!=", "selesai")->get();
            foreach ($courses as $course) {
                $active_periode = $course->products->active_period;
                $tanggal_beli = Carbon::parse($course->order->created_at)->addDays($active_periode);
                if ($tanggal_beli < $day_now) {
                    $course->is_moderator = true;
                    // if (
                    //     $course->products->total_meet == 1
                    // ) {
                        $course->ongoing = "selesai";
                    // }
                    $course->update();
                    $course->child()->update(["is_moderator" => true, "ongoing" => CourseStatusEnum::SUCCESS->value]);
                };
            }
        } catch (\Throwable $th) {
            Log::info($th->getMessage());
        }
    }
}
