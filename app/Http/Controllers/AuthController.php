<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function index()
    {
        // LOGIN/REGISTER VIEW HERE...
        return "this is Auth Page!";
    }

    public function login(Request $request)
    {
        // dd(auth()->user()->username);
        $credential = $request->validate([
            'email' => 'required|email:dns',
            'password' => 'required',
        ]);

        if (Auth::attempt($credential)) {
            $request->session()->regenerate();
            $user = auth()->user();
            Log::info("User {username} has been Log in.", ['username' => $user->username]);
            return redirect(RouteServiceProvider::HOME);
        } else {
            return response()->json([
                'message' => 'Gagal login, mohon cek kembali email dan password anda!'
            ]);
        }
    }

    public function register(Request $request)
    {
        // dd($request);
        $validateData = $request->validate([
            'username' => 'required|min:8|max:15',
            'email' => 'required|email:dns|unique:users,email',
            'password' => 'required',
            'confirmation_password' => 'required'
        ]);

        if ($request['password'] !== $request['confirmation_password']) {
            return response()->json([
                'message' => 'Password tidak cocok'
            ]);
        }

        $request['password'] = Hash::make($request['password']);

        $user = User::create($validateData);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }

    public function logout(Request $request)
    {
        Log::info("User {name} has been Log out.", ['name' => auth()->user()->name]);
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect(RouteServiceProvider::HOME);
    }
}
