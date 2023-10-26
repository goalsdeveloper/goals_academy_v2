<?php

namespace App\Filament\AdminDashboard\Widgets;

use App\Models\User;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class UserChart extends ChartWidget
{
    protected static ?string $heading = 'New User By Month';

    protected function getData(): array
    {
        $data = $this->getUsersPerMonth();
        return [
            'datasets' => [
                [
                    'label' => 'New User',
                    'data' => $data['usersPerMonth']
                ]
            ],
            'labels' => $data['months']
        ];
    }

    protected function getType(): string
    {
        return 'line';
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
}
