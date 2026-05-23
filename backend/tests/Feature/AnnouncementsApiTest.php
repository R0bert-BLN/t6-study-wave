<?php

declare(strict_types=1);

use App\Enums\UserRole;
use App\Models\Announcement;
use App\Models\Course;
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

it('lists announcements', function () {
    Announcement::factory()->count(3)->create([
        'course_id' => $this->course->id,
    ]);

    actingAs($this->professor)
        ->getJson('/api/announcements')
        ->assertOk()
        ->assertJsonStructure([
            'data' => [
                'current_page',
                'data' => [
                    '*' => ['id', 'body', 'course_id'],
                ],
            ],
        ]);
});

it('creates an announcement', function () {
    $payload = [
        'course_id' => $this->course->id,
        'body' => 'Welcome to the course',
        'created_by' => $this->professor->id,
    ];

    actingAs($this->professor)
        ->postJson('/api/announcements', $payload)
        ->assertCreated()
        ->assertJsonPath('data.body', $payload['body']);
});

it('shows an announcement', function () {
    $announcement = Announcement::factory()->create([
        'course_id' => $this->course->id,
    ]);

    actingAs($this->professor)
        ->getJson("/api/announcements/{$announcement->id}")
        ->assertOk()
        ->assertJsonPath('data.id', $announcement->id);
});

it('updates an announcement', function () {
    $announcement = Announcement::factory()->create([
        'course_id' => $this->course->id,
    ]);

    actingAs($this->professor)
        ->patchJson("/api/announcements/{$announcement->id}", ['body' => 'Updated'])
        ->assertOk()
        ->assertJsonPath('data.body', 'Updated');
});

it('deletes an announcement', function () {
    $announcement = Announcement::factory()->create([
        'course_id' => $this->course->id,
    ]);

    actingAs($this->professor)
        ->deleteJson("/api/announcements/{$announcement->id}")
        ->assertNoContent();
});

