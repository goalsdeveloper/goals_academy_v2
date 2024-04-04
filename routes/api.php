<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CouponCheckController;
use App\Http\Controllers\API\DateCheckController;
use App\Http\Controllers\API\HandleMidtransCallbackController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\PurchaseController;
use App\Models\Order;
use App\Models\User;
// use App\Http\Controllers\Api\RegisterController;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::middleware('auth')->group(function () {
    Route::get('/notifikasi', [NotificationController::class, 'index'])->name('api.notification.index');
    Route::get('/notifikasi/{id}', [NotificationController::class, 'readNotification'])->name('api.notification.readNotification');
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/login-validation', [AuthController::class, 'loginValidation']);
Route::post('/register-validation', [AuthController::class, 'registerValidation']);

// Route::apiResource('register', RegisterController::class)->only('store');

Route::apiResource('purchase', PurchaseController::class)->middleware('auth:sanctum');

Route::post('handle_payment', [HandleMidtransCallbackController::class, 'handlePayment']);

Route::post('/coupon-check', [CouponCheckController::class, 'couponCheck']);
Route::get('date-check', [DateCheckController::class, 'dateCheck']);

Route::get('/check-payment-status/{order:order_code}', function (Order $order) {
    return response()->json([
        'status' => $order->status,
    ]);
});

Route::get('/profile_image/{id}', function ($id) {
    $profile_image = User::where('id', $id)->with('profile')->first()->profile->profile_image;
    return response()->json(['profile_image' => $profile_image]);
});

Route::post('/lengkapi_profil', function (Request $request) {
    try {
        UserProfile::where('user_id', $request->id)->update([
            'phone_number' => $request->phone_number,
            'university' => $request->university,
            'faculty' => $request->faculty,
            'major' => $request->major,
        ]);
        return response()->json(['message' => 'success']);
    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()]);
    }
});
