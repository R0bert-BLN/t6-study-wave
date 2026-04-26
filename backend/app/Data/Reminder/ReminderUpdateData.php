<?php

declare(strict_types=1);

namespace App\Data\Reminder;

use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Optional;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class ReminderUpdateData extends Data
{
    public function __construct(
        public readonly Optional|string $title,
        public readonly Optional|string $description,
        public readonly Optional|Carbon $scheduledAt,
    ) {}
}
