<?php

namespace App\Http\Controllers\Admin\ManajemenUser;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ModeratorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                return Inertia::render('Auth/Admin/ManajemenUser/Moderator', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'moderators'
                    => function () use ($request) {
                        $search =  $request->input('search');
                        $perPage = (int) $request->input('perPage', 25);

                        $query = User::with('profile')->where("user_role", "moderator");

                        if ($search) {
                            $query->where(function ($subquery) use ($search) {
                                $subquery->where('name', 'LIKE', "%$search%")
                                    ->orWhere('username', 'LIKE', "%$search%")
                                    ->orWhere('email', 'LIKE', "%$search%")
                                    ->orWhereHas('profile', function ($profileQuery) use ($search) {
                                        $profileQuery->where('phone_number', 'LIKE', "%$search%")
                                            ->orWhere('university', 'LIKE', "%$search%");
                                    });
                            });
                        }
                        $moderators = $query->paginate($perPage);
                        return $moderators;
                    },
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
        try {
            if (Auth::user()->user_role == "admin") {
                $validatedData = $request->validate([
                    'name' => 'required|string',
                    'username' => 'required|string',
                    'email' => 'required|string|email|unique:users',
                    'phone_number' => 'required|string',
                    'university' => 'required|string',
                    'major' => 'required|string',
                ]);


                $moderator = User::create([
                    'name' => $validatedData['name'],
                    'username' => $validatedData['username'],
                    'email' => $validatedData['email'],
                    'phone_number' => $validatedData['phone_number'],
                    'password' => bcrypt('password'),
                    'user_role' => 'moderator',
                ]);

                $moderator->profile()->create([
                    'phone_number' => $validatedData['phone_number'],
                    'university' => $validatedData['university'],
                    'major' => $validatedData['major'],
                ]);

                // Redirect setelah berhasil membuat moderator baru
                return Inertia::location(route('admin.manajemen_user.moderator.index'));
            } else {
                abort(403);
            }
        } catch (ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(User $moderator)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $moderatorWithProfile = User::with('profile')->where("user_role", "moderator")->findOrFail($moderator->id);

                return response()->json([
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'data' => $moderatorWithProfile,
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
    public function edit(User $moderator)
    {
        if (Auth::user()->user_role == "admin") {
            if ($moderator->user_role == "moderator") {
                $moderator->load('profile');
            } else {
                abort(404);
            }
            // return response()->json(['status' => true, 'statusCode' => 200, 'data' => [
            //     'moderator' => $profile,
            // ]], 200);
        } else {
            abort(403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $moderator)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                if ($moderator->user_role == "moderator") {
                    $validatedData = $request->validate([
                        'name' => 'string',
                        'username' => 'string',
                        'phone_number' => 'string',
                        'university' => 'string',
                        'major' => 'string',
                    ]);

                    $moderator->update($validatedData);
                    $moderator->profile->update($validatedData);

                    // Redirect setelah berhasil memperbarui data moderator
                    return Inertia::location(route('admin.manajemen_user.moderator.index'));
                } else {
                    abort(404);
                }
            } else {
                abort(403);
            }
        } catch (ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => $e->getMessage()], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $moderator)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                if ($moderator->user_role == "moderator") {
                    $moderator->profile()->delete();


                    $moderator->delete();

                    return Inertia::location(route('admin.manajemen_user.moderator.index'));
                } else {
                    abort(404);
                }
            } else {
                abort(403);
            }
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'Moderator not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => $e->getMessage()], 500);
        }
    }
    public function updateActive(Request $request, User $moderator)
    {
        $moderator->profile()->update(['is_active' => $request['is_active']]);
        return redirect()->back();
    }
}
