<?php

namespace App\Http\Controllers\Admin\Bimbingan;

use App\Http\Controllers\Controller;
use App\Models\AddOn;
use App\Models\Category;
use App\Models\Products;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BimbinganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $search = $request->input('search');
                $bimbingan = Products::with('category', 'productType')
                    ->whereHas('productType', function ($query) {
                        $query->where('type', 'bimbingan');
                    });

                if ($search) {
                    $bimbingan->where(function ($query) use ($search) {
                        $query->where('name', 'LIKE', "%$search%")
                            ->orWhereHas('category', function ($query) use ($search) {
                                $query->where('name', 'LIKE', "%$search%");
                            });
                    });
                }

                $bimbingan = $bimbingan->get();

                $bimbingan_tuntas = $bimbingan->filter(function ($product) {
                    return str_contains($product->category->name, 'Dibimbing Tuntas');
                });

                $bimbingan_sekali = $bimbingan->filter(function ($product) {
                    return str_contains($product->category->name, 'Dibimbing Sekali');
                });

                $bimbingan_tuntas->transform(function ($product) {

                    if (is_string($product->facilities)) {
                        $product->facilities = json_decode($product->facilities, true);
                    }
                    if (is_string($product->form_config)) {
                        $product->form_config = json_decode($product->form_config, true);
                    }
                    return $product;
                });

                $bimbingan_sekali->transform(function ($product) {

                    if (is_string($product->facilities)) {
                        $product->facilities = json_decode($product->facilities, true);
                    }
                    if (is_string($product->form_config)) {
                        $product->form_config = json_decode($product->form_config, true);
                    }
                    return $product;
                });

                return Inertia::render('Auth/Admin/Bimbingan/Product', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'bimbingan' => function () use ($request) {
                        $search = $request->input('search');
                        $perPage = $request->input('perPage', 15);
                        $bimbingan = Products::whereHas('category.productType', function ($q) {
                            $q->where('type', 'bimbingan');
                        })->when($search, function ($q) use ($search) {
                            $q->where(function ($query) use ($search) {
                                $query->where('name', 'LIKE', "%$search%")
                                    ->orWhereHas('category', function ($query) use ($search) {
                                        $query->where('name', 'LIKE', "%$search%");
                                    });
                            });
                        })->with('category')->orderBy('number_list', 'asc')->paginate($perPage);
                        return $bimbingan;
                    },
                    'categories' => Category::get(),

                ], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'statusCode' => 500,
                'message' => 'An error occurred while processing request',
                'error' => $e->getMessage(),
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
            $addons = AddOn::get();
            $topics = Topic::get();
            // return response()->json([
            //     'status' => true,
            //     'statusCode' => 200,
            //     'message' => 'Data retrieval successful',
            //     'data' => [
            //         'categories' => $categories,
            //         'addons' => $addons,
            //         'topics' => $topics
            //     ]
            // ], 200);
            return Inertia::render('Auth/Admin/Bimbingan/Product/Create', [
                'categories' => $categories,
                'addons' => $addons,
                'topics' => $topics,
            ]);
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
                    'category_id' => 'required|numeric',
                    'name' => 'required|string',
                    'slug' => 'required|string',
                    'excerpt' => 'required|string',
                    'description' => 'required|string',
                    'contact_type' => 'required|string',
                    'price' => 'required|numeric',
                    'product_image' => 'image|mimes:png,jpg,jpeg,svg',
                    'is_visible' => 'required|in:0,1',
                    'is_facilities' => 'required|in:0,1',
                    // 'number_list' => 'numeric',
                    'total_meet' => 'required|numeric',
                    'active_period' => 'required|numeric',
                    'facilities' => 'required|string',
                    'facilities.*.icon' => 'required|string',
                    'facilities.*.text' => 'required|string',
                    'form_config' => '', // Allow seluruh key form_config
                    'duration' => 'numeric',
                    'promo_price' => 'numeric',
                ]);

                $form_config = json_decode(
                    $validateData['form_config'],
                    true
                );

                $product = new Products();
                $product->product_type_id = 1; // Kenapa 1, karena ini product untuk bimbingan aja
                $product->number_list = 2;
                $product->category_id = $validateData['category_id'];
                $product->name = $validateData['name'];
                $product->slug = $validateData['slug'];
                $product->excerpt = $validateData['excerpt'];
                $product->description = $validateData['description'];
                $product->price = $validateData['price'];
                $product->is_visible = $validateData['is_visible'];
                $product->is_facilities = $validateData['is_facilities'];
                // $product->number_list = $validateData['number_list'];
                $product->total_meet = $validateData['total_meet'];
                $product->active_period = $validateData['active_period'];
                if (isset($validateData['duration'])) {
                    $product->duration = $validateData['duration'];
                }

                if (isset($validateData['promo_price'])) {
                    $product->promo_price = $validateData['promo_price'];
                }

                $facilities = json_decode($validateData['facilities'], true);
                array_push($facilities);
                $product->facilities = $facilities;

                $product->form_config = $form_config;

                if ($request->hasFile('product_image')) {
                    if (!Storage::disk('public')->exists('product')) {
                        Storage::disk('public')->makeDirectory('product');
                    }
                    $image = $validateData['product_image'];
                    $fileName = 'bimbingan' . time() . '.' . $image->extension();
                    $path = Storage::disk('public')->putFileAs('product/bimbingan', $image, $fileName);
                    $product->product_image = $path;
                }

                $product->save();

                if ($request->filled('addons')) {
                    $addons = json_decode($request->addons);
                    foreach ($addons as $addonId) {
                        $addon = AddOn::find($addonId);
                        if ($addon) {
                            $product->addOns()->attach($addonId);
                        }
                    }
                }

                // if (isset($form_config) && isset($form_config['topic']) && $form_config['topic'] == 1) {
                if ($request->filled('topics')) {
                    $topics = json_decode($request->topics);
                    foreach ($topics as $topicId) {
                        $topic = Topic::find($topicId);
                        if ($topic) {
                            $product->topics()->attach($topicId);
                        }
                    }
                }
                // }

                return redirect()->route('admin.bimbingan.product.index')->with('message', 'Product berhasil ditambahkan');
                // return response()->json(['status' => true, 'statusCode' => 201, 'message' => 'create product success', "data" => $product], 201);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return redirect()->route('admin.bimbingan.product.index')->withErrors($e->getMessage());
            // return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Products $product)
    {
        try {
            if (Auth::user()->user_role == "admin") {

                if (strcasecmp($product->productType->type, "bimbingan") != 0) {
                    return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'Product not found'], 404);
                }

                $product->load('category', 'productType', 'topics', 'addOns');
                if (is_string($product->facilities)) {
                    $product->facilities = json_decode($product->facilities);
                }

                if (is_string($product->form_config)) {
                    $product->form_config = json_decode($product->form_config);
                }

                // return redirect()->route('admin.bimbingan.product.index');
                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data success', 'data' => $product], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return redirect()->route('admin.bimbingan.product.index')->withErrors($e->getMessage());
            // return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred while processing request', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Products $product)
    {
        if (Auth::user()->user_role == "admin") {
            $categories = Category::get();
            $addons = AddOn::get();
            $topics = Topic::get();
            $product->load('category', 'addOns', 'topics');
            // return response()->json(['status' => true, 'statusCode' => 200, 'data' => [
            //     'categories' => $categories,
            //     'products' => $product,
            //     'addons' =>$addons,
            //     'topics'=>$topics
            // ]], 200);
            return Inertia::render('Auth/Admin/Bimbingan/Product/Update', [
                'categories' => $categories,
                'products' => $product,
                'addons' => $addons,
                'topics' => $topics,
            ]);
        } else {
            abort(403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Products $product)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                // Jika product tidak bertipe bimbingan
                if ($product->product_type_id != 1) {
                    throw new \Exception('Invalid object type');
                }

                $validateData = $request->validate([
                    'category_id' => 'numeric',
                    'name' => 'string',
                    'slug' => 'string',
                    'excerpt' => 'string',
                    'description' => 'string',
                    'price' => 'numeric',
                    'contact_type' => 'string',
                    'product_image' => 'image',
                    'is_visible' => 'in:0,1',
                    'is_facilities' => 'in:0,1',
                    // 'number_list' => 'numeric',
                    'total_meet' => 'numeric',
                    'active_period' => 'numeric',
                    'facilities' => 'string',
                    'facilities.*.icon' => 'string',
                    'facilities.*.text' => 'string',
                    'form_config' => '',
                    'duration' => 'numeric',
                    'promo_price' => 'numeric',

                ]);

                $form_config = json_decode(
                    $validateData['form_config'],
                    true
                );
                $validateData['form_config'] = $form_config;

                if ($request->hasFile('product_image')) {
                    // Hapus foto lama jika ada
                    if ($product->product_image) {
                        Storage::disk('public')->delete($product->product_image);
                    }
                    if (!Storage::disk('public')->exists('product/bimbingan')) {
                        Storage::disk('public')->makeDirectory('product/bimbingan');
                    }
                    $image = $request->file('product_image');
                    $fileName = 'bimbingan' . time() . '.' . $image->getClientOriginalExtension();
                    $path = $image->storeAs('product/bimbingan', $fileName, 'public');
                    $validateData['product_image'] = $path;
                }

                if (isset($validateData['facilities'])) {
                    $facilities = json_decode($validateData['facilities'], true);
                    array_push($facilities);
                    $validateData['facilities'] = $facilities;
                }

                $product->update($validateData);

                if ($request->filled('addons')) {
                    $addons = json_decode($request->addons);
                    $product->addOns()->sync($addons);
                }

                if ($request->filled('topics')) {
                    $topics = json_decode($request->topics);
                    $product->topics()->sync($topics);
                }

                return redirect()->route('admin.bimbingan.product.index')->with('message', 'Product berhasil diupdate');
                // return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update product success'], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return redirect()->route('admin.bimbingan.product.index')->withErrors($e->getMessage());
            // return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred while updating category', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateVisible(Request $request, Products $product)
    {
        try {
            $validateData = $request->validate([
                'is_visible' => 'boolean',
            ]);
            // if($validateData['is_visible'] == false){
            //     Products::selectRaw('select max(number_list)')->where('category_id', $product->category_id);
            //     $validateData['number_list'];
            // }
            $product->update($validateData);
            return redirect()->back();
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Products $product)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                if ($product->product_type_id != 1) {
                    throw new \Exception('Invalid object type');
                }
                if ($product->product_image) {
                    Storage::delete($product->product_image);
                }
                $product->delete();

                return redirect()->route('admin.bimbingan.product.index')->with('message', 'Product berhasil dihapus');
                // return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'delete product success'], 200);
            } else {
                abort(403);
            }
        } catch (\Illuminate\Database\QueryException $e) {
            return redirect()->route('admin.bimbingan.product.index')->withErrors($e->getMessage());
            // return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to delete product. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return redirect()->route('admin.bimbingan.product.index')->withErrors($e->getMessage());
            // return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }
}
