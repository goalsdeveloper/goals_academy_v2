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
        'facilities',
        'price',
        'duration',
        'total_meet',
        'active_period',
        'webinar_properties',
        'product_type_id',
        'category_id',
        'product_image',
        'is_visible',
        'is_facilities',
        'number_list',
    ];

    protected $casts = [
        // 'features' => 'array',
        'facilities' => 'array',
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
    public function topic()
    {
        return $this->belongsToMany(Topic::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    
}
