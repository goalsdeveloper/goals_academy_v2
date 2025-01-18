<?php

namespace App\Http\Controllers;

use App\Enums\OrderEnum;
use App\Models\Category;
use App\Models\City;
use App\Models\Course;
use App\Models\Order;
use App\Models\OrderHistory;
use App\Models\PaymentMethod;
use App\Models\Products;
use App\Models\User;
use App\Notifications\InvoiceNotification;
use App\Notifications\ReminderPurchaseNotification;
use App\Services\MetaPixelService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\CoreApi;

class PurchaseController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified'])->except(['index']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Products $products)
    {
        // $dataBimbingan = Category::where('slug', 'like', 'dibimbing%')->first()->products;
        $dataBimbingan = Products::whereHas('productType', function ($query) {
            $query->where('type', 'bimbingan');
        })
            ->where('is_visible', true)
            ->with('category', 'productType')->get();
        $dataSkripsiMastery = Products::whereHas('productType', function ($query) {
            $query->where('type', 'Skripsi Mastery');
        })
            ->where('is_visible', true)
            ->with('category', 'productType')->get();
        $dataJasaRiset = Products::whereHas('productType', function ($query) {
            $query->where('type', 'Jasa Riset');
        })
            ->where('is_visible', true)
            ->with('category', 'productType')->get();
        $dataProdukDigital = Products::whereHas('productType', function ($query) {
            $query->where('slug', 'produk-digital');
        })
            ->where('is_visible', true)
            ->with('productType', 'category')->get();
        $dataWebinar = Products::whereHas('productType', function ($query) {
            $query->where('slug', 'webinar');
        })->where('is_visible', true)->with('productType', 'category')->get();
        $categories = Category::with(['productType'])->get();
        return Inertia::render('Main/Produk', [
            'dataBimbingan' => $dataBimbingan,
            'dataSkripsiMastery' => $dataSkripsiMastery,
            'dataProdukDigital' => $dataProdukDigital,
            'dataJasaRiset' => $dataJasaRiset,
            'dataWebinar' => $dataWebinar,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $order_code = 'GA' . str(now()->format('YmdHis'));
        $orderData = new Order();
        $orderData->unit_price = $request['total_price'];
        $orderData->quantity = 1;
        $orderData->user_id = $user->id;
        $orderData->status = OrderEnum::PENDING->value;
        $orderData->products_id = $request['product_id'];
        $orderData->payment_method_id = $request['purchase_method']['id'];
        $orderData->order_code = $order_code;

        $quantity = 1;
        $discount = 0;
        $responseMidtrans = null;
        $order_code = Order::generateOrderCode();
        $orderData->order_code = $order_code;

        $paymentMethod = PaymentMethod::where('name', $request['purchase_method']['name'])->first();
        $getProduct = Products::where('id', $request['product_id'])->first();

        // charge midtrans
        $phoneNumber = $user->profile->phone_number ?? '';
        $form_result = ['add_on' => []];
        foreach ($request->all() as $key => $value) {
            if ($key == 'add_on' && $key == 1 && $request->exists('add_on')) {
                $add_on_result = [];
                foreach ($request->add_on as $idx => $value) {
                    $add_on_result[$idx] = ['id' => $value['id']];
                }
                $form_result['add_on'] = $add_on_result;
                continue;
            }
            if ($key == 'place') {
                $form_result['place_id'] = $request[$key];
                continue;
            }
            if ($key == 'schedule') {
                $form_result['schedule'] = $request[$key];
                continue;
            }
            if ($key != 'document') {
                $form_result[$key] = $request[$key];
            }
        }
        $document = [];
        if ($request->hasFile('document')) {
            foreach ($request->file('document') as $idx => $file) {
                $fileName = Str::random(8) . '-' . time() . '.' . $file->extension();
                Storage::putFileAs('file_uploads', $file, $fileName);
                $document[$idx]['file_name'] = $fileName;
                $document[$idx]['size'] = $file->getSize();
                $document[$idx]['mime_type'] = $file->getMimeType();
                $document[$idx]['name'] = $file->getClientOriginalName();
            }
            $form_result = array_merge((array) $form_result, ['document' => $document]);
        }
        try {
            $orderData->form_result = $form_result;
            $orderData->save();
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }

        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');

        $midtranPayload = [
            'transaction_details' => [
                'order_id' => $orderData->order_code,
                'gross_amount' => $orderData->unit_price,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'last_name' => '',
                'email' => $user->email,
                'phone' => $phoneNumber,
            ],
        ];
        if ($paymentMethod->category == 'bank_transfer') {
            $midtranPayload['bank_transfer'] = ['bank' => $paymentMethod->payment_type];
            $midtranPayload['payment_type'] = $paymentMethod->category;
        }

        if ($paymentMethod->category == 'ewallet') {
            $midtranPayload['payment_type'] = $paymentMethod->payment_type;
        }
        try {
            $responseMidtrans = CoreApi::charge($midtranPayload);
        } catch (Exception $e) {
            Log::error($th->getMessage());
        }
        $responseMidtrans->provider_name = strtolower($paymentMethod->name);

        OrderHistory::create([
            'order_id' => $orderData->id,
            'status' => $orderData->status,
            'payload' => $responseMidtrans,
        ]);

        $user->notify(new InvoiceNotification($orderData));

        return redirect()->route('purchase.status', $orderData->order_code);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $req, string $order)
    {
        // cek kondisi tanggal
        $endDate = Carbon::now()->addDays(8);

        $counts = Course::select('date')
            ->selectRaw('COUNT(*) as count')
            ->whereBetween('date', [Carbon::today(), $endDate])
            ->groupBy('date')
            ->havingRaw('COUNT(*) > 5')
            ->get();
        // end cek kondisi tanggal

        $paymentMethods = PaymentMethod::take(4)->get();

        $product = Products::where('slug', $order)
            ->with('category')
            ->with('addOns')
            ->first();
        $addOns = $product->addOns()->where('is_visible', true)->get();
        $cities = City::where('is_visible', true)->with(['places' => function ($q) {
            $q->where('is_visible', true);
        }])->get();
        $topics = $product->topics()->where('is_visible', true)->get();
        try {
            //code...
            $metaPixel = new MetaPixelService();
            $metaPixel->setEventName("ViewContent")->setUserData(Auth::user()->email, Auth::user()->profile()->phone_number)->setEventTime(time())->setCustomData([
                "contents" => [
                    "id" => $product->id,
                    "product_name" => $product->name,
                ]
            ])->setSourceURL($req->url())->setTestCode('TEST9180')->sendEvent();
        } catch (\Throwable $th) {
            response()->json([
                'error' => $th->getMessage()
            ]);
        }

        return Inertia::render('Purchase/Form', [
            'date' => $counts,
            'addOns' => $addOns,
            'cities' => $cities,
            'topics' => $topics,
            'paymentMethods' => $paymentMethods,
            'dataProduct' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
}
