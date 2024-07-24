<?php

namespace App\Http\Controllers;

use App\Enums\CourseStatusEnum;
use App\Enums\OrderEnum;
use App\Models\City;
use App\Models\Course;
use App\Models\Order;
use App\Models\User;
use Carbon\Carbon;
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
        return Inertia::render('Auth/User/Bimbingan/Bimbingan', [
            'orderBimbingan' => $orderBimbingan,
        ]);
    }


}
