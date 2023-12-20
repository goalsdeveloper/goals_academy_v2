<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TutorNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'body',
        'file_name',
        'slug',
        'file',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($tutorNote) {
            $tutorNote->slug = Str::slug($tutorNote->file_name);
        });
    }

    public function tutor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
