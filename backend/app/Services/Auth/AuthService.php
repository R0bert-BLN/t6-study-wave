<?php

declare(strict_types=1);

namespace App\Services\Auth;

use App\Data\Auth\LoginData;
use App\Data\Auth\RegisterData;
use App\Data\UserData;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpFoundation\Response;

final class AuthService
{
    public function register(RegisterData $data): UserData
    {
        $user = User::create([
            'first_name' => $data->firstName,
            'last_name' => $data->lastName,
            'email' => $data->email,
            'password' => $data->password,
            'role' => $data->role,
        ]);

        Auth::login($user);

        return UserData::from($user);
    }

    public function login(LoginData $data): UserData
    {
        if (!Auth::attempt(['email' => $data->email, 'password' => $data->password])) {
            throw new UnauthorizedException('Incorrect credentials', Response::HTTP_UNAUTHORIZED);
        }

        session()->regenerate();

        return UserData::from(Auth::user());
    }

    public function logout(): void
    {
        Auth::guard('web')->logout();

        session()->invalidate();
        session()->regenerateToken();
    }
}
