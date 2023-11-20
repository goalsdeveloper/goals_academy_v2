<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/user', function () {
    return Inertia::render('Auth/User/Index');
});

Route::get('/pembelajaran_saya', function () {
    return Inertia::render('Auth/User/PembelajaranSaya');
});

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
