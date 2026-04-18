<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Assignment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Assignment>
 */
class AssignmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->sentence(10),
            'due_date' => $this->faker->dateTimeBetween('-1 week', '+1 week'),
            'class_id' => $this->faker->uuid(),
            'created_by' => $this->faker->uuid(),
        ];
    }
}
