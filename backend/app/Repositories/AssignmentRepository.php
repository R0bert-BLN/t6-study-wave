<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Assignment;

final readonly class AssignmentRepository extends BaseRepository
{
    protected function model(): string
    {
        return Assignment::class;
    }

    protected function allowedIncludes(): array
    {
        return ['createdBy', 'course'];
    }
}
