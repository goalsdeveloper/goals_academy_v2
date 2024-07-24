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
                'place' => 'Ekologie 2',
                'city_id' => 1,
            ],
            [
                'place' => 'CW Jl Jakarta',
                'city_id' => 1,
            ],
            [
                'place' => 'CW Soehat',
                'city_id' => 1,
            ],
            [
                'place' => 'AADK Tlogomas',
                'city_id' => 1,
            ],
            [
                'place' => 'AADK Jl Bandung',
                'city_id' => 1,
            ],
            [
                'place' => 'Nakoa Jl Panjaitan',
                'city_id' => 1,
            ],
            [
                'place' => 'Nakoa Dinoyo',
                'city_id' => 1,
            ],
            [
                'place' => 'Nakoa Jl Borobudur',
                'city_id' => 1,
            ],
            [
                'place' => 'Nakoa Jl Bondowoso',
                'city_id' => 1,
            ],
            [
                'place' => 'Handall',
                'city_id' => 1,
            ],
            // [
            //     'place' => 'Kafe 4',
            //     'city_id' => 2,
            // ],
            // [
            //     'place' => 'Kafe 5',
            //     'city_id' => 2,
            // ],
            // [
            //     'place' => 'Kafe 6',
            //     'city_id' => 2,
            // ],
            // [
            //     'place' => 'Kafe 7',
            //     'city_id' => 3,
            // ],
            // [
            //     'place' => 'Kafe 8',
            //     'city_id' => 3,
            // ],
            // [
            //     'place' => 'Kafe 9',
            //     'city_id' => 3,
            // ],
        ]);
    }
}
