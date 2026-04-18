<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\ReminderData;
use App\Models\Reminder;
use Spatie\LaravelData\DataCollection;

class ReminderService
{
    public function getAllReminders(): DataCollection
    {
        return ReminderData::collect(Reminder::with('assignment', 'createdBy')->get());
    }

    public function getReminder(string $id): ReminderData
    {
        return ReminderData::from(Reminder::with('assignment', 'createdBy')->findOrFail($id));
    }

    public function createReminder(ReminderData $data): ReminderData
    {
        $reminder = Reminder::create([
            'title' => $data->title,
            'description' => $data->description,
            'scheduled_at' => $data->scheduledAt,
            'assignment_id' => $data->assignment->id,
            'created_by' => $data->createdBy->id,
        ]);

        return ReminderData::from($reminder->load(['assignment', 'createdBy']));
    }

    public function updateReminder(string $id, ReminderData $data): ReminderData
    {
        $reminder = Reminder::findOrFail($id);
        $reminder->update([
            'title' => $data->title,
            'description' => $data->description,
            'scheduled_at' => $data->scheduledAt,
            'assignment_id' => $data->assignment->id,
            'created_by' => $data->createdBy->id,
        ]);

        return ReminderData::from($reminder->load(['assignment', 'createdBy']));
    }

    public function deleteReminder(string $id): void
    {
        Reminder::findOrFail($id)->delete();
    }
}
