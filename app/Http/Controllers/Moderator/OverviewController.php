<?php

namespace App\Http\Controllers\Moderator;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OverviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $totalOrder = Order::where('status', '=', 'Success')->count();
        $totalChekout = Order::count();
        return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data category success', 'total_order' => $totalOrder, 'total_checkout' => $totalChekout], 200);
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
