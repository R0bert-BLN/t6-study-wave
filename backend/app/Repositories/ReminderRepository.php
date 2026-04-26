<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Reminder;

final readonly class ReminderRepository extends BaseRepository
{
    protected function model(): string
    {
        return Reminder::class;
    }

    protected function allowedIncludes(): array
    {
        return ['createdBy'];
    }
}
