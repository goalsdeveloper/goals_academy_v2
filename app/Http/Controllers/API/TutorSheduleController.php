<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;

class TutorSheduleController extends Controller
{
    public function index(Request $request)
    {
        try {

            $start_date = $request->input('start_date');
            $end_date = $request->input('end_date');
            if ($start_date && $end_date) {
                $period = CarbonPeriod::create($start_date, $end_date);
            } else {
                $now = now();
                $period = CarbonPeriod::create($now, $now->copy()->addDays(6));
            }
            // return response()->json([
            //     'start_date' => $start_date,
            //     'end_date' => $end_date,
            // ]);

            $formattedCourses = [];

            for ($hour = 5; $hour <= 23; $hour++) {
                $time = str_pad($hour, 2, "0", STR_PAD_LEFT) . ":00:00";
                $schedule = [
                    'time' => $time,
                ];

                foreach ($period as $date) {
                    $dateKey = $date->format('Y-m-d');
                    $schedule[$dateKey] = [];
                }

                $formattedCourses[] = $schedule;
            }

            $courses = Course::with(['tutor:id,name', 'products:id,name,duration'])
                ->select('id', 'tutor_id', 'date', 'time', 'products_id')
            // ->where('ongoing', 'berjalan')
                ->whereBetween('date', [$start_date, $end_date])
                ->whereNotNull('tutor_id')
                ->whereNotNull('date')
                ->whereNotNull('time')
                ->get();
            // return response()->json([
            // 'data' => $courses
            // ]);
            foreach ($courses as $course) {
                $durationInHours = ceil($course->products->duration / 60);
                $startTime = Carbon::parse($course->time)->format('H');
                // $jam = Carbon::createFromFormat('H', $course->time);
                // $endTime = $startTime->copy()->addHours($durationInHours);

                foreach ($formattedCourses as &$schedule) {
                    $time = Carbon::parse($schedule['time'])->format('H');
                    if ($time == $startTime) {
                        $dateKey = $course->date;
                        if (isset($schedule[$dateKey])) {
                            $schedule[$dateKey][] = ['name' => $course->tutor->name, 'time' => $course->time];
                        }
                    }
                }
            }

            return response()->json([
                'status' => true,
                'statusCode' => 200,
                'message' => 'Get data schedule success',
                'data' => $formattedCourses,
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An error occurred while fetching data: ' . $e->getMessage(),
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An unexpected error occurred: ' . $e->getMessage(),
            ], 500);
        }
    }
}
