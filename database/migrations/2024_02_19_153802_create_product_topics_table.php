<?php

use App\Models\Products;
use App\Models\Topic;
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
        Schema::create('product_topics', function (Blueprint $table) {
            $table->foreignIdFor(Topic::class)->constrained('topics')->cascadeOnDelete();
            $table->foreignIdFor(Products::class)->constrained('products')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_topics');
    }
};
