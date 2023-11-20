<?php

use App\Http\Controllers\Profile\UpdatePasswordController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Profile\UpdateProfileController;

Route::get('/pengaturan', [UpdateProfileController::class, 'index'])->name('user.pengaturan.index');
Route::post('/pengaturan', [UpdateProfileController::class, 'store'])->name('user.pengaturan.store');

Route::get('/pengaturan/ubah_profil', [UpdateProfileController::class, 'ubahProfil'])->name('user.pengaturan.ubahProfile');

Route::get('/pengaturan/ubah_password', [UpdatePasswordController::class, 'index'])->name('user.pengaturan.ubahPassword');
Route::post('/pengaturan/ubah_password', [UpdatePasswordController::class, 'store'])->name('user.pengaturan.store.ubahPassword');
