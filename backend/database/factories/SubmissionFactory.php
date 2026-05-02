<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Assignment;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Submission>
 */
class SubmissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'assignment_id' => Assignment::factory()->create()->id,
            'submitted_by' => User::factory()->create()->id,
            'grade' => $this->faker->randomFloat(2, 0, 10),
            'submitted_at' => $this->faker->dateTime(),
        ];
    }
}
