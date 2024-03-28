<?php

namespace App\Http\Controllers\Tutor;

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
        $topic = $request->topic;
        $username = $request->username;
        $date = $request->date;
        $time = $request->time;
        $ongoing = $request->ongoing;
        $tutor = $user->tutor();
        if ($request->search) {
            $search = $request->search;
            $tutor = $tutor->Where('time', 'LIKE', '%' . $search . '%')
                ->orWhere('ongoing', 'LIKE', '%' . $search . '%')
                ->orWhere('date', 'LIKE', '%' . $search . '%')
                ->orWhereHas('user', function ($q) use ($search) {
                    $q->where('username', 'LIKE', '%' . $search . '%');
                })->orWhereHas('topic', function ($q) use ($search) {
                $q->where('topic', 'LIKE', '%' . $search . '%');
            });
        }
        $tutor = $tutor->with(['topic' => function ($query) use ($topic) {
            $query->select(['topic', 'id']);
            if (!is_null($topic)) {
                $query->orderBy('topic', $topic);
            }
            return $query;
        }, 'user' => function ($query) use ($username) {
            $query->select(['username', 'id']);
            if (!is_null($username)) {
                $query->orderBy('username', $username);
            }
            return $query;
        }, 'products:id,name']);
        if (!is_null($date)) {
            $tutor = $tutor->orderBy('date', $date);
        }

        if ($request->time) {
            $tutor = $tutor->orderBy('time', $time);
        }

        if ($request->ongoing) {
            $tutor = $tutor->orderBy('ongoing', $ongoing);
        }
        $tutor = $tutor->paginate(15);
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
