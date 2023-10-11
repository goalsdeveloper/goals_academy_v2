<?php

namespace App\Filament\AdminDashboard\Resources\OrderResource\Pages;

use App\Filament\AdminDashboard\Resources\OrderResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateOrder extends CreateRecord
{
    protected static string $resource = OrderResource::class;
}
