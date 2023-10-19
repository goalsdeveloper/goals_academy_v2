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
            'description' => fake()->text(50),
            'value' => fake()->randomFloat(2, 5, 40),
            'date_start' => fake()->dateTimeBetween('now', '+2 months'),
            'date_end' => fake()->dateTimeBetween('now', '+2 months'),
        ];
    }
}
