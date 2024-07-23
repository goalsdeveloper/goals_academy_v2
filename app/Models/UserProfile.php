<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'phone_number',
        'university',
        'faculty',
        'major',
        'linkedin_url',
        'profile_image',
        'is_active',
        'rumpun'
    ];

    protected $casts = [
        'is_active' => 'bool'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
