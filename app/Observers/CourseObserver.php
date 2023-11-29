<?php

namespace App\Observers;

use App\Models\Course;
use Illuminate\Support\Facades\Log;

class CourseObserver
{
    /**
     * Handle the Course "created" event.
     */
    public function created(Course $course): void
    {
        //
    }

    /**
     * Handle the Course "updated" event.
     */
    public function updated(Course $course): void
    {
        $pesan = "Course" . $course->id . " telah dirubah";

        // $changes = $course->getChanges();
        // Log::info(array_keys($changes));
        $originalt = $course->getOriginal('tutor_id');
        $originalx = $course->getOriginal('location');
        $originaly = $course->getOriginal('date');
        $originalz = $course->getOriginal('time');
        $tutor = $course->wasChanged('tutor_id');
        $location = $course->wasChanged('location');
        $date = $course->wasChanged('date');
        $time = $course->wasChanged('time');
        Log::info($originalt);
        Log::info($originalx);
        Log::info($originaly);
        Log::info($originalz);
        Log::info($tutor);
        Log::info($location);
        Log::info($date);
        Log::info($time);

        //selesaikan pakai if else

    }

    /**
     * Handle the Course "deleted" event.
     */
    public function deleted(Course $course): void
    {
        //
    }

    /**
     * Handle the Course "restored" event.
     */
    public function restored(Course $course): void
    {
        //
    }

    /**
     * Handle the Course "force deleted" event.
     */
    public function forceDeleted(Course $course): void
    {
        //
    }
}
