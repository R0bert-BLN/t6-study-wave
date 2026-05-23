<?php

declare(strict_types=1);

use App\Enums\UserRole;
use App\Models\Course;
use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->professor = User::factory()->create([
        'role' => UserRole::PROFESSOR,
    ]);
});

it('lists courses', function () {
    Course::factory()->count(3)->create();

    actingAs($this->professor)
        ->getJson('/api/courses')
        ->assertOk()
        ->assertJsonStructure([
            'data' => [
                'current_page',
                'data' => [
                    '*' => ['id', 'name', 'description', 'code'],
                ],
            ],
        ]);
});

it('creates a course', function () {
    $payload = [
        'name' => 'Physics',
        'description' => 'Physics class',
    ];

    actingAs($this->professor)
        ->postJson('/api/courses', $payload)
        ->assertCreated()
        ->assertJsonPath('data.name', $payload['name']);
});

it('shows a course', function () {
    $course = Course::factory()->create();

    actingAs($this->professor)
        ->getJson("/api/courses/{$course->id}")
        ->assertOk()
        ->assertJsonPath('data.id', $course->id);
});

it('updates a course', function () {
    $course = Course::factory()->create();

    actingAs($this->professor)
        ->patchJson("/api/courses/{$course->id}", ['name' => 'Updated'])
        ->assertOk()
        ->assertJsonPath('data.name', 'Updated');
});

it('deletes a course', function () {
    $course = Course::factory()->create();

    actingAs($this->professor)
        ->deleteJson("/api/courses/{$course->id}")
        ->assertNoContent();
});

it('joins a course by code', function () {
    $course = Course::factory()->create(['code' => 'ABC123']);
    $student = User::factory()->create(['role' => UserRole::STUDENT]);

    actingAs($student)
        ->postJson('/api/courses/join', ['code' => 'ABC123'])
        ->assertOk()
        ->assertJsonPath('data.id', $course->id);
});

it('leaves a course', function () {
    $student = User::factory()->create(['role' => UserRole::STUDENT]);
    $course = Course::factory()->create();
    $course->participants()->attach($student->id);

    actingAs($student)
        ->postJson("/api/courses/{$course->id}/leave")
        ->assertOk();

    expect($course->participants()->where('users.id', $student->id)->exists())->toBeFalse();
});

