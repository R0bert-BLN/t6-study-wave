<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\User;
use Spatie\QueryBuilder\AllowedFilter;

final readonly class UserRepository extends BaseRepository
{
    protected function model(): string
    {
        return User::class;
    }

    protected function allowedFilters(): array
    {
        return [
            AllowedFilter::partial('first_name'),
            AllowedFilter::partial('last_name'),
            AllowedFilter::partial('email'),
            AllowedFilter::exact('role'),
        ];
    }
}
