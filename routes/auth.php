<?php

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
Route::get('/verifikasi_email', function () {
    return Inertia::render('Auth/VerifikasiEmail');
});
