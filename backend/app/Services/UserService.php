<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\User\UserData;
use App\Data\User\UserUpdateData;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class UserService
{
    public function __construct(private UserRepository $userRepository) {}

    public function getAllUsers(int $perPage = 10): LengthAwarePaginator
    {
        return $this->userRepository->getAllPaginated($perPage);
    }

    public function getUserById(string $id): ?UserData
    {
        /** @var User|null $user */
        $user = $this->userRepository->getById($id);

        return $user ? UserData::from($user) : null;
    }

    public function updateUser(string $id, UserUpdateData $data): UserData
    {
        $user = User::query()->findOrFail($id);
        $user->update($data->toArray());

        return UserData::from($user);
    }

    public function deleteUser(string $id): void
    {
        $user = User::query()->findOrFail($id);
        $user->delete();
    }
}
