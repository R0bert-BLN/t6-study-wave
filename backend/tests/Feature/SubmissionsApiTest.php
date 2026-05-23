<?php

declare(strict_types=1);

use App\Enums\UserRole;
use App\Models\Assignment;
use App\Models\Submission;
use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->student = User::factory()->create([
        'role' => UserRole::STUDENT,
    ]);
    $this->assignment = Assignment::factory()->create();
});

it('lists submissions', function () {
    Submission::factory()->count(3)->create([
        'assignment_id' => $this->assignment->id,
        'submitted_by' => $this->student->id,
    ]);

    actingAs($this->student)
        ->getJson('/api/submissions')
        ->assertOk()
        ->assertJsonStructure([
            'data' => [
                'current_page',
                'data' => [
                    '*' => ['id', 'assignment_id', 'submitted_by'],
                ],
            ],
        ]);
});

it('shows a submission', function () {
    $submission = Submission::factory()->create([
        'assignment_id' => $this->assignment->id,
        'submitted_by' => $this->student->id,
    ]);

    actingAs($this->student)
        ->getJson("/api/submissions/{$submission->id}")
        ->assertOk()
        ->assertJsonPath('data.id', $submission->id);
});

it('updates a submission', function () {
    $submission = Submission::factory()->create([
        'assignment_id' => $this->assignment->id,
        'submitted_by' => $this->student->id,
    ]);

    actingAs($this->student)
        ->patchJson("/api/submissions/{$submission->id}", ['grade' => 95])
        ->assertOk()
        ->assertJsonPath('data.grade', 95);
});

it('deletes a submission', function () {
    $submission = Submission::factory()->create([
        'assignment_id' => $this->assignment->id,
        'submitted_by' => $this->student->id,
    ]);

    actingAs($this->student)
        ->deleteJson("/api/submissions/{$submission->id}")
        ->assertNoContent();
});

