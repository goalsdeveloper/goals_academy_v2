<?php

namespace App\Filament\AdminDashboard\Resources\CourseSessionResource\Pages;

use App\Filament\AdminDashboard\Resources\CourseSessionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCourseSessions extends ListRecords
{
    protected static string $resource = CourseSessionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
