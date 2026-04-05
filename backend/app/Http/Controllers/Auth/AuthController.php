<?php

namespace App\Http\Controllers\Auth;

use App\Data\Auth\LoginData;
use App\Data\Auth\RegisterData;
use App\Services\Auth\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthController
{
    public function __construct(
        private readonly AuthService $authService
    )
    {
    }

    public function register(RegisterData $data): JsonResponse
    {
        $result = $this->authService->register($data);

        return response()->json([
            'message' => 'Registration successfully',
            'user' => $result['user'],
            'token' => $result['token'],
        ], Response::HTTP_CREATED);
    }

    public function login(LoginData $data): JsonResponse
    {
        $result = $this->authService->login($data);

        return response()->json([
            'message' => 'Authentication successfully',
            'user' => $result['user'],
            'token' => $result['token'],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());

        return response()->json([
            'message' => 'Logout successfully',
        ]);

    }
}
