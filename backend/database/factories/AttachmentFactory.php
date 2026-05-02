<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Assignment;
use App\Models\Attachment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Attachment>
 */
class AttachmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'attachable_id' => Assignment::factory()->create()->id,
            'attachable_type' => Assignment::class,
            'name' => $this->faker->word(),
            'size' => $this->faker->numberBetween(100, 5000),
            'extension' => $this->faker->word(),
            'owned_by' => User::factory()->create()->id,
            //
        ];
    }
}
