<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\User\UserData;
use App\Data\User\UserUpdateData;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class UserService
{
    public function __construct(private UserRepository $userRepository, private CloudStorageService $storageService) {}

    public function getAllUsers(int $perPage): LengthAwarePaginator
    {
        return $this->userRepository->getAllPaginated($perPage);
    }

    public function getUserById(string $id): UserData
    {
        /** @var User|null $user */
        $user = $this->userRepository->getById($id);

        if (! $user) {
            throw new ModelNotFoundException('User not found');
        }

        return UserData::from($user);
    }

    public function updateUser(string $id, UserUpdateData $data): UserData
    {
        $user = User::query()->findOrFail($id);
        $payload = $data->toArray();

        $picture = $data->picture;
        unset($payload['picture']);

        if ($picture instanceof UploadedFile) {
            $path = $this->storageService->uploadFile($picture, 'users');
            $payload['avatar_url'] = $path;
        }

        $user->update($payload);

        return UserData::from($user);
    }

    public function deleteUser(string $id): void
    {
        $user = User::query()->findOrFail($id);
        $user->delete();
    }
}
