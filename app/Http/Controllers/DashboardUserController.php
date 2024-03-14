<?php

namespace App\Http\Controllers;

use App\Enums\CourseStatusEnum;
use App\Models\Course;
use App\Models\ProductType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardUserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function bimbingan(Request $req)
    {
        $user = Auth::user();
        $bimbinganType = ProductType::where('type', 'like', '%bimbingan%')->pluck('id');
        $bimbingan = $user->course->whereIn('products.product_type_id', $bimbinganType)->whereNull('parent_id');
        switch ($req['status']) {
            case 'berjalan':
                $bimbingan = $bimbingan->where('ongoing', CourseStatusEnum::ONGOING->value);
                break;
            case 'selesai':
                $bimbingan = $bimbingan->where('ongoing', CourseStatusEnum::SUCCESS->value);
                break;
            default:
                $bimbingan = $bimbingan;
                break;
        }
        $bimbingan->map(function ($item) {
            $item['products'] = $item->products;
            return $item;
        });
        return response()->json([
            'bimbingan' => $bimbingan,
        ]);
    }

    public function detailBimbingan($id)
    {
        $user = Auth::user();
        $bimbingan = $user->course->find($id)->where(function ($query) use ($id) {
            $query->where('id', $id)->orWhere('parent_id', $id);
        })->get();
        return response()->json([
            'detail_bimbingan' => $bimbingan,
        ]);
    }

    public function webinar()
    {
        $user = Auth::user();
        $webinarType = ProductType::where('type', 'like', '%webinar%')->pluck('id');
        $webinars = Course::whereHas('products', function ($query) use ($webinarType, $user) {
            $query->whereIn('product_type_id', $webinarType)->where('user_id', $user->id);
        })->get();
        return response()->json([
            'webinars' => $webinars,
        ]);
    }

    public function detailWebinar($id)
    {
        $user = Auth::user();
        $webinarType = ProductType::where('type', 'like', '%webinar%')->pluck('id');
        $detailWebinar = $user->course->find($id)->whereHas('products', function ($query) use ($id, $webinarType) {
            $query->whereIn('product_type_id', $webinarType);
        })->first();
        return response()->json([
            'detail_webinar' => $detailWebinar,
        ]);
    }
}
