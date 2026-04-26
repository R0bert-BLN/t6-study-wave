<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\Reminder;
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
        $student = User::factory()->create([
            'email' => 'student@studywave.com',
            'role' => UserRole::STUDENT->value,
        ]);

        $professor = User::factory()->create([
            'email' => 'professor@studywave.com',
            'role' => UserRole::PROFESSOR->value,
        ]);

        $courses = Course::factory()->count(3)->create([
            'created_by' => $professor->id,
        ]);

        for ($i = 0; $i < 5; $i++) {
            Assignment::factory()->create([
                'course_id' => $courses->random()->id,
                'created_by' => $professor->id,
            ]);
        }

        Reminder::factory()->count(2)->create([
            'created_by' => $student->id,
        ]);
    }
}
