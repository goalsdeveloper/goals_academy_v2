<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'slug',
        'image',
        'requirement',
        'responsibility',
        'division_id',
        'location_id',
        'type_job',
        'work_system',
        'education',
        'experience',
       
    ];

    protected $hidden = ['id'];

    protected $casts = [
        'type_job' => 'array',
        'work_system' => 'array',
        'education' => 'array',
        'experience' => 'array',
    ];
    public function division()
    {
        return $this->belongsTo(Division::class);
    }
    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
