<?php

use App\Http\Controllers\ProfileController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/user', [ProfileController::class, 'index'])->name('user.profile');

Route::get('/pembelajaran_saya', [ProfileController::class, 'pembelajaranSaya'])->name('user.profile.pembelajaranSaya');

Route::get('/riwayat_transaksi', function () {
    return Inertia::render('Auth/User/RiwayatTransaksi');
});

Route::get('/notifikasi', function () {
    return Inertia::render('Auth/User/Notifikasi');
});

Route::get('/obrolan', function () {
    return Inertia::render('Auth/User/Obrolan');
});

require __DIR__ . '/pengaturan.php';
