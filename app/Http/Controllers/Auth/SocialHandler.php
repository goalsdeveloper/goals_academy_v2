<?php

namespace App\Http\Controllers\Auth;

use Exception;
use App\Models\User;
use App\Models\Social;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class SocialHandler extends Controller
{
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback($provider)
    {
        try {
            $user = Socialite::driver($provider)->user();
        } catch (Exception $e) {
            Log::info($e);
            return redirect()->route('login')->with('social_failed', 'Gagal login menggunakan social!');
        }

        $authUser = $this->findOrCreateUser($user, $provider);

        if (!$authUser) {
            Log::info('something wrong!');
        }

        Auth::login($authUser);
        Log::info("User {username} has been Log in using {provider}", ['username' => $user->username, 'provider' => $provider]);

        return redirect(RouteServiceProvider::HOME);
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
            }

            $user->social()->create([
                'provider_id' => $socialUser->getId(),
                'provider_name' => $provider,
            ]);

            return $user;
        }
    }
}
