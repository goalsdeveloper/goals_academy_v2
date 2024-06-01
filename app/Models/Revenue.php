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
        'revenue_id',
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
}
