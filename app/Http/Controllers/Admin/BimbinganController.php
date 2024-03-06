<?php

namespace App\Http\Controllers\Admin;

use App\Models\Products;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BimbinganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $bimbingan = Products::with('category', 'productType')
                ->whereHas('productType', function ($query) {
                    $query->where('type', 'Bimbingan');
                })
                    ->get();

                $bimbingan_tuntas = $bimbingan->filter(function ($product) {
                    return str_contains($product->category->name, 'Dibimbing Tuntas');
                });

                $bimbingan_sekali = $bimbingan->filter(function ($product) {
                    return str_contains($product->category->name, 'Dibimbing Sekali');
                });

                $bimbingan_tuntas->transform(function ($product) {
                    $product->facilities = json_decode($product->facilities, true);
                    $product->form_config = json_decode($product->form_config, true);
                    return $product;
                });

                $bimbingan_sekali->transform(function ($product) {
                    $product->facilities = json_decode($product->facilities, true);
                    $product->form_config = json_decode($product->form_config, true);
                    return $product;
                });
                return response()->json([
                    'status' => true, 'statusCode' => 200, 'message' => 'get data success',
                    'bimbingan_sekali' => $bimbingan_sekali->values()->toArray(),
                    'bimbingan_tuntas' => $bimbingan_tuntas->values()->toArray(),
                ], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred while processing request', 'error' => $e->getMessage()], 500);
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
                    // 'product_type_id' => 'required|numeric',
                    'category_id' => 'required|numeric',
                    'name' => 'required|string',
                    'slug' => 'required|string',
                    'excerpt' => 'required|string',
                    'description' => 'required|string',
                    'price' => 'required|numeric',
                    'product_image' => 'required|image|mimes:png,jpg,jpeg,svg',
                    'is_visible' => 'required|in:0,1',
                    'is_facilities' => 'required|in:0,1',
                    'number_list' => 'numeric',
                    'total_meet' => 'required|numeric',
                    'active_period' => 'required|numeric',
                    'facilities' => 'required|array|min:1',
                    'facilities.*.icon' => 'required|string',
                    'facilities.*.text' => 'required|string',
                    'form_config.schedule' => 'required|in:0,1',
                    'form_config.city' => 'required|in:0,1',
                    'form_config.place' => 'required|in:0,1',
                    'form_config.topic' => 'required|in:0,1',
                    'form_config.document' => 'required|in:0,1',
                    'form_config.add_on' => 'required|in:0,1',
                    'duration' => 'numeric',
                ]);

                $product = new Products();
                $product->product_type_id = 1; // Kenapa 1, karena ini product untuk bimbingan aja
                $product->category_id = $validateData['category_id'];
                $product->name = $validateData['name'];
                $product->slug = $validateData['slug'];
                $product->excerpt = $validateData['excerpt'];
                $product->description = $validateData['description'];
                $product->price = $validateData['price'];
                // $product->product_image = $validateData['product_image'];
                $product->is_visible = $validateData['is_visible'];
                $product->is_facilities = $validateData['is_facilities'];
                $product->number_list = $validateData['number_list'];
                $product->total_meet = $validateData['total_meet'];
                $product->active_period = $validateData['active_period'];
                $product->duration = $validateData['duration'];

                $facilities = json_encode($validateData['facilities']);

                $product->facilities = $facilities;

                $form_config = json_encode($validateData['form_config']);


                $product->form_config = $form_config;

                if ($request->File('product_image')) {
                    $product->product_image = $request->file('product_image')->store('resource/img/program/');
                }

                $product->save();

                return response()->json(['status' => true, 'statusCode' => 201, 'message' => 'create product success', "data" => $product], 201);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
           
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Products $bimbingan)
    {
        try {
            if (Auth::user()->user_role == "admin") {

                if (strcasecmp($bimbingan->productType->type, "Bimbingan") !== 0) {
                    return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'Product not found'], 404);
                }
                $webinar->load('category', 'productType');
                $bimbingan->facilities = json_decode($bimbingan->facilities, true);
                $bimbingan->form_config = json_decode($bimbingan->form_config, true);

                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data success', 'bimbingan' => $bimbingan], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred while processing request', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Products $products)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Products $bimbingan)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                // Jika product tidak bertipe bimbingan
                if ($bimbingan->product_type_id !== 1) {
                    throw new \Exception('Invalid object type');
                }

                $validateData = $request->validate([
                    'category_id' => 'numeric',
                    'name' => 'string',
                    'slug' => 'string',
                    'excerpt' => 'string',
                    'description' => 'string',
                    'price' => 'numeric',
                    'product_image' => 'image|mimes:png,jpg,jpeg,svg',
                    'is_visible' => 'in:0,1',
                    'is_facilities' => 'in:0,1',
                    'number_list' => 'numeric',
                    'total_meet' => 'numeric',
                    'active_period' => 'numeric',
                    'facilities' => 'array|min:1',
                    'facilities.*.icon' => 'string',
                    'facilities.*.text' => 'string',
                    'form_config.schedule' => 'in:0,1',
                    'form_config.city' => 'in:0,1',
                    'form_config.place' => 'in:0,1',
                    'form_config.topic' => 'in:0,1',
                    'form_config.document' => 'in:0,1',
                    'form_config.add_on' => 'in:0,1',
                    'duration' => 'numeric',
                ]);
                if ($request->hasFile('product_image')) {
                    // Hapus foto lama jika ada
                    if ($bimbingan->product_image) {
                        Storage::delete($bimbingan->product_image);
                    }
                    $validateData['product_image'] = $request->file('product_image')->store('resource/img/program/');
                }

                $bimbingan->update($validateData);
                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update product success'], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred while updating category', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Products $bimbingan)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                if ($bimbingan->product_type_id !== 1) {
                    throw new \Exception('Invalid object type');
                }
                if ($bimbingan->product_image) {
                    Storage::delete($bimbingan->product_image);
                }
                $bimbingan->delete();
                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'delete product success'], 200);
            } else {
                abort(403);
            }
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to delete product. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
}
