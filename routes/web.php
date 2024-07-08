<?php

use App\Http\Controllers\Admin\Bimbingan\AddOnController;
use App\Http\Controllers\Admin\Bimbingan\BimbinganController;
use App\Http\Controllers\Admin\Bimbingan\CategoryController;
use App\Http\Controllers\Admin\Bimbingan\CityController;
use App\Http\Controllers\Admin\Bimbingan\OrderController as AdminOrderBimbinganController;
use App\Http\Controllers\Admin\Bimbingan\PlaceController;
use App\Http\Controllers\Admin\Bimbingan\TopicController;
use App\Http\Controllers\Admin\Career\JobController;
use App\Http\Controllers\Admin\Career\ParticipantController;
use App\Http\Controllers\Admin\Ebook\CategoryController as AdminCategoryEbookController;
use App\Http\Controllers\Admin\Ebook\EbookController;
use App\Http\Controllers\Admin\Ebook\OrderController as AdminOrderEbookController;
use App\Http\Controllers\Admin\Ecourse\CategoryController as AdminCategoryEcourseController;
use App\Http\Controllers\Admin\Ecourse\EcourseController;
use App\Http\Controllers\Admin\Ecourse\OrderController as AdminOrderEcourseController;
use App\Http\Controllers\Admin\ManajemenUser\ModeratorController;
use App\Http\Controllers\Admin\ManajemenUser\RevenueTypeController;
use App\Http\Controllers\Admin\ManajemenUser\TutorController;
use App\Http\Controllers\Admin\ManajemenUser\UserController;
use App\Http\Controllers\Admin\Marketing\AffiliateController;
use App\Http\Controllers\Admin\Marketing\VoucherController;
use App\Http\Controllers\Admin\OverviewController as AdminOverviewController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\StatisticController;
use App\Http\Controllers\Admin\Webinar\CategoryController as AdminCategoryWebinarController;
use App\Http\Controllers\Admin\Webinar\OrderController as AdminOrderWebinarController;
use App\Http\Controllers\Admin\Webinar\WebinarController;
use App\Http\Controllers\API\NotificationController;
use App\Http\Controllers\DashboardUserController;
use App\Http\Controllers\MainController;
// use App\Http\Controllers\Moderator\CourseController;
use App\Http\Controllers\EmailDiskonController;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\Moderator\Bimbingan\ModeratorHistoryBimbinganController;
use App\Http\Controllers\Moderator\Bimbingan\ModeratorOrderController;
use App\Http\Controllers\Moderator\Bimbingan\ProgressController;
use App\Http\Controllers\Moderator\OverviewController as ModeratorOverviewController;
use App\Http\Controllers\Moderator\SettingController as ModeratorSettingController;
use App\Http\Controllers\Moderator\Tutor\ModeratorScheduleTutorController;
use App\Http\Controllers\Moderator\Tutor\ModeratorTutorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\Purchase\PurchaseStatusController;
use App\Http\Controllers\Tutor\OverviewController;
use App\Models\TutorNote;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Analytics\Facades\Analytics;
use Spatie\Analytics\Period;
use Xendit\Configuration;

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

Route::get('/profil_tutor', [MainController::class, 'profilTutor'])->name('profilTutor');
Route::get('/profil_tutor_old', function () {
    return Inertia::render('Main/ProfilTutorOld');
});

Route::get('/syarat_dan_ketentuan', function () {
    return Inertia::render('Main/SyaratDanKetentuan');
});

Route::resource('/produk', PurchaseController::class);

Route::get('/purchase/{order}', [PurchaseStatusController::class, 'show'])->name('purchase.status')->middleware(['auth', 'verified']);

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

Route::prefix('admin')->name('admin.')->middleware('auth', 'admin')->group(function () {
    Route::get('/', [AdminOverviewController::class, 'index'])->name('index');
    Route::prefix('bimbingan')->name('bimbingan.')->group(function () {
        Route::resource('category', CategoryController::class);
        Route::put('category/{category}/updateVisible', [CategoryController::class, 'updateVisible'])->name('category.updateVisible');
        Route::resource('addon', AddOnController::class);
        Route::put('addon/{addon}/updateVisible', [AddOnController::class, 'updateVisible'])->name('addon.updateVisible');
        Route::resource('place', PlaceController::class);
        Route::put('place/{place}/updateVisible', [PlaceController::class, 'updateVisible'])->name('place.updateVisible');
        Route::resource('city', CityController::class);
        Route::put('city/{city}/updateVisible', [CityController::class, 'updateVisible'])->name('city.updateVisible');
        Route::resource('topic', TopicController::class);
        Route::put('topic/{topic}/updateVisible', [TopicController::class, 'updateVisible'])->name('topic.updateVisible');
        Route::resource('product', BimbinganController::class);
        Route::post('product/updateNumberList', [BimbinganController::class, 'updateOrderNumber'])->name('product.updateOrderNumber');
        Route::put('product/{product}/updateVisible', [BimbinganController::class, 'updateVisible'])->name('product.updateVisible');
        Route::resource('order', AdminOrderBimbinganController::class);
    });
    Route::prefix('webinar')->name('webinar.')->group(function () {
        Route::resource('category', AdminCategoryWebinarController::class);
        Route::resource('product', WebinarController::class);
        Route::resource('order', AdminOrderWebinarController::class);
    });
    Route::prefix('ebook')->name('ebook.')->group(function () {
        Route::resource('category', AdminCategoryEbookController::class);
        Route::resource('product', EbookController::class);
        Route::resource('order', AdminOrderEbookController::class);
    });
    Route::prefix('ecourse')->name('ecourse.')->group(function () {
        Route::resource('category', AdminCategoryEcourseController::class);
        Route::resource('product', EcourseController::class);
        Route::resource('order', AdminOrderEcourseController::class);
    });
    Route::prefix('manajemen_user')->name('manajemen_user.')->group(function () {
        Route::resource('user', UserController::class)->except(['update', 'create', 'store', 'destroy', 'edit']);
        Route::resource('tutor', TutorController::class);
        Route::put('tutor/{tutor}/updateActive', [TutorController::class, 'updateActive'])->name('tutor.updateActive');
        Route::resource('moderator', ModeratorController::class);
        Route::put('moderator/{moderator}/updateActive', [ModeratorController::class, 'updateActive'])->name('moderator.updateActive');
        Route::resource('revenue_type', RevenueTypeController::class);
    });
    Route::prefix('marketing')->name('marketing.')->group(function () {
        Route::resource('vouchers', VoucherController::class);
        Route::resource('affiliate', AffiliateController::class);
    });
    Route::prefix('career')->name('career.')->group(function () {
        Route::resource('job', JobController::class);
        Route::resource('participant', ParticipantController::class)->except(['create', 'store', 'destroy', 'edit']);
    });
    Route::resource('overview', AdminOverviewController::class);
    Route::resource('statistic', StatisticController::class);
    Route::resource('setting', SettingController::class);
});

Route::prefix('moderator')->name('moderator.')->middleware('auth', 'moderator')->group(function () {
    Route::get('/', [ModeratorOverviewController::class, 'index'])->name('index');
    Route::prefix('bimbingan')->name('bimbingan.')->group(function () {
        Route::resource('order', ModeratorOrderController::class)->parameters(['order' => 'order:order_code']);
        // Route::get('order/edit/{order}', [ModeratorOrderController::class, 'edit'])->name('order.edit');
        Route::get('order/{order}/show-online', [ModeratorOrderController::class, 'showOnline'])->name('order.showOnline');
        Route::patch('order/{order:order_code}/update-online', [ModeratorOrderController::class, 'updateBimbinganOnline'])->name('order.updateOnline');
        Route::resource('progress', ProgressController::class);
        Route::put('progress/{progress}/confirm-bimbingan', [ProgressController::class, 'confirmBimbingan'])->name('progress.confirmBimbingan');
        Route::resource('history', ModeratorHistoryBimbinganController::class);
    });
    Route::prefix('tutor')->name('tutor.')->group(function () {
        Route::resource('tutor_list', ModeratorTutorController::class);
        Route::get('tutor_list/schedule/{tutor}', [ModeratorTutorController::class, 'scheduleTutor'])->name('tutorSchedule');
        Route::resource('schedule', ModeratorScheduleTutorController::class);
    });
    Route::resource('overview', ModeratorOverviewController::class);
    Route::resource('setting', ModeratorSettingController::class);
});

Route::get('files/course/download/{fileName}', [FileController::class, 'downloadFileCourse'])->name('file.course.download')->middleware('auth');


require __DIR__ . '/profile/profile.php';
require __DIR__ . '/tutor/tutor.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/socialite.php';
