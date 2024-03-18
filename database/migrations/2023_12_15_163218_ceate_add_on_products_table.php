<?php

use App\Models\AddOn;
use App\Models\Products;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('add_on_products', function (Blueprint $table) {
            $table->foreignIdFor(AddOn::class)->constrained('add_ons')->cascadeOnDelete();
            $table->foreignIdFor(Products::class)->constrained('products')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('add_on_products');
    }
};
