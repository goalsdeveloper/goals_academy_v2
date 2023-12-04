<?php

namespace App\Http\Controllers\Profile;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class NotificationProfileController extends Controller
{
    public function index()
    {
        //retrieve notification 
        $notifications = Auth::user()->notifications;
        return Inertia::render('Auth/User/Notifikasi', [
            'notifications' => $notifications,
        ]);
    }
}
