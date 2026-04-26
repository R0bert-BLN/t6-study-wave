<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Data\Assignment\AssignmentCreateData;
use App\Data\Assignment\AssignmentUpdateData;
use App\Services\AssignmentService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

final readonly class AssignmentController extends BaseController
{
    public function __construct(private AssignmentService $assignmentService) {}

    public function index(): JsonResponse
    {
        $assignment = $this->assignmentService->getAllAssignments($this->getPerPage());

        return $this->success($assignment);
    }

    public function show(string $id): JsonResponse
    {
        $assignment = $this->assignmentService->getAssignmentById($id);

        return $this->success($assignment);
    }

    public function store(AssignmentCreateData $data): JsonResponse
    {
        $assignment = $this->assignmentService->createAssignment($data);

        return $this->success(data: $assignment, statusCode: Response::HTTP_CREATED);
    }

    public function update(string $id, AssignmentUpdateData $data): JsonResponse
    {
        $assignment = $this->assignmentService->updateAssignment($id, $data);

        return $this->success($assignment);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->assignmentService->deleteAssignment($id);

        return $this->success(statusCode: Response::HTTP_NO_CONTENT);
    }
}
