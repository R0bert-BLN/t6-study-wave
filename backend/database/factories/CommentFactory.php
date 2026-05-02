<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Assignment;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'commentable_id' => Assignment::factory(),
            'commentable_type' => Assignment::class,
            'body' => $this->faker->sentence(10),
            'created_by' => User::factory(),
            'is_private' => $this->faker->boolean(),
        ];
    }
}
