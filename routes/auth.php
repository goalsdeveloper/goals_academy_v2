<?php

use App\Http\Controllers\API\NotificationController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('login', [AuthController::class, 'index'])->name('auth.index');
Route::get('/register', function () {
    return Inertia::render('Auth/Form', ['title' => 'register']);
});
Route::post('login', [AuthController::class, 'login'])->name('auth.login');
Route::post('register', [AuthController::class, 'register'])->name('auth.register');
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth')->name('auth.logout');
Route::get('/lupa_password', function () {
    return Inertia::render('Auth/LupaPassword');
});
Route::get('/lupa_password/password_baru', function () {
    return Inertia::render('Auth/PasswordBaru');
});
Route::get('/verifikasi_email', function () {
    return Inertia::render('Auth/VerifikasiEmail');
});

Route::middleware('auth')->group(function () {
    Route::get('/notification/get', [NotificationController::class, 'index'])->name('api.notification.get');
    Route::get('/notification/getUserNotification', [NotificationController::class, 'userNotification'])->name('api.notification.userNotification');
    Route::get('/notification/getMoreNotif', [NotificationController::class, 'getMoreNotif'])->name('api.notification.getMoreNotif');
    Route::get('/notification/read/{id}', [NotificationController::class, 'readNotification'])->name('api.notification.read');
    Route::get('/notification/readAll', [NotificationController::class, 'readAll'])->name('api.notification.readAll');
});
