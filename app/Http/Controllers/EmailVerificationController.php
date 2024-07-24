<?php

namespace App\Http\Controllers;

use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EmailVerificationController extends Controller
{
    public function notice()
    {
        $user = Auth::user();
        Session::flash('email-send', 'Selamat akun anda telah terdaftar! Silahkan cek email untuk verifikasi akun anda.');
        return Inertia::render('Auth/VerifikasiEmail', [
            'user' => $user,
        ]);
    }


    public function verify(EmailVerificationRequest $request)
    {
        $request->fulfill();
        Session::flash('email-verified', 'Email anda telah terverifikasi, selamat datang di Goals Academy!');
        // return view('auth.email-verification');
        return redirect(RouteServiceProvider::HOME);
    }

    public function resend(Request $request)
    {
        $request->user()->sendEmailVerificationNotification();
        return back()->with('resend', 'Email verifikasi telah dikirim ulang!');
    }
}
