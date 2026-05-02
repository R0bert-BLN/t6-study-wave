<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Assignment;
use Spatie\QueryBuilder\AllowedFilter;

final readonly class AssignmentRepository extends BaseRepository
{
    protected function model(): string
    {
        return Assignment::class;
    }

    protected function allowedFilters(): array
    {
        return [AllowedFilter::partial('title'), AllowedFilter::exact('course_id')];
    }

    protected function allowedIncludes(): array
    {
        return ['createdBy', 'course', 'comments', 'submissions', 'attachments'];
    }
}
