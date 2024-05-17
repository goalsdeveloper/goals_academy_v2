<?php

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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->string('excerpt');
            $table->text('description');
            $table->string('features');
            $table->enum('contact_type',["online","offline","other","hybrid"]);
            $table->unsignedBigInteger('price');
            $table->longText('product_image')->nullable();
            $table->dateTime('date_start')->nullable();
            $table->dateTime('date_end')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
