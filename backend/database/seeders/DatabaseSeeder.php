<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'email' => 'student@studywave.com',
            'role' => UserRole::STUDENT->value,
        ]);

        User::factory()->create([
            'email' => 'professor@studywave.com',
            'role' => UserRole::PROFESSOR->value,
        ]);
    }
}
