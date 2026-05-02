<?php

declare(strict_types=1);

namespace App\Data\User;

use App\Data\Course\CourseData;
use App\Enums\UserRole;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class UserData extends Data
{
    /**
     * @param  CourseData[]|null  $courses
     */
    public function __construct(
        public readonly string $id,
        public readonly string $firstName,
        public readonly string $lastName,
        public readonly string $email,
        public readonly UserRole $role,
        public readonly ?string $avatarUrl,
        public readonly Carbon $createdAt,
        public readonly Carbon $updatedAt,
        public readonly ?array $courses = null,
    ) {}
}
