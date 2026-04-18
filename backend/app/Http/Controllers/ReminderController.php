<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Data\ReminderData;
use App\Models\Reminder;
use App\Services\ReminderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class ReminderController extends Controller
{
    public function __construct(private ReminderService $reminderService) {}

    public function index(): JsonResponse
    {
        $data = $this->reminderService->getAllReminders();

        return response()->success(data: $data);
    }

    public function show(Reminder $reminder): JsonResponse
    {
        $data = $this->reminderService->getReminder($reminder->id);

        return response()->success(data: $data);
    }

    public function store(ReminderData $reminderData): JsonResponse
    {
        $data = $this->reminderService->createReminder($reminderData);

        return response()->success(data: $data);
    }

    public function update(Reminder $reminder, ReminderData $reminderData): JsonResponse
    {
        $data = $this->reminderService->updateReminder($reminder->id, $reminderData);

        return response()->success(data: $data);
    }

    public function destroy(Reminder $reminder): JsonResponse
    {
        $this->reminderService->deleteReminder($reminder->id);

        return response()->success(message: 'Reminder deleted successfully');
    }
}
