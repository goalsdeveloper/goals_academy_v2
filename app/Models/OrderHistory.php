<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'payload',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
