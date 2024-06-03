<?php

namespace App\Http\Controllers\Admin\ManajemenUser;

use App\Http\Controllers\Controller;
use App\Models\RevenueType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RevenueTypeController extends Controller
{
    public function index(Request $request)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $search = $request->input('search');
                $perPage = $request->input('perPage', 25);

                $query = RevenueType::query();

                if ($search) {
                    $query->where('type', 'LIKE', "%$search%");
                }

                $revenue_types = $query->paginate($perPage);

                return response()->json([
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'data' => $revenue_types,
                ], 200);
            } else {
                abort(403);
            }
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to retrieve data. Internal Server Error', 'error' => $e->getMessage()], 500);
        } catch (\Illuminate\Auth\Access\AuthorizationException $e) {
            return response()->json(['status' => false, 'statusCode' => 403, 'message' => 'Access Forbidden', 'error' => $e->getMessage()], 403);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()], 500);
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
        try {

            $validateData = $request->validate([
                'type' => 'required|numeric',
            ]);

            $revenue_type = new RevenueType();
            $revenue_type->type = $validateData['type'];
            $revenue_type->save();

            // return Inertia::location(route('admin.manajemen_user.revenue_type.index'));
            return redirect()->route('admin.manajemen_user.revenue_type.index');
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(RevenueType $revenue_type)
    {
        return response()->json(['status' => true, 'statusCode' => 200, 'data' => $revenue_type], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RevenueType $revenue_type)
    {

        return response()->json(['status' => true, 'statusCode' => 200, 'data' => $revenue_type], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RevenueType $revenue_type)
    {
        try {
            $validateData = $request->validate([
                'type' => 'required|numeric',
            ]);
            $revenue_type->update($validateData);
            return redirect()->route('admin.manajemen_user.revenue_type.index');
            // return Inertia::location(route('admin.manajemen_user.revenue_type.index'));
        } catch (\Illuminate\Validation\ValidationException $e) {
            // return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->errors()], 422);
            return redirect()->route('admin.manajemen_user.revenue_type.index')->with('errors', $e->errors());
        } catch (\Exception $e) {
            return redirect()->route('admin.manajemen_user.revenue_type.index')->with('errors', $e->getMessage());
            // return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RevenueType $revenue_type)
    {
        try {
            $revenue_type->delete();
            // return Inertia::location(route('admin.manajemen_user.revenue_type.index'));
            return redirect()->route('admin.manajemen_user.revenue_type.index');
            // return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'delete addon success'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'Revenue Type not found'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to delete Revenue Type. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
}
