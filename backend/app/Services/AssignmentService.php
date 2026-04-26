<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Assignment\AssignmentCreateData;
use App\Data\Assignment\AssignmentData;
use App\Data\Assignment\AssignmentUpdateData;
use App\Models\Assignment;
use App\Repositories\AssignmentRepository;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class AssignmentService
{
    public function __construct(private AssignmentRepository $assignmentsRepository) {}

    public function getAllAssignments(int $perPage): LengthAwarePaginator
    {
        return $this->assignmentsRepository->getAllPaginated($perPage);
    }

    public function getAssignmentById(string $id): AssignmentData
    {
        /** @var Assignment|null $assignment */
        $assignment = $this->assignmentsRepository->getById($id);

        return AssignmentData::from($assignment);
    }

    public function createAssignment(AssignmentCreateData $data): AssignmentData
    {
        $assignment = Assignment::query()->create([
            'title' => $data->title,
            'description' => $data->description,
            'due_date' => $data->dueDate,
            'course_id' => $data->course,
            'created_by' => $data->createdBy,
        ]);

        return AssignmentData::from($assignment);
    }

    public function updateAssignment(string $id, AssignmentUpdateData $data): AssignmentData
    {
        $assignment = Assignment::query()->findOrFail($id);
        $assignment->update($data->toArray());

        return AssignmentData::from($assignment);
    }

    public function deleteAssignment(string $id): void
    {
        $assignment = Assignment::query()->findOrFail($id);
        $assignment->delete();
    }
}
