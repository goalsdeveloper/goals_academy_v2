<?php

namespace App\Filament\AdminDashboard\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Course;
use Filament\Forms\Form;
use Filament\Tables\Table;
use App\Enums\CourseStatusEnum;
use Filament\Resources\Resource;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Actions\ActionGroup;
use Filament\Forms\Components\DatePicker;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\AdminDashboard\Resources\CourseResource\Pages;
use App\Filament\AdminDashboard\Resources\CourseResource\RelationManagers;
use App\Filament\AdminDashboard\Resources\CourseResource\RelationManagers\OrderRelationManager;
use App\Filament\AdminDashboard\Resources\CourseResource\RelationManagers\TutorRelationManager;
use Filament\Tables\Filters\TernaryFilter;

class CourseResource extends Resource
{
    protected static ?string $model = Course::class;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';

    protected static ?string $navigationGroup = 'Course';

    protected static ?int $navigationSort = 0;

    protected static ?string $navigationLabel = 'Daftar Bimbingan';

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('ongoing', '=', 'berjalan')->count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return static::getModel()::where('ongoing', '=', 'berjalan')->count() > 0
            ? 'warning'
            : '';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Group::make()->schema([
                    Section::make('Bimbingan Info')->schema([
                        Select::make('order_id')
                            ->label('Order Code')
                            ->relationship('order', 'order_code')
                            ->native(false)
                            ->required(),
                        Select::make('user_id')
                            ->label('Customer Name')
                            ->relationship('user', 'name')
                            ->native(false)
                            ->required(),
                        Select::make('products_id')
                            ->label('Product')
                            ->relationship('products', 'name')
                            ->native(false)
                            ->required(),
                        Select::make('tutor_id')
                            ->label('Tutor')
                            ->relationship('user', 'name', fn (Builder $query) => $query->where('user_role', 'tutor'))
                            ->native(false)
                            ->required(),
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
                            ->required(),
                        DatePicker::make('date')
                            ->label('Tanggal Pelaksanaan')
                            // ->format('d/m/Y')
                            ->native(false),

                        Select::make('course_session_id')
                            ->relationship('courseSession', 'session')
                            ->native(false),
                    ])
                ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
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
                IconColumn::make('is_tutor')
                    ->label('Tutor')
                    ->sortable()
                    ->boolean(),
                IconColumn::make('is_moderator')
                    ->label('Moderator')
                    ->sortable()
                    ->boolean(),
            ])
            ->defaultSort('ongoing', 'asc')
            ->filters([
                TernaryFilter::make('ongoing')
                    ->label('Status Bimbingan')
                    ->trueLabel('Sedang berjalan')
                    ->falseLabel('Telah selesai')
                    ->queries(
                        true: fn (Builder $query) => $query->where('ongoing', 'berjalan'),
                        false: fn (Builder $query) => $query->where('ongoing', 'selesai'),
                        // blank: fn (Builder $query) => $query->withoutTrashed(),
                    )
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
            OrderRelationManager::class,
            TutorRelationManager::class
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
