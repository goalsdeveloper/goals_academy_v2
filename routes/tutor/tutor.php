<?php

use App\Http\Controllers\Tutor\HistoryController;
use App\Http\Controllers\Tutor\ProfileController;
use App\Http\Controllers\Tutor\ProgressController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'tutor'])->group(function () {
    Route::prefix('tutor')->name('tutor.')->group(function () {
        Route::get('overview', function () {
            return Inertia::render('Auth/Tutor/Overview/Overview');
        });
        Route::prefix('bimbingan')->name('bimbingan.')->group(function () {
            Route::patch('progress/tutor-approve/{course}', [ProgressController::class, 'tutorApprove'])->name('tutor.tutorApprove');
            Route::resource('progress', ProgressController::class, ['as' => 'tutor']);
            Route::get('history', [HistoryController::class, 'index'])->name('tutor.history');
        });
        Route::get('profile', [ProfileController::class, 'index'])->name('tutor.profile');
        Route::put('profile', [ProfileController::class, 'update'])->name('tutor.update');
    });

});
