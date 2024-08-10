<?php

namespace App\Http\Controllers\Admin\ProdukDigital;

use Inertia\Inertia;
use App\Models\Products;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProdukDigitalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if (Auth::user()->user_role == "admin") {

                $perPage = $request->input('perPage', 10);
                $search = $request->input('search');

                $query = Products::with('category', 'productType')
                    ->whereHas('productType', function ($query) {
                        $query->where('type', 'produk-digital');
                    });

                if ($search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('name', 'LIKE', "%$search%")
                            ->orWhereHas('category', function ($query) use ($search) {
                                $query->where('name', 'LIKE', "%$search%");
                            });
                    });
                }

                $ebook = $query->paginate($perPage);

                $ebook->getCollection()->transform(function ($product) {

                    if (is_string($product->facilities)) {
                        $product->facilities = json_decode($product->facilities, true);
                    }
                    if (is_string($product->form_config)) {
                        $product->form_config = json_decode($product->form_config, true);
                    }
                    return $product;
                });

                return Inertia::render('Auth/Admin/ProdukDigital/Product', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'data' => $ebook,
                ], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'Error: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (Auth::user()->user_role == "admin") {
            $categories = Category::get();
            // return response()->json(['status' => true, 'statusCode' => 200, "data" => $categories], 201);
            return Inertia::render('Auth/Admin/Bimbingan/Product/Create');
        } else {
            abort(403);
        }
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
                    'duration' => 'numeric',
                    'promo_price' => 'numeric',
                ]);

                $product = new Products();
                $product->product_type_id = 2; // Kenapa 2, karena ini product untuk ebook aja
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
                $product->promo_price = $validateData['promo_price'];

                $facilities = json_encode($validateData['facilities']);

                $product->facilities = $facilities;


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
    public function show(Products $product)
    {
        try {
            if (Auth::user()->user_role == "admin") {


                if (strcasecmp($product->productType->type, "produk-digital") !== 0) {
                    return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'Product not found'], 404);
                }

                $product->load('category', 'productType');
                if (is_string($product->facilities)) {
                    $product->facilities = json_decode($product->facilities);
                }

                if (is_string($product->form_config)) {
                    $product->form_config = json_decode($product->form_config);
                }
                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data success', 'data' => $product], 200);
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
    public function edit(Products $product)
    {
        $categories = Category::get();
        //  return response()->json(['status' => true, 'statusCode' => 200, 'data' => [
        //     'categories' => $categories,
        //     'products' => $product
        // ]], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Products $product)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                if ($product->product_type_id !== 3) {
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
                    'promo_price' => 'numeric',
                ]);

                if ($request->hasFile('product_image')) {
                    // Hapus foto lama jika ada
                    if ($product->product_image) {
                        Storage::delete($product->product_image);
                    }
                    $validateData['product_image'] = $request->file('product_image')->store('resource/img/program/');
                }

                $product->update($validateData);

                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update ebook success'], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'Error: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Products $product)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                if ($product->product_type_id !== 2) {
                    throw new \Exception('Invalid object type');
                }

                if ($product->product_image) {
                    Storage::delete($product->product_image);
                }

                $product->delete();

                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'delete produk-digital success'], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'Error: ' . $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
}
