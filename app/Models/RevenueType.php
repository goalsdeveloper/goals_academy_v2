<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RevenueType extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
    ];

    public function tutors()
    {
        return $this->hasMany(User::class);
    }
    public function revenues()
    {
        return $this->hasMany(Revenue::class);
    }
}
