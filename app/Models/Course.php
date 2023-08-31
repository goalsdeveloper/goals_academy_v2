<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_note',
        'location',
        'date',
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
        return $this->hasOne(TutorNote::class);
    }
    public function courseSession()
    {
        return $this->belongsTo(CourseSession::class);
    }
}
