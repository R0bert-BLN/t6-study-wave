<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Data\Auth\LoginData;
use App\Data\Auth\RegisterData;
use App\Data\UserData;
use App\Services\Auth\AuthService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

readonly class AuthController
{
    use ApiResponse;

    public function __construct(
        private AuthService $authService
    ) {}

    public function register(RegisterData $data): JsonResponse
    {
        $user = $this->authService->register($data);

        return $this->success(
            data: $user,
            message: 'Registration successfully',
            statusCode: Response::HTTP_CREATED,
        );
    }

    public function login(LoginData $data): JsonResponse
    {
        $user = $this->authService->login($data);

        return $this->success(
            data: $user,
            message: 'Authentication successfully',
        );
    }

    public function logout(): JsonResponse
    {
        $this->authService->logout();

        return $this->success(
            message: 'Logout successfully',
        );
    }

    public function me(Request $request): JsonResponse
    {
        return $this->success(
            data: UserData::from($request->user()),
        );
    }
}
