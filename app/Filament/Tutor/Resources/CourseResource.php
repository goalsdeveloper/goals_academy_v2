<?php

namespace App\Filament\Tutor\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Course;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Facades\Filament;
use Filament\Resources\Resource;
use Illuminate\Support\Facades\Auth;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Tutor\Resources\CourseResource\Pages;
use App\Filament\Tutor\Resources\CourseResource\RelationManagers;

class CourseResource extends Resource
{
    protected static ?string $model = Course::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        $userId = Auth::user()->id;

        return $table
            ->modifyQueryUsing(function (Builder $query) use ($userId) {
                $query->join('tutor_courses', 'courses.id', '=', 'tutor_courses.course_id')
                    ->join('users', 'users.id', '=', 'courses.user_id') // Ubah join ke tabel users
                    ->where('tutor_courses.user_id', $userId);
            })
            ->columns([
                TextColumn::make('user.name')
                    ->label('Customer')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('products.name')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('tutor.name')
                    ->label('Tutor')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('date')
                    ->label('Tanggal')
                    ->date()
                    ->sortable(),
                TextColumn::make('location')
                    ->label('Lokasi')
                    ->wrap(),
                TextColumn::make('ongoing')
                    ->label('Status')
                    ->sortable(),
                TextColumn::make('order.status')
                    ->label('Pembayaran')
                    ->sortable(),
                IconColumn::make('is_tutor')
                    ->label('Tutor')
                    ->sortable()
                    ->boolean(),
                IconColumn::make('is_moderator')
                    ->label('Moderator')
                    ->sortable()
                    ->boolean(),
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
            'index' => Pages\ListCourses::route('/'),
            'create' => Pages\CreateCourse::route('/create'),
            'edit' => Pages\EditCourse::route('/{record}/edit'),
        ];
    }
}
