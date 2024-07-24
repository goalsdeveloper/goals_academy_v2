<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    use HasFactory;
    protected $fillable = ['place', 'city_id', 'is_visible'];
    protected $hidden = ['created_at', 'updated_at'];

    protected $casts = [
        'is_visible' => 'bool',
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }
    public function course()
    {
        return $this->hasMany(Course::class);
    }
}
