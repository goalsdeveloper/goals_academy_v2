<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Revenue extends Model
{
    use HasFactory;
    protected $fillable = [
        'tutor_id',
        'course_id',
        'revenue_type_id',
        'amount',
        'category',

    ];
    public function tutor()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
    public function revenue_type()
    {
        return $this->belongsTo(RevenueType::class);
    }

    public static function calculateAmount($contact_type, Course $course) {
        $amount = 0;
        $addons_price = $course->addOns->sum('price');
        if($contact_type != 'other') {
            $amount = floor(((($course->products->price / $course->products->total_meet) + $addons_price) * $course->tutor->revenue_type->type) / 100);
        } else {
            $amount = floor((($course->products->price + $addons_price) * $course->tutor->revenue_type->type) / 100);
        }
        return $amount;
    }
}
