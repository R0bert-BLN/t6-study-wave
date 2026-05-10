<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Enums\AssignmentStatus;
use App\Models\Assignment;
use Spatie\QueryBuilder\AllowedFilter;

final readonly class AssignmentRepository extends BaseRepository
{
    protected function model(): string
    {
        return Assignment::class;
    }

    protected function allowedFilters(): array
    {
        return [
            AllowedFilter::partial('title'),
            AllowedFilter::exact('course_id'),
            AllowedFilter::callback('status', static function ($query, $value): void {
                if (! $value) {
                    return;
                }

                $userId = auth()->id();

                $query->where(static function ($query) use ($value, $userId): void {
                    switch ($value) {
                        case AssignmentStatus::ASSIGNED->value:
                            $query->orWhere(static function ($query) use ($userId): void {
                                $query->whereDoesntHave('submissions', static function ($query) use ($userId): void {
                                    $query->where('submitted_by', $userId);
                                });
                                $query->where(static function ($query): void {
                                    $query->whereNull('due_date')
                                        ->orWhere('due_date', '>=', now());
                                });
                            });
                            break;
                        case AssignmentStatus::MISSING->value:
                            $query->orWhere(static function ($query) use ($userId): void {
                                $query->whereDoesntHave('submissions', static function ($query) use ($userId): void {
                                    $query->where('submitted_by', $userId);
                                });
                                $query->whereNotNull('due_date')
                                    ->where('due_date', '<', now());
                            });
                            break;
                        case AssignmentStatus::SUBMITTED->value:
                            $query->orWhereHas('submissions', static function ($query) use ($userId): void {
                                $query->where('submitted_by', $userId);
                            });
                            break;
                        default:
                            break;
                    }
                });
            }),
            AllowedFilter::callback('assigned_to', static function ($query, $value): void {
                if (! $value) {
                    return;
                }

                $query->whereHas('course.participants', static function ($query) use ($value): void {
                    $query->where('users.id', $value);
                });
            }),
        ];
    }

    protected function allowedIncludes(): array
    {
        return [
            'createdBy',
            'course',
            'comments',
            'submissions',
            'attachments',
            'comments.createdBy',
            'submissions.submittedBy',
            'submissions.attachments',
        ];
    }
}
