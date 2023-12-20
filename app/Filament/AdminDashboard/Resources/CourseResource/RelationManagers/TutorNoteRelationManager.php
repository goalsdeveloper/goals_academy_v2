<?php

namespace App\Filament\AdminDashboard\Resources\CourseResource\RelationManagers;

use App\Models\Course;
use App\Models\TutorNote;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Section;
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
                Group::make()->schema([
                    Section::make()->schema([
                        Forms\Components\Select::make('user_id')
                            ->label('Tutor')
                            ->relationship('tutor', 'name',  fn (Builder $query) => $query->where('user_role', 'tutor'))
                            ->native(false)
                            ->required(),
                        Forms\Components\FileUpload::make('file')
                            ->label('Dokumen')
                            ->directory('file_uploads')
                            ->storeFileNamesIn('file_name'),
                    ])
                ]),
                Group::make()->schema([
                    Section::make()->schema([
                        Forms\Components\MarkdownEditor::make('body')
                            ->label('Catatan')
                            ->required(),
                    ])
                ])
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('id')
            ->columns([
                Tables\Columns\TextColumn::make('body')
                    ->label('Catatan'),
                Tables\Columns\TextColumn::make('file_name')
                    ->label('File'),
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
