<?php

declare(strict_types=1);

namespace App\Data\Assignment;

use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Optional;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class AssignmentUpdateData extends Data
{
    public function __construct(
        public readonly Optional|string $title = new Optional,
        public readonly Optional|string $description = new Optional,
        public readonly Optional|Carbon $dueDate = new Optional,
    ) {}
}
