<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'products_id',
        'order_id',
        'tutor_id',
        'location',
        'date',
        'time',
        'ongoing',
        'is_tutor',
        'is_moderator'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function products()
    {
        return $this->belongsTo(Products::class);
    }
    public function tutor()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    // Define a separate relationship for the condition
    public function userRoleTutor()
    {
        return $this->belongsTo(User::class, 'tutor_id')->where('user_role', 'tutor');
    }
    public function tutorNote()
    {
        return $this->hasMany(TutorNote::class);
    }
}
