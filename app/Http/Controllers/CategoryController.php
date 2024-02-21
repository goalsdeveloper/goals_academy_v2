<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->user_role == "admin") {
        $category = Category::get();

        return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data success', 'data' => $category], 200);
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
            'name' => 'required|string',
            'slug' => 'required|string',
            'is_visible' => 'required|boolean',
            'description' => 'required|string',

        ]);
        $category = new Category();
        $category->name = $validateData['name'];
        $category->slug = $validateData['slug'];
        $category->is_visible = $validateData['is_visible'];
        $category->description = $validateData['description'];

        $category->save();
        return response()->json(['status' => true, 'statusCode' => 201, 'message' => 'create category success', "data" => $category], 201);
        } else {
        abort(403);
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        if (Auth::user()->user_role == "admin") {
        $validateData = $request->validate([
            'name' => 'required|string',
            'slug' => 'required|string',
            'is_visible' => 'required|boolean',
            'description' => 'required|string',

        ]);

        $category->update($validateData);
        return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update category success'], 200);
        } else {
            abort(403);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if (Auth::user()->user_role == "admin") {
            $category->delete();
            return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'delete category success'], 200);
        } else {
            abort(403);
        }
    }
}
