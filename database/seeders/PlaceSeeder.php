<?php

namespace Database\Seeders;

use App\Models\Place;
use Illuminate\Database\Seeder;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Place::insert([
            [
                'place' => 'Kafe 1',
                'city_id' => 1,
            ],
            [
                'place' => 'Kafe 2',
                'city_id' => 1,
            ],
            [
                'place' => 'Kafe 3',
                'city_id' => 1,
            ],
            [
                'place' => 'Kafe 4',
                'city_id' => 2,
            ],
            [
                'place' => 'Kafe 5',
                'city_id' => 2,
            ],
            [
                'place' => 'Kafe 6',
                'city_id' => 2,
            ],
            [
                'place' => 'Kafe 7',
                'city_id' => 3,
            ],
            [
                'place' => 'Kafe 8',
                'city_id' => 3,
            ],
            [
                'place' => 'Kafe 9',
                'city_id' => 3,
            ],
        ]);
    }
}