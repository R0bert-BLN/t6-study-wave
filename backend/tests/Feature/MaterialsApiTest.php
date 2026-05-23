<?php

declare(strict_types=1);

use App\Enums\UserRole;
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

it('lists materials', function () {
    Material::factory()->count(3)->create([
        'course_id' => $this->course->id,
    ]);

    actingAs($this->professor)
        ->getJson('/api/materials')
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

it('creates a material', function () {
    $payload = [
        'title' => 'Week 1 Slides',
        'description' => 'Lecture slides',
        'course_id' => $this->course->id,
        'category' => 'Lecture',
        'created_by' => $this->professor->id,
    ];

    actingAs($this->professor)
        ->postJson('/api/materials', $payload)
        ->assertCreated()
        ->assertJsonPath('data.title', $payload['title']);
});

it('shows a material', function () {
    $material = Material::factory()->create([
        'course_id' => $this->course->id,
    ]);

    actingAs($this->professor)
        ->getJson("/api/materials/{$material->id}")
        ->assertOk()
        ->assertJsonPath('data.id', $material->id);
});

it('updates a material', function () {
    $material = Material::factory()->create([
        'course_id' => $this->course->id,
    ]);

    actingAs($this->professor)
        ->patchJson("/api/materials/{$material->id}", ['title' => 'Updated'])
        ->assertOk()
        ->assertJsonPath('data.title', 'Updated');
});

it('deletes a material', function () {
    $material = Material::factory()->create([
        'course_id' => $this->course->id,
    ]);

    actingAs($this->professor)
        ->deleteJson("/api/materials/{$material->id}")
        ->assertNoContent();
});

