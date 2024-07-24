<?php

use App\Models\City;
use App\Models\Division;
use App\Models\Education;
use App\Models\Experience;
use App\Models\TypeJob;
use App\Models\WorkSystem;
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
            $table->foreignIdFor(Division::class)->nullable()->constrained('divisions');
            $table->foreignIdFor(City::class)->nullable()->constrained('cities');
            $table->foreignIdFor(WorkSystem::class)->nullable()->constrained('work_systems');
            $table->foreignIdFor(TypeJob::class)->nullable()->constrained('type_jobs');
            $table->foreignIdFor(Experience::class)->nullable()->constrained('experiences');
            $table->foreignIdFor(Education::class)->nullable()->constrained('educations');
            $table->string('title');
            $table->string('slug');
            $table->text('image');
            $table->longtext('requirement');
            $table->longtext('responsibility');
           
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
