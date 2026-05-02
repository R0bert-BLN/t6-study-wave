<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Announcement;

final readonly class AnnouncementRepository extends BaseRepository
{
    protected function model(): string
    {
        return Announcement::class;
    }

    protected function allowedIncludes(): array
    {
        return ['createdBy', 'course', 'comments'];
    }
}
