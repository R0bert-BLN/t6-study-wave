<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Assignment;
use App\Services\EmailService;

final readonly class AssignmentObserver
{
    public function __construct(private EmailService $emailService) {}

    public function created(Assignment $assignment): void
    {
        $this->emailService->sendAssignmentCreated($assignment);
    }
}
