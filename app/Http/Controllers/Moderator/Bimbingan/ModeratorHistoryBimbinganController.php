<?php

namespace App\Http\Controllers\Moderator\Bimbingan;

use App\Enums\OrderEnum;
use App\Http\Controllers\Controller;
use App\Models\OrderHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModeratorHistoryBimbinganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $perPage = $request->input('perPage', 10);
            $search = $request->input('search');
            $order = OrderHistory::where('status', 'Success')
                ->with('order.course')
                ->limit(10)->get();
            // dd($order[0]);

            $query = OrderHistory::where('status', OrderEnum::SUCCESS)->whereHas('order.products.productType', function ($q) {
                $q->where('type', 'bimbingan');
            })->with(['order.products:id,name', 'order.user:id,username', 'order.course.child', 'order.course.place']);
            if ($search) {
                $query->whereHas('order.user', function ($userQuery) use ($search) {
                    $userQuery->where('name', 'LIKE', "%$search%");
                });
            }

            $order_history = $query->paginate($perPage);

            return Inertia::render('Auth/Moderator/Bimbingan/History', [
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data history success',
                'order_history' => $order_history,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'Error: ' . $e->getMessage(),
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
