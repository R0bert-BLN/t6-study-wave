<?php

declare(strict_types=1);

namespace App\Services;

use App\Mail\AnnouncementCreatedMail;
use App\Mail\AssignmentCreatedMail;
use App\Mail\MaterialCreatedMail;
use App\Models\Announcement;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\Material;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Mail;

final readonly class EmailService
{
    public function sendAnnouncementCreated(Announcement $announcement): void
    {
        $announcement->loadMissing(['course.participants', 'createdBy']);

        $this->sendToCourseParticipants(
            $announcement->course,
            new AnnouncementCreatedMail($announcement),
            $announcement->created_by
        );
    }

    public function sendMaterialCreated(Material $material): void
    {
        $material->loadMissing(['course.participants', 'createdBy']);

        $this->sendToCourseParticipants(
            $material->course,
            new MaterialCreatedMail($material),
            $material->created_by
        );
    }

    public function sendAssignmentCreated(Assignment $assignment): void
    {
        $assignment->loadMissing(['course.participants', 'createdBy']);

        $this->sendToCourseParticipants(
            $assignment->course,
            new AssignmentCreatedMail($assignment),
            $assignment->created_by
        );
    }

    private function sendToCourseParticipants(Course $course, object $mailable, ?string $excludeUserId = null): void
    {
        $emails = $this->getParticipantEmails($course, $excludeUserId);

        if ($emails->isEmpty()) {
            return;
        }

        Mail::to($emails->all())->send($mailable);
    }

    private function getParticipantEmails(Course $course, ?string $excludeUserId = null): Collection
    {
        return $course->participants
            ->when($excludeUserId, static function (Collection $users) use ($excludeUserId): Collection {
                return $users->reject(static fn ($user) => $user->id === $excludeUserId);
            })
            ->pluck('email')
            ->filter()
            ->unique()
            ->values();
    }
}
