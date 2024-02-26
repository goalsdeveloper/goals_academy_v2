<?php

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
        Schema::table('products', function (Blueprint $table) {
            $table->integer('number_list');
            $table->integer('duration')->nullable();
            $table->integer('total_meet');
            $table->integer('active_period');
            $table->json('webinar_properties')->nullable();
            $table->json('facilities')->nullable();
            $table->renameColumn('is_featured', 'is_facilities');
            $table->dropColumn('features');
            $table->dropColumn('date_start');
            $table->dropColumn('date_end');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('products', function (Blueprint $table) {
        //     $table->dropForeign('products_topic_id_foreign');
        // });
    }
};
