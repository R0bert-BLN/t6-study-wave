<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Submission\SubmissionCreateData;
use App\Data\Submission\SubmissionData;
use App\Data\Submission\SubmissionUpdateData;
use App\Models\Submission;
use App\Repositories\SubmissionRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class SubmissionService
{
    public function __construct(private SubmissionRepository $submissionRepository, private CloudStorageService $storageService) {}

    public function getAllSubmissions(int $perPage): LengthAwarePaginator
    {
        return $this->submissionRepository->getAllPaginated($perPage);
    }

    public function getSubmissionsById(string $id): SubmissionData
    {
        /** @var Submission|null $submission */
        $submission = $this->submissionRepository->getById($id);

        return SubmissionData::from($submission);
    }

    public function createSubmission(SubmissionCreateData $data): SubmissionData
    {
        $payload = $data->toArray();
        unset($payload['attachments']);

        $submission = Submission::query()->create($payload);

        $this->storeAttachments($submission, $data->attachments);

        return SubmissionData::from($submission);
    }

    public function updateSubmission(string $id, SubmissionUpdateData $data): SubmissionData
    {

        $submission = Submission::query()->findOrFail($id);
        $submission->update($data->toArray());

        return SubmissionData::from($submission);
    }

    public function deleteSubmission(string $id): void
    {
        $submission = Submission::query()->findOrFail($id);
        $submission->delete();
    }

    /**
     * @param  UploadedFile[]  $files
     */
    private function storeAttachments(Submission $submission, array $files): void
    {
        if ($files === []) {
            return;
        }

        foreach ($files as $file) {
            if (! $file instanceof UploadedFile) {
                continue;
            }

            $path = $this->storageService->uploadFile($file, 'submissions');

            $submission->attachments()->create([
                'name' => $file->getClientOriginalName(),
                'path' => $path,
                'size' => $file->getSize() ?? 0,
                'extension' => $file->getClientOriginalExtension(),
                'owned_by' => auth()->id(),
            ]);
        }
    }
}
