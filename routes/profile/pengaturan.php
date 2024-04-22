<?php

use App\Http\Controllers\Profile\UpdatePasswordController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Profile\UpdateProfileController;
use App\Http\Controllers\Profile\UpdateProfileImageController;
use Illuminate\Http\Request;

Route::middleware(['auth'])->group(function () {
    Route::get('/pengaturan', [UpdateProfileController::class, 'ubahProfil'])->name('user.pengaturan.ubahProfil');
    Route::post('/pengaturan', [UpdateProfileController::class, 'store'])->name('user.pengaturan.store');

    Route::post('/profile_image', [UpdateProfileImageController::class, 'updateImage'])->name('user.pengaturan.ubahImage');

    Route::get('/pengaturan/ubah_profil', [UpdateProfileController::class, 'ubahProfil'])->name('user.pengaturan.ubahProfile');

    Route::get('/pengaturan/ubah_password', [UpdatePasswordController::class, 'index'])->name('user.pengaturan.ubahPassword');
    Route::post('/pengaturan/ubah_password', [UpdatePasswordController::class, 'store'])->name('user.pengaturan.store.ubahPassword');
});
