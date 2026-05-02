<?php

declare(strict_types=1);

namespace App\Data\Submission;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Optional;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class SubmissionUpdateData extends Data
{
    public function __construct(
        public readonly Optional|float $grade = new Optional,
    ) {}
}
