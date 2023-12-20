<?php

namespace App\Filament\AdminDashboard\Resources;

use Filament\Forms;
use Filament\Tables;
use Filament\Forms\Set;
use App\Models\Products;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Illuminate\Support\Str;
use Filament\Resources\Resource;
use Filament\Forms\Components\Group;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Repeater;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Actions\ActionGroup;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\FileUpload;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\MarkdownEditor;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\AdminDashboard\Resources\ProductsResource\Pages;
use App\Filament\AdminDashboard\Resources\ProductsResource\RelationManagers;
use App\Models\AddOn;
use App\Models\Category;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Grouping\Group as GroupingGroup;

class ProductsResource extends Resource
{
    protected static ?string $model = Products::class;

    protected static ?string $navigationIcon = 'heroicon-m-cube';

    protected static ?string $navigationGroup = 'Produk';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Group::make()->schema([
                    Section::make('Product Information')->schema([
                        TextInput::make('name')
                            ->required()
                            ->live(onBlur: true)
                            ->unique(ignoreRecord: true)
                            ->afterStateUpdated(function ($state, Set $set) {
                                $set('slug', Str::slug($state));
                            }),
                        TextInput::make('slug')
                            ->disabled()
                            ->required()
                            ->dehydrated()
                            ->unique(Products::class, 'slug', ignoreRecord: true),
                        MarkdownEditor::make('excerpt')
                            ->toolbarButtons([
                                'redo',
                                'undo',
                            ])
                            ->required()
                            ->columnSpan('full'),
                        MarkdownEditor::make('description')
                            ->required()
                            ->columnSpan('full'),
                    ])->columns(2)
                ]),
                Group::make()->schema([
                    Section::make('Price and Information')->schema([
                        Toggle::make('is_visible')
                            ->label('Visibility')
                            ->helperText('Set product visibility')
                            ->default(true),
                        Toggle::make('is_featured')
                            ->label('Featured')
                            ->helperText('Set product being featured status'),
                        TextInput::make('price')
                            ->numeric()
                            ->rules('regex:/^\d{1,6}(\.\d{0,2})?$/')
                            ->prefix('IDR')
                            ->required()
                            ->columnSpan('full'),
                        DateTimePicker::make('date_start')
                            ->label('Tanggal Mulai')
                            ->seconds(false)
                            ->native(false)
                            ->minutesStep(15)
                            ->prefix('Starts'),
                        DateTimePicker::make('date_end')
                            ->label('Tanggal Berakhir')
                            ->seconds(false)
                            ->native(false)
                            ->minutesStep(15)
                            ->prefix('Ends'),
                        FileUpload::make('product_image')
                            ->directory('product_image')
                            ->image()
                            ->imageEditor(),

                    ]),
                ]),

                Group::make()->schema([
                    Section::make('Category & Add On')->schema([
                        Select::make('category')
                            ->relationship('categories', 'name')
                            ->multiple()
                            ->required()
                            ->options(Category::all()->pluck('name', 'id')),
                        Select::make('add_on')
                            ->relationship('addOns', 'name')
                            ->multiple()
                            ->options(AddOn::all()->pluck('name', 'id')),
                    ])
                        ->collapsible()
                        ->columns(2)
                ])->columnSpanFull(),

                Section::make('Product Features')->schema([
                    Repeater::make('features')
                        ->schema([
                            TextInput::make('times'),
                            TextInput::make('duration'),
                            TextInput::make('category'),
                        ])
                        ->columns(3)
                        ->addable(false)
                        ->deletable(false)
                        ->columnSpan('full')

                ])->columnSpan('full')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('product_image')
                    ->label('Image'),
                TextColumn::make('name')
                    ->sortable()
                    ->searchable(),
                IconColumn::make('is_visible')
                    ->label('Visibility')
                    ->sortable()
                    ->boolean(),
                IconColumn::make('is_featured')
                    ->label('Featured')
                    ->sortable()
                    ->boolean(),
                TextColumn::make('addOns.name'),
                TextColumn::make('price')
                    ->sortable()
            ])
            ->filters([
                TernaryFilter::make('is_visible')
                    ->label('Visibility')
                    ->trueLabel('Visible')
                    ->falseLabel('Hidden')
                    ->queries(
                        true: fn (Builder $query) => $query->where('is_visible', true),
                        false: fn (Builder $query) => $query->where('is_visible', false),
                    )
                    ->native(false),
                Filter::make('is_featured')
                    ->label('Featured')
                    ->toggle()
                    ->query(fn (Builder $query) => $query->where('is_featured', true))
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProducts::route('/create'),
            'edit' => Pages\EditProducts::route('/{record}/edit'),
        ];
    }
}
