<?php

declare(strict_types=1);

use App\Enums\UserRole;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\Material;
use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->professor = User::factory()->create([
        'role' => UserRole::PROFESSOR,
    ]);
    $this->course = Course::factory()->create([
        'created_by' => $this->professor->id,
    ]);
});

it('gets course classwork grouped by category', function () {
    Assignment::factory()->create([
        'course_id' => $this->course->id,
        'created_by' => $this->professor->id,
        'category' => 'Homework',
    ]);

    Material::factory()->create([
        'course_id' => $this->course->id,
        'created_by' => $this->professor->id,
        'category' => 'Homework',
    ]);

    actingAs($this->professor)
        ->getJson("/api/courses/{$this->course->id}/classwork")
        ->assertOk()
        ->assertJsonPath('data.Homework.0.category', 'Homework');
});

