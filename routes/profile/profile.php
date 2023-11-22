<?php

use App\Http\Controllers\Profile\PembeljaranSayaController;
use App\Http\Controllers\Profile\RiwayatTransaksiController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

Route::middleware(['auth'])->group(function () {
    Route::get('/user', [ProfileController::class, 'index'])->name('user.profile');

    Route::get('/pembelajaran_saya', [ProfileController::class, 'pembelajaranSaya'])->name('user.profile.pembelajaranSaya');

    Route::get('/purchase/detail/{order_code}', [PembeljaranSayaController::class, 'index'])->name('user.profile.detailPesanan');

    Route::get('/riwayat_transaksi', [RiwayatTransaksiController::class, 'index'])->name('user.profile.riwayatTransaksi');

    Route::get('/notifikasi', function () {
        return Inertia::render('Auth/User/Notifikasi');
    });

    Route::get('/obrolan', function () {
        return Inertia::render('Auth/User/Obrolan');
    });
});

require __DIR__ . '/pengaturan.php';
