<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Submission;
use Spatie\QueryBuilder\AllowedFilter;

final readonly class SubmissionRepository extends BaseRepository
{
    protected function model(): string
    {
        return Submission::class;
    }

    protected function allowedFilters(): array
    {
        return [AllowedFilter::exact('assignment_id'), AllowedFilter::exact('submitted_by')];
    }

    protected function allowedIncludes(): array
    {
        return ['assignment', 'submittedBy', 'attachments', 'comments'];
    }
}
