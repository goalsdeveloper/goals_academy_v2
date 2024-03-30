<?php

namespace App\Http\Controllers\Admin\Bimbingan;

use App\Models\AddOn;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AddOnController extends Controller
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

                $query = AddOn::query();

                if ($search) {
                    $query->where('name', 'LIKE', "%$search%");
                }

                $addons = $query->paginate($perPage);

                return Inertia::render('Auth/Admin/Bimbingan/AddOn', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data category success',
                    'data' => $addons,
                ], 200);
            } else {
                abort(403);
            }
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to retrieve data. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
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
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
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
        if (Auth::user()->user_role == "admin") {
            return response()->json(['status' => true, 'statusCode' => 200, 'data' => $addOn], 200);
        } else {
            abort(403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AddOn $addon)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $validateData = $request->validate([
                    'name' => 'string',
                    'slug' => 'string',
                    'price' => 'numeric',

                ]);

                $addon->update($validateData);
                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update category success'], 200);
            } else {
                abort(403);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AddOn $addon)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $addon->delete();
                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'delete addon success'], 200);
            } else {
                abort(403);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'Addon not found'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to delete addon. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
}
