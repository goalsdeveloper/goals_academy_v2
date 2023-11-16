<?php

use App\Http\Controllers\EmailDiskonController;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Purchase\PurchaseStatusController;
use App\Http\Controllers\PurchaseController;
use App\Models\Order;
use App\Models\Tutor;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Index');
});

// Route::get('/produk', function () {
//     return Inertia::render('Main/Produk');
// });

// Route::get('/artikel', function () {
//     return Inertia::render('Main/Artikel');
// });

// Route::get('/diskusi', function () {
//     return Inertia::render('Main/Diskusi');
// });

Route::get('/karir', function () {
    return Inertia::render('Main/Karir');
});

Route::get('/profil_perusahaan', function () {
    return Inertia::render('Main/ProfilPerusahaan');
});

Route::get('/profil_tutor', function () {
    return Inertia::render('Main/ProfilTutor');
});

Route::get('/login', function () {
    return Inertia::render('Auth/Form', ['title' => 'login']);
});

Route::get('/register', function () {
    return Inertia::render('Auth/Form', ['title' => 'register']);
});

Route::resource('/produk', PurchaseController::class);

Route::get('/purchase/{order}', [PurchaseStatusController::class, 'show'])->name('purchase.status');

Route::resource('/profile', ProfileController::class);

Route::post('/email-diskon', [EmailDiskonController::class, 'handler'])->name('email-diskon');

Route::get('/email/verify/email-verification', [EmailVerificationController::class, 'notice'])->middleware('auth')->name('verification.notice');
Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])->middleware('auth', 'signed')->name('verification.verify');
Route::get('/email/verify/resend-verification', [EmailVerificationController::class, 'resend'])->middleware('auth', 'throttle:6,1')->name('verification.resend');

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

Route::get('/pengaturan', function () {
    return Inertia::render('Auth/User/Pengaturan/Index');
});

Route::get('/pengaturan/ubah_profil', function () {
    return Inertia::render('Auth/User/Pengaturan/UbahProfil');
});

Route::get('/pengaturan/ubah_password', function () {
    return Inertia::render('Auth/User/Pengaturan/UbahPassword');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/socialite.php';
