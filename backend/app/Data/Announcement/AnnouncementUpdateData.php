<?php

declare(strict_types=1);

namespace App\Data\Announcement;

use App\Data\Course\CourseData;
use App\Data\User\UserData;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class AnnouncementUpdateData extends Data
{
    public function __construct(

        public readonly string $body,
        public readonly CourseData $classId,
        public readonly UserData $createdBy,

    ) {}
}
