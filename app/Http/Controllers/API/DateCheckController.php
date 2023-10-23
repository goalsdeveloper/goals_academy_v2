<?php

namespace App\Http\Controllers\API;

use Carbon\Carbon;
use App\Models\Course;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DateCheckController extends Controller
{
    public function dateCheck()
    {
        $endDate = Carbon::today()->addDays(7);
        $counts = Course::select('date')
            ->selectRaw('COUNT(*) as count')
            ->whereBetween('date', [Carbon::today(), $endDate])
            ->groupBy('date')
            ->havingRaw('COUNT(*) > 5')
            ->get();
        // end cek kondisi tanggal

        return response()->json(['data' => $counts]);
    }
}
