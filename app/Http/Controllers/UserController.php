<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        // dd(Auth::user());
        if (Auth::user()->user_role == "admin") {
            $user = User::where("user_role", "user")->paginate(10);

            // dd($user);
            return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data success', 'data' => $user], 200);
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
    public function show(User $user)
    {
        if (Auth::user()->user_role == "admin") {
            
            $userWithProfile = User::with('profile')->where("user_role","user")->find($user->id);
            if($userWithProfile == null){
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
                'data' => $userWithProfile,
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
