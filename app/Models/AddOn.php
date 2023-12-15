<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddOn extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'price'];

    public function products()
    {
        return $this->belongsToMany(Products::class);
    }
}
