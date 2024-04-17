<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DateTime;
use DateTimeInterface;
use Exception;
use Spatie\Analytics\Period;
use Analytics;
use App\Models\Order;
use App\Models\Products;
use App\Models\ProductType;
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
        $productType = $request->input('productType');
        $productName = $request->input('productName');
        $limit = 1000;

        if ($startDateString && $endDateString) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDateString)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDateString)->endOfDay();
        } else {
            $endDate = Carbon::now()->endOfDay();
            $startDate = Carbon::now()->subMonth()->startOfDay();
        }

        $period = Period::create($startDate, $endDate);
        $visitorsAndPageViews = Analytics::fetchVisitorsAndPageViewsByDate($period, $limit);

        foreach ($visitorsAndPageViews as $visitorData) {
            $date = $visitorData['date']->format('Y-m-d');
            $salesAmount = Order::where('status', '=', 'Success')
                ->whereDate('created_at', $date)
                ->sum('unit_price');
            $totalSalesByDate[$date] = $salesAmount;
        }



        if ($productType) {
            $totalClicks = 0;
            $totalViews = 0;
            $totalsByDate = [];
            $productType = ProductType::where('type', $productType)->first();

            if (!$productType) {
                return response()->json([
                    'status' => false,
                    'statusCode' => 400,
                    'message' => 'Product type not found in the database.',
                ], 400);
            }

            $products = Products::where('product_type_id', $productType->id)->get();
            if ($products->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'statusCode' => 400,
                    'message' => 'Products not found for the specified product type.',
                ], 400);
            }


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

                $salesAmount = Order::where('status', 'Success')
                    ->whereDate('created_at', $date)
                    ->whereHas('products', function ($query) use ($productType) {
                        $query->where('product_type_id', $productType->id);
                    })->sum('unit_price');

                $totalSalesByDate[$date] = $salesAmount;

                // dd($salesAmount);

                // Hitung total views untuk setiap data dengan pageTitle yang mengandung nama produk
                if (stripos($pageTitle, "produk") !== false) {
                    $totalViews += $screenPageViews;
                    $totalsByDate[$date]['totalViews'] += $screenPageViews;
                }

                foreach ($products as $product) {
                    // Hitung total klik untuk setiap data dengan pageTitle yang mengandung nama produk
                    if (stripos($pageTitle, $product->name) !== false) {
                        $totalsByDate[$date]['totalClicks'] += $screenPageViews;
                        $totalClicks += $screenPageViews;
                    }
                }
            }
        } else {
            $totalClicks = 0;
            $totalViews = 0;
            $totalsByDate = [];
            $productTypes = ProductType::get();
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

                // Hitung total views untuk setiap data dengan pageTitle yang mengandung kata "produk"
                if (stripos($pageTitle, "produk") !== false) {
                    $totalViews += $screenPageViews;
                    $totalsByDate[$date]['totalViews'] += $screenPageViews;
                }

                foreach ($productTypes as $productTypeModel) {
                    $products = Products::where('product_type_id', $productTypeModel->id)->get();
                    // Hitung total klik untuk setiap produk dalam jenis produk yang ditentukan
                    foreach ($products as $product) {
                        if (stripos($pageTitle, $product->name) !== false) {
                            $totalsByDate[$date]['totalClicks'] += $screenPageViews;
                            $totalClicks += $screenPageViews;
                        }
                    }
                }
            }
        }

        if ($productName) {
            $totalClicks = 0;
            $totalViews = 0;
            $totalsByDate = [];
            $product = Products::where('name', $productName)->first();

            if (!$product) {
                return response()->json([
                    'status' => false,
                    'statusCode' => 400,
                    'message' => 'Product name not found in the database.',
                ], 400);
            }

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
                $salesAmount = Order::where('status', 'Success')
                ->whereDate('created_at', $date)
                ->whereHas('products', function ($query) use ($product) {
                    $query->where('name', $product->name);
                })
                    ->sum('unit_price');

                $totalSalesByDate[$date] = $salesAmount;


                // Hitung total views untuk setiap data dengan pageTitle yang mengandung nama produk
                if (stripos($pageTitle, "produk") !== false) {
                    $totalViews += $screenPageViews;
                    $totalsByDate[$date]['totalViews'] += $screenPageViews;
                }

                // Hitung total klik untuk setiap data dengan pageTitle yang mengandung nama produk
                if (stripos($pageTitle, $product->name) !== false) {
                    $totalsByDate[$date]['totalClicks'] += $screenPageViews;
                    $totalClicks += $screenPageViews;
                }
            }
        }

        return response()->json([
            'status' => true,
            'statusCode' => 200,
            // 'totalClicksKeseluruhan' => $totalClicks,
            // 'totalViewsKeseluruhan' => $totalViews,
            'totalsByDate' => $totalsByDate,
            'salesAmount' => $totalSalesByDate,
            'data' => $visitorsAndPageViews,
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
