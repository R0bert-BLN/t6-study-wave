<?php

declare(strict_types=1);

namespace App\Data\Announcement;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Uuid;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class AnnouncementCreateData extends Data
{
    public function __construct(
        #[Uuid]
        public readonly string $courseId,
        public readonly string $body,
        public readonly string $createdBy,
    ) {}
}
