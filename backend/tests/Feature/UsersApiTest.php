<?php

declare(strict_types=1);

use App\Enums\UserRole;
use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->admin = User::factory()->create([
        'role' => UserRole::PROFESSOR,
    ]);
});

it('should fetch a paginated list of users', function () {
    User::factory()->count(20)->create();

    actingAs($this->admin)
        ->getJson('/api/users')
        ->assertOk()
        ->assertJsonStructure([
            'data' => [
                'current_page',
                'data' => [
                    '*' => ['id', 'first_name', 'last_name', 'email', 'role'],
                ],
                'last_page',
                'total',
            ],
        ])
        ->assertJsonCount(10, 'data.data');
});

it('should fetch a single user by id', function () {
    $student = User::factory()->create();

    actingAs($this->admin)
        ->getJson("/api/users/{$student->id}")
        ->assertOk()
        ->assertJsonPath('data.id', $student->id)
        ->assertJsonPath('data.email', $student->email);
});

it('should update a user partially', function () {
    $student = User::factory()->create([
        'first_name' => 'OldName',
        'last_name' => 'OldLastName',
    ]);

    actingAs($this->admin)
        ->patchJson("/api/users/{$student->id}", [
            'first_name' => 'NewName',
        ])
        ->assertOk()
        ->assertJsonPath('data.first_name', 'NewName');

    expect($student->fresh())
        ->first_name->toBe('NewName')
        ->last_name->toBe('OldLastName');
});

it('can delete a user', function () {
    $student = User::factory()->create();

    actingAs($this->admin)
        ->deleteJson("/api/users/{$student->id}")
        ->assertNoContent();

    $this->assertDatabaseMissing('users', ['id' => $student->id]);
});
