<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Moodle;
use App\Models\User;
use App\Models\UserProfile;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            return redirect()->intended(RouteServiceProvider::HOME);
        }
        // LOGIN/REGISTER VIEW HERE...
        return Inertia::render('Auth/Form', ['title' => 'login']);
    }

    public function login(Request $request)
    {
        $validateData = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if (Auth::attempt($validateData, true)) {
            $request->session()->regenerate();
            $user = auth()->user();
            Log::info("User {username} has been Log in.", ['username' => $user->username]);
            return redirect()->intended(RouteServiceProvider::HOME);
        } else {
            return redirect()->back()->with('message', ['login' => 'Email or password is invalid!']);
        }
    }

    public function register(Request $request)
    {
        $validateData = $request->validate([
            'username' => 'required|min:8|unique:users,username',
            'email' => 'required|email:dns|unique:users,email',
            'password' => 'required|min:8',
            'confirmation_password' => 'required|min:8|same:password',
        ]);

        $request['password'] = Hash::make($request['password']);

        $user = User::create($validateData);

        $userProfile = UserProfile::create([
            'user_id' => $user['id'],
        ]);

        // event(new Registered($user));
        Mail::send();

        Auth::login($user, true);

        if ($user->email_verified_at == null) {
            return redirect()->route('verification.notice');
        }

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    public function logout(Request $request)
    {
        Log::info("User {name} has been Log out.", ['name' => auth()->user()->name]);
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect(RouteServiceProvider::HOME);
    }

    public function forgot_password(Request $req)
    {
        $req->validate(['email' => 'required|email']);
        $status = Password::sendResetLink(
            $req->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? back()->with('success', 'Email berhasil dikirim, silahkan cek email')
            : back()->withErrors(['error', 'Silahkan cek alamat email atau inbox email']);
    }

    public function reset_password(Request $req)
    {
        try {
            $req->validate([
                'token' => 'required',
                'email' => 'required|email',
                'password' => 'required|min:8|confirmed',
            ]);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return redirect()->back()->with('error', $th->getMessage());
        }
        $status = Password::reset(
            $req->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? redirect()->route('auth.index')
            : redirect()->back()->withErrors(['error', 'Terjadi Kesalahan']);
    }

    public function redirecting_to_ecourse()
    {
        try {
            $user = Auth::user();
            $moodle = new Moodle();
            $res = $moodle->auth_request($user);
            if (!$res->loginurl) {
                return redirect()->back();
            }
            return Inertia::location($res->loginurl);
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
    }
}
