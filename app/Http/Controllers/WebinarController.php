<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WebinarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $webinar = Products::with('category', 'productType')
            ->whereHas('productType', function ($query) {
                $query->where('type', 'webinar');
            })
            ->get();

        $webinar->transform(function ($product) {
            $product->facilities = json_decode($product->facilities, true);
            $product->form_config = json_decode($product->form_config, true);
            return $product;
        });

        return response()->json([
            'status' => true, 'statusCode' => 200, 'message' => 'get data success',
            'data' => $webinar->values()->toArray(),
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

        // CATATAN UNTUK FORM CONFIG DI WEBINAR HARUSNYA NULL BISA
        try {
            $validateData = $request->validate([
                // 'product_type_id' => 'required|numeric',
                'category_id' => 'required|numeric',
                'name' => 'required|string',
                'slug' => 'required|string',
                'excerpt' => 'required|string',
                'description' => 'required|string',
                'price' => 'required|numeric',
                'product_image' => 'required|string',
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
            $product->product_image = $validateData['product_image'];
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

            $product->save();

            return response()->json(['status' => true, 'statusCode' => 201, 'message' => 'create product success', "data" => $product], 201);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred while creating product', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Products $webinar)
    {
        if (strcasecmp($webinar->productType->type, "webinar") !== 0) {
            return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'Product not found'], 404);
        }
        $webinar->load('category', 'productType');
        $webinar->facilities = json_decode($webinar->facilities, true);
        $webinar->form_config = json_decode($webinar->form_config, true);
        $webinar->webinar_properties = json_decode($webinar->webinar_properties, true);

        return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data success', 'data' => $webinar], 200);
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
    public function update(Request $request, Products $products)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Products $products)
    {
        //
    }
}
