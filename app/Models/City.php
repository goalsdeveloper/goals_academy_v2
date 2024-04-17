<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;
    protected $fillable = ['city'];
    protected $hidden = ['updated_at', 'created_at'];

    public function places()
    {
        return $this->hasMany(Place::class);
    }
    public function jobs()
    {
        return $this->hasMany(Job::class);
    }

}
