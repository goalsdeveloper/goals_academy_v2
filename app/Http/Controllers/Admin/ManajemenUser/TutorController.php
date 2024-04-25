<?php

namespace App\Http\Controllers\Admin\ManajemenUser;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\UserProfile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TutorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                // $search = $request->input('search');
                // $perPage = $request->input('perPage', 10);

                $query = User::with('profile')->where("user_role", "tutor");

                // if ($search) {
                //     $query->where(function ($subquery) use ($search) {
                //         $subquery->where('name', 'LIKE', "%$search%")
                //             ->orWhere('username', 'LIKE', "%$search%");
                //     });
                // }
                $tutors = $query->get();

                return Inertia::render('Auth/Admin/ManajemenUser/Tutor', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'data' => $tutors,
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
        if (Auth::user()->user_role == "admin") {
            $skill = Skill::get();
            return response()->json(['status' => true, 'statusCode' => 200, 'data' => [
                'skill' => $skill
            ]], 200);
        } else {
            abort(403);
        }
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
                    'email' => 'required|email|unique:users,email',
                ]);

                $user = User::create([
                    'name' => $validatedData['name'],
                    'username' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'password' => bcrypt('password'),
                    'user_role' => 'tutor',
                ]);
                $userProfile = new UserProfile();
                $userProfile->user_id = $user->id;
                $userProfile->save();


                return Inertia::location(route('admin.manajemen_user.tutor.index'));
            } else {
                abort(403);
            }
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => $e->validator->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $tutor)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $tutorWithProfile = User::where("user_role", "tutor")->findOrFail($tutor->id);
                $tutorWithProfile->load('profile', 'skills');

                return Inertia::render('Auth/Admin/ManajemenUser/Tutor/Show', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'data' => $tutorWithProfile,
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
    public function edit(User $tutor)
    {
        if (Auth::user()->user_role == "admin") {
            $skill = Skill::get();
            $tutor->load('profile', 'skills');
            return Inertia::render('Auth/Admin/ManajemenUser/Tutor/Update', [
                'status' => true,
                'statusCode' => 200,
                'data' => [
                    'tutor' => $tutor,
                    'skill' => $skill
                ]
            ]);
        } else {
            abort(403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // dd($request);
        try {
            if (Auth::user()->user_role == "admin") {
                $tutor = User::findOrFail($id);
                $validatedData = $request->validate([
                    'name' => 'string',
                    'username' => 'string',
                    'phone_number' => 'string',
                    'university' => 'string',
                    'major' => 'string',
                    'linkedin_url' => 'string',
                    'skills' => 'array',
                    'skills.*' => 'exists:skills,id',
                    'profile_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
                ]);

                $tutor->update($validatedData);

                if ($request->has(['phone_number', 'university', 'major', 'linkedin_url'])) {
                    $tutor->profile->update($validatedData);
                }


                if ($request->hasFile('profile_image')) {

                    if ($tutor->profile_image) {
                        Storage::delete($tutor->profile_image);
                    }

                    $profileImagePath = $request->file('profile_image')->store('img/manajemen_user_tutor');

                    $tutor->profile->update(['profile_image' => $profileImagePath]);
                }

                $tutor->skills()->detach();
                $tutor->skills()->attach($validatedData['skills']);

                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update success'], 200);
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
    public function destroy(User $tutor)
    {
        //
    }
}
