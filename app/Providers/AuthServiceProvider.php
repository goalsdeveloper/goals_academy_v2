<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Mail\User\Auth\EmailVerification;
use App\Mail\User\Auth\ResetPassword as AuthResetPassword;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return (new EmailVerification($notifiable))->to($notifiable->email);
        });
        ResetPassword::toMailUsing(function ($notifiable, $token) {
            return (new AuthResetPassword($notifiable))->to($notifiable->email);
        });
    }
}
