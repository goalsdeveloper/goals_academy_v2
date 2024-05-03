<?php

namespace App\Http\Controllers\Tutor;

use App\Enums\CourseStatusEnum;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OverviewController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $base_course = $user->tutor();
        $product_types = $user->tutor()
            ->selectRaw('categories.name ,COUNT(*) as jumlah')
            ->join('products', 'products.id', '=', 'courses.products_id')
            ->join('categories', 'categories.id', '=', 'products.category_id')
            ->groupBy('categories.id')->get();
        $total_bimbingan = $user->tutor()
            ->selectRaw('categories.name, COUNT(*) as order_count')
            ->join('products', 'products.id', '=', 'courses.products_id')
            ->join('categories', 'categories.id', '=', 'products.category_id')
            ->groupBy('categories.id')->limit(4)->get();
        $history = $user->tutor()->orderBy('date', 'desc')->where('ongoing', CourseStatusEnum::SUCCESS)->limit(5)->with('user:id,name', 'order.products:id,name', 'order:id,order_code,products_id')->get();
        // dd($history);
        return Inertia::render('Auth/Tutor/Overview/Overview', [
            'product_types' => $product_types,
            'total_bimbingan' => $total_bimbingan,
            'history' => $history,
        ]);
    }
}
