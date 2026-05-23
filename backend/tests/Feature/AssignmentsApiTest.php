<?php

declare(strict_types=1);

use App\Enums\UserRole;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\User;
use Carbon\Carbon;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->professor = User::factory()->create([
        'role' => UserRole::PROFESSOR,
    ]);
    $this->course = Course::factory()->create([
        'created_by' => $this->professor->id,
    ]);
});

it('lists assignments', function () {
    Assignment::factory()->count(3)->create([
        'course_id' => $this->course->id,
    ]);

    actingAs($this->professor)
        ->getJson('/api/assignments')
        ->assertOk()
        ->assertJsonStructure([
            'data' => [
                'current_page',
                'data' => [
                    '*' => ['id', 'title', 'category', 'course_id'],
                ],
            ],
        ]);
});

it('shows an assignment', function () {
    $assignment = Assignment::factory()->create([
        'course_id' => $this->course->id,
    ]);

    actingAs($this->professor)
        ->getJson("/api/assignments/{$assignment->id}")
        ->assertOk()
        ->assertJsonPath('data.id', $assignment->id);
});

it('updates an assignment', function () {
    $assignment = Assignment::factory()->create([
        'course_id' => $this->course->id,
    ]);

    actingAs($this->professor)
        ->patchJson("/api/assignments/{$assignment->id}", ['title' => 'Updated'])
        ->assertOk()
        ->assertJsonPath('data.title', 'Updated');
});

it('deletes an assignment', function () {
    $assignment = Assignment::factory()->create([
        'course_id' => $this->course->id,
    ]);

    actingAs($this->professor)
        ->deleteJson("/api/assignments/{$assignment->id}")
        ->assertNoContent();
});

