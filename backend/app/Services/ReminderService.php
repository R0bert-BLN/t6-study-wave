<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Reminder\ReminderCreateData;
use App\Data\Reminder\ReminderData;
use App\Data\Reminder\ReminderUpdateData;
use App\Models\Reminder;
use App\Repositories\ReminderRepository;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class ReminderService
{
    public function __construct(private ReminderRepository $reminderRepository) {}

    public function getAllReminders(int $perPage): LengthAwarePaginator
    {
        return $this->reminderRepository->getAllPaginated($perPage);
    }

    public function getReminderById(string $id): ReminderData
    {
        /** @var Reminder|null $reminder */
        $reminder = $this->reminderRepository->getById($id);

        return ReminderData::from($reminder);
    }

    public function createReminder(ReminderCreateData $data): ReminderData
    {
        $reminder = Reminder::query()->create($data->toArray());

        return ReminderData::from($reminder);
    }

    public function updateReminder(string $id, ReminderUpdateData $data): ReminderData
    {
        $reminder = Reminder::query()->findOrFail($id);
        $reminder->update($data->toArray());

        return ReminderData::from($reminder);
    }

    public function deleteReminder(string $id): void
    {
        $reminder = Reminder::query()->findOrFail($id);
        $reminder->delete();
    }
}
