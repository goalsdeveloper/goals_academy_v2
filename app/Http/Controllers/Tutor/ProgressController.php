<?php

namespace App\Http\Controllers\Tutor;

use App\Enums\CourseStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\FileUpload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProgressController extends Controller
{
    public function __construct()
    {
        // $this->middleware();
    }

    public function index(Request $request)
    {
        $user = Auth::user();
        if ($request->search) {
            $search = $request->search;
            $tutor = $user->tutor()->Where('time', 'LIKE', '%' . $search . '%')
                ->orWhere('ongoing', 'LIKE', '%' . $search . '%')
                ->orWhere('date', 'LIKE', '%' . $search . '%')
                ->orWhereHas('user', function ($q) use ($search) {
                    $q->where('username', 'LIKE', '%' . $search . '%');
                })->orWhereHas('topic', function ($q) use ($search) {
                $q->where('topic', 'LIKE', '%' . $search . '%');
            });
        }else{
            $tutor = $user->tutor()->whereHas('tutor', function ($query) {
                $query->where('ongoing', CourseStatusEnum::ONGOING->value);
            });
        }
        $tutor = $tutor->with('topic', 'products', 'user')->paginate(15);
        return response()->json([
            'bimbingan' => $tutor,
        ]);
    }

    public function tutorApprove($course)
    {
        $user = Auth::user();
        if ($course->tutor_id != $user->id) {
            return response()->json([
                'status' => 'Forbidden',
                'messages' => 'Anda Bukan Tutor untuk Bimbingan Ini',
            ], 403);
        }
        try {
            $course->is_tutor = true;
            $course->update();
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'Failed',
                'messages' => $th->getMessage(),
            ], 500);
        }
        return response()->json([
            'status' => 'Success',
            'messages' => 'Bimbingan Berhasil di Update',
        ], 200);

    }

    public function show(Request $request, Course $progress)
    {
        $order = $progress->load('order', 'addOns', 'fileUploads');
        $files = FileUpload::where('course_id', $progress->parent_id)->get();
        return response()->json([
            'order' => $order,
            'files' => $files,
        ]);
    }

}
