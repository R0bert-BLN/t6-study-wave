<?php

declare(strict_types=1);

namespace App\Data\Submission;

use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class SubmissionUpdateData extends Data
{
    public function __construct(
        public readonly string $assignmentId,
        public readonly string $submittedBy,
        public readonly float $grade,
        public readonly ?Carbon $submittedAt,
    ) {}

}
