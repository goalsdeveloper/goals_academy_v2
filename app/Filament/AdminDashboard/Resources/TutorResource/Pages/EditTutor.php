<?php

namespace App\Filament\AdminDashboard\Resources\TutorResource\Pages;

use App\Filament\AdminDashboard\Resources\TutorResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditTutor extends EditRecord
{
    protected static string $resource = TutorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
