<?php

namespace App\Http\Controllers\Moderator\Tutor;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Course;
use App\Models\OrderHistory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ModeratorTutorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if (Auth::user()->user_role == "moderator") {
                $search = $request->input('search');
                $perPage = $request->input('perPage', 10);
                $major = $request->input('major');
                $skill = $request->input('skill');

                $query = User::with('profile', 'skills')->where("user_role", "tutor");

                if ($search) {
                    $query->whereHas('profile', function ($profileQuery) use ($search) {
                        $profileQuery->where('name', 'LIKE', "%$search%");
                    });
                }

                if ($major) {
                    $query->whereHas('profile', function ($profileQuery) use ($major) {
                        $profileQuery->where('major', $major);
                    });
                }
                if ($skill) {
                    $query->whereHas('skills', function ($skillQuery) use ($skill) {
                        $skillQuery->where('name', $skill);
                    });
                }

                $tutors = $query->paginate($perPage);

                $tutors->each(function ($tutor) {
                    $onprogress = Course::where('tutor_id', $tutor->id)->where('ongoing', 'berjalan')->count();
                    $done = Course::where('tutor_id', $tutor->id)->where('ongoing', 'selesai')->count();
                    $tutor->total_course_onprogress = $onprogress;
                    $tutor->total_course_done = $done;
                });

                return Inertia::render('Auth/Moderator/Tutor/TutorList', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data tutor success',
                    'data' => $tutors,
                ], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'Error: ' . $e->getMessage(),
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
    public function show(User $tutorlist)
    {
        try {
            if (Auth::user()->user_role == "moderator") {
                $tutorWithProfile = User::with(['profile', 'skills'])->where("user_role", "tutor")->findOrFail($tutorlist->id);
                $total_bimbingan_tuntas_onprogress = Course::where('tutor_id', $tutorlist->id)
                    ->where('ongoing', 'berjalan')
                    ->whereHas('products', function ($query) {
                        $query->where('ongoing', 'berjalan');
                        $query->whereHas('category', function ($categoryQuery) {
                            $categoryQuery->where('name', 'LIKE', '%Dibimbing Tuntas%');
                        });
                    })
                    ->count();

                $total_bimbingan_sekali_onprogress = Course::where('tutor_id', $tutorlist->id)
                    ->where('ongoing', 'berjalan')
                    ->whereHas('products', function ($query) {
                        $query->where('ongoing', 'berjalan');
                        $query->whereHas('category', function ($categoryQuery) {
                            $categoryQuery->where('name', 'LIKE', '%Dibimbing Sekali%');
                        });
                    })
                    ->count();

                $desk_review_onprogress = Order::whereHas('course', function ($courseQuery) use ($tutorlist) {
                    $courseQuery->where('tutor_id', $tutorlist->id)
                        ->where('ongoing', 'berjalan');
                })->count();


                $total_bimbingan_tuntas_selesai = Course::where('tutor_id', $tutorlist->id)
                    ->where('ongoing', 'selesai')
                    ->whereHas('products', function ($query) {
                        $query->where('ongoing', 'selesai');
                        $query->whereHas('category', function ($categoryQuery) {
                            $categoryQuery->where('name', 'LIKE', '%Dibimbing Tuntas%');
                        });
                    })
                    ->count();

                $total_bimbingan_sekali_selesai = Course::where('tutor_id', $tutorlist->id)
                    ->where('ongoing', 'selesai')
                    ->whereHas('products', function ($query) {
                        $query->where('ongoing', 'selesai');
                        $query->whereHas('category', function ($categoryQuery) {
                            $categoryQuery->where('name', 'LIKE', '%Dibimbing Sekali%');
                        });
                    })
                    ->count();

                $desk_review_selesai = Order::whereHas('course', function ($courseQuery) use ($tutorlist) {
                    $courseQuery->where('tutor_id', $tutorlist->id)
                        ->where('ongoing', 'selesai');
                })->count();


                return response()->json([
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'tutor' => $tutorWithProfile,
                    'total_bimbingan_tuntas_onprogress' => $total_bimbingan_tuntas_onprogress,
                    'total_bimbingan_sekali_onprogress' => $total_bimbingan_sekali_onprogress,
                    'desk_review_onprogress' => $desk_review_onprogress,
                    'total_bimbingan_tuntas_selesai' => $total_bimbingan_tuntas_selesai,
                    'total_bimbingan_sekali_selesai' => $total_bimbingan_sekali_selesai,
                    'desk_review_selesai' => $desk_review_selesai
                ], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'Error: ' . $e->getMessage(),
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