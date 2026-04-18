<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\AssignmentData;
use App\Models\Assignment;
use Spatie\LaravelData\DataCollection;

class AssignmentsService
{
    public function getAllAssignments(): DataCollection
    {
        return AssignmentData::collect(Assignment::with(['classCourse', 'createdBy'])->get());
    }

    public function getAssignment(string $id): AssignmentData
    {
        return AssignmentData::from(Assignment::with(['classCourse', 'createdBy'])->findOrFail($id));
    }

    public function createAssignment(AssignmentData $data): AssignmentData
    {
        $data = Assignment::create([
            'title' => $data->title,
            'description' => $data->description,
            'due_date' => $data->dueDate,
            'class_id' => $data->class->id,
            'created_by' => $data->createdBy->id,
        ]);

        return AssignmentData::from($data);
    }

    public function updateAssignment(string $id, AssignmentData $data): AssignmentData
    {
        $assignment = Assignment::findOrFail($id);
        $assignment->update([
            'title' => $data->title,
            'description' => $data->description,
            'due_date' => $data->dueDate,
            'class_id' => $data->class->id,
            'created_by' => $data->createdBy->id,
        ]);

        return AssignmentData::from($assignment->load(['classCourse', 'createdBy']));
    }

    public function deleteAssignment(string $id): void
    {
        Assignment::findOrFail($id)->delete();
    }
}
