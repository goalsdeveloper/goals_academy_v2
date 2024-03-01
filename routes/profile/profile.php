<?php

use App\Http\Controllers\Profile\NotificationProfileController;
use App\Http\Controllers\Profile\PembeljaranSayaController;
use App\Http\Controllers\Profile\RiwayatTransaksiController;
use App\Http\Controllers\Profile\WebinarController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

Route::middleware(['auth'])->group(function () {
    Route::get('/user', [ProfileController::class, 'index'])->name('user.profile');

    Route::get('/bimbingan', [ProfileController::class, 'bimbingan'])->name('user.profile.bimbingan');

    Route::get('/webinar', [WebinarController::class, 'webinar'])->name('user.profile.webinar');

    Route::get('/webinar/{id}', [WebinarController::class, 'detailWebinar'])->name('user.profile.detailWebinar');

    Route::get('/pembelajaran/{id}', [PembeljaranSayaController::class, 'detailPembelajaran'])->name('user.profile.detailPembelajaran');

    Route::get('/purchase/detail/{order_code}', [PembeljaranSayaController::class, 'index'])->name('user.profile.detailPesanan');

    Route::get('/riwayat_transaksi', [RiwayatTransaksiController::class, 'index'])->name('user.profile.riwayatTransaksi');

    Route::get('/notifikasi', [NotificationProfileController::class, 'index'])->name('user.profile.notifikasi');

    Route::get('/obrolan', function () {
        return Inertia::render('Auth/User/Obrolan');
    });
});

require __DIR__ . '/pengaturan.php';
