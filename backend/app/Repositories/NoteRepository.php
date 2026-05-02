<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Note;

final readonly class NoteRepository extends BaseRepository
{
    protected function model(): string
    {
        return Note::class;
    }

    protected function allowedIncludes(): array
    {
        return ['createdBy'];
    }
}
