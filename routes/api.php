<?php

use App\Enums\CourseStatusEnum;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CouponCheckController;
use App\Http\Controllers\API\DateCheckController;
use App\Http\Controllers\API\ExpiredCourseCheckerController;
use App\Http\Controllers\API\HandleMidtransCallbackController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\API\PurchaseController;
use App\Http\Controllers\API\TutorScheduleController;
use App\Http\Controllers\API\TutorSheduleController;
use App\Models\Order;
use App\Models\User;
// use App\Http\Controllers\Api\RegisterController;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
// use App\Http\Controllers\Api\RegisterController;
use App\Http\Controllers\API\ViewsClickAndSalesAmountController;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the 'api' middleware group. Make something great!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
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
        // Cek apakah email sudah terdaftar
        $user = User::where('email', $request->email)->first();
        if ($user !== null) {
            // Jika email sudah terdaftar, update profil pengguna yang ada
            User::where('email', $request->email)->update([
                'name' => $request->name,
            ]);
            // Validasi apakah phone_number unik daripada user lain
            // if (UserProfile::where('phone_number', $request->phone_number)->where('user_id', '!=', $user->id)->exists()) {
            //     return response()->json(['message' => 'Nomor HP sudah digunakan'], 422);
            // }
            // Update profil pengguna yang ada
            UserProfile::where('user_id', $user->id)->update([
                'phone_number' => $request->phone_number,
                'university' => $request->university,
                'faculty' => $request->faculty,
                'major' => $request->major,
                'rumpun' => $request->rumpun,
            ]);
            return response()->json(['message' => 'success', 'id' => $user->id], 200);
        } else {
            // Jika email belum terdaftar, buat pengguna baru
            $user = User::create([
                'name' => $request->name,
                'username' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request['password']),
            ]);
            // Buat profil pengguna baru
            UserProfile::create([
                'user_id' => $user->id,
                'phone_number' => $request->phone_number,
                'university' => $request->university,
                'faculty' => $request->faculty,
                'major' => $request->major,
                'rumpun' => $request->rumpun,
            ]);
            return response()->json(['message' => 'success', 'id' => $user->id], 200);
        }
    } catch (\Exception $e) {
        $statusCode = 500; // Default: Internal Server Error

        // Tangani jenis exception yang umum
        if ($e instanceof ValidationException) {
            $statusCode = 422;
            $message = $e->validator->errors();
        } elseif ($e instanceof ModelNotFoundException) {
            $statusCode = 404;
            $message = 'Data not found';
        } elseif ($e instanceof HttpExceptionInterface) {
            $statusCode = $e->getStatusCode();
            $message = $e->getMessage();
        } else {
            $message = $e->getMessage();
        }

        return response()->json(['message' => $message,], $statusCode);
    }
});
Route::get('views_sales', [ViewsClickAndSalesAmountController::class, 'index']);
Route::get('user_growth', [ViewsClickAndSalesAmountController::class, 'userGrowth']);
Route::get('tutor_schedule', [TutorSheduleController::class, 'index']);

Route::put('check_expired', [ExpiredCourseCheckerController::class, 'index'])->name('check_expired');
