<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Assignment\AssignmentCreateData;
use App\Data\Assignment\AssignmentData;
use App\Data\Assignment\AssignmentUpdateData;
use App\Events\ClassworkCreated;
use App\Models\Assignment;
use App\Models\Attachment;
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
        $assignment = $this->assignmentsRepository->getById(
            $id,
            Assignment::query()->with([
                'comments' => fn ($query) => $query->orderByDesc('created_at'),
                'comments.createdBy',
            ]),
        );

        return AssignmentData::from($assignment);
    }

    public function createAssignment(AssignmentCreateData $data): AssignmentData
    {
        $payload = $data->toArray();
        unset($payload['attachments']);

        $assignment = Assignment::query()->create($payload);
        $this->storeAttachments($assignment, $data->attachments);

        // event(new ClassworkCreated($assignment->course_id, AssignmentData::from($assignment)->toArray()));

        return AssignmentData::from($assignment);
    }

    public function updateAssignment(string $id, AssignmentUpdateData $data): AssignmentData
    {
        $assignment = Assignment::query()->findOrFail($id);
        $payload = $data->toArray();

        unset($payload['attachments']);
        unset($payload['deletedAttachments']);

        $assignment->update($payload);

        $this->storeAttachments($assignment, $data->attachments);
        $this->deleteAttachments($assignment, $data->deletedAttachments);

        return AssignmentData::from($assignment);
    }

    public function deleteAssignment(string $id): void
    {
        $assignment = Assignment::query()->findOrFail($id);

        $this->deleteAttachments($assignment, $assignment->attachments()->pluck('id')->toArray());
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

    /**
     * @param  string[]  $attachmentIds
     */
    private function deleteAttachments(Assignment $assignment, array $attachmentIds): void
    {
        if ($attachmentIds === []) {
            return;
        }

        $attachments = $assignment->attachments()->whereIn('id', $attachmentIds)->get();

        foreach ($attachments as $attachment) {
            $attachment->delete();

            if (Attachment::query()->where('path', $attachment->path)->doesntExist()) {
                $this->storageService->deleteFile($attachment->path);
            }
        }
    }
}
