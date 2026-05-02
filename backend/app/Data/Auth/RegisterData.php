<?php

declare(strict_types=1);

namespace App\Data\Auth;

use App\Enums\UserRole;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Confirmed;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class RegisterData extends Data
{
    public function __construct(
        public readonly string $firstName,
        public readonly string $lastName,

        #[Unique('users', 'email')]
        #[Email]
        public readonly string $email,

        #[Confirmed]
        public readonly string $password,
        public readonly UserRole $role,
    ) {}
}
