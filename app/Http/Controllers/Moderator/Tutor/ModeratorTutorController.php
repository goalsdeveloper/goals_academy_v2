<?php

namespace App\Http\Controllers\Moderator\Tutor;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Order;
use App\Models\OrderHistory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ModeratorTutorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tutors = User::with('profile')
            ->where("user_role", "tutor")
            ->paginate(5);

        $tutors->each(function ($tutor) {
            $onprogress = Course::where('tutor_id', $tutor->id)->where('ongoing', 'berjalan')->count();
            $done = Course::where('tutor_id', $tutor->id)->where('ongoing', 'selesai')->count();
            $tutor->total_course_onprogress = $onprogress;
            $tutor->total_course_done = $done;
        });

        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'get data tutor success',
            'data' => $tutors,
        ], 200);
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
    public function show(User $tutor)
    {
        $tutorWithProfile = User::with('profile')->where("user_role", "tutor")->findOrFail($tutor->id);

        $total_bimbingan_tuntas_onprogress = Course::where('tutor_id', $tutor->id)
            ->where('ongoing', 'berjalan')
            ->whereHas('products', function ($query) {
                $query->where('ongoing', 'berjalan');
                $query->whereHas('category', function ($categoryQuery) {
                    $categoryQuery->where('name', 'LIKE', '%Dibimbing Tuntas%');
                });
            })
            ->count();

        $total_bimbingan_sekali_onprogress = Course::where('tutor_id', $tutor->id)
            ->where('ongoing', 'berjalan')
            ->whereHas('products', function ($query) {
                $query->where('ongoing', 'berjalan');
                $query->whereHas('category', function ($categoryQuery) {
                    $categoryQuery->where('name', 'LIKE', '%Dibimbing Sekali%');
                });
            })
            ->count();

        $desk_review_onprogress = Order::whereHas('course', function ($courseQuery) use ($tutor) {
            $courseQuery->where('tutor_id', $tutor->id)
                ->where('ongoing', 'berjalan');
        })->count();


        $total_bimbingan_tuntas_selesai = Course::where('tutor_id', $tutor->id)
            ->where('ongoing', 'selesai')
            ->whereHas('products', function ($query) {
                $query->where('ongoing', 'selesai');
                $query->whereHas('category', function ($categoryQuery) {
                    $categoryQuery->where('name', 'LIKE', '%Dibimbing Tuntas%');
                });
            })
            ->count();

        $total_bimbingan_sekali_selesai = Course::where('tutor_id', $tutor->id)
            ->where('ongoing', 'selesai')
            ->whereHas('products', function ($query) {
                $query->where('ongoing', 'selesai');
                $query->whereHas('category', function ($categoryQuery) {
                    $categoryQuery->where('name', 'LIKE', '%Dibimbing Sekali%');
                });
            })
            ->count();

        $desk_review_selesai = Order::whereHas('course', function ($courseQuery) use ($tutor) {
            $courseQuery->where('tutor_id', $tutor->id)
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
