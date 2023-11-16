<?php

namespace App\Filament\Tutor\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Course;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Facades\Filament;
use App\Enums\CourseStatusEnum;
use Filament\Resources\Resource;
use Filament\Forms\Components\Group;
use Illuminate\Support\Facades\Auth;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TimePicker;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Tutor\Resources\CourseResource\Pages;
use App\Filament\Tutor\Resources\CourseResource\RelationManagers;
use App\Filament\Tutor\Resources\CourseResource\RelationManagers\TutorNoteRelationManager;
use Filament\Forms\Components\FileUpload;

class CourseResource extends Resource
{
    protected static ?string $model = Course::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Group::make()->schema([
                    Section::make()->schema([
                        Select::make('order_code')
                            ->relationship('order', 'order_code')
                            ->disabled(),
                        Select::make('user_id')
                            ->relationship('user', 'name')
                            ->disabled(),
                        Select::make('product_id')
                            ->relationship('products', 'name')
                            ->disabled()
                    ]),
                    Section::make()->schema([
                        FileUpload::make('attachment')
                            ->directory('file_uploads')
                    ])
                ]),
                Group::make()->schema([
                    Section::make()->schema([
                        Toggle::make('is_tutor')
                            ->label('Tutor Approve')
                            ->default(false)
                            ->helperText('Telah disetujui Tutor'),
                        Toggle::make('is_moderator')
                            ->label('Moderator Approve')
                            ->default(false)
                            ->disabled()
                            ->helperText('Telah disetujui Moderator'),
                        Select::make('ongoing')
                            ->label('Status Bimbingan')
                            ->native(false)
                            ->options([
                                'berjalan' => CourseStatusEnum::ONGOING->value,
                                'selesai' => CourseStatusEnum::SUCCESS->value
                            ])
                    ]),
                    Section::make()->schema([
                        TextInput::make('location')
                            ->label('Lokasi')
                            ->disabled()
                            ->required(),
                        DatePicker::make('date')
                            ->label('Tanggal Pelaksanaan')
                            ->disabled()
                            ->native(false),
                        TimePicker::make('time')
                            ->label('Waktu Bimbingan')
                            ->disabled()
                    ])
                ]),

            ]);
    }

    public static function table(Table $table): Table
    {
        $userId = Auth::user()->id;

        return $table
            ->modifyQueryUsing(function (Builder $query) use ($userId) {
                $query->where('tutor_id', $userId);
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
            TutorNoteRelationManager::class,
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
