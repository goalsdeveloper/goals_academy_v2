<?php

namespace App\Http\Controllers\Admin\SkripsiMastery;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Auth/Admin/SkripsiMastery/Category', [
            'status' => true,
            'statusCode' => 200,
            'message' => 'get data success',
            'categories' => function () use ($request) {
                $search = $request->input('search');
                $perPage = $request->input('perPage', 10);
                $categories = Category::when($search, function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%$search%");
                })->whereHas('productType', function ($query) {
                    $query->where('id', 5);
                })->orderBy('is_visible', 'desc')->orderBy('name', 'asc')->paginate($perPage);
                return $categories;
            },
        ], 200);
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
        $validateData = $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string',
            'is_visible' => 'required|boolean',
            'description' => 'required|string',
        ]);

        $category = new Category();
        $category->product_type_id = 5;
        $category->name = $validateData['name'];
        $category->slug = $validateData['slug'];
        $category->is_visible = $validateData['is_visible'];
        $category->description = $validateData['description'];
        $category->save();
        return redirect()->route('admin.produk_digital.category.index');
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
    public function edit(Category $category)
    {
        return response()->json(['status' => true, 'statusCode' => 200, "data" => $category], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        try {
            $validateData = $request->validate([
                'name' => 'string',
                'slug' => 'string',
                'is_visible' => 'boolean',
                'description' => 'string',
            ]);
            $category->update($validateData);
            return redirect()->route('admin.produk_digital.category.index');
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

    public function destroy(Category $category)
    {
        try {
            $category->delete();
            return redirect()->route('admin.produk_digital.category.index');
        } catch (ModelNotFoundException $e) {
            return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'Addon not found'], 404);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to delete addon. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    public function updateVisible(Request $request, Category $category)
    {
        try {
            $validateData = $request->validate([
                'is_visible' => 'boolean',
            ]);
            $category->update($validateData);
            return redirect()->back();
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
}
