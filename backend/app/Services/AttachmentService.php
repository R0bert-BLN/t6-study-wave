<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Announcement\AnnouncementCreateData;
use App\Data\Attachment\AttachmentCreateData;
use App\Data\Attachment\AttachmentData;
use App\Data\Attachment\AttachmentUpdateData;
use App\Models\Attachment;
use App\Repositories\AttachmentRepository;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class AttachmentService
{
    public function __construct(private AttachmentRepository $attachmentRepository) {}

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
        $attachment = Attachment::query()->create($data->toArray());

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
