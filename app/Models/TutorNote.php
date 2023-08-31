<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TutorNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'body',
        'file_name',
        'file',
    ];

    public function course()
    {
        return $this->hasOne(Course::class);
    }
}
