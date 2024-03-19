<?php

use App\Http\Controllers\DashboardUserController;
use App\Http\Controllers\Admin\Bimbingan\AddOnController;
use App\Http\Controllers\Admin\Bimbingan\BimbinganController;
use App\Http\Controllers\Admin\Bimbingan\CategoryController;
use App\Http\Controllers\Admin\Bimbingan\CityController;
use App\Http\Controllers\Admin\Bimbingan\PlaceController;
use App\Http\Controllers\Admin\Bimbingan\OrderController as AdminOrderBimbinganController;
use App\Http\Controllers\Admin\Webinar\WebinarController;
use App\Http\Controllers\Admin\Webinar\OrderController as AdminOrderWebinarController;
use App\Http\Controllers\Admin\ManajemenUser\TutorController;
use App\Http\Controllers\Admin\ManajemenUser\UserController;
use App\Http\Controllers\Admin\OverviewController as AdminOverviewController;

// use App\Http\Controllers\Moderator\CourseController;
use App\Http\Controllers\Moderator\OverviewController as ModeratorOverviewController;
use App\Http\Controllers\Moderator\Bimbingan\ProgressController;
use App\Http\Controllers\Moderator\Bimbingan\ModeratorHistoryBimbinganController;
use App\Http\Controllers\Moderator\Bimbingan\ModeratorOrderController;
use App\Http\Controllers\Moderator\Tutor\ModeratorTutorController;
use App\Http\Controllers\Moderator\Tutor\ModeratorScheduleTutorController;

use App\Http\Controllers\EmailDiskonController;
use App\Http\Controllers\EmailVerificationController;
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
// Route::resource('admin/overview', AdminOverviewController::class)->middleware('auth')->except(['create', 'edit']);


Route::prefix('admin')->middleware('auth')->group(function () {
    Route::prefix('bimbingan')->group(function () {
        Route::resource('category', CategoryController::class);
        Route::resource('addon', AddOnController::class);
        Route::resource('place', PlaceController::class)->except(['create', 'store', 'destroy', 'edit']);
        Route::resource('city', CityController::class)->except(['create', 'store', 'destroy', 'edit']);
        Route::resource('product', BimbinganController::class)->except(['create', 'edit']);
        Route::resource('order', AdminOrderBimbinganController::class)->except(['create', 'edit']);
    });
    Route::prefix('webinar')->group(function () {
        Route::resource('product', WebinarController::class)->except(['create', 'edit']);
        Route::resource('order', AdminOrderWebinarController::class)->except(['create', 'edit']);
    });
    Route::prefix('manajemen_user')->group(function () {
        Route::resource('users', UserController::class)->except(['update', 'create', 'store', 'destroy', 'edit']);
        Route::resource('tutorss', TutorController::class)->except(['create', 'store', 'destroy', 'edit']);
    });
    Route::resource('overview', AdminOverviewController::class)->except(['create', 'edit']);
});


Route::prefix('moderator')->group(function () {
    Route::prefix('bimbingan')->group(function () {
        Route::resource('order', ModeratorOrderController::class)->except(['create', 'edit']);
        Route::get('order/{order}/show-online', [ModeratorOrderController::class, 'showOnline'])->name('moderator.order.showOnline');
        Route::patch('order/{order}/update-online', [ModeratorOrderController::class, 'updateBimbinganOnline'])->name('moderator.order.updateOnline');
        Route::resource('progress', ProgressController::class)->except(['create', 'edit']);
        Route::resource('history', ModeratorHistoryBimbinganController::class)->except(['create', 'edit']);
    });
    Route::prefix('tutor')->group(function () {
        Route::resource('tutorlist', ModeratorTutorController::class)->except(['create', 'edit']);
        Route::resource('schedule', ModeratorScheduleTutorController::class)->except(['create', 'edit']);
    });
    Route::resource('overview', ModeratorOverviewController::class)->except(['create', 'edit']);
});








// // Moderator Dashboard
// Route::resource('moderator/overview', ModeratorOverviewController::class)->middleware('auth')->except(['create', 'edit']);
// // Route::patch('moderator/course/{course}/update-bimbingan-online', [CourseController::class, 'updateBimbinganOnline'])->middleware('auth')->name('courses.updateBimbinganOnline');
// Route::resource('moderator/progress', ProgressController::class)->middleware('auth')->except(['create', 'edit']);
// Route::resource('moderator/history', ModeratorHistoryBimbinganController::class)->middleware('auth')->except(['create', 'edit']);
// Route::resource('moderator/order', ModeratorOrderController::class)->middleware('auth')->middleware('auth')->except(['create', 'edit']);
// Route::get('moderator/order/{order}/show-online', [ModeratorOrderController::class, 'showOnline'])->middleware('auth')->name('moderator.order.showOnline');
// Route::resource('moderator/tutor', ModeratorTutorController::class)->middleware('auth')->except(['create', 'edit']);
// Route::resource('moderator/schedule', ModeratorScheduleTutorController::class)->middleware('auth')->except(['create', 'edit']);




require __DIR__ . '/profile/profile.php';
require __DIR__ . '/tutor/tutor.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/socialite.php';
