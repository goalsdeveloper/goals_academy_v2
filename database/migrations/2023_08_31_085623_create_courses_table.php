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
            $table->foreignIdFor(User::class);
            $table->foreignIdFor(Products::class);
            $table->foreignIdFor(Order::class);
            $table->foreignIdFor(Tutor::class);
            $table->foreignIdFor(CourseSession::class);
            $table->text('user_note');
            $table->text('location');
            $table->date('date');
            $table->boolean('ongoing')->default(true);
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
