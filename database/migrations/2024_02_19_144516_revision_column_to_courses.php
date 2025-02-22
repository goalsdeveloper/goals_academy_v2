<?php

use App\Models\Course;
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
        Schema::table('courses', function (Blueprint $table) {
            $table->boolean('is_user')->default(false);
            $table->foreignIdFor(Course::class, 'parent_id')->nullable()->constrained('courses')->cascadeOnDelete();
            $table->integer('duration_per_meet')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn('is_user');
            $table->dropForeign('courses_parent_id_foreign');
            $table->dropColumn('parent_id');
            $table->dropColumn('duration_per_meet');
        });
    }
};
