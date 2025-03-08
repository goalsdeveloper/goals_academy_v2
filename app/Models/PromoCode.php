<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PromoCode extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'promo_code', 'description', 'value',
        'date_start', 'date_end', 'is_price'
    ];

    public function user()
    {
        return $this->belongsToMany(User::class);
    }
}
