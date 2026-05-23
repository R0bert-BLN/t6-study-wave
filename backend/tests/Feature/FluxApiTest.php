<?php

declare(strict_types=1);

use App\Enums\UserRole;
use App\Models\Announcement;
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

it('gets course flux', function () {
    Assignment::factory()->create([
        'course_id' => $this->course->id,
        'created_by' => $this->professor->id,
    ]);

    Material::factory()->create([
        'course_id' => $this->course->id,
        'created_by' => $this->professor->id,
    ]);

    Announcement::factory()->create([
        'course_id' => $this->course->id,
        'created_by' => $this->professor->id,
    ]);

    actingAs($this->professor)
        ->getJson("/api/courses/{$this->course->id}/flux")
        ->assertOk()
        ->assertJsonStructure([
            'data' => [
                '*' => ['id'],
            ],
        ]);
});

