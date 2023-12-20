<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'category', 'payment_type', 'admin_fee', 'is_price'
    ];

    public function order()
    {
        return $this->hasMany(Order::class);
    }
}
