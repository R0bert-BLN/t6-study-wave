<?php

declare(strict_types=1);

namespace App\Data\Course;

use App\Data\User\UserData;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Uuid;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class CourseData extends Data
{
    public function __construct(
        #[Uuid]
        public readonly string $id,
        public readonly string $name,
        public readonly string $description,
        public readonly string $code,
        public readonly bool $isArchived,
        public readonly UserData $createdBy,
        public readonly Carbon $createdAt,
        public readonly Carbon $updatedAt,
    ) {}
}
