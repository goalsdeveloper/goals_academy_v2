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
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\MarkdownEditor;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\AdminDashboard\Resources\ProductsResource\Pages;
use App\Filament\AdminDashboard\Resources\ProductsResource\RelationManagers;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\TextColumn;

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
                        FileUpload::make('product_image')
                            ->directory('product_image')
                            ->image()
                            ->imageEditor(),

                    ]),
                    Section::make('Category')->schema([
                        Select::make('category')
                            ->relationship('categories', 'name')
                            ->multiple()
                            ->required()
                    ])->collapsible()
                ]),
                Group::make()->schema([
                    Section::make('Product Features')->schema([
                        Repeater::make('features')
                            ->schema([
                                TextInput::make('name'),
                                TextInput::make('feature')
                            ])
                            ->columns(2)
                            ->defaultItems(2)
                            ->grid()
                    ])
                ])->columnSpan('full')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProducts::route('/create'),
            'edit' => Pages\EditProducts::route('/{record}/edit'),
        ];
    }
}
