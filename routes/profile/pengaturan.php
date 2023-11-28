<?php

use App\Http\Controllers\Profile\UpdatePasswordController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Profile\UpdateProfileController;
use Illuminate\Http\Request;

Route::middleware(['auth'])->group(function () {
    Route::get('/pengaturan', [UpdateProfileController::class, 'index'])->name('user.pengaturan.index');
    Route::post('/pengaturan', [UpdateProfileController::class, 'store'])->name('user.pengaturan.store');
    Route::post('/profile_image', function (Request $request) {
        dd($request);
    });

    Route::get('/pengaturan/ubah_profil', [UpdateProfileController::class, 'ubahProfil'])->name('user.pengaturan.ubahProfile');

    Route::get('/pengaturan/ubah_password', [UpdatePasswordController::class, 'index'])->name('user.pengaturan.ubahPassword');
    Route::post('/pengaturan/ubah_password', [UpdatePasswordController::class, 'store'])->name('user.pengaturan.store.ubahPassword');
});
