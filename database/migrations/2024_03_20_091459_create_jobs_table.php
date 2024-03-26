<?php

use App\Models\Division;
use App\Models\Location;
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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Division::class)->nullable()->constrained('topics');
            $table->foreignIdFor(Location::class)->nullable()->constrained('topics');
            $table->string('title');
            $table->string('slug');
            $table->text('image');
            $table->longtext('requirement');
            $table->longtext('responsibility');
            $table->json('type_job')->nullable();
            $table->json('work_system')->nullable();
            $table->json('education')->nullable();
            $table->json('experience')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
