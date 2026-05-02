<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Assignment\AssignmentCreateData;
use App\Data\Assignment\AssignmentData;
use App\Data\Assignment\AssignmentUpdateData;
use App\Models\Assignment;
use App\Repositories\AssignmentRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class AssignmentService
{
    public function __construct(private AssignmentRepository $assignmentsRepository, private CloudStorageService $storageService) {}

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
        $payload = $data->toArray();
        unset($payload['attachments']);

        $assignment = Assignment::query()->create($payload);

        $this->storeAttachments($assignment, $data->attachments);

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

    /**
     * @param  UploadedFile[]  $files
     */
    private function storeAttachments(Assignment $assignment, array $files): void
    {
        if ($files === []) {
            return;
        }

        foreach ($files as $file) {
            if (! $file instanceof UploadedFile) {
                continue;
            }

            $path = $this->storageService->uploadFile($file, 'assignments');

            $assignment->attachments()->create([
                'name' => $file->getClientOriginalName(),
                'path' => $path,
                'size' => $file->getSize() ?? 0,
                'extension' => $file->getClientOriginalExtension(),
                'owned_by' => auth()->id(),
            ]);
        }
    }
}
