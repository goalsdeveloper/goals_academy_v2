<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\SocialHandler;

Route::get('/auth/{provider}', [SocialHandler::class, 'redirectToProvider'])->name('auth.socialRedirect');
Route::get('/auth/{provider}/callback', [SocialHandler::class, 'handleProviderCallback'])->name('auth.socialCallback');
