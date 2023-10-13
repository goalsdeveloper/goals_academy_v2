<?php

namespace App\Filament\AdminDashboard\Widgets;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Order;
use App\Models\Products;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $dataUser = $this->getUsersPerMonth();
        $dataSale = $this->getSalesPerMonth();

        return [
            Stat::make('Total Penjualan', Order::count())
                ->description('Penjualan Produk')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart($dataSale['salesPerMonth'])
                ->color('success'),
            Stat::make('Total Customer', User::where('user_role', 'user')->count())
                ->description('7% increase')
                ->descriptionIcon('heroicon-m-arrow-trending-down')
                ->chart($dataUser['usersPerMonth'])
                ->color('danger'),
            Stat::make('Success Order', Order::where('status', 'success')->count())
                ->description('3% increase')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart([2, 10, 5])
                ->color('success'),
            Stat::make('Total Produk', Products::count())
                ->description('3% increase')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                // ->chart([2, 10, 5])
                ->color('success'),
        ];
    }

    private function getUsersPerMonth(): array
    {
        $now = Carbon::now();

        $usersPerMonth = collect(range(1, 12))->map(function ($month) use ($now) {
            $count = User::whereMonth('created_at', Carbon::parse($now->month($month)->format('Y-m')))->count();
            return $count;
        })->toArray();

        $months = collect(range(1, 12))->map(function ($month) use ($now) {
            return $now->month($month)->format('M');
        })->toArray();

        return [
            'usersPerMonth' => $usersPerMonth,
            'months' => $months
        ];
    }

    private function getSalesPerMonth(): array
    {
        $now = Carbon::now();

        $usersPerMonth = collect(range(1, 12))->map(function ($month) use ($now) {
            $count = Order::whereMonth('created_at', Carbon::parse($now->month($month)->format('Y-m')))->count();
            return $count;
        })->toArray();

        $months = collect(range(1, 12))->map(function ($month) use ($now) {
            return $now->month($month)->format('M');
        })->toArray();

        return [
            'salesPerMonth' => $usersPerMonth,
            'months' => $months
        ];
    }
}
