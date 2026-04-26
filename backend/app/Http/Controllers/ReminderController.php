<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Data\Reminder\ReminderCreateData;
use App\Data\Reminder\ReminderUpdateData;
use App\Services\ReminderService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

final readonly class ReminderController extends BaseController
{
    public function __construct(private ReminderService $reminderService) {}

    public function index(): JsonResponse
    {
        $reminders = $this->reminderService->getAllReminders($this->getPerPage());

        return $this->success($reminders);
    }

    public function show(string $id): JsonResponse
    {
        $reminders = $this->reminderService->getReminderById($id);

        return $this->success($reminders);
    }

    public function store(ReminderCreateData $data): JsonResponse
    {
        $reminder = $this->reminderService->createReminder($data);

        return $this->success(data: $reminder, statusCode: Response::HTTP_CREATED);
    }

    public function update(string $id, ReminderUpdateData $data): JsonResponse
    {
        $reminder = $this->reminderService->updateReminder($id, $data);

        return $this->success($reminder);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->reminderService->deleteReminder($id);

        return $this->success(statusCode: Response::HTTP_NO_CONTENT);
    }
}
