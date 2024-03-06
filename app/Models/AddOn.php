<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddOn extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'price'];
    protected $hidden = ['created_at', 'updated_at'];

    public function products()
    {
        return $this->belongsToMany(Products::class);
    }

    public function course()
    {
        return $this->belongsToMany(Course::class);
    }
}
