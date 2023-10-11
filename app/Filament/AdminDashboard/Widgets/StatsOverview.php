<?php

namespace App\Filament\AdminDashboard\Widgets;

use App\Models\Order;
use App\Models\Products;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Penjualan', Order::where('status', 'pending')->count())
                ->description('Penjualan Produk')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('success'),
            Stat::make('Total Customer', User::where('user_role', 'user')->count())
                ->description('7% increase')
                ->descriptionIcon('heroicon-m-arrow-trending-down')
                ->color('danger'),
            Stat::make('Success Order', Order::where('status', 'success')->count())
                ->description('3% increase')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart([2,10,5])
                ->color('success'),
        ];
    }
}
