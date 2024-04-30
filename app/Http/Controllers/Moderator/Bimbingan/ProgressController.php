<?php

namespace App\Http\Controllers\Moderator\Bimbingan;

use Exception;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Course;
use App\Models\FileUpload;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Str;

class ProgressController extends Controller
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

                $query = Order::with(['user:id,username', 'products:id,product_type_id,category_id', 'products.category:id,name', 'products.productType:id,type', 'course:id,order_id,is_user,is_tutor,is_moderator,date,time,location,ongoing,session', 'course.child:id,parent_id,order_id,is_user,is_tutor,is_moderator,date,time,location,ongoing,session'])
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

                return Inertia::render('Auth/Moderator/Bimbingan/Progress', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'Get data history success',
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
        } catch (Exception $e) {
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

    // $progress diambil dari course id bukan order id
    public function show(Course $progress)
    {
        try {
            if (Auth::user()->user_role == "moderator") {
                $progress_user = Course::with('user:id,username', 'user.profile:id,user_id,university,major,phone_number,faculty', 'tutor:id,name', 'topic:id,topic', 'place.city', 'order:id,order_code', 'products:id,name', 'fileUploads', 'productReview')->findOrFail($progress->id);
                // return response()->json([
                //     'status' => true,
                //     'statusCode' => 200,
                //     'message' => 'Get data success',
                //     'data' => $progress_user,
                // ], 200);

                return Inertia::render('Auth/Moderator/Bimbingan/Progress/View', [
                    'progress' => $progress_user,
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
    public function edit(Course $progress)
    {
        $tutors = User::with('profile')->where("user_role", "tutor")->get();
        $progress->load('user.profile', 'order', 'products', 'topic', "productReview", "addOns");
        return Inertia::render('Auth/Moderator/Bimbingan/Progress/Edit', [
            'progress' => $progress,
            'tutors' => $tutors
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $progress)
    {
        try {
            if (Auth::user()->user_role == "moderator") {
                if ($progress->ongoing == "selesai") {
                    return response()->json(['status' => false, 'statusCode' => 403, 'message' => 'Progress sudah selesai dan tidak dapat diubah'], 403);
                }

                $validateData = $request->validate([
                    'tutor_id' => 'required|numeric',
                    'location' => 'required|string',
                    'date' => 'required|date',
                    'time' => 'required|date_format:H:i',
                    'record' => 'mimes:pdf',
                    'is_moderator' => 'in:0,1',
                ]);
                $progress->update($validateData);

                if ($request->hasFile('record')) {
                    $uploadedFile = $request->file('record');

                    $fileName = Str::random(8) . '-' . time() . '.' . $uploadedFile->getClientOriginalExtension();
                    $filePath = Storage::putFileAs('file_uploads/record', $uploadedFile, $fileName);

                    $file = new FileUpload();

                    $file->course_id  = $progress->id;
                    $file->user_id = Auth::user()->id;
                    $file->path  = $filePath;
                    $file->filename = $fileName;
                    $file->size = $uploadedFile->getSize();
                    $file->slug = Str::slug(pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME));
                    $file->mime_type = $uploadedFile->getMimeType();
                    $file->name = $uploadedFile->getClientOriginalName();
                    $file->save();


                    // $fileUpload = new FileUpload();
                    // $fileUpload->filename = $file->getClientOriginalName();
                    // $fileUpload->slug  = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                    // $fileUpload->mime_type  = $file->getClientMimeType();
                    // $fileUpload->file_path  = $filePath;
                    // $fileUpload->size = $file->getSize();
                    // $fileUpload->user_id = Auth::user()->id;
                    // $fileUpload->save();
                }

                // return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'Update progress berhasil'], 200);
                return redirect()->route("moderator.bimbingan.progress.index")->with('success', 'Update progress berhasil');
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
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 403,
                'message' => $e->getMessage(),
            ], 403);
        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An error occurred while updating progress: ' . $e->getMessage(),
            ], 500);
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
    public function destroy(Course $progress)
    {
        //
    }

    public function confirmBimbingan(Course $progress)
    {
        try {
            if (Auth::user()->user_role == "moderator") {
                if ($progress->ongoing == "selesai") {
                    // return response()->json(['status' => false, 'statusCode' => 403, 'message' => 'Progress sudah selesai dan tidak dapat diubah'], 403);
                    return redirect()->back()->with('error', 'Progress sudah selesai dan tidak dapat diubah');
                }

                $validateData = request()->validate([
                    'duration_per_meet' => 'required|numeric',
                ]);

                $progress->update(array_merge($validateData, ['ongoing' => 'selesai']));
                // return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'Progress berhasil diperbarui menjadi selesai'], 200);
                return redirect()->back()->with('success', 'Progress berhasil diperbarui menjadi selesai');
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
        } catch (AuthorizationException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 403,
                'message' => $e->getMessage(),
            ], 403);
        } catch (QueryException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An error occurred while updating progress: ' . $e->getMessage(),
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
