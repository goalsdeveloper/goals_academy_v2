<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'promo_code', 'description', 'value',
        'date_start', 'date_end',
    ];

    public function user()
    {
        return $this->belongsToMany(User::class);
    }
}
