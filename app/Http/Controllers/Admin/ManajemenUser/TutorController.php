<?php

namespace App\Http\Controllers\Admin\ManajemenUser;

use App\Http\Controllers\Controller;
use App\Models\RevenueType;
use App\Models\Skill;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TutorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            // $search = $request->input('search');
            // $perPage = $request->input('perPage', 10);

            // if ($search) {
            //     $query->where(function ($subquery) use ($search) {
            //         $subquery->where('name', 'LIKE', "%$search%")
            //             ->orWhere('username', 'LIKE', "%$search%");
            //     });
            // }

            return Inertia::render('Auth/Admin/ManajemenUser/Tutor', [
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data success',
                'revenue_types'=> RevenueType::get(),
                'tutors' =>
                function () use ($request) {
                    $search =  $request->input('search');
                    $perPage = (int) $request->input('perPage', 25);

                    $query = User::with('profile')->where("user_role", "tutor");

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
                    $tutors = $query->paginate($perPage);
                    return $tutors;
                },
            ], 200);
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
        $revenue_types = RevenueType::get();
        $skill = Skill::get();
        return response()->json(['status' => true, 'statusCode' => 200, 'data' => [
            'skill' => $skill,
            'revenue_types'=> $revenue_types
        ]], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'revenue_type_id' => 'required|exists:revenue_types,id',
            ]);

            $user = User::create([
                'name' => $validatedData['name'],
                'username' => $validatedData['name'],
                'email' => $validatedData['email'],
                'revenue_type_id' => $validatedData['revenue_type_id'],
                'password' => bcrypt('password'),
                'user_role' => 'tutor',
            ]);
            $userProfile = new UserProfile();
            $userProfile->user_id = $user->id;
            $userProfile->save();
            return Inertia::location(route('admin.manajemen_user.tutor.index'));
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
            $tutorWithProfile = User::where("user_role", "tutor")->findOrFail($tutor->id);
            $tutorWithProfile->load('profile', 'skills', 'revenue_type');

            return Inertia::render('Auth/Admin/ManajemenUser/Tutor/Show', [
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data success',
                'data' => $tutorWithProfile,
            ], 200);
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
        $skill = Skill::get();
        $revenue_types = RevenueType::get();
        $tutor->load('profile', 'skills', 'revenue_type');
        return Inertia::render('Auth/Admin/ManajemenUser/Tutor/Update', [
            'status' => true,
            'statusCode' => 200,
            'data' => [
                'tutor' => $tutor,
                'skill' => $skill,
                'revenue_types' => $revenue_types,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $tutor = User::findOrFail($id);
            $validatedData = $request->validate([
                'name' => 'string',
                'username' => 'string',
                'revenue_type_id' => 'exists:revenue_types,id',
                'phone_number' => 'string',
                'university' => 'string',
                'faculty' => 'string',
                'major' => 'string',
                'linkedin_url' => 'nullable|string',
                'skills' => 'array',
                'skills.*' => 'exists:skills,id',
                'profile_image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            $tutor->update($validatedData);
            $tutor->profile->update($validatedData);

            if ($request->hasFile('profile_image')) {

                if ($tutor->profile_image) {
                    Storage::delete($tutor->profile_image);
                }

                $profileImagePath = $request->file('profile_image')->store('img/manajemen_user_tutor');

                $tutor->profile->update(['profile_image' => $profileImagePath]);
            }

            $tutor->skills()->detach();
            $tutor->skills()->attach($validatedData['skills']);

            return redirect()->route('admin.manajemen_user.tutor.index');
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

    public function updateActive(Request $request, User $tutor)
    {
        // dd($request['is_active']);
        $tutor->profile()->update(['is_active' => $request['is_active']]);
        return redirect()->back();
    }
}
