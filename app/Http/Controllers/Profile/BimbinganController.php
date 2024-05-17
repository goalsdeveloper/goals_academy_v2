<?php

namespace App\Http\Controllers\Profile;

use App\Enums\CourseStatusEnum;
use App\Enums\OrderEnum;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Course;
use App\Models\Order;
use App\Models\ProductReview;
use App\Models\Topic;
use App\Models\User;
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
        // dd($user);
        $orderBimbingan = Order::where('user_id', $user->id)
            ->where('status', OrderEnum::SUCCESS->value)
            ->whereHas('products.category', function ($query) {
                $query->where('name', 'like', '%dibimbing%');
            })
            ->whereHas('course', function ($q) use ($request) {
                $q->when($request['status'] == 'berjalan', function ($q) {
                    return $q->where('ongoing', CourseStatusEnum::ONGOING->value);
                });
                $q->when($request['status'] == 'selesai', function ($q) {
                    return $q->where('ongoing', CourseStatusEnum::SUCCESS->value);
                });
            })
            ->with('products.category', 'course')
            ->get();
        return Inertia::render('Auth/User/Bimbingan/Bimbingan', [
            'orderBimbingan' => $orderBimbingan,
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
            ->with('order', 'tutor:id,name', 'tutorNote', 'fileUploads', 'products:id,name,slug,product_image', 'place:id,place', 'place.city:id,city', 'addOns', 'topic:id,topic')
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
            'rate_tutor' => 'integer|min:1|max:5',
            'rate_product' => 'integer|min:1|max:5',
            'note_tutor' => 'string',
            'note_product' => 'string',
        ]);
        try {
            ProductReview::create(array_merge($validate, ['course_id' => $course->id]));
        } catch (\Throwable $th) {
            // return response()->json([
            //     'message' => $th->getMessage(),
            // ], 500);
            return redirect()->route('user.profile.detailPembelajaran', $order->order_code)->with('message', $th->getMessage());
        }
        // return response()->json([
        //     'message' => 'Berhasil Mengirim Review',
        // ]);

        redirect()->route('user.profile.detailPembelajaran', $order->order_code)->with('message', 'Berhasil Mengirim Review');
    }

    public function complete(Order $order)
    {
        try {
            $courses = $order->courses()->update(['ongoing' => CourseStatusEnum::SUCCESS->value]);
        } catch (\Throwable $th) {
            // return response()->json([
            //     'message' => $th->getMessage(),
            // ], 500);
            return redirect()->route('user.profile.detailPembelajaran', $order->order_code)->with('message', $th->getMessage());
        }
        // return response()->json([
        //     'message' => 'success',
        // ]);

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

            $course->update($data);
        } catch (\Throwable $th) {

            return redirect()->route('user.profile.detailPembelajaran', $order->order_code)->with('message', $th->getMessage());
        }

        return redirect()->route('user.profile.detailPembelajaran', $order->order_code)->with('message', 'Berhasil Mengatur Jadwal');
    }
}
