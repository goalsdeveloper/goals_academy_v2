<?php

namespace App\Http\Controllers\Admin\Ecourse;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AddOn;
use App\Models\Category;
use App\Models\Products;
use App\Models\Topic;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                $search = $request->input('search');
                $ecourse = Products::with('productType')
                    ->whereHas('productType', function ($query) {
                        $query->where('type', 'E-Course');
                    });

                if ($search) {
                    $ecourse->where(function ($query) use ($search) {
                        $query->where('name', 'LIKE', "%$search%")
                            ->orWhereHas('category', function ($query) use ($search) {
                                $query->where('name', 'LIKE', "%$search%");
                            });
                    });
                }

                $ecourse = $ecourse->get();

                return Inertia::render('Auth/Admin/Ecourse/Package', [
                    'status' => true,
                    'statusCode' => 200,
                    'message' => 'get data success',
                    'ecourse' => $ecourse,
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
            // $addons = AddOn::get();
            // $topics = Topic::get();
            return Inertia::render('Auth/Admin/Ecourse/Package/Create', [
                // 'addons' => $addons,
                // 'topics' => $topics,
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
                    'duration' => 'numeric|nullable',
                    'promo_price' => 'numeric',
                ]);

                $form_config = json_decode(
                    $validateData['form_config']
                );

                $package = new Products();
                $package->product_type_id = 4; // Kenapa 1, karena ini products untuk ecourse aja
                $package->number_list = 1;
                $package->category_id = $validateData['category_id'];
                $package->name = $validateData['name'];
                $package->slug = $validateData['slug'];
                $package->excerpt = $validateData['excerpt'];
                $package->description = $validateData['description'];
                $package->price = $validateData['price'];
                $package->is_visible = $validateData['is_visible'];
                $package->is_facilities = $validateData['is_facilities'];
                // $package->number_list = $validateData['number_list'];
                $package->total_meet = $validateData['total_meet'];
                $package->active_period = $validateData['active_period'];
                $package->number_list = Products::newNumberList($package->category_id);
                if (isset($validateData['duration'])) {
                    $package->duration = $validateData['duration'];
                }

                if (isset($validateData['promo_price'])) {
                    $package->promo_price = $validateData['promo_price'];
                }

                $facilities = json_decode($validateData['facilities'], true);
                array_push($facilities);
                $package->facilities = $facilities;

                $package->form_config = $form_config;

                if ($request->hasFile('product_image')) {
                    if (!Storage::disk('public')->exists('products')) {
                        Storage::disk('public')->makeDirectory('products');
                    }
                    $image = $validateData['product_image'];
                    $fileName = 'ecourse' . time() . '.' . $image->extension();
                    $path = Storage::disk('public')->putFileAs('products/ecourse', $image, $fileName);
                    $package->product_image = $path;
                }

                $package->save();

                if ($request->filled('addons')) {
                    $addons = json_decode($request->addons);
                    foreach ($addons as $addonId) {
                        $addon = AddOn::find($addonId);
                        if ($addon) {
                            $package->addOns()->attach($addonId);
                        }
                    }
                }

                // if (isset($form_config) && isset($form_config['topic']) && $form_config['topic'] == 1) {
                if ($request->filled('topics')) {
                    $topics = json_decode($request->topics);
                    foreach ($topics as $topicId) {
                        $topic = Topic::find($topicId);
                        if ($topic) {
                            $package->topics()->attach($topicId);
                        }
                    }
                }
                // }

                return redirect()->route('admin.ecourse.package.index')->with('message', 'Product berhasil ditambahkan');
                // return response()->json(['status' => true, 'statusCode' => 201, 'message' => 'create products success', "data" => $package], 201);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ]);
            return redirect()->route('admin.ecourse.package.index')->withErrors($e->getMessage());
            // return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Products $package)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                if (strcasecmp($package->productType->type, "E-Course") != 0) {
                    return response()->json(['status' => false, 'statusCode' => 404, 'message' => 'Package not found'], 404);
                }

                $package->load('productType');
                if (is_string($package->facilities)) {
                    $package->facilities = json_decode($package->facilities);
                }

                if (is_string($package->form_config)) {
                    $package->form_config = json_decode($package->form_config);
                }

                // return redirect()->route('admin.ecourse.package.index');
                return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'get data success', 'data' => $package], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            return redirect()->route('admin.ecourse.package.index')->withErrors($e->getMessage());
            // return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred while processing request', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Products $package)
    {
        if (Auth::user()->user_role == "admin") {
            // $addons = AddOn::get();
            // $topics = Topic::get();
            $package->load('addOns', 'topics');
            return Inertia::render('Auth/Admin/Ecourse/Package/Update', [
                'products' => $package,
                // 'addons' => $addons,
                // 'topics' => $topics,
            ]);
        } else {
            abort(403);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Products $package)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                // Jika products tidak bertipe ecourse
                if ($package->product_type_id != 4) {
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
                    'duration' => 'numeric||nullable',
                    'promo_price' => 'numeric',

                ]);

                $form_config = json_decode(
                    $validateData['form_config']
                );
                $validateData['form_config'] = $form_config;

                if ($request->hasFile('product_image')) {
                    // Hapus foto lama jika ada
                    if ($package->product_image) {
                        Storage::disk('public')->delete($package->product_image);
                    }
                    if (!Storage::disk('public')->exists('products/ecourse')) {
                        Storage::disk('public')->makeDirectory('products/ecourse');
                    }
                    $image = $request->file('product_image');
                    $fileName = 'ecourse' . time() . '.' . $image->getClientOriginalExtension();
                    $path = $image->storeAs('products/ecourse', $fileName, 'public');
                    $validateData['product_image'] = $path;
                }

                if (isset($validateData['facilities'])) {
                    $facilities = json_decode($validateData['facilities'], true);
                    array_push($facilities);
                    $validateData['facilities'] = $facilities;
                }

                $package->update($validateData);

                if ($request->filled('addons')) {
                    $addons = json_decode($request->addons);
                    $package->addOns()->sync($addons);
                }

                if ($request->filled('topics')) {
                    $topics = json_decode($request->topics);
                    $package->topics()->sync($topics);
                }

                return redirect()->route('admin.ecourse.package.index')->with('message', 'Product berhasil diupdate');
                // return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'update products success'], 200);
            } else {
                abort(403);
            }
        } catch (\Exception $e) {
            dd($e->getMessage());
            // return redirect()->route('admin.ecourse.package.index')->withErrors($e->getMessage());
            // return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'An error occurred while updating category', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateVisible(Request $request, Products $package)
    {
        try {
            $validateData = $request->validate([
                'is_visible' => 'boolean',
            ]);
            $package->update($validateData);
            return redirect()->back();
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Products $package)
    {
        try {
            if (Auth::user()->user_role == "admin") {
                if ($package->product_type_id != 1) {
                    throw new \Exception('Invalid object type');
                }
                if ($package->product_image) {
                    Storage::delete($package->product_image);
                }
                $package->delete();
                return redirect()->route('admin.ecourse.package.index')->with('message', 'Product berhasil dihapus');
                // return response()->json(['status' => true, 'statusCode' => 200, 'message' => 'delete products success'], 200);
            } else {
                abort(403);
            }
        } catch (\Illuminate\Database\QueryException $e) {
            return redirect()->route('admin.ecourse.package.index')->withErrors($e->getMessage());
            // return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Failed to delete products. Internal Server Error'], 500);
        } catch (\Exception $e) {
            return redirect()->route('admin.ecourse.package.index')->withErrors($e->getMessage());
            // return response()->json(['status' => false, 'statusCode' => 500, 'message' => 'Internal Server Error'], 500);
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
            $packages = Products::where('category_id', $category_id)->whereBetween('number_list', [$min, $max])
                ->orderBy('number_list', 'asc')->get();
            foreach ($packages as $package) {
                if ($package->number_list == $origin) {
                    $package->number_list = $destination;
                    $package->update();
                    continue;
                }
                if ($destination > $origin) {
                    $package->number_list = $package->number_list - 1;
                } else {
                    $package->number_list = $package->number_list + 1;
                }
                $package->update();
            }
            return redirect()->back();
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'gagal ordering,' . $th->getMessage(),
            ], 500);
        }
    }
}
