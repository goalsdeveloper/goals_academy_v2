<?php

namespace App\Filament\Tutor\Resources\CourseResource\Pages;

use App\Filament\Tutor\Resources\CourseResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateCourse extends CreateRecord
{
    protected static string $resource = CourseResource::class;
}
