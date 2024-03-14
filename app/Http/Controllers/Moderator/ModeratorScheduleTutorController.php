<?php

namespace App\Http\Controllers\Moderator;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;

class ModeratorScheduleTutorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::with(['tutor:id,name'])
        ->select('id', 'tutor_id', 'date', 'time')
        ->where('ongoing', 'berjalan')
        ->whereNotNull('tutor_id')
        ->whereNotNull('date')
        ->whereNotNull('time')
        ->get();

        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'Get data history success',
            'data' => $courses
        ], 200);

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
