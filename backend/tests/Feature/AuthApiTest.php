<?php

declare(strict_types=1);

use App\Enums\UserRole;
use App\Models\User;

use function Pest\Laravel\actingAs;

it('registers a user', function () {
    $payload = [
        'first_name' => 'Alex',
        'last_name' => 'Popescu',
        'email' => 'alex.popescu@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'role' => UserRole::STUDENT->value,
    ];

    $this->postJson('/api/register', $payload)
        ->assertCreated()
        ->assertJsonPath('data.email', $payload['email']);
});

it('logs in a user', function () {
    $user = User::factory()->create([
        'password' => bcrypt('password'),
    ]);

    $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'password',
    ])
        ->assertOk()
        ->assertJsonPath('data.email', $user->email);
});

it('returns the authenticated user', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->getJson('/api/me')
        ->assertOk()
        ->assertJsonPath('data.id', $user->id);
});

it('logs out a user', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->postJson('/api/logout')
        ->assertOk();
});

