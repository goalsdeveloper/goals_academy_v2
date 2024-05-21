<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;
    protected $fillable = [
        'topic',
        'slug',
        'is_visible'
    ];

    public function products() {
        return $this->belongsToMany(Products::class);
    }
}
