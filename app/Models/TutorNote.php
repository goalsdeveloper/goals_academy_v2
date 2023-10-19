<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TutorNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'body',
        'file_name',
        'file',
    ];

    public function tutor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
