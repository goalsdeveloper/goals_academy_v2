<?php

namespace App\Filament\AdminDashboard\Resources\CourseSessionResource\Pages;

use App\Filament\AdminDashboard\Resources\CourseSessionResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateCourseSession extends CreateRecord
{
    protected static string $resource = CourseSessionResource::class;
}
