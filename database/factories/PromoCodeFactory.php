<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PromoCode>
 */
class PromoCodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'promo_code' => fake()->unique()->randomNumber(8),
            'description' => fake()->paragraph(),
            'value' => fake()->randomFloat(2, 5, 40),
            'created_at' => fake()->dateTimeThisYear('now'),
            'updated_at' => fake()->dateTimeBetween('created_at', 'now'),
        ];
    }
}
