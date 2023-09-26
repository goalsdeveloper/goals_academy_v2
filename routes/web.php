<?php

use App\Http\Controllers\EmailDiskonController;
use App\Http\Controllers\ProfileController;
use App\Models\Tutor;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Index');
});

Route::get('/produk', function () {
    return Inertia::render('Main/Produk');
});

Route::get('/artikel', function () {
    return Inertia::render('Main/Artikel');
});

Route::get('/diskusi', function () {
    return Inertia::render('Main/Diskusi');
});

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

Route::post('/email-diskon', [EmailDiskonController::class, 'handler'])->name('email-diskon');

require __DIR__ . '/auth.php';
