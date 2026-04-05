<?php

namespace App\Services\Auth;

use App\Data\Auth\LoginData;
use App\Data\Auth\RegisterData;
use App\Data\UserData;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

final class AuthService
{
    /**
     * @return array{user: UserData, token: string}
     */
    public function register(RegisterData $data): array
    {
        $user = User::create([
            'first_name' => $data->firstName,
            'last_name' => $data->lastName,
            'email' => $data->email,
            'password' => $data->password,
            'role' => $data->role,
        ]);

        return [
            'user' => UserData::from($user),
            'token' => $user->createToken('auth_token')->plainTextToken,
        ];
    }

    /**
     * @return array{user: UserData, token: string}
     */
    public function login(LoginData $data): array
    {
        $user = User::where('email', $data->email)->first();

        if (!$user || !Hash::check($data->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Incorrect credentials']
            ]);
        }

        $user->tokens()->delete();

        return [
            'user' => UserData::from($user),
            'token' => $user->createToken('auth_token')->plainTextToken,
        ];
    }

    public function logout(User $user): void
    {
        $user->currentAccessToken()->delete();
    }
}
