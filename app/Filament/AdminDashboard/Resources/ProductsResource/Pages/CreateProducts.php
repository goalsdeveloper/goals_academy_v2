<?php

namespace App\Filament\AdminDashboard\Resources\ProductsResource\Pages;

use App\Filament\AdminDashboard\Resources\ProductsResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateProducts extends CreateRecord
{
    protected static string $resource = ProductsResource::class;
}
