<?php

namespace App\Http\Controllers\Admin\Bimbingan;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\Place;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            return Inertia::render('Auth/Admin/Bimbingan/Place', [
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data success',
                'places' => function () use($request) {
                    $search = $request->input('searchPlace');
                    $perPage = $request->input('placePage', 10);

                    $places = Place::query()->when($search, function ($q, $search) {
                        $q->where('place', 'LIKE', "%$search%");
                    })->with('city')->orderBy('is_visible', 'desc')->orderBy('city_id', 'asc')->get();
                    return $places;
                },
                'cities' => function () use($request) {
                    $search = $request->input('searchCity');
                    $perPage = $request->input('cityPage', 10);

                    $cities = City::query()->when($search, function ($q, $search) {
                        $q->where('city', 'LIKE', "%$search%");
                    })->orderBy('is_visible', 'desc')->orderBy('city', 'asc')->get();
                    return $cities;
                },
            ], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to retrieve data. Internal Server Error', 'error' => $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $city = City::get();
        return response()->json(['status' => true, 'statusCode' => 200, 'data' => $city], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validateData = $request->validate([
                'city_id' => 'required|numeric',
                'place' => 'required|string',
            ]);

            $place = new Place();
            $place->city_id = $validateData['city_id'];
            $place->place = $validateData['place'];

            $place->save();
            return redirect()->back();
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to create place. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Place $place)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Place $place)
    {
        $cities = City::get();
        $place->load('city');
        //  return response()->json(['status' => true, 'statusCode' => 200, 'data' => [
        //     'cities' => $cities,
        //     'place' => $place
        // ]], 200);
        return Inertia::render('Auth/Admin/Bimbingan/Product/Update');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Place $place)
    {
        try {
            $validateData = $request->validate([
                'city_id' => 'numeric',
                'place' => 'string',
            ]);

            $place->update($validateData);
            return redirect()->back();
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->errors()], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'Place not found'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to update place. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    public function updateVisible(Request $request, Place $place)
    {
        try {
            $validateData = $request->validate([
                'is_visible' => 'boolean',
            ]);
            $place->update($validateData);
            return redirect()->back();

        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Place $place)
    {
        try {
            $place->delete();
            return redirect()->back();
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to delete place. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
}
