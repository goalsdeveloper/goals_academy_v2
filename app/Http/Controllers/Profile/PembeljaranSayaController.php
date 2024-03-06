<?php

namespace App\Http\Controllers\Profile;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Database\Eloquent\Builder;

class PembeljaranSayaController extends Controller
{
    public function index(string $order_code)
    {
        $data = Order::where('order_code', $order_code)
            ->with('user.profile', 'products', 'course.fileUploads', 'paymentMethod', 'orderHistory')
            ->first();
        return Inertia::render('Auth/User/DetailPesanan', [
            'dataDetail' => $data,
        ]);
    }

    public function detailPembelajaran(string $id)
    {
        $course = Course::whereHas('order', function (Builder $query) use ($id) {
            $query->where('order_code', $id);
        })
            ->with('order', 'tutor', 'tutorNote', 'fileUploads', 'products')
            ->get();
        // dd($course);
        return Inertia::render('Auth/User/Bimbingan/DetailBimbinganLayout', [
            'courseDetail' => $course,
        ]);
    }
}
