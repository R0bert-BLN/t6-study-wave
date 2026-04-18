<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Reminder;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Reminder>
 */
class ReminderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'scheduled_at' => $this->faker->dateTimeBetween('-1 week', '+1 week'),
            'created_by' => User::factory(),
            'assignment_id' => Assignment::factory(),
        ];
    }
}
