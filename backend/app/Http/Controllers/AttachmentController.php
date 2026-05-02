<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Data\Attachment\AttachmentCreateData;
use App\Data\Attachment\AttachmentUpdateData;
use App\Services\AttachmentService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

final readonly class AttachmentController extends BaseController
{
    public function __construct(private AttachmentService $attachmentService) {}

    public function index(): JsonResponse
    {
        $attachments = $this->attachmentService->getAllAttachments($this->getPerPage());

        return $this->success($attachments);
    }

    public function show(string $id): JsonResponse
    {
        $attachment = $this->attachmentService->getAttachmentById($id);

        return $this->success($attachment);
    }

    public function store(AttachmentCreateData $data): JsonResponse
    {
        $attachment = $this->attachmentService->createAttachment($data);

        return $this->success(data: $attachment, statusCode: Response::HTTP_CREATED);
    }

    public function update(string $id, AttachmentUpdateData $data): JsonResponse
    {
        $attachment = $this->attachmentService->updateAttachment($id, $data);

        return $this->success(data: $attachment);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->attachmentService->deleteAttachment($id);

        return $this->success(statusCode: Response::HTTP_NO_CONTENT);
    }
}
