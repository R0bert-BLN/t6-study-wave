<?php

declare(strict_types=1);

namespace App\Data\Assignment;

use App\Data\Course\CourseData;
use App\Data\User\UserData;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Uuid;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class AssignmentData extends Data
{
    public function __construct(
        #[Uuid]
        public readonly string $id,
        public readonly string $title,
        public readonly string $description,
        public readonly ?Carbon $dueDate,
        public readonly CourseData $course,
        public readonly UserData $createdBy,
        public readonly Carbon $createdAt,
        public readonly Carbon $updatedAt,
    ) {}
}
