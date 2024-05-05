<?php

namespace App\Http\Controllers\Moderator\Bimbingan;

use App\Enums\UserRoleEnum;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Order;
use App\Models\Place;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ModeratorOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $perPage = $request->input('perPage', 10);
            $search = $request->input('search');

            $query = Order::with([
                'user:id,username',
                'user.profile',
                'products:id,product_type_id,category_id,name',
                'products.category:id,name',
                'products.productType:id,type',
                'course:id,products_id,order_id,tutor_id,place_id,topic_id,date,time,location',
                'course.place.city',
                'course.place',
                'course.tutor',
                'course.tutor.profile',
                'course.topic',
                'course.fileUploads'
            ])->whereHas('products', function ($query) {
                $query->whereHas('productType', function ($subQuery) {
                    $subQuery->where('type', 'LIKE', '%bimbingan%');
                });
            })->where('status', 'Success');


            $query->whereHas('course', function ($courseQuery) {
                $courseQuery->whereNull('tutor_id');
            });

            if ($search) {
                $query->whereHas('user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'LIKE', "%$search%");
                });
            }

            $query->orderBy('created_at', 'asc');
            $orders = $query->paginate($perPage);

            $orders->getCollection()->transform(function ($order) {
                $totalFields = 4;
                $completeFields = 0;
                $course = $order->course;
                if ($course->place_id) {
                    $completeFields++;
                }

                if ($course->date) {
                    $completeFields++;
                }

                if ($course->time) {
                    $completeFields++;
                }

                if ($course->tutor_id) {
                    $completeFields++;
                }

                $order->completeness_percentage = ($completeFields / $totalFields) * 100;
                return $order;
            });

            return Inertia::render('Auth/Moderator/Bimbingan/RecentOrder', [
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data history success',
                'orders' => $orders,
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An error occurred while fetching data: ' . $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An unexpected error occurred: ' . $e->getMessage(),
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
    public function show(Order $order)
    {
        try {
            $order = $order->load('products', 'user', 'user.profile', 'course.place', 'course.tutor', 'course.tutor.profile', 'course.topic');
            return response()->json([
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data success',
                'order' => $order,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'Order not found.',
            ], 404);
        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An error occurred while fetching data: ' . $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
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
    public function edit(Order $order)
    {
        return Inertia::render('Auth/Moderator/Bimbingan/RecentOrder/Edit', [
            'order' => $order->load('products', 'user', 'user.profile', 'course.place', 'course.tutor', 'course.tutor.profile', 'course.topic', 'course.fileUploads'),
            'places' => fn () => Place::with('city')->get(),
            'tutors' => fn () => User::where('user_role', UserRoleEnum::TUTOR)->with('profile')->get(),
            'auth' => Auth::user(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */

    // $order diambil dari course id(perhatikan name model)
    public function update(Request $request, Course $order)
    {
        try {
            $validateData = $request->validate([
                'tutor_id' => 'numeric',
                'date' => 'date',
                'time' => 'date_format:H:i',
                'place_id' => 'numeric',
            ]);

            $order->update($validateData);

            return response()->json([
                'status' => true,
                'statusCode' => 200,
                'message' => 'Update course success',
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => 'Validation error: ' . $e->getMessage(),
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An unexpected error occurred: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    // $order diambil dari course id(perhatikan name model)
    public function updateBimbinganOnline(Request $request, Order $order)
    {
        // dd($request->all(), $order);
        try {
            $validateData = $request->validate([
                'tutor_id' => 'numeric',
                'date' => 'date',
                'time' => 'date_format:H:i',
                'place_id' => 'numeric',
            ]);

            $order->course()->update($validateData);

            return redirect()->back();
        } catch (ValidationException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 422,
                'message' => 'Validation error: ' . $e->getMessage(),
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An unexpected error occurred: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function showOnline(Course $order)
    {
        try {
            $order = Order::with('user:id,name', 'user.profile:user_id,phone_number,university,faculty,major', 'products:id,name', 'course:id,products_id,order_id,tutor_id,topic_id,date,time,location', 'course.tutor:id,name')
                ->whereHas('products.productType', function ($query) {
                    $query->whereRaw('LOWER(type) LIKE ?', ['%bimbingan%']);
                })
                ->whereHas('products.category', function ($query) {
                    $query->whereRaw('LOWER(name) LIKE ?', ['%online%']);
                })
                ->findOrFail($order->id);

            return response()->json([
                'status' => true,
                'statusCode' => 200,
                'message' => 'Get data success',
                'data' => $order,
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'Order not found.',
            ], 404);
        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An error occurred while fetching data: ' . $e->getMessage(),
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An unexpected error occurred: ' . $e->getMessage(),
            ], 500);
        }
    }
}
