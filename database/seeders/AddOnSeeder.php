<?php

namespace Database\Seeders;

use App\Models\AddOn;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AddOnSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        AddOn::create([
            'name' => '+ Durasi 20 Menit',
            'slug' => 'durasi-20-menit',
            'price' => 15000,
        ]);
        AddOn::create([
            'name' => 'Record',
            'slug' => 'record',
            'price' => 10000,
        ]);
        AddOn::create([
            'name' => 'Desk Review',
            'slug' => 'desk-review',
            'price' => 25000,
        ]);

        DB::insert('insert into add_on_products (add_on_id, products_id) values (1, 1)');
        DB::insert('insert into add_on_products (add_on_id, products_id) values (2, 1)');
        DB::insert('insert into add_on_products (add_on_id, products_id) values (3, 1)');
    }
}
