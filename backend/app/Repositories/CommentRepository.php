<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Comment;

final readonly class CommentRepository extends BaseRepository
{
    protected function model(): string
    {
        return Comment::class;
    }

    protected function allowedIncludes(): array
    {
        return ['createdBy', 'commentable'];
    }
}
