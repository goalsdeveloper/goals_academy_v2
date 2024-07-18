<?php

namespace App\Http\Controllers\Profile;

use App\Enums\CourseStatusEnum;
use App\Enums\UserRoleEnum;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Course;
use App\Models\Order;
use App\Models\ProductReview;
use App\Models\Topic;
use App\Models\User;
use App\Notifications\GeneralCourseNotification;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BimbinganController extends Controller
{
    public function index(Request $request)
    {
        $user = User::where('id', Auth::user()->id)->with('profile')->first();
        $courses = $user->course()->whereNull('parent_id')
            ->when($request['status'] == 'berjalan', function ($q) {
                return $q->where('ongoing', CourseStatusEnum::ONGOING->value);
            })
            ->when($request['status'] == 'selesai', function ($q) {
                return $q->where('ongoing', CourseStatusEnum::SUCCESS->value);
            })
            ->orderBy('created_at', 'desc')->with('order', 'products', 'products.category')->get();
        foreach ($courses as $course) {
            if ($course->child->count() > 0 && $course->ongoing == CourseStatusEnum::SUCCESS->value) {
                foreach ($course->child as $child) {
                    if ($child->ongoing != CourseStatusEnum::SUCCESS->value) {
                        $course['progress'] = CourseStatusEnum::ONGOING->value;
                        break;
                    }
                }
                continue;
            }
            $course['progress'] = $course->ongoing;
            // dd($course['progress']);

        }
        return Inertia::render('Auth/User/Bimbingan/Bimbingan', [
            'orderBimbingan' => $courses,
        ]);
    }

    public function detailPembelajaran(string $order_id)
    {
        $user = Auth::user();
        $course = Course::whereHas('order', function (Builder $query) use ($order_id, $user) {
            $query->where('order_code', $order_id)->where('user_id', $user->id);
        })->whereHas('products.productType', function (Builder $query) {
            $query->where('type', 'like', '%bimbingan%');
        })
            ->with('order', 'tutor:id,name', 'tutorNote', 'fileUploads', 'products:id,name,slug,product_image,contact_type,active_period', 'place:id,place,city_id', 'place.city:id,city', 'addOns', 'topic:id,topic', 'productReview')
            ->get();
        if ($course->isEmpty()) {
            return abort(404);
        }

        // cek kondisi tanggal
        $endDate = Carbon::now()->addDays(7);

        $counts = Course::select('date')
            ->selectRaw('COUNT(*) as count')
            ->whereBetween('date', [Carbon::today(), $endDate])
            ->groupBy('date')
            ->havingRaw('COUNT(*) > 5')
            ->get();
        // end cek kondisi tanggal

        $topics = Topic::all();
        $cities = City::with('places')->get();
        return Inertia::render('Auth/User/Bimbingan/DetailBimbingan', [
            'courseDetail' => $course,
            'cities' => $cities,
            'date' => $counts,
            'topics' => $topics,
        ]);
    }

    public function review(Request $request, Order $order)
    {
        $course = $order->courses()->where('session', 1)->first();
        $validate = $request->validate([
            'rate_tutor' => 'integer|min:0|max:5|nullable',
            'rate_product' => 'integer|min:0|max:5|nullable',
            'note_tutor' => 'string|nullable',
            'note_product' => 'string|nullable',
        ]);
        try {
            ProductReview::create(array_merge($validate, ['course_id' => $course->id]));
        } catch (\Throwable $th) {
            return redirect()->route('user.profile.detailPembelajaran', $order->order_code)->with('message', $th->getMessage());
        }

        // dd($validate);
        // redirect()->route('user.profile.detailPembelajaran', $order->order_code)->with('message', 'Berhasil Mengirim Review');
        redirect()->back()->with('message', 'Berhasil Mengirim Review');
    }

    public function complete(Order $order)
    {
        try {
            $courses = $order->courses()->update(['is_user' => true]);
        } catch (\Throwable $th) {
            return redirect()->route('user.profile.detailPembelajaran', $order->order_code)->with('message', $th->getMessage());
        }

        redirect()->route('user.profile.detailPembelajaran', $order->order_code)->with('message', 'Berhasil Menyelesaikan Bimbingan');
    }

    public function aturJadwal(Order $order, Request $request)
    {
        try {
            $course = $order->courses()->whereNull('date')->orderBy('session', 'asc')->first();
            $data = [
                'place_id' => $request['place_id'],
                'date' => $request['date'],
                'topic_id' => $request['topic'],
            ];

            $moderators = User::where('user_role', UserRoleEnum::MODERATOR)->get();
            foreach ($moderators as $moderator) {
                $moderator->notify(new GeneralCourseNotification("User Telah set Jadwal!", "Bimbingan {$order->order_code} sesi {$course->session} telah diset oleh pengguna, yuk cek segera!", route('moderator.bimbingan.progress.edit', ['progress' => $course])));
            }
            $course->tutor->notify(new GeneralCourseNotification("User Telah set Jadwal!", "Bimbingan {$order->order_code} sesi {$course->session} telah diset oleh pengguna, yuk cek segera!", route('moderator.bimbingan.progress.edit', ['progress' => $course])));
            $course->update($data);
        } catch (\Throwable $th) {

            return redirect()->route('user.profile.detailPembelajaran', $order->order_code)->with('message', $th->getMessage());
        }

        return redirect()->route('user.profile.detailPembelajaran', $order->order_code)->with('message', 'Berhasil Mengatur Jadwal');
    }
}
