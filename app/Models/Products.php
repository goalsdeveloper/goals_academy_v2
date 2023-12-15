<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'excerpt',
        'description',
        'features',
        'price',
        'date_start',
        'date_end',
        'product_image',
        'is_visible',
        'is_featured',
    ];

    protected $casts = [
        'features' => 'array',
    ];

    public function order()
    {
        return $this->hasMany(Order::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function addOns()
    {
        return $this->belongsToMany(AddOn::class);
    }
}
