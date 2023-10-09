<?php

namespace App\Filament\AdminDashboard\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Order;
use Filament\Forms\Set;
use App\Enums\OrderEnum;
use App\Models\Products;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Wizard;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Actions\ActionGroup;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Wizard\Step;
use Filament\Forms\Components\MarkdownEditor;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\AdminDashboard\Resources\OrderResource\Pages;
use App\Filament\AdminDashboard\Resources\OrderResource\RelationManagers;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-m-shopping-cart';

    protected static ?string $navigationGroup = 'Produk';

    protected static ?int $navigationSort = 2;

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('status', '=', 'pending')->count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return static::getModel()::where('status', '=', 'pending')->count() > 0
            ? 'success'
            : '';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Wizard::make([
                    Step::make('Order Information')->schema([
                        TextInput::make('order_code')
                            ->disabled()
                            ->default('GA' . rand(0000, 9999))
                            ->unique(Order::class, 'order_code', ignoreRecord: true)
                            ->dehydrated()
                            ->required(),
                        Select::make('user_id')
                            ->relationship('user', 'email')
                            ->native(false)
                            ->required(),
                        Select::make('status')
                            ->options([
                                'Pending' => OrderEnum::PENDING->value,
                                'Success' => OrderEnum::SUCCESS->value,
                                'Failed' => OrderEnum::FAILED->value,
                            ])
                            ->required()
                            ->native(false),
                        MarkdownEditor::make('notes')
                            ->columnSpan('full')
                            ->toolbarButtons([
                                'undo',
                                'redo'
                            ])
                    ])->columns(3),

                    Step::make('Order Item')->schema([
                        Select::make('products_id')
                            ->native(false)
                            ->options(Products::query()->pluck('name', 'id'))
                            ->reactive()
                            ->afterStateUpdated(fn ($state, Set $set) =>
                            $set('unit_price', Products::find($state)?->price ?? 0)),
                        TextInput::make('quantity')
                            ->numeric()
                            ->default(1)
                            ->required()
                            ->live()
                            ->dehydrated(),
                        TextInput::make('unit_price')
                            ->label('Price')
                            ->prefix('IDR')
                            ->disabled()
                            ->dehydrated()
                            ->numeric()
                            ->required(),
                        Placeholder::make('total_price')
                            ->label('Total Price')
                            ->content(function ($get) {
                                return $get('quantity') * $get('unit_price');
                            })
                            ->afterStateUpdated(fn (Set $set, $get) =>
                            $set('gross_amount', $get('quantity') * $get('unit_price')))
                    ])->columns(2)
                ])->columnSpanFull()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('order_code')
                    ->label('Order Code')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('user.profile.name')
                    ->label('Customer')
                    ->sortable(),
                TextColumn::make('products.name')
                    ->label('Product')
                    ->sortable(),
                TextColumn::make('status')
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Order Date')
                    ->date()
            ])
            ->filters([
                //
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
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
