<?php

use App\Http\Controllers\DashboardUserController;
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
use App\Http\Controllers\Moderator\ModeratorOrderController;
use App\Http\Controllers\Moderator\ProgressController;
use App\Http\Controllers\Moderator\ModeratorHistoryBimbinganController;
use App\Http\Controllers\Moderator\ModeratorTutorController;

use App\Http\Controllers\EmailDiskonController;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\Purchase\PurchaseStatusController;
use App\Models\AddOn;
use App\Models\TutorNote;
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

Route::get('/dashboard/user/webinar', [DashboardUserController::class, 'webinar']);
Route::get('/dashboard/user/webinar/{id}', [DashboardUserController::class, 'detailWebinar']);
Route::get('/dashboard/user/bimbingan', [DashboardUserController::class, 'bimbingan']);
Route::get('/dashboard/user/bimbingan/{id}', [DashboardUserController::class, 'detailBimbingan']);

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
// Route::resource('admin/category', CategoryController::class)->middleware('auth');
// Route::resource('admin/addon', AddOnController::class)->middleware('auth');
// Route::resource('admin/users', UserController::class)->middleware('auth')->except(['update', 'create', 'store', 'destroy', 'edit']);
// Route::resource('admin/tutorss', TutorController::class)->middleware('auth')->except(['create', 'store', 'destroy', 'edit']);
// Route::resource('admin/place', PlaceController::class)->middleware('auth')->except(['create', 'store', 'destroy', 'edit']);
// Route::resource('admin/city', CityController::class)->middleware('auth')->except(['create', 'store', 'destroy', 'edit']);
// Route::resource('admin/bimbingan', BimbinganController::class)->middleware('auth')->except(['create', 'edit']);
// Route::resource('admin/webinar', WebinarController::class)->middleware('auth')->except(['create', 'edit']);
// Route::resource('admin/course', CourseController::class)->middleware('auth')->except(['create', 'edit']);
Route::resource('admin/overview', AdminOverviewController::class)->middleware('auth')->except(['create', 'edit']);

Route::get('admin/statistic', function () {
    return Inertia::render('Auth/Admin/Statistic/Statistic');
});

Route::get('admin/bimbingan/category', function () {
    return Inertia::render('Auth/Admin/Bimbingan/Category');
});
Route::get('admin/bimbingan/addon', function () {
    return Inertia::render('Auth/Admin/Bimbingan/AddOn');
});
Route::get('admin/bimbingan/place', function () {
    return Inertia::render('Auth/Admin/Bimbingan/Place');
});
Route::get('admin/bimbingan/topic', function () {
    return Inertia::render('Auth/Admin/Bimbingan/Topic');
});
Route::get('admin/bimbingan/product', function () {
    return Inertia::render('Auth/Admin/Bimbingan/Product');
});
Route::get('admin/bimbingan/order', function () {
    return Inertia::render('Auth/Admin/Bimbingan/Order');
});

Route::get('admin/webinar/product', function () {
    return Inertia::render('Auth/Admin/Webinar/Product');
});
Route::get('admin/webinar/order', function () {
    return Inertia::render('Auth/Admin/Webinar/Order');
});

Route::get('admin/ecourse/category', function () {
    return Inertia::render('Auth/Admin/Ecourse/Category');
});
Route::get('admin/ecourse/product', function () {
    return Inertia::render('Auth/Admin/Ecourse/Product');
});
Route::get('admin/ecourse/order', function () {
    return Inertia::render('Auth/Admin/Ecourse/Order');
});

Route::get('admin/manajemen_user/user', function () {
    return Inertia::render('Auth/Admin/ManajemenUser/User');
});
Route::get('admin/manajemen_user/tutor', function () {
    return Inertia::render('Auth/Admin/ManajemenUser/Tutor');
});
Route::get('admin/manajemen_user/moderator', function () {
    return Inertia::render('Auth/Admin/ManajemenUser/Moderator');
});

Route::get('admin/ebook/category', function () {
    return Inertia::render('Auth/Admin/Ebook/Category');
});
Route::get('admin/ebook/product', function () {
    return Inertia::render('Auth/Admin/Ebook/Product');
});
Route::get('admin/ebook/order', function () {
    return Inertia::render('Auth/Admin/Ebook/Order');
});

Route::get('admin/marketing/affiliate', function () {
    return Inertia::render('Auth/Admin/Marketing/Affiliate');
});
Route::get('admin/marketing/vouchers', function () {
    return Inertia::render('Auth/Admin/Marketing/Vouchers');
});

Route::get('admin/career/job', function () {
    return Inertia::render('Auth/Admin/Career/Job');
});
Route::get('admin/career/participant', function () {
    return Inertia::render('Auth/Admin/Career/Participant');
});

// Moderator Dashboard
Route::resource('moderator/overview', ModeratorOverviewController::class)->except(['create', 'edit']);
Route::resource('moderator/course', CourseController::class)->except(['create', 'edit']);
Route::resource('moderator/progress', ProgressController::class)->except(['create', 'edit']);
Route::resource('moderator/order', ModeratorOrderController::class)->except(['create', 'edit']);
Route::resource('moderator/history', ModeratorHistoryBimbinganController::class)->except(['create', 'edit']);
Route::resource('moderator/tutor', ModeratorTutorController::class)->except(['create', 'edit']);

require __DIR__ . '/profile/profile.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/socialite.php';
