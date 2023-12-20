<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Notifications\CourseNotification;
use App\Observers\CourseObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'products_id',
        'order_id',
        'tutor_id',
        'city',
        'location',
        'note',
        'date',
        'time',
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

    public function fileUploads()
    {
        return $this->belongsToMany(FileUpload::class);
    }

    public function routeNotificationForMail($notification)
    {
        return $this->user->email;
    }

    public function addOns()
    {
        return $this->belongsToMany(AddOn::class);
    }
}
