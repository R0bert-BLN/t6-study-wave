<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Note;
use Spatie\QueryBuilder\AllowedFilter;

final readonly class NoteRepository extends BaseRepository
{
    protected function model(): string
    {
        return Note::class;
    }

    protected function allowedFilters(): array
    {
        return [AllowedFilter::partial('title')];
    }

    protected function allowedIncludes(): array
    {
        return ['createdBy'];
    }
}
