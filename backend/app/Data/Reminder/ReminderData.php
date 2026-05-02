<?php

declare(strict_types=1);

namespace App\Data\Reminder;

use App\Data\User\UserData;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\AutoWhenLoadedLazy;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class ReminderData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly ?string $description,
        public readonly Carbon $scheduledAt,

        #[AutoWhenLoadedLazy]
        public readonly UserData $createdBy,
        public readonly Carbon $createdAt,
        public readonly Carbon $updatedAt,
    ) {}
}
