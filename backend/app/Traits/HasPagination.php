<?php

declare(strict_types=1);

namespace App\Traits;

trait HasPagination
{
    protected function getPerPage(int $default = 10, int $max = 100): int
    {
        $perPage = (int) request()->query('per_page', $default);

        return min($perPage, $max);
    }
}
