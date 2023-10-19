<?php

namespace App\Filament\AdminDashboard\Resources\CourseResource\Pages;

use App\Filament\AdminDashboard\Resources\CourseResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateCourse extends CreateRecord
{
    protected static string $resource = CourseResource::class;
}
