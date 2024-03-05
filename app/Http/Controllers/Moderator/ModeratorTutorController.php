<?php

namespace App\Http\Controllers\Moderator;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\OrderHistory;
use App\Models\User;
use Illuminate\Http\Request;

class ModeratorTutorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tutors = User::with('profile')
            ->where("user_role", "tutor")
            ->get();

        $tutors->each(function ($tutor) {
            $onprogress = Course::where('tutor_id', $tutor->id)->where('ongoing', 'berjalan')->count();
            $done = Course::where('tutor_id', $tutor->id)->where('ongoing', 'selesai')->count();
            $tutor->total_course_onprogress = $onprogress;
            $tutor->total_course_done = $done;
        });

        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'get data tutor success',
            'data' => $tutors,
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
    public function show(string $id)
    {
        //
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
