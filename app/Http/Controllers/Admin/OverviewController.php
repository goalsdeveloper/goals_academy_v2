<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Products;
use DateTime;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\Period;

class OverviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $startDateString = $request->input('startDate');
                $endDateString = $request->input('endDate');
                if (!$startDateString && !$endDateString) {
                    $oneMonthAgo = now()->subMonth();

                    $order =  Order::where('created_at', '>=', $oneMonthAgo)
                        ->orderBy('created_at', 'desc')
                        ->with(['user:id,username,name', 'products:id,product_type_id,category_id,name', 'products.category:id,name', 'products.productType:id,type'])
                        ->get();

                    $topSellingProducts = Products::select('products.id', 'products.name', \DB::raw('COUNT(CASE WHEN orders.status = "Success" THEN orders.id END) as order_count'))
                        ->leftJoin('orders', 'products.id', '=', 'orders.products_id')
                        ->where('orders.created_at', '>=', $oneMonthAgo)
                        ->groupBy('products.id', 'products.name')
                        ->orderByDesc('order_count')
                        ->take(5)
                        ->get();

                    $totalOrder = Order::where('status', '=', 'Success')
                        ->where('created_at', '>=', $oneMonthAgo)
                        ->count();

                    $totalCheckout = Order::where('created_at', '>=', $oneMonthAgo)
                        ->count();

                    $totalEarning = (int)Order::where('status', '=', 'Success')
                        ->where('created_at', '>=', $oneMonthAgo)
                        ->sum('unit_price');


                    $limit = 1000;
                    $period = Period::months(1);
                    $visitorsAndPageViews = Analytics::fetchVisitorsAndPageViewsByDate($period, $limit);


                    $totalClicks = 0;
                    foreach ($visitorsAndPageViews as $visitorData) {
                        $screenPageViews = $visitorData['screenPageViews'];
                        $totalClicks += $screenPageViews;
                    }


                    $totalViews = 0;
                    foreach ($visitorsAndPageViews as $visitorData) {
                        $pageTitle = $visitorData['pageTitle'];
                        $screenPageViews = $visitorData['screenPageViews'];


                        if (stripos($pageTitle, 'Goals Academy') !== false) {
                            $totalViews += $screenPageViews;
                        }
                    }


                    // Inisialisasi array untuk menyimpan total klik dan total tampilan per tanggal
                    $totalsByDate = [];


                    foreach ($visitorsAndPageViews as $visitorData) {
                        $date = $visitorData['date']->format('Y-m-d');


                        if (!isset($totalsByDate[$date])) {
                            $totalsByDate[$date] = [
                                'totalClicks' => 0,
                                'totalViews' => 0,
                            ];
                        }

                        // Hitung total click dan total view untuk setiap data
                        $screenPageViews = $visitorData['screenPageViews'];
                        $totalsByDate[$date]['totalClicks'] += $screenPageViews;

                        $pageTitle = $visitorData['pageTitle'];
                        if (stripos($pageTitle, 'Goals Academy') !== false) {
                            $totalsByDate[$date]['totalViews'] += $screenPageViews;
                        }
                    }



                    return response()->json([
                        'status' => true,
                        'statusCode' => 200,
                        'total_earning' => $totalEarning,
                        'total_order' => $totalOrder,
                        'total_checkout' => $totalCheckout,
                        'list_orders' => $order,
                        "top_selling" => $topSellingProducts,
                        'totalClicksKeseluruhan' => $totalClicks,
                        'totalViewsKeseluruhan' => $totalViews,
                        'totalsByDate' => $totalsByDate,
                    ], 200);
                } else {
                    $order = Order::query()
                        ->whereBetween('created_at', [$startDateString, $endDateString])
                        ->orderBy('created_at', 'desc')
                        ->with(['user:id,username,name', 'products:id,product_type_id,category_id,name', 'products.category:id,name', 'products.productType:id,type'])
                        ->get();

                    $topSellingProducts = Products::select('products.id', 'products.name', \DB::raw('COUNT(CASE WHEN orders.status = "Success" THEN orders.id END) as order_count'))
                        ->leftJoin('orders', 'products.id', '=', 'orders.products_id')
                        ->whereBetween('orders.created_at', [$startDateString, $endDateString])
                        ->groupBy('products.id', 'products.name')
                        ->orderByDesc('order_count')
                        ->take(5)
                        ->get();

                    $totalOrder = Order::whereBetween('created_at', [$startDateString, $endDateString])
                        ->where('status', '=', 'Success')
                        ->count();

                    $totalCheckout = Order::whereBetween('created_at', [$startDateString, $endDateString])
                        ->count();

                    $totalEarning = (int)Order::whereBetween('created_at', [$startDateString, $endDateString])
                        ->where('status', '=', 'Success')
                        ->sum('unit_price');




                    $limit = 1000;
                    try {
                        $startDate = DateTime::createFromFormat('Y-m-d', $startDateString);
                        $endDate = DateTime::createFromFormat('Y-m-d', $endDateString);

                        if (!($startDate instanceof \DateTimeInterface) || !($endDate instanceof \DateTimeInterface)) {
                            throw new Exception('Invalid date format. Please use YYYY-MM-DD');
                        }

                        $period = Period::create($startDate, $endDate);
                        $visitorsAndPageViews = Analytics::fetchVisitorsAndPageViewsByDate($period, $limit);


                        $totalClicks = 0;
                        foreach ($visitorsAndPageViews as $visitorData) {
                            $screenPageViews = $visitorData['screenPageViews'];
                            $totalClicks += $screenPageViews;
                        }


                        $totalViews = 0;
                        foreach ($visitorsAndPageViews as $visitorData) {
                            $pageTitle = $visitorData['pageTitle'];
                            $screenPageViews = $visitorData['screenPageViews'];


                            if (stripos($pageTitle, 'Goals Academy') !== false) {
                                $totalViews += $screenPageViews;
                            }
                        }


                        // Inisialisasi array untuk menyimpan total klik dan total tampilan per tanggal
                        $totalsByDate = [];


                        foreach ($visitorsAndPageViews as $visitorData) {
                            $date = $visitorData['date']->format('Y-m-d');


                            if (!isset($totalsByDate[$date])) {
                                $totalsByDate[$date] = [
                                    'totalClicks' => 0,
                                    'totalViews' => 0,
                                ];
                            }

                            // Hitung total click dan total view untuk setiap data
                            $screenPageViews = $visitorData['screenPageViews'];
                            $totalsByDate[$date]['totalClicks'] += $screenPageViews;

                            $pageTitle = $visitorData['pageTitle'];
                            if (stripos($pageTitle, 'Goals Academy') !== false) {
                                $totalsByDate[$date]['totalViews'] += $screenPageViews;
                            }
                        }
                    } catch (Exception $e) {
                        return response()->json(['error' => $e->getMessage()], 400);
                    }

                    return response()->json([
                        'status' => true,
                        'statusCode' => 200,
                        'total_earning' => $totalEarning,
                        'total_order' => $totalOrder,
                        'total_checkout' => $totalCheckout,
                        'list_orders' => $order,
                        "top_selling" => $topSellingProducts,
                        'totalClicksKeseluruhan' => $totalClicks,
                        'totalViewsKeseluruhan' => $totalViews,
                        'totalsByDate' => $totalsByDate,
                    ], 200);
                }
            } else {
                abort(403);
            }
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'Failed to retrieve data. Internal Server Error'
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
