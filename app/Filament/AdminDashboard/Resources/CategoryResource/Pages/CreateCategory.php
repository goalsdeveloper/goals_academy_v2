<?php

namespace App\Filament\AdminDashboard\Resources\CategoryResource\Pages;

use App\Filament\AdminDashboard\Resources\CategoryResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateCategory extends CreateRecord
{
    protected static string $resource = CategoryResource::class;
}
