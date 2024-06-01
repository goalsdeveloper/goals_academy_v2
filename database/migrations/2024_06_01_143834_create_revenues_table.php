<?php

use App\Models\Course;
use App\Models\RevenueType;
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
        Schema::create('revenues', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, 'tutor_id')->constrained('users')->cascadeOnDelete();
            $table->foreignIdFor(Course::class)->nullable()->constrained('courses')->cascadeOnDelete();
            $table->foreignIdFor(RevenueType::class)->nullable()->constrained('revenue_types')->cascadeOnDelete();
            $table->enum('category', ["pengeluaran", "pemasukan"]);
            $table->bigInteger('amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('revenues');
    }
};
