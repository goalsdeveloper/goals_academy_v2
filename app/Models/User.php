<?php

namespace App\Models;

// use Filament\Panel;
use Laravel\Sanctum\HasApiTokens;
// use Filament\Models\Contracts\HasName;
use Illuminate\Notifications\Notifiable;
// use Filament\Models\Contracts\FilamentUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    public function canAccessPanel(Panel $panel): bool
    {
        return str_ends_with($this->email, '@goalsacademy.id') && $this->hasVerifiedEmail();
    }

    // public function getFilamentName(): string
    // {
    //     return "{$this->username}";
    // }

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
        'revenue_type_id',
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

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            $user->name = explode('@', $user->email)[0];
        });
    }

    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    public function order()
    {
        return $this->hasMany(Order::class);
    }

    public function course()
    {
        return $this->hasMany(Course::class, 'user_id');
    }

    public function tutor()
    {
        return $this->hasMany(Course::class, 'tutor_id');
    }

    public function social()
    {
        return $this->hasMany(Social::class);
    }

    public function kodePromo(): BelongsToMany
    {
        return $this->belongsToMany(PromoCode::class);
    }

    public function user_role()
    {
        return $this->user_role;
    }

    public function skills() {
        return $this->belongsToMany(Skill::class, 'user_skills');
    }
    public function revenue_type()
    {
        return $this->belongsTo(RevenueType::class);
    }

    public function revenue() {
        return $this->hasMany(Revenue::class, 'tutor_id');
    }
}
