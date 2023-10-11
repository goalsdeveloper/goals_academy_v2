<?php

namespace App\Filament\AdminDashboard\Resources;

use Filament\Forms;
use App\Models\User;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use App\Enums\UserRoleEnum;
use Filament\Resources\Resource;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Forms\Components\DateTimePicker;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\AdminDashboard\Resources\UserResource\Pages;
use App\Filament\AdminDashboard\Resources\UserResource\RelationManagers;
use App\Filament\AdminDashboard\Resources\UserResource\RelationManagers\ProfileRelationManager;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-s-user-group';

    protected static ?string $navigationGroup = 'Kelola User';

    protected static ?int $navigationSort = 0;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('username')
                    ->required(),
                TextInput::make('email')
                    ->required()
                    ->email(),
                TextInput::make('name')
                    ->required(),
                Select::make('user_role')
                    ->native(false)
                    ->required()
                    ->options([
                        'user' => UserRoleEnum::USER->value,
                        'tutor' => UserRoleEnum::TUTOR->value,
                        'moderator' => UserRoleEnum::MODERATOR->value,
                        'admin' => UserRoleEnum::ADMIN->value,
                    ]),
                DateTimePicker::make('email_verified_at')
                    ->default(now()),
                TextInput::make('password')
                    ->required()
                    ->password()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('profile.profile_image')
                    ->label('Photo')
                    ->circular(),
                TextColumn::make('name')
                    ->label('Name')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('username')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('email')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('user_role')
                    ->sortable()
                    ->searchable(),
            ])
            ->filters([
                SelectFilter::make('user_role')
                    ->multiple()
                    ->options([
                        'admin' => 'Admin',
                        'tutor' => 'Tutor',
                        'moderator' => 'Moderator',
                        'user' => 'User',
                    ])
                    ->native(false),
            ])
            ->actions([
                ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ])
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            ProfileRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
