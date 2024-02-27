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
        $course = Course::get();
        $product = Order::where("products_id",)->get();
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
    }
}
