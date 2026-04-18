<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\ClassCourse;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<ClassCourse>
 *
 * @return array<string, mixed>
 */
class ClassCourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'code' => Str::random(6),
            'description' => $this->faker->sentence(),
            'is_archived' => false,
            'created_by' => User::factory(),
        ];
    }

    public function archived(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_archived' => true,
        ]);
    }
}
