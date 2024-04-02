<?php

namespace App\Http\Controllers\Admin\ManajemenUser;

use App\Models\User;
use Inertia\Inertia;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $perPage = $request->input('perPage', 10);
                $search = $request->input('search');

                $query = User::where("user_role", "user");

                if ($search) {
                    $query->where(function ($subquery) use ($search) {
                        $subquery->where('name', 'LIKE', "%$search%")
                            ->orWhere('username', 'LIKE', "%$search%");
                    });
                }

                $users = $query->paginate($perPage);

                return Inertia::render('Auth/Admin/ManajemenUser/User', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data user success',
                    'data' => $users,
                ], 200);
            } else {
                abort(403);
            }
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to retrieve data. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
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
        try {
            if (Auth::user()->user_role == "admin") {
                $userWithProfile = User::with('profile')->where("user_role", "user")->findOrFail($user->id);

                return response()->json([
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'data' => $userWithProfile,
                ], 200);
            } else {
                abort(403);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'User not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
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
