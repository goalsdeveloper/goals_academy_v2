<?php

namespace App\Http\Controllers\Moderator\Bimbingan;

use App\Enums\CourseStatusEnum;
use App\Enums\UserRoleEnum;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Order;
use App\Models\Place;
use App\Models\User;
use App\Notifications\GeneralCourseNotification;
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
            // $search = $request->input('search');
            // $perPage = $request->input('perPage', 25);

            // $query = Order::with([
            //     'user:id,username',
            //     'products:id,product_type_id,category_id,name,total_meet,contact_type',
            //     'products.category:id,name',
            //     'products.productType:id,type',
            //     'course:id,order_id,is_user,is_tutor,is_moderator,date,time,location,ongoing,session,tutor_id,place_id',
            //     'course.child:id,parent_id,order_id,is_user,is_tutor,is_moderator,date,time,location,ongoing,session',
            //     'course.tutor',
            //     'course.place',
            //     'course.place.city'
            // ])
            //     ->whereHas('products', function ($query) {
            //         $query->whereHas('productType', function ($subQuery) {
            //             $subQuery->where('type', 'LIKE', '%bimbingan%');
            //         });
            //     })
            //     ->whereHas('course', function ($courseQuery) {
            //         $courseQuery->where('ongoing', CourseStatusEnum::WAITING);
            //     })
            //     ->where('status', 'Success');

            // if ($search) {
            //     $query->whereHas('user', function ($userQuery) use ($search) {
            //         $userQuery->where('name', 'LIKE', "%$search%");
            //     });
            // }

            // $query->orderBy('created_at', 'asc');
            // $orders = $query->paginate($perPage);

            // $orders->transform(function ($order) {
            //     $totalFields = 4;
            //     $completeFields = 0;
            //     $course = $order->course;
            //     if ($course->place_id) {
            //         $completeFields++;
            //     }

            //     if ($course->date) {
            //         $completeFields++;
            //     }

            //     if ($course->time) {
            //         $completeFields++;
            //     }

            //     if ($course->tutor_id) {
            //         $completeFields++;
            //     }

            //     $order->completeness_percentage = ($completeFields / $totalFields) * 100;
            //     return $order;
            // });

            return Inertia::render('Auth/Moderator/Bimbingan/RecentOrder', [
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data history success',
                'orders' =>
                function () use ($request) {
                    $search = $request->input('search');
                    $perPage = (int) $request->input('perPage', 25);

                    $query = Order::with([
                        'user:id,username',
                        'user.profile',
                        'products:id,product_type_id,category_id,name,total_meet,contact_type',
                        'products.category:id,name',
                        'products.productType:id,type',
                        'course:id,order_id,is_user,is_tutor,is_moderator,date,time,location,ongoing,session,tutor_id,place_id,topic_id',
                        'course.child:id,parent_id,order_id,is_user,is_tutor,is_moderator,date,time,location,ongoing,session',
                        'course.tutor',
                        'course.place',
                        'course.place.city',
                        'course.topic'
                    ])
                        ->whereHas('products', function ($query) {
                            $query->whereHas('productType', function ($subQuery) {
                                $subQuery->where('type', 'LIKE', '%bimbingan%');
                            });
                        })
                        ->whereHas('course', function ($courseQuery) {
                            $courseQuery->where('ongoing', CourseStatusEnum::WAITING);
                        })
                        ->where('status', 'Success');

                    if ($search) {
                        // $query->whereHas('user', function ($userQuery) use ($search) {
                        //     $userQuery->where('name', 'LIKE', "%$search%");
                        // });

                        $query->where(function ($query) use ($search) {
                            $query->where('order_code', 'LIKE', "%$search%")
                                ->orWhere('status', 'LIKE', "%$search%")
                                ->orWhereHas('user', function ($userQuery) use ($search) {
                                    $userQuery->where('name', 'LIKE', "%$search%");
                                })
                                ->orWhereHas('products', function ($productQuery) use ($search) {
                                    $productQuery->where('name', 'LIKE', "%$search%");
                                });
                        });
                    }

                    $query->orderBy('created_at', 'asc');
                    $orders = $query->paginate($perPage);

                    $orders->transform(function ($order) {
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
                    return $orders;
                },
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
            $order = $order->load('products', 'user', 'user.profile', 'course.place', 'course.tutor', 'course.tutor.profile', 'course.topic', 'course.fileUploads');
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
            'order' => $order->load('products', 'user', 'user.profile', 'course.place', 'course.place.city', 'course.tutor', 'course.tutor.profile', 'course.topic', 'course.fileUploads'),
            'places' => fn () => Place::with('city')->get(),
            'tutors' => fn () => User::where('user_role', UserRoleEnum::TUTOR)->with('profile')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */

    // $order diambil dari course id(perhatikan name model)
    public function update(Request $request, Order $order)
    {
        try {
            $order = $order->load('products');

            if ($order->products->total_meet > 1) {
                $validateData = $request->validate([
                    'tutor_id' => 'numeric',
                ]);
                $order->course()->update(array_merge($validateData, ['ongoing' => CourseStatusEnum::ONGOING]));
            } else {
                if ($order->products->contact_type == "online") {
                    $validateData = $request->validate([
                        'tutor_id' => 'numeric',
                        'location' => 'string',
                        'date' => 'date',
                        'time' => 'date_format:H:i',
                    ]);
                    $order->course()->update(array_merge($validateData, ['ongoing' => CourseStatusEnum::ONGOING]));
                }
                if ($order->products->contact_type == "offline") {
                    $validateData = $request->validate([
                        'tutor_id' => 'numeric',
                        'place_id' => 'numeric',
                        'date' => 'date',
                        'time' => 'date_format:H:i',
                    ]);
                    $order->course()->update(array_merge($validateData, ['ongoing' => CourseStatusEnum::ONGOING]));
                }
                if ($order->products->contact_type == "hybrid") {
                    $validateData = $request->validate([
                        'tutor_id' => 'numeric',
                        'place_id' => 'numeric',
                        'location' => 'string',
                        'date' => 'date',
                        'time' => 'date_format:H:i',
                    ]);
                    $order->course()->update(array_merge($validateData, ['ongoing' => CourseStatusEnum::ONGOING]));
                }
                if ($order->products->contact_type == "other") {
                    $validateData = $request->validate([
                        'tutor_id' => 'numeric',
                    ]);
                    $order->course()->update(array_merge($validateData, ['ongoing' => CourseStatusEnum::ONGOING]));
                }
                // $validateData = $request->validate([
                //     'tutor_id' => 'numeric',
                //     'date' => 'date',
                //     'time' => 'date_format:H:i',
                //     'place_id' => 'numeric',
                // ]);
                // $parent = Course::find($order->course->id);
                // $parent->update(array_merge($validateData, ['ongoing' => CourseStatusEnum::ONGOING]));
            }

            $order->user->notify(new GeneralCourseNotification("Tutor Sudah Ditemukan!", "Bimbingan {$order->order_code} terdapat update, yuk cek segera!", route('user.profile.detailPembelajaran', ['order_id' => $order->order_code])));
            $order->course->tutor->notify(new GeneralCourseNotification("Bimbingan Baru Tersedia", "Terdapat bimbingan baru dengan kode {$order->order_code}, cek sekarang!", route('tutor.bimbingan.progress.edit', ['progress' => $order->order_code])));

            return redirect()->route('moderator.bimbingan.index');
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
