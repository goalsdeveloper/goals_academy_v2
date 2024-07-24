<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Category extends Model
{
    use HasFactory;

    protected $guarded = 'id';

    protected $fillable = [
        'name', 'slug',
        // 'parent_id',
        'is_visible',
        'description'
    ];

    protected $hidden = ['created_at', 'updated_at'];

    protected $casts = [
        'is_visible' => 'bool',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function child(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function products()
    {
        return $this->hasMany(Products::class);
    }
    public function productType(): BelongsTo
    {
        return $this->belongsTo(ProductType::class);
    }
}
