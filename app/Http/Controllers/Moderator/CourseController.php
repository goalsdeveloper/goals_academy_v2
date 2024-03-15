<?php

namespace App\Http\Controllers\Moderator;

use App\Models\Course;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Products;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // if (Auth::user()->user_role == "moderator") {
        $course = Course::with('user', 'products','order')->get();
        return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data course success', 'data' => $course], 200);
        // } else {
        //     abort(403);
        // }
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
    public function show(Course $course)
    {
        $course_user = Course::with('user.profile','products', 'fileUploads')->findOrFail($course->id);
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'get data success',
            'data' => $course_user,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        $validateData = $request->validate([
            'tutor_id' => 'numeric',
            'date' => 'date',
            'time' => 'date_format:H:i',
            'place_id' => 'numeric',
        ]);
        $course->update($validateData);
        return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update course success'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
    }

    public function updateBimbinganOnline(Request $request, Course $course)
    {
        $validateData = $request->validate([
            'tutor_id' => 'numeric',
            'date' => 'date',
            'time' => 'date_format:H:i',
            'location' => 'string',
        ]);
        $course->update($validateData);
        return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update data success'], 200);
    }
}
