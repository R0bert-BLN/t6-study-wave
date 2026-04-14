<?php

namespace App\Http\Controllers\Auth;

use App\Data\Auth\LoginData;
use App\Data\Auth\RegisterData;
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
    )
    {
    }

    public function register(RegisterData $data): JsonResponse
    {
        $result = $this->authService->register($data);

        return $this->success(
            data: [
                'user' => $result['user'],
                'token' => $result['token'],
            ],
            message: 'Registration successfully',
            statusCode: Response::HTTP_CREATED,
        );
    }

    public function login(LoginData $data): JsonResponse
    {
        $result = $this->authService->login($data);

        return $this->success(
            data: [
                'user' => $result['user'],
                'token' => $result['token'],
            ],
            message: 'Authentication successfully',
        );
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());

        return $this->success(
            message: 'Logout successfully',
        );
    }
}
