<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Course;
use Spatie\QueryBuilder\AllowedFilter;

final readonly class CourseRepository extends BaseRepository
{
    protected function model(): string
    {
        return Course::class;
    }

    protected function allowedFilters(): array
    {
        return [
            AllowedFilter::partial('name'),
        ];
    }

    protected function allowedIncludes(): array
    {
        return ['createdBy'];
    }
}
