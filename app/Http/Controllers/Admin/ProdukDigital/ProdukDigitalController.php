<?php

namespace App\Http\Controllers\Admin\ProdukDigital;

use Inertia\Inertia;
use App\Models\Products;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AddOn;
use App\Models\Category;
use App\Models\Topic;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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
                return Inertia::render('Auth/Admin/ProdukDigital/Product', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'produk_digital' => function () use ($request) {
                        $search = $request->input('search');
                        $perPage = $request->input('perPage', 15);
                        $produk_digital = Products::whereHas('category.productType', function ($q) {
                            $q->where('id', 2);
                        })->when($search, function ($q) use ($search) {
                            $q->where(function ($query) use ($search) {
                                $query->where('name', 'LIKE', "%$search%")
                                    ->orWhereHas('category', function ($query) use ($search) {
                                        $query->where('name', 'LIKE', "%$search%");
                                    });
                            });
                        })->with('category')->orderBy('category_id', 'asc')->orderBy('number_list', 'asc')->paginate($perPage);
                        return $produk_digital;
                    },
                    'categories' => Category::where('product_type_id', '2')->get(),

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
            $categories = Category::where('product_type_id', 2)->get();
            $addons = AddOn::get();
            $topics = Topic::get();
            return Inertia::render('Auth/Admin/ProdukDigital/Product/Create', [
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
        // dd('test');
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
                    $validateData['form_config']
                );

                $product = new Products();
                $product->product_type_id = 2;
                $product->category_id = $validateData['category_id'];
                $product->name = $validateData['name'];
                $product->slug = $validateData['slug'];
                $product->excerpt = $validateData['excerpt'];
                $product->description = $validateData['description'];
                $product->price = $validateData['price'];
                $product->is_visible = $validateData['is_visible'];
                $product->is_facilities = $validateData['is_facilities'];
                $product->total_meet = $validateData['total_meet'];
                $product->active_period = $validateData['active_period'];
                $product->number_list = Products::newNumberList($product->category_id);
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
                    $fileName = 'produk_digital' . time() . '.' . $image->extension();
                    $path = Storage::disk('public')->putFileAs('product/produk_digital', $image, $fileName);
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

                return redirect()->route('admin.produk_digital.product.index')->with('message', 'Product berhasil ditambahkan');
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ]);
            return redirect()->route('admin.produk_digital.product.index')->withErrors($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Products $product)
    {
        try {
            if (Auth::user()->user_role == "admin") {

                if (strcasecmp($product->productType->type, "Produk Digital") != 0) {
                    return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'Product not found'], 404);
                }

                $product->load('category', 'productType', 'topics', 'addOns');
                if (is_string($product->facilities)) {
                    $product->facilities = json_decode($product->facilities);
                }

                if (is_string($product->form_config)) {
                    $product->form_config = json_decode($product->form_config);
                }

                // return redirect()->route('admin.produk_digital.product.index');
                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data success', 'data' => $product], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return redirect()->route('admin.produk_digital.product.index')->withErrors($e->getMessage());
            // return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred while processing request', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Products $product)
    {
        if (Auth::user()->user_role == "admin") {
            $categories = Category::where('product_type_id', '2')->get();
            $addons = AddOn::get();
            $topics = Topic::get();
            $product->load('category', 'addOns', 'topics');
            return Inertia::render('Auth/Admin/ProdukDigital/Product/Update', [
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
                // Jika product tidak bertipe produk-digital
                if ($product->product_type_id != 2) {
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
                    $validateData['form_config']
                );
                $validateData['form_config'] = $form_config;

                if ($request->hasFile('product_image')) {
                    // Hapus foto lama jika ada
                    if ($product->product_image) {
                        Storage::disk('public')->delete($product->product_image);
                    }
                    if (!Storage::disk('public')->exists('product/produk_digital')) {
                        Storage::disk('public')->makeDirectory('product/produk_digital');
                    }
                    $image = $request->file('product_image');
                    $fileName = 'produk_digital' . time() . '.' . $image->getClientOriginalExtension();
                    $path = $image->storeAs('product/produk_digital', $fileName, 'public');
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

                return redirect()->route('admin.produk_digital.product.index')->with('message', 'Product berhasil diupdate');
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return redirect()->back()->withErrors(['message' => 'Terjadi Kesalahan']);
        }
    }

    public function updateVisible(Request $request, Products $product)
    {
        try {
            $validateData = $request->validate([
                'is_visible' => 'boolean',
            ]);
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
                if ($product->product_type_id != 2) {
                    throw new \Exception('Invalid object type');
                }
                if ($product->product_image) {
                    Storage::delete($product->product_image);
                }
                $product->delete();
                return redirect()->route('admin.produk_digital.product.index')->with('message', 'Product berhasil dihapus');
            } else {
                abort(403);
            }
        } catch (\Illuminate\Database\QueryException $e) {
            return redirect()->route('admin.produk_digital.product.index')->withErrors($e->getMessage());
        } catch (\Exception $e) {
            return redirect()->route('admin.produk_digital.product.index')->withErrors($e->getMessage());
        }
    }

    public function updateOrderNumber(Request $req)
    {
        try {
            $origin = $req['origin_id'];
            $destination = $req['destination_id'];
            $category_id = $req['category_id'];
            $max = $destination;
            $min = $origin;
            if ($max < $min) {
                $max = $origin;
                $min = $destination;
            }
            $products = Products::where('category_id', $category_id)->whereBetween('number_list', [$min, $max])
                ->orderBy('number_list', 'asc')->get();
            foreach ($products as $product) {
                if ($product->number_list == $origin) {
                    $product->number_list = $destination;
                    $product->update();
                    continue;
                }
                if ($destination > $origin) {
                    $product->number_list = $product->number_list - 1;
                } else {
                    $product->number_list = $product->number_list + 1;
                }
                $product->update();
            }
            return redirect()->back();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'gagal ordering,' . $th->getMessage(),
            ], 500);
        }
    }
}
