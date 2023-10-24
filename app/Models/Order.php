<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpKernel\Profiler\Profile;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'products_id',
        'order_code',
        'quantity',
        'unit_price',
        'status',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    public function products()
    {
        return $this->belongsTo(Products::class);
    }

    public function course()
    {
        return $this->hasOne(Course::class);
    }

    public function paymentMehod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function orderHistory()
    {
        return $this->hasMany(OrderHistory::class);
    }
}
