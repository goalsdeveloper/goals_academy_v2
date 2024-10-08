<?php

namespace App\Http\Controllers;

use App\Enums\OrderEnum;
use App\Http\Controllers\Controller;
use App\Models\Moodle;
use App\Models\Order;
use App\Models\OrderHistory;
use App\Models\PaymentMethod;
use App\Notifications\InvoiceNotification;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\CoreApi;

class MoodleController extends Controller
{
    protected $moodle;
    public function __construct()
    {
        $this->moodle = new Moodle();
        $this->middleware('auth')->only('store');
    }
    public function search_user()
    {
        $param = [
            'criteria' => [
                0 => [
                    'key' => 'email',
                    'value' => 'afanoktafianto@yahoo.com',
                ],
            ],
        ];
        try {
            $user = $this->moodle->get_users($param);
            dd($user);
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
    }

    public function index()
    {
        try {
            $user = Auth::user();
            $moodle = new Moodle();
            $res = $moodle->auth_request($user);
            if (!$res->loginurl) {
                return redirect()->back();
            }
            return Inertia::location($res->loginurl);
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
    }

    public function show($id)
    {
        dd($id);
        $courses = $this->moodle->get_courses([]);
        dd($courses);
    }

    public function store(Request $request)
    {
        try {
            $validation = $request->validate([
                'total_price' => 'required|numeric',
                'product_id' => 'required|numeric',
                'purchase_method.id' => 'required|numeric',
            ]);
            $user = Auth::user();
            $order = new Order();
            $order->unit_price = $validation['total_price'];
            $order->user_id = $user->id;
            $order->quantity = 1;
            $order->order_code = Order::generateOrderCode();
            $order->status = OrderEnum::PENDING->value;
            $order->products_id = $validation['product_id'];
            $order->payment_method_id = $validation['purchase_method']['id'];
            $payment_method = PaymentMethod::find($validation['purchase_method']['id']);
            $order->form_result = [];

            Config::$serverKey = config('midtrans.server_key');
            Config::$isProduction = config('midtrans.is_production');
            Config::$isSanitized = config('midtrans.is_sanitized');
            Config::$is3ds = config('midtrans.is_3ds');

            $midtranPayload = [
                'transaction_details' => [
                    'order_id' => $order->order_code,
                    'gross_amount' => $order->unit_price,
                ],
                'customer_details' => [
                    'first_name' => $user->name,
                    'last_name' => '',
                    'email' => $user->email,
                    'phone' => $user->phone_number ?? '',
                ],
            ];

            if ($payment_method->category == 'bank_transfer') {
                $midtranPayload['bank_transfer'] = ['bank' => $payment_method->payment_type];
                $midtranPayload['payment_type'] = $payment_method->category;
            }

            if ($payment_method->category == 'ewallet') {
                $midtranPayload['payment_type'] = $payment_method->payment_type;
            }
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
            $order->form_result = $form_result;
            $order->save();
            $responseMidtrans = CoreApi::charge($midtranPayload);
            $responseMidtrans->provider_name = strtolower($payment_method->name);

            OrderHistory::create([
                'order_id' => $order->id,
                'status' => $order->status,
                'payload' => $responseMidtrans,
            ]);

            $user->notify(new InvoiceNotification($order));

            return redirect()->route('purchase.status', $order->order_code);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function enroll_user()
    {
        $param = [
            'criteria' => [
                0 => [
                    'key' => 'email',
                    'value' => 'dev.user@goalsacademy.id',
                ],
            ],
        ];
        $user = $this->moodle->get_users($param);
        $param = [
            'enrolments' => [
                0 => [
                    'roleid' => 5,
                    'userid' => $user->users[0]->id,
                    'courseid' => 3,
                ],
            ],
        ];
        try {
            $enrol = $this->moodle->enroll_user($param);
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
        dd($enrol);
    }

    public function moodle_page()
    {
        try {
            //code...
            $courses = $this->moodle->get_courses(['field' => 'category', 'value' => '1']);
            // dd($courses);
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
        return Inertia::render('Main/Ecourse', ['courses' => $courses->courses]);
    }

    public function to_course($id)
    {
        try {
            $user = Auth::user();
            $login_url = $this->moodle->auth_request($user);
            $course_url = env('MOODLE_DOMAIN') . '/course/view.php?id=' . $id;
            $url = $login_url->loginurl . "&wantsurl=" . $course_url;
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
        return Inertia::location($url);
    }
}
