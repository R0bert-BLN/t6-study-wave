<?php

declare(strict_types=1);

use App\Enums\ResourceType;
use App\Enums\UserRole;
use App\Models\Assignment;
use App\Models\Comment;
use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create([
        'role' => UserRole::PROFESSOR,
    ]);
});

it('lists comments', function () {
    Comment::factory()->count(3)->create([
        'created_by' => $this->user->id,
    ]);

    actingAs($this->user)
        ->getJson('/api/comments')
        ->assertOk()
        ->assertJsonStructure([
            'data' => [
                'current_page',
                'data' => [
                    '*' => ['id', 'body', 'created_by'],
                ],
            ],
        ]);
});

it('creates a comment', function () {
    $assignment = Assignment::factory()->create();
    $payload = [
        'commentable_id' => $assignment->id,
        'commentable_type' => ResourceType::Assignment->value,
        'body' => 'Nice work',
        'created_by' => $this->user->id,
        'is_private' => false,
    ];

    actingAs($this->user)
        ->postJson('/api/comments', $payload)
        ->assertCreated()
        ->assertJsonPath('data.body', $payload['body']);
});

it('shows a comment', function () {
    $comment = Comment::factory()->create([
        'created_by' => $this->user->id,
    ]);

    actingAs($this->user)
        ->getJson("/api/comments/{$comment->id}")
        ->assertOk()
        ->assertJsonPath('data.id', $comment->id);
});

it('updates a comment', function () {
    $comment = Comment::factory()->create([
        'created_by' => $this->user->id,
    ]);

    actingAs($this->user)
        ->patchJson("/api/comments/{$comment->id}", ['body' => 'Updated'])
        ->assertOk()
        ->assertJsonPath('data.body', 'Updated');
});

it('deletes a comment', function () {
    $comment = Comment::factory()->create([
        'created_by' => $this->user->id,
    ]);

    actingAs($this->user)
        ->deleteJson("/api/comments/{$comment->id}")
        ->assertNoContent();
});

