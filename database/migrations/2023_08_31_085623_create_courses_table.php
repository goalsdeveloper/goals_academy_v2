<?php

use App\Models\CourseSession;
use App\Models\Order;
use App\Models\Products;
use App\Models\Tutor;
use App\Models\User;
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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained('users')->cascadeOnDelete();
            $table->foreignIdFor(Products::class)->constrained('products')->cascadeOnDelete();
            $table->foreignIdFor(Order::class)->constrained('orders')->cascadeOnDelete();
            $table->text('location');
            $table->date('date');
            $table->string('ongoing')->default('berjalan');
            $table->boolean('is_tutor')->default(false);
            $table->boolean('is_moderator')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
