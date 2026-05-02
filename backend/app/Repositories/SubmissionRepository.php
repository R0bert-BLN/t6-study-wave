<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Submission;

final readonly class SubmissionRepository extends BaseRepository
{
    protected function model(): string
    {
        return Submission::class;
    }

    protected function allowedIncludes(): array
    {
        return ['assignment', 'submittedBy'];
    }
}
