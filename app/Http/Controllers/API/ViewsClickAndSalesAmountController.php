<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DateTime;
use DateTimeInterface;
use Exception;
use Spatie\Analytics\Period;
use Analytics;
use App\Models\User;
use Carbon\Carbon;

class ViewsClickAndSalesAmountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $startDateString = $request->input('startDate');
        $endDateString = $request->input('endDate');
        $productName = $request->input('product'); // Mengambil nama produk dari input request
        $limit = 1000;

        if ($startDateString && $endDateString) {
            try {
                $startDate = DateTime::createFromFormat('Y-m-d', $startDateString);
                $endDate = DateTime::createFromFormat('Y-m-d', $endDateString);

                if (!($startDate instanceof DateTimeInterface) || !($endDate instanceof DateTimeInterface)) {
                    throw new Exception('Invalid date format. Please use YYYY-MM-DD');
                }

                $period = Period::create($startDate, $endDate);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()], 400);
            }
        } else {
            $period = Period::months(1);
        }

        $visitorsAndPageViews = Analytics::fetchVisitorsAndPageViewsByDate($period, $limit);

        $totalClicks = 0;
        $totalViews = 0;
        $totalsByDate = [];

        foreach ($visitorsAndPageViews as $visitorData) {
            $date = $visitorData['date']->format('Y-m-d');
            $pageTitle = $visitorData['pageTitle'];

            if (!isset($totalsByDate[$date])) {
                $totalsByDate[$date] = [
                    'totalClicks' => 0,
                    'totalViews' => 0,
                ];
            }

            // Cek apakah pengguna telah memberikan input produk atau tidak
            if ($productName !== null && $productName !== '') { // Jika ada input produk dari pengguna
                if (stripos($pageTitle, 'produk') !== false) {
                    $screenPageViews = $visitorData['screenPageViews'];
                    $totalsByDate[$date]['totalViews'] += $screenPageViews;
                    $totalViews += $screenPageViews;
                }

                // Jika pageTitle sesuai dengan input pengguna, tambahkan ke totalClicks
                if (stripos($pageTitle, $productName) !== false) {
                    $screenPageViews = $visitorData['screenPageViews'];
                    $totalsByDate[$date]['totalClicks'] += $screenPageViews;
                    $totalClicks += $screenPageViews;

                    // dd($totalViews,$totalClicks, $visitorData);
                }
            } else { // Jika tidak ada input produk dari pengguna
                if (stripos($pageTitle, 'produk') !== false) {
                    $screenPageViews = $visitorData['screenPageViews'];
                    $totalsByDate[$date]['totalClicks'] += $screenPageViews;
                    $totalsByDate[$date]['totalViews'] += $screenPageViews;

                    $totalClicks += $screenPageViews;
                    $totalViews += $screenPageViews;
                }
            }
        }

        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'totalClicksKeseluruhan' => $totalClicks,
            'totalViewsKeseluruhan' => $totalViews,
            'totalsByDate' => $totalsByDate,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function userGrowth(Request $request)
    {
        $startDateString = $request->input('startDate');
        $endDateString = $request->input('endDate');

        if ($startDateString && $endDateString) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDateString)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDateString)->endOfDay();
        } else {
            $endDate = Carbon::now()->endOfDay();
            $startDate = Carbon::now()->subMonth()->startOfDay();
        }

        $totalPerDay = [];

        $currentDate = $startDate->copy();
        while ($currentDate <= $endDate) {
            $totalPerDay[$currentDate->toDateString()] = 0;
            $currentDate->addDay();
        }

        $newUsers = User::whereBetween('created_at', [$startDate, $endDate])->get();

        foreach ($newUsers as $user) {
            $date = $user->created_at->toDateString();
            $totalPerDay[$date]++;
        }

        $totalNewUsers = count($newUsers);

        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'totalNewUsers' => $totalNewUsers,
            'totalPerDay' => $totalPerDay,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
}
