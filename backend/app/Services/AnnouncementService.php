<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Announcement\AnnouncementCreateData;
use App\Data\Announcement\AnnouncementData;
use App\Data\Announcement\AnnouncementUpdateData;
use App\Models\Announcement;
use App\Repositories\AnnouncementRepository;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class AnnouncementService
{
    public function __construct(private AnnouncementRepository $announcementRepository) {}

    public function getAllAnnouncements(int $perPage): LengthAwarePaginator
    {
        return $this->announcementRepository->getAllPaginated($perPage);
    }

    public function getAnnouncementById(string $id): AnnouncementData
    {
        /** @var Announcement|null $announcement */
        $announcement = $this->announcementRepository->getById($id);

        return AnnouncementData::from($announcement);
    }

    public function createAnnouncement(AnnouncementCreateData $data): AnnouncementData
    {
        $announcement = Announcement::query()->create($data->toArray());

        return AnnouncementData::from($announcement);
    }

    public function updateAnnouncement(string $d, AnnouncementUpdateData $data): AnnouncementData
    {
        $announcement = Announcement::query()->findOrFail($d);
        $announcement->update($data->toArray());

        return AnnouncementData::from($announcement);
    }

    public function deleteAnnouncement(string $d): void
    {
        $announcement = Announcement::query()->findOrFail($d);
        $announcement->delete();
    }
}
