<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Attachment;

final readonly class AttachmentRepository extends BaseRepository
{
    protected function model(): string
    {
        return Attachment::class;
    }

    protected function allowedIncludes(): array
    {
        return ['ownedBy', 'attached'];
    }
}
