<?php

namespace App\Http\Controllers\Profile;

use App\Enums\OrderEnum;
use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Course;
use App\Models\Order;
use App\Models\ProductReview;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BimbinganController extends Controller
{
    public function index()
    {
        $user = User::where('id', Auth::user()->id)->with('profile')->first();
        // dd($user);
        $orderBimbingan = Order::where('user_id', $user->id)
            ->where('status', OrderEnum::SUCCESS->value)
            ->whereHas('products.category', function ($query) {
                $query->where('name', 'like', '%dibimbing%');
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
            ->with('order', 'tutor', 'tutorNote', 'fileUploads', 'products', 'place', 'place.city', 'addOns')
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

        $cities = City::with('places')->get();
        return Inertia::render('Auth/User/Bimbingan/DetailBimbingan', [
            'courseDetail' => $course,
            'cities' => $cities,
            'date' => $counts,
        ]);
    }

    public function review(Request $request, Order $order)
    {
        $course = $order->courses()->where('session', 1)->first();
        $validate = $request->validate([
            'rate_tutor' => 'required|integer|min:1|max:5',
            'rate_product' => 'required|integer|min:1|max:5',
            'note_tutor' => 'required|string',
            'note_product' => 'required|string',
        ]);
        try {
            $data = ProductReview::create(array_merge($validate, ['course_id' => $course->id]));
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ], 500);
        }
        return response()->json([
            'message' => 'Berhasil Mengirim Review',
        ]);
    }

    public function complete(Order $order)
    {
        try {
            $courses = $order->courses()->update(['is_user' => true]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ], 500);
        }
        return response()->json([
            'message' => 'success',
        ]);
    }

    public function aturJadwal(Order $order, Request $request)
    {
        try {
            $course = $order->courses()->whereNull('date')->orderBy('session', 'asc')->first();
            $data = [
                'place_id' => $request['place_id'],
                'date' => $request['date'],
            ];

            $course->update($data);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ], 500);
        }
        return response()->json([
            'message' => 'Berhasil Mengatur Jadwal',
        ]);
    }
}
