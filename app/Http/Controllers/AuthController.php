<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function index()
    {
        // LOGIN/REGISTER VIEW HERE...
        return Inertia::render('Auth/Form', ['title' => 'login']);
    }

    public function login(Request $request)
    {
        // dd(auth()->user()->username);
        // $credential = $request->validate([
        //     'email' => 'required|email:dns',
        //     'password' => 'required',
        // ]);
        $credential = Validator::make($request->all(), [
            'email' => 'required|email:dns',
            'password' => 'required|min:8',
        ]);

        if ($credential->fails()) {
            return back()
                ->withErrors($credential)
                ->withInput();
        }

        if (Auth::attempt($credential->validate(), true)) {
            $request->session()->regenerate();
            $user = auth()->user();
            Log::info("User {username} has been Log in.", ['username' => $user->username]);
            return redirect(RouteServiceProvider::HOME);
        } else {
            // return redirect()->back()->with('message', ['login' => $credential->errors()->messages()]);
        }
    }

    public function register(Request $request)
    {
        dd($request);
        // $validateData = Validator::make($request->all(), [
        //     'username' => 'required|min:8|max:15',
        //     'email' => 'required|email:dns|unique:users,email',
        //     'password' => 'required',
        //     'confirmation_password' => 'required'
        // ]);

        // if ($validateData->fails()) {
        //     return response()->json(['message' => 'gagal']);
        // }

        // if ($request['password'] !== $request['confirmation_password']) {
        //     return response()->json([
        //         'message' => 'Password tidak cocok'
        //     ]);
        // }

        // $request['password'] = Hash::make($request['password']);

        // $user = User::create($validateData->validate());

        // $userProfile = UserProfile::create([
        //     'user_id' => $user['id'],
        // ]);

        // event(new Registered($user));

        // Auth::login($user, true);

        // return redirect(RouteServiceProvider::HOME);
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
