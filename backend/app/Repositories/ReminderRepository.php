<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Models\Reminder;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;

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

    protected function allowedFilters(): array
    {
        return [
            AllowedFilter::exact('created_by'),
            AllowedFilter::callback('scheduled_after', function (Builder $query, $value) {
                $date = Carbon::parse($value)->startOfDay();
                $query->where('scheduled_at', '>=', $date);
            }),
            AllowedFilter::callback('scheduled_before', function (Builder $query, $value) {
                $date = Carbon::parse($value)->endOfDay();
                $query->where('scheduled_at', '<=', $date);
            }),
            AllowedFilter::callback('today', function (Builder $query, $value) {
                $isToday = filter_var($value, FILTER_VALIDATE_BOOLEAN);

                if ($isToday) {
                    $query->whereBetween('scheduled_at', [
                        now()->startOfDay(),
                        now()->endOfDay(),
                    ]);
                }
            }),
        ];
    }
}
