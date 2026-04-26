<?php

declare(strict_types=1);

namespace App\Data\Reminder;

use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class ReminderCreateData extends Data
{
    public function __construct(
        public readonly string $title,
        public readonly ?string $description,
        public readonly Carbon $scheduledAt,
        public readonly string $createdBy,
    ) {}
}
