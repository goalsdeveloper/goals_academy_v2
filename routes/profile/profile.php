<?php

use App\Http\Controllers\Profile\BimbinganController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Profile\NotificationProfileController;
use App\Http\Controllers\Profile\RiwayatTransaksiController;
use App\Http\Controllers\Profile\WebinarController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->name('user.profile.')->group(function () {
    Route::get('/user', function() {
        return redirect()->route('user.profile.bimbingan');
    })->name('user.profile');

    Route::get('/bimbingan', [BimbinganController::class, 'index'])->name('bimbingan');
    Route::get('/bimbingan/{order_id}', [BimbinganController::class, 'detailPembelajaran'])->name('detailPembelajaran');
    Route::post('/bimbingan/{order:order_code}/atur-jadwal', [BimbinganController::class, 'aturJadwal'])->name('aturJadwal');
    Route::post('/bimbingan/{order:order_code}/review', [BimbinganController::class, 'review'])->name('review');
    Route::put('/bimbingan/{order:order_code}/selesai-bimbingan', [BimbinganController::class, 'complete'])->name('selesaiBimbingan');

    Route::get('/webinar', [WebinarController::class, 'webinar'])->name('webinar');
    Route::get('/webinar/{id}', [WebinarController::class, 'detailWebinar'])->name('detailWebinar');

    // Route::get('/purchase/detail/{order_code}', [BimbinganController::class, 'index'])->name('detailPesanan');

    Route::get('/riwayat_transaksi', [RiwayatTransaksiController::class, 'riwayatTransaksi'])->name('riwayatTransaksi');

    Route::get('/notifikasi', [NotificationProfileController::class, 'index'])->name('notifikasi');

    Route::get('/obrolan', function () {
        return Inertia::render('Auth/User/Obrolan');
    });
});

require __DIR__ . '/pengaturan.php';
