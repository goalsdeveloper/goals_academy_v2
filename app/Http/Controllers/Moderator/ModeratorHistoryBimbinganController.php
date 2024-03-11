<?php

namespace App\Http\Controllers\Moderator;

use App\Http\Controllers\Controller;
use App\Models\OrderHistory;
use Illuminate\Http\Request;

class ModeratorHistoryBimbinganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $order_history = OrderHistory::with([
            'order.course' => function ($query) {
                $query->select(['id', 'location', 'date', 'time', 'tutor_id']);
            },
            'order.products'
        ])->get();

        $total_order_history_with_course = OrderHistory::has('order.course')->count();

        $total_completed_order_history = OrderHistory::has('order.course')
            ->whereHas('order.course', function ($query) {
                $query->whereNotNull('location')
                    ->whereNotNull('date')
                    ->whereNotNull('time')
                    ->whereNotNull('tutor_id');
            })
            ->count();

        $percentage_completion = ($total_completed_order_history / $total_order_history_with_course) * 100;

        return response()->json([
            'status' => true,
            'statusCode' => 200,
            'message' => 'get data history success',
            'data' => [
                'order_history' => $order_history,
                'percentage_completion' => $percentage_completion,
            ],
        ], 200);
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
