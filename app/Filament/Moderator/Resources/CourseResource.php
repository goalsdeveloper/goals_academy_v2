<?php

namespace App\Filament\Moderator\Resources;

use Filament\Forms;
use App\Models\User;
use Filament\Tables;
use App\Models\Order;
use App\Models\Course;
use Filament\Forms\Set;
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
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TimePicker;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Moderator\Resources\CourseResource\Pages;
use App\Filament\Moderator\Resources\CourseResource\RelationManagers;
use App\Filament\Moderator\Resources\CourseResource\RelationManagers\FileUploadsRelationManager;

class CourseResource extends Resource
{
    protected static ?string $model = Course::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Group::make()->schema([
                    Section::make('Bimbingan Info')->schema([
                        Select::make('order_id')
                            ->disabled()
                            ->label('Order Code')
                            ->relationship('order', 'order_code')
                            ->required()
                            ->native(false)
                            ->reactive()
                            ->afterStateUpdated(fn (Set $set, $state) => $set('user_id', Order::find($state)->user_id ?? 0)),
                        Select::make('user_id')
                            ->disabled()
                            ->label('Customer Name')
                            ->relationship('user', 'name')
                            ->native(false)
                            ->required(),
                        Select::make('products_id')
                            ->disabled()
                            ->label('Product')
                            ->relationship('products', 'name')
                            ->native(false)
                            ->required(),
                        Select::make('tutor_id')
                            ->label('Tutor')
                            ->relationship('userRoleTutor', 'name', function (Builder $query) {
                                // This condition will be applied through the pre-loaded relationship
                            })
                            ->options(
                                User::where('user_role', 'tutor')->pluck('name', 'id')
                            )
                            ->searchable()
                            ->required(),
                    ])
                ]),
                Group::make()->schema([
                    Section::make()->schema([
                        Toggle::make('is_tutor')
                            ->disabled()
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
                        TimePicker::make('time')
                            ->label('Waktu Bimbingan')
                            ->seconds(false)
                            ->format('H:i')
                        // ->native(false)
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
                TextColumn::make('time')
                    ->label('Waktu')
                    ->time('H:i')
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
            FileUploadsRelationManager::class,
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
