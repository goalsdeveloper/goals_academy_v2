<?php

namespace App\Http\Controllers\Tutor;

use App\Enums\CourseStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Revenue;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OverviewController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $base_course = $user->tutor();
        $product_types = $user->tutor()
            ->selectRaw('categories.name, COUNT(*) as jumlah')
            ->join('products', 'products.id', '=', 'courses.products_id')
            ->join('categories', 'categories.id', '=', 'products.category_id')
            ->groupBy('categories.id', 'categories.name')->get();
        $total_bimbingan = $user->tutor()
            ->selectRaw('categories.name, COUNT(*) as order_count')
            ->join('products', 'products.id', '=', 'courses.products_id')
            ->join('categories', 'categories.id', '=', 'products.category_id')
            ->groupBy('categories.id', 'categories.name')->limit(4)->get();
        $history = $user->tutor()->orderBy('date', 'desc')->where('ongoing', CourseStatusEnum::SUCCESS)->limit(5)->with('user:id,name', 'order.products:id,name', 'order:id,order_code,products_id')->get();
        $total_earnings = $user->revenue->sum('amount');
        $earnings = $user->revenue()->where('category', 'pemasukan')->select('created_at as date', 'amount as total')->get();

        $today_earnings = Revenue::where('tutor_id', $user->id)->where('category', 'pemasukan')->whereDate('created_at', Carbon::now())->sum('amount');
        $yesterday_earnings = Revenue::where('tutor_id', $user->id)->where('category', 'pemasukan')->whereDate('created_at', Carbon::yesterday())->sum('amount');
        $current_month_earnings = Revenue::where('tutor_id', $user->id)->where('category', 'pemasukan')->whereMonth('created_at', Carbon::now()->month)->sum('amount');
        $progress_today = $user->tutor()->where('ongoing', CourseStatusEnum::ONGOING)->whereNotNull('date')->whereDate('created_at', Carbon::now())->count();
        $progress_yesterday = $user->tutor()->whereIn('ongoing', [CourseStatusEnum::ONGOING, CourseStatusEnum::SUCCESS ])->whereDate('updated_at', Carbon::yesterday())->count();
        return Inertia::render('Auth/Tutor/Overview/Overview', [
            'product_types' => $product_types,
            'total_bimbingan' => $total_bimbingan,
            'history' => $history,
            'total_earnings' => $total_earnings,
            'earnings' => $earnings,
            'yesterday_earnings' => $yesterday_earnings,
            'today_earnings' => $today_earnings,
            'current_month_earnings' => $current_month_earnings,
            'progress_yesterday' => $progress_yesterday,
            'progress_today' => $progress_today,
        ]);
    }
}
