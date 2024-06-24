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
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\CoreApi;

class PurchaseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['index']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Products $products)
    {
        // $dataDibimbing = Category::where('slug', 'like', 'dibimbing%')->first()->products;
        $dataDibimbing = Products::whereHas('productType', function ($query) {
            $query->where('type', 'bimbingan');
        })
            ->where('is_visible', true)
            ->with('category', 'productType')->get();
        $dataEbook = Products::whereHas('productType', function ($query) {
            $query->where('slug', 'e-book');
        })->with('productType', 'category')->get();
        $dataWebinar = Products::whereHas('productType', function ($query) {
            $query->where('slug', 'webinar');
        })->with('productType', 'category')->get();
        $categories = Category::with(['productType'])->get();
        return Inertia::render('Main/Produk', [
            'dataDibimbing' => $dataDibimbing,
            'ebookData' => $dataEbook,
            'webinarData' => $dataWebinar,
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
        dd($form_result);
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
        // dd($request->all());
        try {
            $orderData->form_result = $form_result;
            $orderData->save();
        } catch (\Throwable $th) {
            dd($th->getMessage());
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
        // dd($midtranPayload);
        try {
            $responseMidtrans = CoreApi::charge($midtranPayload);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }

        OrderHistory::create([
            'order_id' => $orderData->id,
            'status' => $orderData->status,
            'payload' => $responseMidtrans,
        ]);

        $user->notify(new InvoiceNotification($orderData));
        // if ($paymentMethod->category == 'bank_transfer') {
        //     $delay = Carbon::now()->addHours(23)->addMinutes(55);
        // } else {
        //     $delay = Carbon::now()->addMinutes(10);
        // }
        // $user->notify(new ReminderPurchaseNotification("Segera Lakukan Pembayaran", "Tersisa 5 menit sebelum pesananmu batal!", route('purchase.status', ['order' => $orderData->id])))->delay($delay);


        return redirect()->route('purchase.status', $orderData->order_code);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $order)
    {
        // cek kondisi tanggal
        $endDate = Carbon::now()->addDays(7);

        $counts = Course::select('date')
            ->selectRaw('COUNT(*) as count')
            ->whereBetween('date', [Carbon::today(), $endDate])
            ->groupBy('date')
            ->havingRaw('COUNT(*) > 5')
            ->get();
        // end cek kondisi tanggal

        $paymentMethods = PaymentMethod::all();

        $product = Products::where('slug', $order)
            ->with('category')
            ->with('addOns')
            ->first();
        // dd($product);
        $addOns = $product->addOns;
        $cities = City::with('places')->get();
        $topics = $product->topics;
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
