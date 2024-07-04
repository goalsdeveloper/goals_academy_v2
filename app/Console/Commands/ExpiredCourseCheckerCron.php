<?php

namespace App\Console\Commands;

use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ExpiredCourseCheckerCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'expire:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        info("Cron Job running at " . now());

        /*------------------------------------------
        --------------------------------------------
        Write Your Logic Here....
        I am getting users and create new users if not exist....
        --------------------------------------------
        --------------------------------------------*/
        try {
            //code...
            // $response = Http::put('/api/check_expired');
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
                    $course->child()->update(["is_moderator" => true]);
                };
            }
            Log::info('mantap');
        } catch (\Throwable $th) {
            Log::info($th->getMessage());
        }
    }
}
