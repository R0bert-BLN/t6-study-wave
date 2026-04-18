<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Data\User\UserUpdateData;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

final readonly class UserController extends BaseController
{
    public function __construct(private UserService $userService) {}

    public function index(): JsonResponse
    {
        $users = $this->userService->getAllUsers($this->getPerPage());

        return $this->success($users);
    }

    public function show(string $id): JsonResponse
    {
        $user = $this->userService->getUserById($id);

        return $this->success($user);
    }

    public function update(UserUpdateData $data, string $id): JsonResponse
    {
        $user = $this->userService->updateUser($id, $data);

        return $this->success($user);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->userService->deleteUser($id);

        return $this->success(statusCode: Response::HTTP_NO_CONTENT);
    }
}
