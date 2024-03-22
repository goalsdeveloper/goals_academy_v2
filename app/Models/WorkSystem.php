<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkSystem extends Model
{
    use HasFactory;
    protected $fillable = ['worksystem'];
    protected $hidden = ['updated_at', 'created_at'];

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }
}
