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

    protected $casts = [
        'is_visible' => 'bool',
    ];

    public function products() {
        return $this->belongsToMany(Products::class);
    }
}
