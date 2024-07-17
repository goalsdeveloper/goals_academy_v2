<?php

namespace App\Http\Controllers\Moderator\Tutor;

use Exception;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;

class ModeratorScheduleTutorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            if (Auth::user()->user_role == "moderator") {
                $now = now();
                $period = CarbonPeriod::create($now, $now->copy()->addDays(6));

                $formattedCourses = [];

                for ($hour = 5; $hour <= 23; $hour++) {
                    $time = str_pad($hour, 2, "0", STR_PAD_LEFT) . ":00:00";
                    $schedule = [
                        'time' => $time
                    ];

                    foreach ($period as $date) {
                        $dateKey = $date->format('Y-m-d');
                        $schedule[$dateKey] = [];
                    }

                    $formattedCourses[] = $schedule;
                }

                $courses = Course::with(['tutor:id,name', 'products:id,name,duration'])
                    ->select('id', 'tutor_id', 'date', 'time', 'products_id')
                    ->whereNotNull('tutor_id')
                    ->whereNotNull('date')
                    ->whereNotNull('time')
                    ->get();

                    // dd($courses);
                foreach ($courses as $course) {

                    $durationInHours = ceil($course->products->duration / 60);
                    $startTime = Carbon::parse($course->time)->format('H');
                    // $jam = Carbon::createFromFormat('H', $course->time);
                    // $endTime = $startTime->copy()->addHours($durationInHours);

                    foreach ($formattedCourses as &$schedule) {
                        $time = Carbon::parse($schedule['time'])->format('H');
                        // dd($time);
                        if ($time == $startTime) {
                            $dateKey = $course->date;
                            if (isset($schedule[$dateKey])) {
                                $schedule[$dateKey][] = ['name' => $course->tutor->name, 'time' => $course->time];
                                // $schedule[$dateKey][] = $course->time;
                            }
                        }
                    }
                }

                return Inertia::render('Auth/Moderator/Tutor/Schedule', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'Get data schedule success',
                    'data' => $formattedCourses
                ], 200);
            } else {
                abort(403);
            }
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



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($schedule)
    {
        try {
            if (Auth::user()->user_role == "moderator") {
                $tutor = User::where('id', $schedule)->where('user_role', 'tutor')->first();

                if (!$tutor) {
                    return response()->json([
                        'status' => false,
                        'statusCode' => 404,
                        'message' => 'Tutor not found',
                    ], 404);
                }

                $schedules = Course::with(['tutor:id,name'])
                    ->select('date', 'time', 'session', 'tutor_id')
                    ->where('tutor_id', $schedule)
                    ->whereNotNull('date')
                    ->whereNotNull('time')
                    ->get();

                if ($schedules->isEmpty()) {
                    return response()->json([
                        'status' => false,
                        'statusCode' => 404,
                        'message' => 'Tutor does not have any schedules.',
                    ], 404);
                }

                return response()->json([
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'Get data schedule successfully.',
                    'data' => $schedules
                ], 200);
            } else {
                abort(403);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'Tutor not found',
            ], 404);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 403,
                'message' => $e->getMessage(),
            ], 403);
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
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
