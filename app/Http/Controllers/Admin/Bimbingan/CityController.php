<?php

namespace App\Http\Controllers\Admin\Bimbingan;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $search = $request->input('search');
                $perPage = $request->input('perPage', 10);

                $query = City::query();

                if ($search) {
                    $query->where('city', 'LIKE', "%$search%");
                }

                $cities = $query->paginate($perPage);

                return response()->json([
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'data' => $cities,
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
                'city' => 'required|string',
            ]);

            $city = new City();
            $city->city = $validateData['city'];
            $city->save();

            return redirect()->back();
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->errors()], 422);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to create city. Internal Server Error' . $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(City $city)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(City $city)
    {
        if (Auth::user()->user_role == "admin") {
            return response()->json(['status' => true, 'statusCode' => 200, "data" => $city], 200);
        } else {
            abort(403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, City $city)
    {
        try {
            $validateData = $request->validate([
                'city' => 'required|string',
            ]);

            $city->update($validateData);
            return redirect()->back();
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->errors()], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'City not found'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to update city. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(City $city)
    {
        try {
            $city->delete();
            return redirect()->back();
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to delete city. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
}
