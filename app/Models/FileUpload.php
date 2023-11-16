<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileUpload extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id', 'filename', 'basename', 'path'
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class);
    }
}
