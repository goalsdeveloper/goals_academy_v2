<?php

use App\Models\Place;
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
            $table->dropColumn('location');
            $table->dropColumn('city');
            $table->foreignIdFor(Place::class)->nullable()->constrained('places')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->string('city');
            $table->string('location');
            $table->dropForeign('courses_place_id_foreign');
            $table->dropColumn('place_id');
        });
    }
};
