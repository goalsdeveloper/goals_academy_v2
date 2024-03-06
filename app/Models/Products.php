<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;
    // protected $appends = [
    //     'productType'
    // ];

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
        'category_id',
        'product_image',
        'is_visible',
        'is_facilities',
        'number_list',
    ];

    protected $casts = [
        'facilities' => 'array',
        'form_config' => 'array',
    ];

    public function order()
    {
        return $this->hasMany(Order::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function addOns()
    {
        return $this->belongsToMany(AddOn::class);
    }

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }

    public function topics()
    {
        return $this->belongsToMany(Topic::class);
    }
}
