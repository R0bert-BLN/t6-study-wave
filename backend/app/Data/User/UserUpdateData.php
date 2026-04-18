<?php

namespace App\Data\User;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Optional;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class UserUpdateData extends Data
{
    public function __construct(
        public readonly Optional|string $firstName,
        public readonly Optional|string $lastName,

        #[Email]
        public readonly Optional|string $email,
        public readonly Optional|string|null $avatarUrl,
    ) {}
}
