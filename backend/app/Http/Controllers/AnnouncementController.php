<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Data\Announcement\AnnouncementCreateData;
use App\Data\Announcement\AnnouncementUpdateData;
use App\Services\AnnouncementService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

final readonly class AnnouncementController extends BaseController
{
    public function __construct(private AnnouncementService $announcementService) {}

    public function index(): JsonResponse
    {
        $announcements = $this->announcementService->getAllAnnouncements($this->getPerPage());

        return $this->success($announcements);
    }

    public function show(string $id): JsonResponse
    {
        $announcement = $this->announcementService->getAnnouncementById($id);

        return $this->success($announcement);
    }

    public function store(AnnouncementCreateData $data): JsonResponse
    {
        $announcement = $this->announcementService->createAnnouncement($data);

        return $this->success(data: $announcement, statusCode: Response::HTTP_CREATED);
    }

    public function update(string $id, AnnouncementUpdateData $data): JsonResponse
    {
        $announcement = $this->announcementService->updateAnnouncement($id, $data);

        return $this->success(data: $announcement);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->announcementService->deleteAnnouncement($id);

        return $this->success(statusCode: Response::HTTP_NO_CONTENT);
    }
}
