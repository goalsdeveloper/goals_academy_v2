<?php

namespace App\Http\Controllers\Moderator\Bimbingan;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Order;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Support\Facades\Auth;


class ModeratorOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if (Auth::user()->user_role == "moderator") {
                $perPage = $request->input('perPage', 10);
                $search = $request->input('search');

                $query = Order::with(['user:id,name', 'products:id,product_type_id,category_id', 'products.category:id,name', 'products.productType:id,type', 'course:id,products_id,order_id,tutor_id,place_id,topic_id,date,time,location', 'course.place.city'])
                    ->whereHas('products', function ($query) {
                        $query->whereHas('productType', function ($subQuery) {
                            $subQuery->where('type', 'LIKE', '%bimbingan%');
                        });
                    })
                    ->where('status', 'Success');

                if ($search) {
                    $query->whereHas('user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'LIKE', "%$search%");
                    });
                }

                $orders = $query->paginate($perPage);

                return response()->json([
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data history success',
                    'data' => [
                        'recent_order' => $orders,
                    ],
                ], 200);
            } else {
                abort(403);
            }
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
            if (Auth::user()->user_role == "moderator") {
                $order = Order::with('user:id,name', 'user.profile:user_id,phone_number,university,faculty,major', 'products:id,name', 'course:id,products_id,order_id,tutor_id,topic_id,date,time,place_id', 'course.place.city', 'course.tutor:id,name')
                    ->whereHas('products.productType', function ($query) {
                        $query->whereRaw('LOWER(type) LIKE ?', ['%bimbingan%']);
                    })
                    ->whereHas('products.category', function ($query) {
                        $query->whereRaw('LOWER(name) LIKE ?', ['%offline%']);
                    })
                    ->findOrFail($order->id);

                return response()->json([
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'data' => $order,
                ], 200);
            } else {
                abort(403);
            }
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    // $order diambil dari course id(perhatikan name model)
    public function update(Request $request, Course $order)
    {
        try {
            if (Auth::user()->user_role == "moderator") {
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
                    'message' => 'Update course success'
                ], 200);
            } else {
                abort(403);
            }
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
    public function updateBimbinganOnline(Request $request, Course $order)
    {
        try {
            if (Auth::user()->user_role == "moderator") {
                $validateData = $request->validate([
                    'tutor_id' => 'numeric',
                    'date' => 'date',
                    'time' => 'date_format:H:i',
                    'location' => 'string',
                ]);

                $order->update($validateData);

                return response()->json([
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'Update data success'
                ], 200);
            } else {
                abort(403);
            }
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
            if (Auth::user()->user_role == "moderator") {
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
            } else {
                abort(403);
            }
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
