<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
    protected $fillable = ['city', 'is_visible'];
    protected $hidden = ['updated_at', 'created_at'];

    protected $casts = [
        'is_visible' => 'bool',
    ];

    public function places()
    {
        return $this->hasMany(Place::class);
    }
    public function jobs()
    {
        return $this->hasMany(Job::class);
    }

}
