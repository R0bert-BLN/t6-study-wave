<?php

declare(strict_types=1);

namespace App\Data;

use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Uuid;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]

class AssignmentData extends Data
{
    public function __construct(
        #[Uuid]
        public readonly string $id,
        public readonly string $title,
        public readonly string $description,
        public readonly Carbon $dueDate,
        public readonly ClassData $class,
        public readonly UserData $createdBy,
        public readonly ?Carbon $createdAt,
        public readonly ?Carbon $updatedAt,
    ) {}
}
