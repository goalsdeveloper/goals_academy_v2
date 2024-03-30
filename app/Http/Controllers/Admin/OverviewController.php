<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Products;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OverviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $date = $request->input('date');
                if (!$date) {
                    $order =  Order::orderBy('created_at', 'desc')->with(['user:id,username', 'products:id,product_type_id,category_id,name', 'products.category:id,name', 'products.productType:id,type'])->get();
                    $topSellingProducts = Products::select('products.id', 'products.name', \DB::raw('COUNT(CASE WHEN orders.status = "Success" THEN orders.id END) as order_count'))
                        ->leftJoin('orders', 'products.id', '=', 'orders.products_id')
                        ->groupBy('products.id', 'products.name')
                        ->orderByDesc('order_count')
                        ->take(5)
                        ->get();

                    $totalOrder = Order::where('status', '=', 'Success')->count();
                    $totalCheckout = Order::count();
                    $totalEarning = (int)Order::where('status', '=', 'Success')->sum('unit_price');
                    return Inertia::render('Auth/Admin/Overview/Overview', [
                        'status' => true,
                        'statusCode' => 200,
                        'message' => 'get data category success',
                        'total_earning' => $totalEarning,
                        'total_order' => $totalOrder,
                        'total_checkout' => $totalCheckout,
                        'list_orders' => $order,
                        "top_selling" => $topSellingProducts
                    ], 200);
                } else {
                    $order =  Order::whereDate('created_at', $date)->orderBy('created_at', 'desc')->get();
                    $topSellingProducts = Products::select('products.id', 'products.name', \DB::raw('COUNT(CASE WHEN orders.status = "Success" THEN orders.id END) as order_count'))
                        ->leftJoin('orders', 'products.id', '=', 'orders.products_id')
                        ->whereDate('orders.created_at', $date)
                        ->groupBy('products.id', 'products.name')
                        ->orderByDesc('order_count')
                        ->take(5)
                        ->get();
                    $totalOrder = Order::whereDate('created_at', $date)->where('status', '=', 'Success')->count();
                    $totalCheckout = Order::whereDate('created_at', $date)->count();
                    $totalEarning = (int)Order::whereDate('created_at', $date)->where('status', '=', 'Success')->sum('unit_price');
                    return Inertia::render('Auth/Admin/Overview/Overview', [
                        'status' => true,
                        'statusCode' => 200,
                        'message' => 'get data category success',
                        'total_earning' => $totalEarning,
                        'total_order' => $totalOrder,
                        'total_checkout' => $totalCheckout,
                        'list_orders' => $order,
                        "top_selling" => $topSellingProducts
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
                'message' => 'Internal Server Error'
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
