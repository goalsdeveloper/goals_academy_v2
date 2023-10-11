<?php

namespace App\Filament\AdminDashboard\Resources;

use App\Filament\AdminDashboard\Resources\CourseSessionResource\Pages;
use App\Filament\AdminDashboard\Resources\CourseSessionResource\RelationManagers;
use App\Models\CourseSession;
use Filament\Forms;
use Filament\Forms\Components\TimePicker;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CourseSessionResource extends Resource
{
    protected static ?string $model = CourseSession::class;

    protected static ?string $navigationIcon = 'heroicon-o-clock';

    protected static ?string $navigationGroup = 'Course';

    protected static ?int $navigationSort = 0;

    protected static ?string $navigationLabel = 'Sesi Bimbingan';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TimePicker::make('session')
                    ->seconds(false)
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('session')
                    ->sortable()
                    ->time('H:i')
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCourseSessions::route('/'),
            'create' => Pages\CreateCourseSession::route('/create'),
            'edit' => Pages\EditCourseSession::route('/{record}/edit'),
        ];
    }
}
