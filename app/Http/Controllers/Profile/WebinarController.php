<?php

namespace App\Http\Controllers\Profile;

use App\Enums\OrderEnum;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WebinarController extends Controller
{
    public function webinar(Request $request)
    {
        $user = Auth::user();
        $orderWebinar = Order::where('user_id', $user->id)
            ->where('status', OrderEnum::SUCCESS->value)
            ->whereHas('products.productType', function ($query) {
                $query->where('type', 'like', '%webinar%');
            })
            ->whereHas('products', function ($q) use ($request) {
                $q->when($request['status'] == 'berjalan', function ($q) {
                    $q->where('webinar_properties->start_date', '>=', Carbon::now()->format('Y-m-d'));
                });
                $q->when($request['status'] == 'selesai', function ($q) {
                    $q->where('webinar_properties->end_date', '<=', Carbon::now()->format('Y-m-d'));
                });
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
            ->with('products.category')
            ->get();
        if ($orderWebinar->isEmpty()) {
            return abort(404);
        }
        // return response()->json([
        //     'data' => $orderWebinar
        // ]);
        return Inertia::render('Auth/User/Webinar/DetailWebinar', ['orderWebinar' => $orderWebinar]);
    }
}
