<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\AddOn;
use App\Models\Category;
use App\Models\PaymentMethod;
use App\Models\Products;
use App\Models\ProductType;
use App\Models\PromoCode;
use App\Models\User;
use App\Models\UserProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CitySeeder::class,
            SkillSeeder::class,
            PlaceSeeder::class,
            TopicSeeder::class,
            CategorySeeder::class,
            ProductTypeSeeder::class,
            UserSeeder::class,
            PaymentMethodSeeder::class,
            ProductSeeder::class,
            AddOnSeeder::class,
            UserProfileSeeder::class,
            OrderSeeder::class,
            CourseSeeder::class,
            OrderHistorySeeder::class,
            TutorSkillSeeder::class,
        ]);


        User::factory(50)->create();

        PromoCode::create([
            'promo_code' => 19283155,
            'description' => 'sauqweksdlaskd',
            'value' => 15000,
            'is_price' => true,
            'date_start' => today()->addDay(),
            'date_end' => today()->addWeek(),
        ]);
        PromoCode::factory(9)->create();

        DB::insert('insert into category_products (category_id, products_id) values (2, 1)');
        DB::insert('insert into category_products (category_id, products_id) values (3, 1)');

        DB::insert('insert into add_on_products (add_on_id, products_id) values (1, 1)');
        DB::insert('insert into add_on_products (add_on_id, products_id) values (2, 1)');
        DB::insert('insert into add_on_products (add_on_id, products_id) values (3, 1)');

        DB::table('products_topic')->insert(['products_id' => 1, 'topic_id' => 1]);
        DB::table('products_topic')->insert(['products_id' => 1, 'topic_id' => 2]);
        DB::table('products_topic')->insert(['products_id' => 1, 'topic_id' => 3]);
        DB::table('products_topic')->insert(['products_id' => 2, 'topic_id' => 1]);
        DB::table('products_topic')->insert(['products_id' => 2, 'topic_id' => 2]);
        DB::table('products_topic')->insert(['products_id' => 2, 'topic_id' => 3]);
    }
}
