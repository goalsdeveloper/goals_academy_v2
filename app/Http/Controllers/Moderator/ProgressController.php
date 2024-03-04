<?php

namespace App\Http\Controllers\Moderator;

use App\Models\Course;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $course = Course::whereNull('parent_id')->with('child')->orderBy('id')->get();
        return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data course success', 'data' => $course], 200);
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
    public function show(Course $progress)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $progress)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $progress)
    {
        $validateData = $request->validate([
            // 'tutor_id' => 'numeric',
            // 'location' => 'date',
            // 'time' => 'date_format:H:i',
        ]);
        $progress->update($validateData);
        return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update course success'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $progress)
    {
        //
    }
}
