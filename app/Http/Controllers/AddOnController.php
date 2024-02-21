<?php

namespace App\Http\Controllers;

use App\Models\AddOn;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddOnController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        // if (Auth::user()->user_role == "admin") {
        $addons = AddOn::get();
        return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data category success', 'data' => $addons], 200);
        // } else {
        //     abort(403);
        // }
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
                'name' => 'required|string',
                'slug' => 'required|string',
                'price' => 'required|numeric',

            ]);
            $addon = new AddOn();
            $addon->name = $validateData['name'];
            $addon->slug = $validateData['slug'];
            $addon->price = $validateData['price'];

            $addon->save();
            return response()->json(['status' => true, 'statusCode' => 201, 'message' => 'create addon success'], 201);
        } else {
            abort(403);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(AddOn $addOn)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AddOn $addOn)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AddOn $addon)
    {
        if (Auth::user()->user_role == "admin") {
            $validateData = $request->validate([
                'name' => 'required|string',
                'slug' => 'required|string',
                'price' => 'required|numeric',

            ]);

            $addon->update($validateData);
            return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update category success'], 200);
        } else {
            abort(403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AddOn $addon)
    {
        if (Auth::user()->user_role == "admin") {
            $addon->delete();
            return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'delete addon success'], 200);
        } else {
            abort(403);
        }
    }
}
