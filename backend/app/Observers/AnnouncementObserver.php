<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Announcement;
use App\Services\EmailService;

final readonly class AnnouncementObserver
{
    public function __construct(private EmailService $emailService) {}

    public function created(Announcement $announcement): void
    {
        $this->emailService->sendAnnouncementCreated($announcement);
    }
}
