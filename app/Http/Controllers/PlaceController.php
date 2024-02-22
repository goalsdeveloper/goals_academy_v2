<?php

namespace App\Http\Controllers;

use App\Models\Place;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->user_role == "admin") {
            $places = Place::with('city')->paginate(3);

            return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data success', 'data' => $places], 200);
        } else {
            abort(403);
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
        if (Auth::user()->user_role == "admin") {
            $validateData = $request->validate([
                'city_id' => 'required|numeric',
                'place' => 'required|string',
            ]);
            $place = new Place();
            $place->city_id = $validateData['city_id'];
            $place->place = $validateData['place'];

            $place->save();
            return response()->json(['status' => true, 'statusCode' => 201, 'message' => 'create category success', "data" => $place], 201);
        } else {
            abort(403);
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Place $place)
    {
        if (Auth::user()->user_role == "admin") {
            $validateData = $request->validate([
                'city_id' => 'numeric',
                'place' => 'string',

            ]);

            $place->update($validateData);
            return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update place success'], 200);
        } else {
            abort(403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Place $place)
    {
        if (Auth::user()->user_role == "admin") {
            $place->delete();
            return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'delete place success'], 200);
        } else {
            abort(403);
        }
    }
}
