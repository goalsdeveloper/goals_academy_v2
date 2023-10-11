<?php

namespace App\Filament\AdminDashboard\Widgets;

use App\Models\Products;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class OrderChart extends ChartWidget
{
    protected static ?int $sort = 3;

    protected static ?string $heading = 'Order Chart';

    protected function getData(): array
    {
        $data = $this->getProductsPerMonth();

        return [
            'datasets' => [
                [
                    'label' => 'Order Created',
                    'data' => $data['productsPerMonth']
                ]
            ],
            'labels' => $data['months']
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }

    private function getProductsPerMonth(): array
    {
        $now = Carbon::now();

        $productsPerMonth = collect(range(1, 12))->map(function ($month) use ($now) {
            $count = Products::whereMonth('created_at', Carbon::parse($now->month($month)->format('Y-m')))->count();
            return $count;
        })->toArray();

        $months = collect(range(1, 12))->map(function ($month) use ($now) {
            return $now->month($month)->format('M');
        })->toArray();

        return [
            'productsPerMonth' => $productsPerMonth,
            'months' => $months
        ];
    }
}
