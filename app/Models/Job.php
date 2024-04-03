<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;
    protected $fillable = [
        'division_id',
        'city_id',
        'work_system_id',
        'type_job_id',
        'experience_id',
        'education_id',
        'title',
        'slug',
        'image',
        'requirement',
        'responsibility',
    ];

    public function division()
    {
        return $this->belongsTo(Division::class);
    }
    public function city()
    {
        return $this->belongsTo(City::class);
    }
    public function workSystem()
    {
        return $this->belongsTo(WorkSystem::class);
    }
    public function typeJob()
    {
        return $this->belongsTo(TypeJob::class);
    }
    public function experience()
    {
        return $this->belongsTo(Experience::class);
    }
    public function education()
    {
        return $this->belongsTo(Education::class);
    }
    public function participants()
    {
        return $this->belongsTo(Participant::class);
    }
}
