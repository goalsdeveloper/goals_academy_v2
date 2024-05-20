<?php

namespace App\Http\Controllers\Admin\Bimbingan;

use App\Http\Controllers\Controller;
use App\Models\AddOn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AddOnController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        try {
            return Inertia::render('Auth/Admin/Bimbingan/AddOn', [
                'status' => true,
                'statusCode' => 200,
                'message' => 'get data category success',
                // 'data' => $addons,
                'data' => function () use ($request) {
                    $search = $request->input('search');
                    $perPage = $request->input('perPage', 10);
                    $addons = AddOn::when($search, function ($q) use($search) {
                        $q->where('name', 'LIKE', "%$search%");
                    })->orderBy('is_visible', 'desc')->orderBy('name', 'asc')->paginate($perPage);
                    return $addons;
                },
            ], 200);
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

            // return Inertia::location(route('admin.bimbingan.addon.index'));
            return redirect()->route('admin.bimbingan.addon.index');

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
        return response()->json(['status' => true, 'statusCode' => 200, 'data' => $addOn], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AddOn $addOn)
    {

        return response()->json(['status' => true, 'statusCode' => 200, 'data' => $addOn], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AddOn $addon)
    {
        try {
            $validateData = $request->validate([
                'name' => 'string',
                'slug' => 'string',
                'price' => 'numeric',

            ]);

            $addon->update($validateData);
            return redirect()->route('admin.bimbingan.addon.index');
            // return Inertia::location(route('admin.bimbingan.addon.index'));
        } catch (\Illuminate\Validation\ValidationException $e) {
            // return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->errors()], 422);
            return redirect()->route('admin.bimbingan.addon.index')->with('errors', $e->errors());
        } catch (\Exception $e) {
            return redirect()->route('admin.bimbingan.addon.index')->with('errors', $e->getMessage());
            // return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
    public function updateVisible(Request $request, AddOn $addon)
    {
        try {
            $validateData = $request->validate([
                'is_visible' => 'boolean',
            ]);
            $addon->update($validateData);
            return redirect()->back();
        } catch (\Illuminate\Validation\ValidationException $e) {
            // return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->errors()], 422);
            return redirect()->route('admin.bimbingan.addon.index')->with('errors', $e->errors());
        } catch (\Exception $e) {
            return redirect()->route('admin.bimbingan.addon.index')->with('errors', $e->getMessage());
            // return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AddOn $addon)
    {
        try {
            $addon->delete();
            // return Inertia::location(route('admin.bimbingan.addon.index'));
            return redirect()->route('admin.bimbingan.addon.index');
            // return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'delete addon success'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'Addon not found'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to delete addon. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
}
