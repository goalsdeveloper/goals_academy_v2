<?php

namespace App\Filament\AdminDashboard\Resources\AddOnResource\Pages;

use App\Filament\AdminDashboard\Resources\AddOnResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAddOn extends EditRecord
{
    protected static string $resource = AddOnResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
