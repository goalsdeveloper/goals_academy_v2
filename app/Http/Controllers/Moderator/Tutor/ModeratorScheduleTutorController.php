<?php

namespace App\Http\Controllers\Moderator\Tutor;

use Exception;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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
                $courses = Course::with(['tutor:id,name',"products:id,name,duration"])
                    ->select('id', 'tutor_id', 'date', 'time','products_id')
                    ->where('ongoing', 'berjalan')
                    ->whereNotNull('tutor_id')
                    ->whereNotNull('date')
                    ->whereNotNull('time')
                    ->get();

                return Inertia::render('Auth/Moderator/Tutor/Schedule', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'Get data schedule success',
                    'data' => $courses
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
