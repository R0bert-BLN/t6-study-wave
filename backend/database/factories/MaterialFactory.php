<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Course;
use App\Models\Material;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Material>
 */
class MaterialFactory extends Factory
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
            'category' => $this->faker->word(),
            'course_id' => Course::factory(),
            'created_by' => User::factory(),
        ];
    }
}
