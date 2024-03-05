<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpKernel\Profiler\Profile;
use Illuminate\Support\Str;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'products_id',
        'payment_method_id',
        'order_code',
        'quantity',
        'unit_price',
        'status',
        'form_result',
        'add_ons',
    ];

    protected $hidden = ['id'];

    protected $casts = [
        'add_ons' => 'json',
        'form_result' => 'json',
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

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function orderHistory()
    {
        return $this->hasMany(OrderHistory::class);
    }

    static function generateOrderCode()
    {
        return 'GA' . str(now()->format('YmdHis')) . strtoupper(Str::random(4));
    }
}
