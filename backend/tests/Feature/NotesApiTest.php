<?php

declare(strict_types=1);

use App\Enums\UserRole;
use App\Models\Note;
use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create([
        'role' => UserRole::PROFESSOR,
    ]);
});

it('creates a note', function () {
    $payload = [
        'title' => 'Note',
        'body' => 'Some notes',
        'created_by' => $this->user->id,
        'category' => 'Personal',
    ];

    actingAs($this->user)
        ->postJson('/api/notes', $payload)
        ->assertCreated()
        ->assertJsonPath('data.title', $payload['title']);
});

it('shows a note', function () {
    $note = Note::factory()->create([
        'created_by' => $this->user->id,
    ]);

    actingAs($this->user)
        ->getJson("/api/notes/{$note->id}")
        ->assertOk()
        ->assertJsonPath('data.id', $note->id);
});

it('updates a note', function () {
    $note = Note::factory()->create([
        'created_by' => $this->user->id,
    ]);

    actingAs($this->user)
        ->patchJson("/api/notes/{$note->id}", ['title' => 'Updated'])
        ->assertOk()
        ->assertJsonPath('data.title', 'Updated');
});

it('deletes a note', function () {
    $note = Note::factory()->create([
        'created_by' => $this->user->id,
    ]);

    actingAs($this->user)
        ->deleteJson("/api/notes/{$note->id}")
        ->assertNoContent();
});

