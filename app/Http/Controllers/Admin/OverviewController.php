<?php

namespace App\Http\Controllers\Admin;

use App\Enums\OrderEnum;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Products;
use Carbon\Carbon;
use DateTime;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
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
                $productNames = Products::pluck('name')->toArray();
                if (!$startDateString && !$endDateString) {
                    $oneMonthAgo = now()->subMonth();
                    $order = Order::where('created_at', '>=', $oneMonthAgo)
                        ->orderBy('created_at', 'desc')
                        ->where('status', OrderEnum::SUCCESS)
                        ->with(['user:id,username,name', 'products:id,product_type_id,category_id,name', 'products.category:id,name', 'products.productType:id,type'])->take(5)
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

                    $totalEarning = Order::where('status', '=', 'Success')
                        ->where('created_at', '>=', $oneMonthAgo)->get();

                    $limit = 1000;
                    $period = Period::months(1);
                    $visitorsAndPageViews = Analytics::fetchVisitorsAndPageViewsByDate($period, $limit);

                    $totalClicks = 0;
                    $totalViews = 0;
                    $totalsByDate = [];

                    foreach ($visitorsAndPageViews as $visitorData) {
                        $date = $visitorData['date']->format('Y-m-d');
                        $screenPageViews = $visitorData['screenPageViews'];
                        $pageTitle = $visitorData['pageTitle'];

                        if (!isset($totalsByDate[$date])) {
                            $totalsByDate[$date] = [
                                'totalClicks' => 0,
                                'totalViews' => 0,
                            ];
                        }

                        // Hitung total views untuk setiap data dengan pageTitle yang mengandung kata "Produk"
                        if (stripos($pageTitle, 'Produk') !== false) {
                            $totalViews += $screenPageViews;
                            $totalsByDate[$date]['totalViews'] += $screenPageViews;
                        }

                        // Hitung total klik untuk setiap data dengan pageTitle yang mengandung nama produk
                        foreach ($productNames as $productName) {
                            if (stripos($pageTitle, $productName) !== false) {
                                $totalsByDate[$date]['totalClicks'] += $screenPageViews;
                                $totalClicks += $screenPageViews;
                                break;
                            }
                        }
                    }

                    $totalEarnings = 0;
                    foreach ($totalEarning as $key => $value) {
                        $totalEarnings += ($value->form_result['total_price'] - $value->form_result['admin']);
                    }

                    ksort($totalsByDate);
                    return Inertia::render('Auth/Admin/Overview/Overview', [
                        'status' => true,
                        'statusCode' => 200,
                        'total_earning' => $totalEarnings,
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
                        ->whereBetween('created_at', [$startDateString, Carbon::createFromDate($endDateString)->addDays(1)])
                        ->where('status', OrderEnum::SUCCESS)
                        ->orderBy('created_at', 'desc')
                        ->with(['user:id,username,name', 'products:id,product_type_id,category_id,name', 'products.category:id,name', 'products.productType:id,type'])->take(5)
                        ->get();

                    $topSellingProducts = Products::select('products.id', 'products.name', \DB::raw('COUNT(CASE WHEN orders.status = "Success" THEN orders.id END) as order_count'))
                        ->leftJoin('orders', 'products.id', '=', 'orders.products_id')
                        ->whereBetween('orders.created_at', [$startDateString, Carbon::createFromDate($endDateString)->addDays(1)])
                        ->groupBy('products.id', 'products.name')
                        ->orderByDesc('order_count')
                        ->take(5)
                        ->get();

                    $totalOrder = Order::whereBetween('created_at', [$startDateString, Carbon::createFromDate($endDateString)->addDays(1)])
                        ->where('status', '=', 'Success')
                        ->count();

                    $totalCheckout = Order::whereBetween('created_at', [$startDateString, Carbon::createFromDate($endDateString)->addDays(1)])
                        ->count();

                    $totalEarning = Order::whereBetween('created_at', [$startDateString, Carbon::createFromDate($endDateString)->addDays(1)])
                        ->where('status', '=', 'Success')->get();
                    $totalEarnings = 0;
                    foreach ($totalEarning as $key => $value) {
                        $totalEarnings += ($value->form_result['total_price'] - $value->form_result['admin']);
                    }
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
                        $totalViews = 0;
                        $totalsByDate = [];

                        foreach ($visitorsAndPageViews as $visitorData) {
                            $date = $visitorData['date']->format('Y-m-d');
                            $screenPageViews = $visitorData['screenPageViews'];
                            $pageTitle = $visitorData['pageTitle'];

                            if (!isset($totalsByDate[$date])) {
                                $totalsByDate[$date] = [
                                    'totalClicks' => 0,
                                    'totalViews' => 0,
                                ];
                            }

                            // Hitung total views untuk setiap data dengan pageTitle yang mengandung kata "Produk"
                            if (stripos($pageTitle, 'Produk') !== false) {
                                $totalViews += $screenPageViews;
                                $totalsByDate[$date]['totalViews'] += $screenPageViews;
                            }

                            // Hitung total klik untuk setiap data dengan pageTitle yang mengandung nama produk
                            foreach ($productNames as $productName) {
                                if (stripos($pageTitle, $productName) !== false) {
                                    $totalsByDate[$date]['totalClicks'] += $screenPageViews;
                                    $totalClicks += $screenPageViews;
                                    break;
                                }
                            }
                        }

                    } catch (Exception $e) {
                        return response()->json(['error' => $e->getMessage()], 400);
                    }

                    ksort($totalsByDate);
                    return Inertia::render('Auth/Admin/Overview/Overview', [
                        'status' => true,
                        'statusCode' => 200,
                        'total_earning' => $totalEarnings,
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
                'message' => 'Failed to retrieve data. Internal Server Error',
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage(),
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
