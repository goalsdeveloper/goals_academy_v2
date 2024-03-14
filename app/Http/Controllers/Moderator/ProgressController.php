<?php

namespace App\Http\Controllers\Moderator;

use App\Models\Course;
use App\Http\Controllers\Controller;
use App\Models\FileUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProgressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $course = Course::whereNull('parent_id')->with('child')->orderBy('id')->get();
        return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data course success', 'data' => $course], 200);
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
    public function show(Course $progress)
    {
        $progress_user = Course::with('user.profile', 'products', 'fileUploads', 'productReview')->findOrFail($progress->id);
        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'get data success',
            'data' => $progress_user,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $progress)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $progress)
    {

        if ($progress->ongoing == "selesai") {
        }

        $validateData = $request->validate([
            'tutor_id' => 'required|numeric',
            'location' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'record' => 'mimes:pdf'
        ]);
        $progress->update($validateData);

        if ($request->hasFile('record')) {
            $file = $request->file('record');

            $filePath = $file->store('resource/file/moderator');

            $fileUpload = new FileUpload();
            $fileUpload->filename = $file->getClientOriginalName();
            $fileUpload->slug  = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $fileUpload->mime_type  = $file->getClientMimeType();
            $fileUpload->file_path  = $filePath;
            $fileUpload->size = $file->getSize();
            $fileUpload->user_id = Auth::user()->id;

            $fileUpload->save();
        }


        return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'Update progress berhasil'], 200);






        // if ($progress->ongoing == "selesai") {
        //     return response()->json(['status' => false, 'statusCode' => 400, 'message' => 'Tidak dapat memperbarui kursus yang sudah selesai'], 400);
        // }

        // $validateData = $request->validate([
        //     'tutor_id' => 'required|numeric',
        //     'location' => 'required|string',
        //     'date' => 'required|date',
        //     'time' => 'required|date_format:H:i',
        //     'record' => 'mimes:pdf'
        // ]);

        // $progress->update($validateData);
        // $childCourses = Course::where('parent_id', $progress->id)->get();
        // foreach ($childCourses as $childCourse) {
        //     if ($childCourse->ongoing == "selesai") {
        //     } else {
        //         $childCourse->update([
        //             'tutor_id' => $validateData['tutor_id'],
        //             'location' => $validateData['location'],
        //             'date' => $validateData['date'],
        //             'time' => $validateData['time'],
        //         ]);
        //     }
        // }

        // if ($request->hasFile('record')) {
        //     $file = $request->file('record');

        //     $filePath = $file->store('resource/file/moderator');

        //     $fileUpload = new FileUpload();
        //     $fileUpload->filename = $file->getClientOriginalName();
        //     $fileUpload->slug  = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        //     $fileUpload->mime_type  = $file->getClientMimeType();
        //     $fileUpload->file_path  = $filePath;
        //     $fileUpload->size = $file->getSize();
        //     $fileUpload->user_id = Auth::user()->id;

        //     $fileUpload->save();
        // }

        // return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'Update progress berhasil'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $progress)
    {
        //
    }
}
