<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;
    protected $fillable = [
        'topic'
    ];

    public function products() {
        return $this->belongsToMany(Products::class);
    }
}
