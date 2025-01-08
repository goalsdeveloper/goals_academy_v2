<?php

namespace App\Http\Controllers\Moderator\Tutor;

use App\Enums\CourseStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Order;
use App\Models\Skill;
use App\Models\User;
use App\Models\UserProfile;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ModeratorTutorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            return Inertia::render('Auth/Moderator/Tutor/TutorList', [
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data tutor success',
                'tutors' => function () use ($request) {
                    $search = $request->input('search');
                    $perPage = $request->input('perPage', 10);
                    $major = $request->input('major');
                    $skill = $request->input('skill');
                    $query = User::with('profile', 'skills')->where("user_role", "tutor")
                        ->when($search, function ($query) use ($search) {
                            $query->where('name', 'LIKE', "%$search%");
                        })->when($major, function ($query) use ($major) {
                            $query->whereHas('profile', function ($profileQuery) use ($major) {
                                $profileQuery->where('major', $major);
                            });
                        })->when($skill, function ($query) use ($skill) {
                            $query->whereHas('skills', function ($skillQuery) use ($skill) {
                                $skillQuery->where('name', $skill);
                            });
                        });
                    $tutors = $query->paginate($perPage);
                    $tutors->each(function ($tutor) {
                        $onprogress = Course::where('tutor_id', $tutor->id)->where('ongoing', CourseStatusEnum::ONGOING)->count();
                        $onprogress_courses = Course::where('tutor_id', $tutor->id)->where('ongoing', CourseStatusEnum::ONGOING)->join('orders', 'orders.id', '=', 'courses.order_id')
                            ->join('products', 'products.id', '=', 'orders.products_id')
                            ->join('categories', 'categories.id', '=', 'products.category_id')
                            ->groupBy('categories.id', 'categories.name')->selectRaw('categories.id, categories.name, COUNT(*) as jumlah_bimbingan')->limit(3)->get();
                        $done = Course::where('tutor_id', $tutor->id)->where('ongoing', CourseStatusEnum::SUCCESS)->count();
                        $done_courses = Course::where('tutor_id', $tutor->id)->where('ongoing', CourseStatusEnum::SUCCESS)->join('orders', 'orders.id', '=', 'courses.order_id')
                            ->join('products', 'products.id', '=', 'orders.products_id')
                            ->join('categories', 'categories.id', '=', 'products.category_id')
                            ->groupBy('categories.id', 'categories.name')->selectRaw('categories.id, categories.name, COUNT(*) as jumlah_bimbingan')->limit(3)->get();
                        $tutor->finished_course = $done;
                        $tutor->finished_category = $done_courses;
                        $tutor->ongoing_course = $onprogress;
                        $tutor->ongoing_category = $onprogress_courses;
                    });
                    return $tutors;
                },
                'majors' => function () {
                    return UserProfile::distinct()->whereNotNull('major')->get(['major']);
                },
                'skills' => function () {
                    return Skill::all();
                },
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'Error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function scheduleTutor(Request $req, User $tutor)
    {
        $start_date = $req['start_date'];
        $end_date = $req['end_date'];
        $period = CarbonPeriod::create($start_date, $end_date);
        $dates = $period->toArray();
        $schedule = [];
        foreach ($dates as $key => $value) {
            $date = $value->format('Y-m-d');
            $schedule_per_day = $tutor->tutor()->where('date', $date)->with('products:id,name,duration')->get(['time', 'products_id']);
            $schedule[$date] = $schedule_per_day;
        }
        return response()->json([
            'message' => 'success',
            'schedules' => [$schedule],
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
                    'desk_review_selesai' => $desk_review_selesai,
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
