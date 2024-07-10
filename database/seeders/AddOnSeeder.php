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
            'name' => 'Review Jurnal Relevan',
            'slug' => 'review-jurnal-relevan',
            'price' => 65000,
        ]);
        AddOn::create([
            'name' => 'Extra 1 Kali Pertemuan (termasuk 3 hari chat)',
            'slug' => 'extra-1x-pertemuan',
            'price' => 60000,
        ]);
        AddOn::create([
            'name' => 'Extra 2 Kali Pertemuan (tanpa tambahan durasi chat)',
            'slug' => 'extra-2x-pertemuan',
            'price' => 110000,
        ]);
        AddOn::create([
            'name' => 'Extra 1 Kali Pertemuan (Khusus Desk Review)',
            'slug' => 'extra-1x-pertemuan-desk-review',
            'price' => 50000,
        ]);

        // DB::insert('insert into add_on_products (add_on_id, products_id) values (1, 1)');
        // DB::insert('insert into add_on_products (add_on_id, products_id) values (2, 1)');
        // DB::insert('insert into add_on_products (add_on_id, products_id) values (3, 1)');
    }
}
