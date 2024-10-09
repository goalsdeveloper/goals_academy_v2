<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rule = [
            'username' => 'required|max:15',
            'email' => 'required',
            'password' => 'required',
            're-password' => 'required'
        ];

        $validateData = $request->validate($rule);
        if (!$validateData) {
            return response()->json(['message' => 'Invalid Data']);
        }

        // if the account is already exist
        $user = User::where('email', $validateData['email'])->first();
        if ($user) {
            abort(409, 'Account already exist!');
        }

        $userByUsername = User::where('username', $validateData['username'])->first();
        if ($userByUsername) {
            abort(409, 'Username already exist!');
        }

        if ($validateData['password'] !== $validateData['re-password']) {
            abort(409, 'Your password is not match!');
        }

        $newUser = User::create($validateData);
        $newUser->profile()->create();

        return response()->json([
            'message' => 'Your account is created successfully! Please login.',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
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
