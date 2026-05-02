<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Attachment\AttachmentCreateData;
use App\Data\Attachment\AttachmentData;
use App\Data\Attachment\AttachmentUpdateData;
use App\Enums\ResourceType;
use App\Models\Attachment;
use App\Repositories\AttachmentRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use RuntimeException;

final readonly class AttachmentService
{
    public function __construct(private AttachmentRepository $attachmentRepository, private CloudStorageService $storageService) {}

    public function getAllAttachments(int $perPage): LengthAwarePaginator
    {
        return $this->attachmentRepository->getAllPaginated($perPage);
    }

    public function getAttachmentById(string $id): AttachmentData
    {
        /** @var Attachment|null $attachment */
        $attachment = $this->attachmentRepository->getById($id);

        return AttachmentData::from($attachment);
    }

    public function createAttachment(AttachmentCreateData $data): AttachmentData
    {
        $path = $this->storageService->uploadFile($data->file, $data->attachableType);

        $attachment = Attachment::query()->create([
            'attachable_id' => $data->attachableId,
            'attachable_type' => ResourceType::modelClass($data->attachableType),
            'name' => $data->file->getClientOriginalName(),
            'path' => $path,
            'size' => $data->file->getSize() ?? 0,
            'extension' => $data->file->getClientOriginalExtension(),
            'owned_by' => auth()->id(),
        ]);

        if (! $attachment) {
            throw new RuntimeException('Attachment could not be created.');
        }

        return AttachmentData::from($attachment);
    }

    public function updateAttachment(string $id, AttachmentUpdateData $data): AttachmentData
    {
        $attachment = Attachment::query()->findOrFail($id);
        $attachment->update($data->toArray());

        return AttachmentData::from($attachment);
    }

    public function deleteAttachment(string $id): void
    {
        $attachment = Attachment::query()->findOrFail($id);
        $attachment->delete();
    }
}
