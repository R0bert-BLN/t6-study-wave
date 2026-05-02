<?php

declare(strict_types=1);

namespace App\Data\Submission;

use App\Data\Assignment\AssignmentData;
use App\Data\User\UserData;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\AutoWhenLoadedLazy;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class SubmissionData extends Data
{
    public function __construct(
        public readonly string $id,

        #[AutoWhenLoadedLazy]
        public readonly AssignmentData|Lazy|null $assignment,

        #[AutoWhenLoadedLazy]
        public readonly UserData|Lazy|null $submittedBy,
        public readonly float $grade,
        public readonly ?Carbon $submittedAt,
        public readonly Carbon $createdAt,
        public readonly Carbon $updatedAt,
    ) {}
}
