<?php

use App\Http\Controllers\Profile\UpdatePasswordController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Tutor\HistoryController;
use App\Http\Controllers\Tutor\ProfileController;
use App\Http\Controllers\Tutor\SettingController;
use App\Http\Controllers\Tutor\OverviewController;
use App\Http\Controllers\Tutor\ProgressController;

Route::middleware(['auth', 'tutor'])->group(function () {
    Route::prefix('tutor')->name('tutor.')->group(function () {
        Route::get('/', [OverviewController::class, 'index'])->name('index');
        Route::get('overview', [OverviewController::class, 'index']);
        Route::prefix('bimbingan')->name('bimbingan.')->group(function () {
            Route::patch('progress/tutor-approve/{progress}', [ProgressController::class, 'tutorApprove'])->name('tutor.tutorApprove');
            Route::post('progress/{progress}', [ProgressController::class, 'update'])->name('progress.update');
            Route::resource('progress', ProgressController::class)->except(['update']);
            Route::resource('history', HistoryController::class)->except(['update', 'edit']);
        });
        Route::get('profile', [ProfileController::class, 'index'])->name('profile');
        Route::put('profile', [ProfileController::class, 'update'])->name('tutor.update');

        Route::get('ubah-password', [ProfileController::class, 'editPassword'])->name('password.update');
        Route::put('ubah-password', [UpdatePasswordController::class, 'store'])->name('password.update.store');
        Route::resource('setting', SettingController::class);

    });

});
