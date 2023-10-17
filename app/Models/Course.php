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

    protected $attributes = [
        'course_session_id' => 1
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
        return $this->belongsToMany(User::class, 'tutor_courses', 'course_id', 'user_id');
    }
    public function tutorNote()
    {
        return $this->hasMany(TutorNote::class);
    }
}
