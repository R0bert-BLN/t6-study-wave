<?php

declare(strict_types=1);

namespace App\Data\User;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Optional;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class UserUpdateData extends Data
{
    public function __construct(
        public readonly Optional|string $firstName,
        public readonly Optional|string $lastName,
        public readonly Optional|UploadedFile $picture,
    ) {}
}
