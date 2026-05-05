<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Assignment\AssignmentData;
use App\Data\Material\MaterialData;
use App\Models\Assignment;
use App\Models\Material;

final readonly class ClassworkService
{
    public function getCourseClasswork(string $courseId): array
    {
        $assignments = Assignment::query()->where('course_id', $courseId)
            ->with(['attachments', 'createdBy'])->get();

        $materials = Material::query()->where('course_id', $courseId)
            ->with(['attachments', 'createdBy'])->get();

        $assignmentData = AssignmentData::collect($assignments);
        $materialData = MaterialData::collect($materials);

        $allWork = collect([...$assignmentData, ...$materialData]);

        return $allWork->groupBy('category')->toArray();
    }
}
