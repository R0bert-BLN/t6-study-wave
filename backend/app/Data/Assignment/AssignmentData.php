<?php

declare(strict_types=1);

namespace App\Data\Assignment;

use App\Data\Course\CourseData;
use App\Data\User\UserData;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\AutoWhenLoadedLazy;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class AssignmentData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,

        #[AutoWhenLoadedLazy]
        public readonly CourseData $course,

        #[AutoWhenLoadedLazy]
        public readonly UserData $createdBy,

        public readonly Carbon $createdAt,
        public readonly Carbon $updatedAt,
        public readonly ?string $description = null,
        public readonly ?Carbon $dueDate = null,
    ) {}
}
