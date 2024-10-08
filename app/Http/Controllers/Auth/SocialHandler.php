<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Social;
use App\Models\User;
use App\Models\UserProfile;
use App\Providers\RouteServiceProvider;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class SocialHandler extends Controller
{
    public function redirectToProvider($provider, Request $req)
    {
        Log::info($req->header('User-Agent'));
        return Socialite::driver($provider)
            ->with(['User-Agent' => $req->header('User-Agent') ?? "Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"])
            ->redirect();
    }

    public function handleProviderCallback($provider, Request $req)
    {
        try {
            Log::info($req->header('User-Agent'));
            $user = Socialite::driver($provider)
                ->with(['User-Agent' => $req->header('User-Agent') ?? "Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"])
                ->user();
        } catch (Exception $e) {
            Log::info($e);
            return redirect()->route('auth.login')->with('social_failed', 'Gagal login menggunakan social!');
        }

        $authUser = $this->findOrCreateUser($user, $provider);

        if (!$authUser) {
            Log::info('something wrong!');
        }

        Auth::login($authUser);
        Log::info("User {username} has been Log in using {provider}", ['username' => $user->username, 'provider' => $provider]);

        return redirect()->intended(RouteServiceProvider::HOME)->with('message', 'WELCOME_MESSAGE');
    }

    public function findOrCreateUser($socialUser, $provider)
    {
        $checkSocialExist = Social::where('provider_id', $socialUser->getId())
            ->where('provider_name', $provider)
            ->first();

        if ($checkSocialExist) {
            return $checkSocialExist->user;
        } else {
            $user = User::where('email', $socialUser->getEmail())->first();

            if (!$user) {
                $user = User::create([
                    'username' => $socialUser->getName() . rand('00', '99'),
                    'email' => $socialUser->getEmail(),
                    'email_verified_at' => now(),
                    'password' => Hash::make('password'),
                ]);

                UserProfile::create([
                    'user_id' => $user['id'],
                ]);
            }

            $user->social()->create([
                'provider_id' => $socialUser->getId(),
                'provider_name' => $provider,
            ]);

            return $user;
        }
    }
}
