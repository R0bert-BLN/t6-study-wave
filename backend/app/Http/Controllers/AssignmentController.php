<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Data\AssignmentData;
use App\Models\Assignment;
use App\Services\AssignmentsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class AssignmentController extends Controller
{
    public function __construct(private AssignmentsService $assignmentsService) {}

    public function index(): JsonResponse
    {
        $data = $this->assignmentsService->getAllAssignments();

        return response()->success(data: $data);
    }

    public function show(Assignment $assignment): JsonResponse
    {
        $data = $this->assignmentsService->getAssignment($assignment->id);

        return response()->success(data: $data);
    }

    public function store(AssignmentData $assignmentData): JsonResponse
    {
        $data = $this->assignmentsService->createAssignment($assignmentData);

        return response()->success(data: $data);
    }

    public function update(Assignment $assignment, AssignmentData $assignmentData): JsonResponse
    {
        $data = $this->assignmentsService->updateAssignment($assignment->id, $assignmentData);

        return response()->success(data: $data);
    }

    public function destroy(Assignment $assignment): JsonResponse
    {
        $this->assignmentsService->deleteAssignment($assignment->id);

        return response()->success(message: 'Assignment deleted successfully');
    }
}
