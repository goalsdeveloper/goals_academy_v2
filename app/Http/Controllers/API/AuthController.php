<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)
            ->whereHas('profile', function ($query) {
                $query->where('is_active', '1');
            })
            ->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['The Provided credentials is incorrect.']
            ]);
        }

        if (!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The Provided credentials is incorrect.']
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out successfully.'
        ]);
    }

    public function loginValidation(Request $request)
    {
        $credential = Validator::make($request->all(), [
            'email' => 'required|email:dns|exists:users,email',
            'password' => 'required|min:8',
        ]);

        if ($credential->fails()) {
            return response()->json(['message' => 'Email atau password Anda salah!'], 422);
        }

        $user = User::where('email', $request->email)->first();


        if ($user && $user->profile && $user->profile->is_active == '1') {
            $data = [
                'email' => $request->get('email'),
                'password' => $request->get('password')
            ];

            if (Auth::attempt($data, true)) {
                return response()->json(['success' => 'Validasi berhasil!']);
            } else {
                return response()->json(['message' => 'Email atau password Anda salah!'], 422);
            }
        } else {
            return response()->json(['message' => 'Akun Anda tidak aktif.'], 403);
        }
    }

    public function registerValidation(Request $request)
    {
        $credential = Validator::make($request->all(), [
            'username' => 'required|min:8|unique:users,username',
            'email' => 'required|email:dns|unique:users,email',
            'password' => 'required|min:8',
            'confirmation_password' => 'required|min:8|same:password'
        ]);

        if ($credential->fails()) {
            return response()->json($credential->errors());
        } else {
            return response()->json(['success' => 'Validasi berhasil!']);
        };
    }
}
