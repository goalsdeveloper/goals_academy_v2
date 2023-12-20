<?php

namespace App\Filament\AdminDashboard\Resources\UserProfileResource\Pages;

use App\Filament\AdminDashboard\Resources\UserProfileResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateUserProfile extends CreateRecord
{
    protected static string $resource = UserProfileResource::class;
}
