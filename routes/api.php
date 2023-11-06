<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\API\PurchaseController;
use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\API\DateCheckController;
use App\Http\Controllers\API\CouponCheckController;
use App\Http\Controllers\API\HandleMidtransCallbackController;
use App\Models\Order;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('register', RegisterController::class)->only('store');

Route::apiResource('purchase', PurchaseController::class)->middleware('auth:sanctum');

Route::post('handle_payment', [HandleMidtransCallbackController::class, 'handlePayment']);

Route::post('/coupon-check', [CouponCheckController::class, 'couponCheck']);
Route::get('date-check', [DateCheckController::class, 'dateCheck']);

Route::get('/check-payment-status/{order:order_code}', function (Order $order) {
    return response()->json([
        'status' => $order->status
    ]);
});
