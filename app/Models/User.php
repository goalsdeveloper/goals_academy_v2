<?php

namespace App\Models;

use Filament\Panel;
use Laravel\Sanctum\HasApiTokens;
use Filament\Models\Contracts\HasName;
use Illuminate\Notifications\Notifiable;
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements HasName, FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable;

    public function canAccessPanel(Panel $panel): bool
    {
        return str_ends_with($this->email, '@goalsacademy.id') && $this->hasVerifiedEmail();
    }

    public function getFilamentName(): string
    {
        return "{$this->username}";
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'user_role',
        'email_verified_at',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
        protected $hidden = [
            'password',
            'remember_token',
        ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    public function order()
    {
        return $this->hasMany(Order::class);
    }

    public function tutor()
    {
        return $this->belongsToMany(Course::class, 'courses', 'tutor_id');
    }

    public function social()
    {
        return $this->hasMany(Social::class);
    }

    public function kodePromo(): BelongsToMany
    {
        return $this->belongsToMany(PromoCode::class);
    }
}
