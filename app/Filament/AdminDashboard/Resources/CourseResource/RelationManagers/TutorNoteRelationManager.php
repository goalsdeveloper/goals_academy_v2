<?php

namespace App\Filament\AdminDashboard\Resources\CourseResource\RelationManagers;

use App\Models\Course;
use App\Models\TutorNote;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TutorNoteRelationManager extends RelationManager
{
    protected static string $relationship = 'tutorNote';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('Tutor')
                    ->relationship('tutor', 'name',  fn (Builder $query) => $query->where('user_role', 'tutor'))
                    ->native(false)
                    ->required(),
                // Forms\Components\Select::make('course_id')
                // ->label('Tutor')
                // ->relationship('course', 'id')
                // ->native(false)
                // ->required(),
                Forms\Components\MarkdownEditor::make('body')
                    ->label('Catatan')
                    ->required(),
                Forms\Components\TextInput::make('file')
                    ->label('Dokumen')
                    ->required(),
                Forms\Components\TextInput::make('file_name')
                    ->required(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('id')
            ->columns([
                Tables\Columns\TextColumn::make('body')
                    ->label('Catatan'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->label('Beri catatan baru'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([]);
    }
}
