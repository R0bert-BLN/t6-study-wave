<?php

namespace App\Data;

use App\Enums\UserRoleEnum;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class UserData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $firstName,
        public readonly string $lastName,
        public readonly string $email,
        public readonly UserRoleEnum $role,
        public readonly ?string $avatarUrl,
        public readonly ?Carbon $createdAt,
        public readonly ?Carbon $updatedAt,
    ) {}
}
