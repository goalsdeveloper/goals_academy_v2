<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReview extends Model
{
    use HasFactory;
    protected $fillable = [
        'course_id', 'rate_product', 'rate_tutor', 'note_tutor', 'note_product'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

}
