<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TutorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->user_role == "admin") {
            $tutor = User::where("user_role", "tutor")->paginate(10);

            // dd($user);
            return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data success', 'data' => $tutor], 200);
        } else {
            abort(403);
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
    public function show(User $tutorss)
    {
        dd($tutorss);
        if (Auth::user()->user_role == "admin") {

            $tutorWithProfile = User::with('profile')->where("user_role", "tutor")->find($tutorss->id);

            if ($tutorWithProfile == null) {
                return response()->json([
                    'status' => false,
                    'statusCode' => 404,
                    'message' => 'user not found',
                ], 404);
            }
            return response()->json([
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data success',
                'data' => $tutorWithProfile,
            ], 200);
        } else {
            abort(403);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
