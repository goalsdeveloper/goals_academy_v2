<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddOn extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'price', 'is_visible'];
    protected $hidden = ['created_at', 'updated_at'];
    protected $casts = [
        'is_visible' => 'bool',
    ];

    public function products()
    {
        return $this->belongsToMany(Products::class);
    }

    public function course()
    {
        return $this->belongsToMany(Course::class, 'add_on_course', 'add_on_id', 'course_id');
    }
}
