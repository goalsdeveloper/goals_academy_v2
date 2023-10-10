<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'products_id',
        'order_id',
        'tutor_id',
        'course_session_id',
        'location',
        'date',
        'ongoing',
        'is_tutor',
        'is_moderator'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function order()
    {
        return $this->hasOne(Order::class);
    }
    public function products()
    {
        return $this->belongsTo(Products::class);
    }
    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }
    public function tutorNote()
    {
        return $this->hasMany(TutorNote::class);
    }
    public function courseSession()
    {
        return $this->belongsTo(CourseSession::class);
    }
}
