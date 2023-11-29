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

    public function fileUploads()
    {
        return $this->belongsToMany(FileUpload::class);
    }

    public function routeNotificationForMail($notification)
    {
        return $this->user->email;
    }

    public function sendCourseNotification($attribute, $oldValue, $newValue)
    {
        $oldValue = $oldValue ? $oldValue : null;
        if ($attribute == 'location') {
            if ($oldValue != null) {
                $this->notify(new CourseNotification("Lokasi anda dirubah dari $oldValue ke $newValue"));
            } else {
                $this->notify(new CourseNotification("Lokasi anda berada di $newValue"));
            }
        } elseif ($attribute == 'date') {
            $this->notify(new CourseNotification("Tanggal bimbingan dirubah dari $oldValue ke $newValue"));
        } elseif ($attribute == 'time') {
            if ($oldValue != null) {
                $this->notify(new CourseNotification("Waktu bimbingan anda dirubah dari $oldValue ke $newValue"));
            } else {
                $this->notify(new CourseNotification("Waktu bimbingan anda adalah $newValue"));
            }
        }
    }
}
