<?php

namespace App\Http\Controllers\Admin\Bimbingan;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoryController extends Controller
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
                $categories = Category::whereHas('productType', function ($query) {
                    $query->where('type', 'LIKE', '%bimbingan%');
                });

                if ($search) {
                    $categories->where('name', 'LIKE', "%$search%");
                }

                $categories = $categories->with('productType:id,type')->paginate($perPage);;

                return Inertia::render('Auth/Admin/Bimbingan/Category', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'data' => $categories,
                ], 200);
            } else {
                abort(403);
            }
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'Failed to retrieve data. Internal Server Error'
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'Internal Server Error' . $e->getMessage()
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
        try {
            if (Auth::user()->user_role == "admin") {
                $validateData = $request->validate([
                    'name' => 'required|string',
                    'slug' => 'required|string',
                    'is_visible' => 'required|boolean',
                    'description' => 'required|string',
                ]);

                $category = new Category();
                $category->product_type_id = 1; // 1 karena bimbingan
                $category->name = $validateData['name'];
                $category->slug = $validateData['slug'];
                $category->is_visible = $validateData['is_visible'];
                $category->description = $validateData['description'];

                $category->save();

                return response()->json(['status' => true, 'statusCode' => 201, 'message' => 'create category success', "data" => $category], 201);
            } else {
                abort(403);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->errors()], 422);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to create category. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        if (Auth::user()->user_role == "admin") {
            return response()->json(['status' => true, 'statusCode' => 200,  "data" => $category], 200);
        } else {
            abort(403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $category->product_type_id = 1;
                $validateData = $request->validate([
                    'name' => 'string',
                    'slug' => 'string',
                    'is_visible' => 'boolean',
                    'description' => 'string',
                ]);

                $category = Category::findOrFail($id);

                $category->update($validateData);

                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update category success'], 200);
            } else {
                abort(403);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['status' => false, 'statusCode' => 422, 'message' => $e->errors()], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'Category not found'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to update category. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $category->delete();
                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'delete category success'], 200);
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
