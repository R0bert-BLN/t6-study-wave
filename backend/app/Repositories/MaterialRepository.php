<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Material;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class MaterialRepository extends BaseRepository
{
    protected function model(): string
    {
        return Material::class;
    }

    protected function allowedIncludes(): array
    {
        return ['createdBy', 'course', 'attachments'];
    }
}
