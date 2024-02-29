<?php

use App\Http\Controllers\Admin\AddOnController;
use App\Http\Controllers\Admin\BimbinganController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CityController;
use App\Http\Controllers\Admin\OverviewController as AdminOverviewController;
use App\Http\Controllers\Admin\TutorController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\WebinarController;
use App\Http\Controllers\Admin\PlaceController;

use App\Http\Controllers\Moderator\CourseController;
use App\Http\Controllers\Moderator\OverviewController as ModeratorOverviewController;


use App\Http\Controllers\EmailDiskonController;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\Moderator\ModeratorOrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\Purchase\PurchaseStatusController;
use App\Models\AddOn;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/token', function () {
    return csrf_token();
});

Route::get('/', function () {
    return Inertia::render('Index');
});
//
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

Route::get('/syarat_dan_ketentuan', function () {
    return Inertia::render('Main/SyaratDanKetentuan');
});

Route::resource('/produk', PurchaseController::class);

Route::get('/purchase/{order}', [PurchaseStatusController::class, 'show'])->name('purchase.status');

Route::resource('/profile', ProfileController::class);

Route::post('/email-diskon', [EmailDiskonController::class, 'handler'])->name('email-diskon');

Route::get('/email/verify/email-verification', [EmailVerificationController::class, 'notice'])->middleware('auth')->name('verification.notice');
Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])->middleware('auth', 'signed')->name('verification.verify');
Route::get('/email/verify/resend-verification', [EmailVerificationController::class, 'resend'])->middleware('auth', 'throttle:6,1')->name('verification.resend');

//download file
Route::get('/unduhfile/{slug}', function (string $slug) {
    $file = TutorNote::where('slug', $slug)->firstOrFail();
    $filePath = $file->file; // Assuming $file->file already contains the relative path

    // Construct the full path to the file
    $fullPath = storage_path("app/public/{$filePath}");
    $fileName = $file->file_name;

    // Check if the file exists
    if (file_exists($fullPath)) {
        return response()->download($fullPath, $fileName);
        // return response()->download($fullPath, $fileName);
    } else {
        // Handle the case where the file doesn't exist
        return response()->json(['error' => 'File not found'], 404);
    }
});


// Admin Dashboard
Route::resource('admin/category', CategoryController::class)->middleware('auth');
Route::resource('admin/addon', AddOnController::class)->middleware('auth');
Route::resource('admin/users', UserController::class)->middleware('auth')->except(['update', 'create', 'store', 'destroy', 'edit']);
Route::resource('admin/tutorss', TutorController::class)->middleware('auth')->except(['create', 'store', 'destroy', 'edit']);
Route::resource('admin/place', PlaceController::class)->middleware('auth')->except(['create', 'store', 'destroy', 'edit']);
Route::resource('admin/city', CityController::class)->middleware('auth')->except(['create', 'store', 'destroy', 'edit']);
Route::resource('admin/bimbingan', BimbinganController::class)->except(['create', 'edit']);
Route::resource('admin/webinar', WebinarController::class)->except(['create', 'edit']);
Route::resource('admin/course', CourseController::class)->except(['create', 'edit']);
Route::resource('admin/overview', AdminOverviewController::class)->except(['create', 'edit']);


// Moderator Dashboard
Route::resource('moderator/overview', ModeratorOverviewController::class)->except(['create', 'edit']);
Route::resource('moderator/course', CourseController::class)->except(['create', 'edit']);

require __DIR__ . '/profile/profile.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/socialite.php';
