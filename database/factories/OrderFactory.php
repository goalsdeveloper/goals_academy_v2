<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Place;
use App\Models\Products;
use App\Models\Topic;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Order::class;
    public function definition(): array
    {
        $product = Products::whereHas('productType', function ($q) {
            $q->where('type', 'Bimbingan');
        })->inRandomOrder()->first();
        $add_on = $product->addOns()->inRandomOrder()->first();
        $form_result = [
            'place_id' => Place::all()->random()->id,
            'topic_id' => Topic::all()->random()->id,
            'schedule' => Carbon::now(),
            'add_on' => [$add_on ?? '' ],
        ];
        return [
            'user_id' => User::where('user_role', 'user')->inRandomOrder()->first(),
            'products_id' => $product->id,
            'order_code' => Order::generateOrderCode(),
            'payment_method_id' => 4,
            'quantity' => 1,
            'unit_price' => $product->price,
            'form_result' => $form_result,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),

        ];
    }

}
