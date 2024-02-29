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
        $course = Course::with('user', 'products')->get();
        return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data category success', 'data' => $course], 200);
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
        //
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
            // 'user_id' => 'numeric',
            // 'products_id' => 'numeric',
            // 'order_id' => 'numeric',
            'tutor_id' => 'numeric',
            'date' => 'date',
            'time' => 'date_format:H:i',
            // 'ongoing' => 'string',
            'place_id' => 'numeric',
            // 'duration_per_meet' => 'numeric',
            // 'is_facilities' => 'in:0,1',
            // 'number_list' => 'numeric',
            // 'total_meet' => 'numeric',
            // 'active_period' => 'numeric',
            // 'facilities' => 'array|min:1',
            // 'facilities.*.icon' => 'string',
            // 'facilities.*.text' => 'string',
            // 'form_config.schedule' => 'in:0,1',
            // 'form_config.city' => 'in:0,1',
            // 'form_config.place' => 'in:0,1',
            // 'form_config.topic' => 'in:0,1',
            // 'form_config.document' => 'in:0,1',
            // 'form_config.add_on' => 'in:0,1',
            // 'duration' => 'numeric',
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
}
