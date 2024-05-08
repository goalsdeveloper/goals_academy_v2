<?php

namespace App\Http\Controllers\Tutor;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Auth/Tutor/Bimbingan/History', [
            'history' => function () use ($request){
                $user = Auth::user();
                $paginate = $request->paginate ?? 10;
                $history = $user->tutor()->whereHas('tutor', function ($query) {
                    $query->where('is_tutor', true);
                });
                $search = $request->search;
                $history = $history->when($search, function ($q) use ($search) {
                    $q->where(function ($q) use ($search) {
                        $q->whereHas('user', function ($q) use ($search) {
                            $q->where('name', 'LIKE', "%$search%");
                        })->orWhereHas('products', function ($q) use ($search) {
                            $q->where('name', 'LIKE', "%$search%");
                        })->orWhereHas('place', function ($q) use ($search) {
                            $q->where('place', 'LIKE', "%$search%");
                        })
                            ->orWhere('date', 'LIKE', "%$search%")
                            ->orWhere('time', 'LIKE', "%$search%");
                    });
                })->with('user:id,name', 'products:id,name', 'place:id,place')->paginate($paginate);
                return $history;
            },
        ]);
    }

    public function show(Course $history)
    {
        $course = $history->load('order', 'order.productReview', 'addOns', 'fileUploads', 'user', 'user.profile', 'topic');
        // $files = FileUpload::where('course_id', $history->parent_id)->get();
        return Inertia::render('Auth/Tutor/Bimbingan/History/Show', [
            'course' => $course,
            // 'files' => $files,
        ]);
    }
}
