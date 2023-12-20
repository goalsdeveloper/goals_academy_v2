<?php

namespace App\Filament\Tutor\Resources\CourseResource\RelationManagers;

use Filament\Forms;
use App\Models\User;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Forms\Components\Group;
use Illuminate\Support\Facades\Auth;
use Filament\Forms\Components\Section;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Resources\RelationManagers\RelationManager;

class TutorNoteRelationManager extends RelationManager
{
    protected static string $relationship = 'TutorNote';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Group::make()->schema([
                    Section::make()->schema([
                        Forms\Components\Select::make('user_id')
                            ->label('Tutor')
                            ->relationship('tutor', 'name',  fn (Builder $query) => $query->where('id', Auth::user()->id))
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
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
