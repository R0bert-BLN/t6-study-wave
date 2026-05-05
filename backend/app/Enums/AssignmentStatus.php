<?php

declare(strict_types=1);

namespace App\Enums;

enum AssignmentStatus: string
{
    case MISSING = 'missing';
    case SUBMITTED = 'submitted';
    case GRADED = 'graded';
    case NO_DUE_DATE = 'no_due_date';
    case ACTIVE = 'active';
}
