<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $table = 'educations';
    protected $fillable = ['education'];
    protected $hidden = ['updated_at', 'created_at'];

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}
