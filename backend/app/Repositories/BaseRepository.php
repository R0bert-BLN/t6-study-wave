<?php

declare(strict_types=1);

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

abstract readonly class BaseRepository
{
    /**
     * @return class-string<Model>
     */
    abstract protected function model(): string;

    /**
     * @return string[]
     */
    protected function allowedIncludes(): array
    {
        return [];
    }

    /**
     * @return AllowedFilter[]
     */
    protected function allowedFilters(): array
    {
        return [];
    }

    /**
     * @return string[]
     */
    protected function allowedSorts(): array
    {
        return ['created_at', 'updated_at'];
    }

    protected function defaultSort(): string
    {
        return 'created_at';
    }

    protected function buildQuery(?Builder $baseQuery = null): QueryBuilder
    {
        $query = $baseQuery ?? $this->model()::query();

        return QueryBuilder::for($query)
            ->allowedIncludes(...$this->allowedIncludes())
            ->allowedFilters(...$this->allowedFilters())
            ->allowedSorts(...$this->allowedSorts())
            ->defaultSort($this->defaultSort());
    }

    public function getAllPaginated(?int $perPage = 10, ?Builder $baseQuery = null): LengthAwarePaginator
    {
        return $this->buildQuery($baseQuery)
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getById(string $id, ?Builder $baseQuery = null): ?Model
    {
        return $this->buildQuery($baseQuery)->find($id);
    }
}
