<?php

namespace App\Http\Controllers\Moderator\Bimbingan;

use App\Http\Controllers\Controller;
use App\Models\OrderHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ModeratorHistoryBimbinganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if (Auth::user()->user_role == "moderator") {
                $perPage = $request->input('perPage', 10);
                $search = $request->input('search');

                $query = OrderHistory::with(['order.products:id,name', 'order.user:id,name', 'order.course:id,parent_id,location,date,time', 'order.course.child'])
                ->where('status', 'selesai');

                if ($search) {
                    $query->whereHas('order.user', function ($userQuery) use ($search) {
                        $userQuery->where('name', 'LIKE', "%$search%");
                    });
                }

                $order_history = $query->paginate($perPage);

                return response()->json([
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data history success',
                    'data' => [
                        'order_history' => $order_history,
                    ],
                ], 200);
            } else {
                abort(403);
            }
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
