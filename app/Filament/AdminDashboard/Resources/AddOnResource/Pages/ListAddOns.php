<?php

namespace App\Filament\AdminDashboard\Resources\AddOnResource\Pages;

use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;
use App\Filament\AdminDashboard\Resources\AddOnResource;

class ListAddOns extends ListRecords
{
    protected static string $resource = AddOnResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->successRedirectUrl(route('filament.dashboard.resources.add-ons.index')),
        ];
    }
}
