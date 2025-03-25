<?php

namespace App\Http\Controllers\Admin\ProdukDigital;

use Inertia\Inertia;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            return Inertia::render('Auth/Admin/ProdukDigital/Order', [
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data history success',
                'orders' => function () use ($request) {
                    $perPage = (int) $request->input('perPage', 25);
                    $search = $request->input('search');

                    $query = Order::with(['paymentMethod:id,name', 'user:id,username,name,email', 'user.profile:id,user_id,phone_number', 'products:id,product_type_id,category_id,name,product_image', 'products.category:id,name', 'products.productType:id,type'])
                        ->whereHas('products', function ($query) {
                            $query->whereHas('productType', function ($subQuery) {
                                $subQuery->where('id', 2);
                            });
                        })->orderBy('updated_at', 'desc');

                    if ($search) {
                        $query->where(function ($query) use ($search) {
                            $query->where('order_code', 'LIKE', "%$search%")
                                ->orWhere('status', 'LIKE', "%$search%")
                                ->orWhereHas('user', function ($userQuery) use ($search) {
                                    $userQuery->where('username', 'LIKE', "%$search%");
                                })
                                ->orWhereHas('products', function ($productQuery) use ($search) {
                                    $productQuery->where('name', 'LIKE', "%$search%");
                                })
                                ->orWhereHas('paymentMethod', function ($paymentQuery) use ($search) {
                                    $paymentQuery->where('name', 'LIKE', "%$search%");
                                });
                        });
                    }

                    $orders = $query->paginate($perPage);
                    return $orders;
                },
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 404,
                'message' => 'Data not found.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An error occurred while processing your request.',
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

