<?php

namespace App\Http\Controllers\Auth;

use Exception;
use App\Models\Social;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
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
            return redirect()->route('auth.login')->with('social_failed', 'Gagal login menggunakan social!');
        }

        $authUser = $this->findOrCreateUser($user, $provider);

        if (!$authUser) {
            Log::info('something wrong!');
        }

        Auth::login($authUser, true);
        Log::info("User {username} has been Log in using {provider}", ['username' => $user->username, 'provider' => $provider]);

        return redirect(RouteServiceProvider::HOME);
    }

    public function findOrCreateUser($socialUser, $provider)
    {
        $checkSocialExist = Social::where('provider_id', $socialUser->getId())
            ->where('provider_name', $provider)
            ->first();

        if (!$checkSocialExist) {
            $checkUser = User::where('email', $socialUser->getEmail())->first();

            if (!$checkUser) {
                $createNewUser = User::create([
                    'username' => $socialUser->getName() . rand('00', '99'),
                    'email' => $socialUser->getEmail(),
                    'email_verified_at' => now(),
                    'password' => Hash::make('password'),
                ]);
                $createNewUser->social()->create([
                    'provider_id' => $socialUser->getId(),
                    'provider_name' => $provider,
                ]);
                return $createNewUser;
            }
            return $checkUser;
        }

        return $checkSocialExist->user;
    }
}
