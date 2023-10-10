<?php

namespace App\Filament\AdminDashboard\Resources\UserResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Tables\Actions\ActionGroup;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Resources\RelationManagers\RelationManager;

class ProfileRelationManager extends RelationManager
{
    protected static string $relationship = 'profile';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('user_id')
                    ->required()
                    ->disabled()
                    ->maxLength(255),
                TextInput::make('phone_number')
                    ->numeric()
                    ->required(),
                TextInput::make('university')
                    ->required(),
                TextInput::make('major')
                    ->required(),
                FileUpload::make('profile_image')
                    ->directory('user_profile_image')
                    ->image()
                    ->imageEditor(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('user_id')
            ->columns([
                Tables\Columns\ImageColumn::make('profile_image')->label('Photo')->circular(),
                Tables\Columns\TextColumn::make('phone_number'),
                Tables\Columns\TextColumn::make('university'),
                Tables\Columns\TextColumn::make('major'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                // Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ])
            ])
            ->bulkActions([
                // Tables\Actions\BulkActionGroup::make([
                //     Tables\Actions\DeleteBulkAction::make(),
                // ]),
            ]);
    }
}
