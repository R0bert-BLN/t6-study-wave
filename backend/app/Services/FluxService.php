<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Announcement\AnnouncementData;
use App\Data\Assignment\AssignmentData;
use App\Data\Material\MaterialData;
use App\Models\Announcement;
use App\Models\Assignment;
use App\Models\Material;

final readonly class FluxService
{
    public function getCourseFlux(string $courseId): array
    {
        $assignments = Assignment::query()->where('course_id', $courseId)
            ->with(['createdBy'])->get();

        $materials = Material::query()->where('course_id', $courseId)
            ->with(['createdBy'])->get();

        $announcements = Announcement::query()->where('course_id', $courseId)
            ->with(['createdBy'])->get();

        $announcementData = AnnouncementData::collect($announcements);
        $assignmentData = AssignmentData::collect($assignments);
        $materialData = MaterialData::collect($materials);

        $allWork = collect([...$assignmentData, ...$materialData, ...$announcementData]);

        return $allWork->sortByDesc('createdAt')->values()->all();
    }
}
