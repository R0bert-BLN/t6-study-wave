<?php

declare(strict_types=1);

use App\Enums\ResourceType;
use App\Enums\UserRole;
use App\Models\Attachment;
use App\Models\Course;
use App\Models\Material;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    Storage::fake('s3');

    $this->user = User::factory()->create([
        'role' => UserRole::PROFESSOR,
    ]);
    $this->course = Course::factory()->create([
        'created_by' => $this->user->id,
    ]);
    $this->material = Material::factory()->create([
        'course_id' => $this->course->id,
        'created_by' => $this->user->id,
    ]);
});

it('lists attachments', function () {
    Attachment::factory()->count(3)->create([
        'owned_by' => $this->user->id,
    ]);

    actingAs($this->user)
        ->getJson('/api/attachments')
        ->assertOk()
        ->assertJsonStructure([
            'data' => [
                'current_page',
                'data' => [
                    '*' => ['id', 'name', 'path'],
                ],
            ],
        ]);
});

it('creates an attachment', function () {
    $payload = [
        'attachable_id' => $this->material->id,
        'attachable_type' => ResourceType::Material->value,
        'file' => UploadedFile::fake()->create('doc.pdf', 10, 'application/pdf'),
    ];

    actingAs($this->user)
        ->post('/api/attachments', $payload)
        ->assertCreated()
        ->assertJsonPath('data.attachable_id', $this->material->id);
});

it('shows an attachment', function () {
    $attachment = Attachment::factory()->create([
        'owned_by' => $this->user->id,
    ]);

    actingAs($this->user)
        ->getJson("/api/attachments/{$attachment->id}")
        ->assertOk()
        ->assertJsonPath('data.id', $attachment->id);
});

it('updates an attachment', function () {
    $attachment = Attachment::factory()->create([
        'owned_by' => $this->user->id,
    ]);

    actingAs($this->user)
        ->patchJson("/api/attachments/{$attachment->id}", ['name' => 'Updated'])
        ->assertOk()
        ->assertJsonPath('data.name', 'Updated');
});

it('deletes an attachment', function () {
    $attachment = Attachment::factory()->create([
        'owned_by' => $this->user->id,
    ]);

    actingAs($this->user)
        ->deleteJson("/api/attachments/{$attachment->id}")
        ->assertNoContent();
});

