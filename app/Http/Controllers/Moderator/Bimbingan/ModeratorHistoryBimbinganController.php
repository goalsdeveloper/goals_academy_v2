<?php

namespace App\Http\Controllers\Moderator\Bimbingan;

use App\Enums\CourseStatusEnum;
use App\Enums\OrderEnum;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Order;
use App\Models\OrderHistory;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModeratorHistoryBimbinganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $perPage = $request->input('perPage', 25);
            $search = $request->input('search');
            // $order = OrderHistory::where('status', 'Success')
            //     ->with('order.course')
            //     ->limit(10)->get();
            // // dd($order[0]);

            $query = Order::where('status', OrderEnum::SUCCESS)
            ->whereHas('products.productType', function ($q) {
                $q->where('type', 'bimbingan');
            })
            ->whereHas('course', function ($q) {
                $q->where('ongoing', CourseStatusEnum::SUCCESS);
            })
            ->with(['products:id,name,contact_type', 'user:id,username', 'course.child.place', 'course.place']);


            // $query = OrderHistory::where('status', OrderEnum::SUCCESS)->whereHas('order.products.productType', function ($q) {
            //     $q->where('type', 'bimbingan');
            // })->with(['order.products:id,name', 'order.user:id,username', 'order.course.child', 'order.course.place']);
            if ($search) {
                $query->whereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'LIKE', "%$search%");
                });
            }

            $order_history = $query->paginate($perPage);

            // return response()->json([
            //     'status' => false,
            //     'statusCode' => 500,
            //     'order_history' => $order_history,
            // ], 500);

            return Inertia::render('Auth/Moderator/Bimbingan/History', [
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data history success',
                'order_history' => $order_history,
            ], 200);
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
    public function show(Course $history)
    {
        try {
            $tutors = User::with('profile')->where("user_role", "tutor")->get();
            if (Auth::user()->user_role == "moderator") {
                $history_user = Course::with('user:id,username', 'user.profile:id,user_id,university,major,phone_number,faculty', 'tutor:id,name', 'topic:id,topic', 'place.city', 'order:id,order_code', 'products:id,name,contact_type', 'fileUploads', 'productReview')->findOrFail($history->id);
                // return response()->json([
                //     'status' => true,
                //     'statusCode' => 200,
                //     'message' => 'Get data success',
                //     'data' => $history_user,
                // ], 200);

                return Inertia::render('Auth/Moderator/Bimbingan/History/View', [
                    'progress' => $history_user,
                    'tutors' => $tutors
                ]);
            } else {
                abort(403);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'Course not found.',
            ], 404);
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 403,
                'message' => $e->getMessage(),
            ], 403);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An unexpected error occurred: ' . $e->getMessage(),
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
