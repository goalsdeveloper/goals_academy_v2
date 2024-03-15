<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Products;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OverviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $date = $request->input('date');
        if (!$date) {
            // $orderQuery->whereDate('created_at', $date);

            $order =  Order::orderBy('created_at', 'desc')->get();
            $topSellingProducts = Products::select('products.id', 'products.name', \DB::raw('COUNT(CASE WHEN orders.status = "Success" THEN orders.id END) as order_count'))
                ->leftJoin('orders', 'products.id', '=', 'orders.products_id')
                ->groupBy('products.id', 'products.name')
                ->orderByDesc('order_count')
                ->take(5)
                ->get();

            $totalOrder = Order::where('status', '=', 'Success')->count();
            $totalChekout = Order::count();
            $total_earning = (int)Order::where('status', '=', 'Success')->sum('unit_price');
            return Inertia::render('Auth/Admin/Overview/Overview', [
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data category success',
                'total_earning' => $total_earning,
                'total_order' => $totalOrder,
                'total_checkout' => $totalChekout,
                'list_orders' => $order,
                'top_selling' => $topSellingProducts], 200);
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
            $totalChekout = Order::whereDate('created_at', $date)->count();
            $total_earning = (int)Order::whereDate('created_at', $date)->where('status', '=', 'Success')->sum('unit_price');
            return Inertia::render('Auth/Admin/Overview/Overview', [
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data category success',
                'total_earning' => $total_earning,
                'total_order' => $totalOrder,
                'total_checkout' => $totalChekout,
                'list_orders' => $order,
                'top_selling' => $topSellingProducts], 200);
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
