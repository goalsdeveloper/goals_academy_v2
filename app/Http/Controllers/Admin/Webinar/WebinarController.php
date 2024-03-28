<?php

namespace App\Http\Controllers\Admin\Webinar;

use App\Models\Products;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WebinarController extends Controller
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
                        $query->where('type', 'webinar');
                    });

                if ($search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('name', 'LIKE', "%$search%")
                            ->orWhereHas('category', function ($query) use ($search) {
                                $query->where('name', 'LIKE', "%$search%");
                            });
                    });
                }

                $webinar = $query->paginate($perPage);

                $webinar->getCollection()->transform(function ($product) {

                    if (is_string($product->facilities)) {
                        $product->facilities = json_decode($product->facilities, true);
                    }
                    if (is_string($product->form_config)) {
                        $product->form_config = json_decode($product->form_config, true);
                    }
                    return $product;
                });

                return Inertia::render('Auth/Admin/Webinar/Product', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'data' => $webinar,
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // CATATAN UNTUK FORM CONFIG DI WEBINAR HARUSNYA NULL BISA
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
                    'webinar_properties' => 'required|array|min:1',
                    'webinar_properties.*.date' => 'required|date_format:Y-m-d',
                    'webinar_properties.*.time' => 'required|date_format:H:i:s',
                    'webinar_properties.*.via' => 'required|string',
                    'webinar_properties.*.speaker' => 'required|string',
                    'form_config.schedule' => 'required|in:0,1',
                    'form_config.city' => 'required|in:0,1',
                    'form_config.place' => 'required|in:0,1',
                    'form_config.topic' => 'required|in:0,1',
                    'form_config.document' => 'required|in:0,1',
                    'form_config.add_on' => 'required|in:0,1',
                ]);

                $product = new Products();
                $product->product_type_id = 3; // Kenapa 3, karena ini product untuk webinar aja
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

                $facilities = json_encode($validateData['facilities']);
                $product->facilities = $facilities;

                $webinar_properties = json_encode($validateData['webinar_properties']);
                $product->webinar_properties = $webinar_properties;

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
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred while creating product', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Products $product)
    {
        try {
            if (Auth::user()->user_role == "admin") {

                if (strcasecmp($product->productType->type, "webinar") !== 0) {
                    return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'Product not found'], 404);
                }

                $product->load('category', 'productType');
                if (is_string($product->facilities)) {
                    $product->facilities = json_decode($product->facilities);
                }

                if (is_string($product->form_config)) {
                    $product->form_config = json_decode($product->form_config);
                }

                if (is_string($product->webinar_properties)) {
                    $product->webinar_properties = json_decode($product->webinar_properties);
                }
                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data success', 'data' => $product], 200);
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
     * Show the form for editing the specified resource.
     */
    public function edit(Products $product)
    {
        //
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
                    'webinar_properties' => 'array|min:1',
                    'webinar_properties.*.date' => 'date_format:Y-m-d',
                    'webinar_properties.*.time' => 'date_format:H:i:s',
                    'webinar_properties.*.via' => 'string',
                    'webinar_properties.*.speaker' => 'string',
                    'form_config.schedule' => 'in:0,1',
                    'form_config.city' => 'in:0,1',
                    'form_config.place' => 'in:0,1',
                    'form_config.topic' => 'in:0,1',
                    'form_config.document' => 'in:0,1',
                    'form_config.add_on' => 'in:0,1',
                ]);

                if ($request->hasFile('product_image')) {
                    // Hapus foto lama jika ada
                    if ($product->product_image) {
                        Storage::delete($product->product_image);
                    }
                    $validateData['product_image'] = $request->file('product_image')->store('resource/img/program/');
                }

                $product->update($validateData);

                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update webinar success'], 200);
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
                if ($product->product_type_id !== 3) {
                    throw new \Exception('Invalid object type');
                }

                if ($product->product_image) {
                    Storage::delete($product->product_image);
                }

                $product->delete();

                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'delete webinar success'], 200);
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
