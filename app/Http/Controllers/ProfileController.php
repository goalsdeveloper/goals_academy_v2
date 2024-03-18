<?php

namespace App\Http\Controllers;

use App\Enums\CourseStatusEnum;
use App\Enums\OrderEnum;
use App\Models\Course;
use App\Models\Order;
use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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
        // dd($orderBimbingan);
        return response()->json([
            'data' => $orderBimbingan,
        ]);
        return Inertia::render('Auth/User/Bimbingan/Bimbingan', [
            'orderBimbingan' => $orderBimbingan,
        ]);
    }

    public function bimbingan(Request $request)
    {
        $user = Auth::user();
        $orderBimbingan = Order::where('user_id', $user->id)
            ->where('status', OrderEnum::SUCCESS->value)
            ->whereHas('products.category', function ($query) {
                $query->where('name', 'like', '%dibimbing%');
            })->whereHas('course', function ($query) use ($request) {
            $query->where('ongoing', CourseStatusEnum::ONGOING->value);
            switch ($request['status']) {
                case 'selesai':
                    $query->where('ongoing', CourseStatusEnum::SUCCESS->value);
                    break;
                case 'berjalan':
                    $query->where('ongoing', CourseStatusEnum::ONGOING->value);
                    break;
            }
        })->with('products.category', 'course', 'products')
            ->get();
        dd($orderBimbingan);
        return Inertia::render('Auth/User/Bimbingan/Bimbingan', [
            'orderBimbingan' => $orderBimbingan,
        ]);
    }

    public function webinar()
    {
        $user = Auth::user();
        $orderWebinar = Order::where('user_id', $user->id)
            ->where('status', OrderEnum::SUCCESS->value)
            ->whereHas('products.productType', function ($query) {
                $query->where('type', 'like', '%webinar%');
            })
            ->with('products.category', 'course')
            ->get();
        return Inertia::render('Auth/User/Webinar/Webinar', [
            'orderWebinar' => $orderWebinar,
        ]);
    }

    public function detailWebinar()
    {
        $user = Auth::user();
        $orderWebinar = Order::where('user_id', $user->id)
            ->where('status', OrderEnum::SUCCESS->value)
            ->whereHas('products.category', function ($query) {
                $query->where('name', 'like', '%webinar%');
            })
            ->with('products.category', 'course')
            ->get();
        if ($orderWebinar->isEmpty()) {
            return abort(404);
        }
        return Inertia::render('Auth/User/Webinar/DetailWebinar', ['orderWebinar' => $orderWebinar]);
    }

    public function detailPembelajaran(string $id)
    {
        $user = Auth::user();
        $course = Course::whereHas('order', function (Builder $query) use ($id, $user) {
            $query->where('order_code', $id)->where('user_id', $user->id);
        })->whereHas('products.productType', function (Builder $query) {
            $query->where('type', 'like', '%bimbingan%');
        })
            ->with('order', 'tutor', 'tutorNote', 'fileUploads', 'products')
            ->get();
        if ($course->isEmpty()) {
            return abort(404);
        }
        return Inertia::render('Auth/User/Bimbingan/DetailBimbingan', [
            'courseDetail' => $course,
        ]);
    }

    public function riwayatTransaksi(Request $request)
    {
        $user = Auth::user();
        $order = Order::where('user_id', $user->id);
        switch ($request['status']) {
            case 'pending':
                $order = $order->where('status', OrderEnum::PENDING->value);
                break;
            case 'selesai':
                $order = $order->where('status', OrderEnum::SUCCESS->value);
                break;
            case 'gagal':
                $order = $order->where('status', OrderEnum::FAILED->value);
                break;
            case 'cancel':
                $order = $order->where('status', OrderEnum::CANCEL->value);
                break;
        }
        $order = $order->with('orderHistory', 'paymentMethod', 'products')->get();
        // dd($order);
        return Inertia::render('Auth/User/RiwayatTransaksi/RiwayatTransaksi', [
            'dataOrder' => $order,
        ]);
    }

    public function aturJadwal(Request $request)
    {
        $course = Course::find($request['course_id']);
        $form_result = $course->order->form_result;
    }
}
