<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Data\Submission\SubmissionCreateData;
use App\Data\Submission\SubmissionUpdateData;
use App\Services\SubmissionService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

final readonly class SubmissionController extends BaseController
{
    public function __construct(private SubmissionService $submissionService) {}

    public function index(): JsonResponse
    {
        $submission = $this->submissionService->getAllSubmissions($this->getPerPage());

        return $this->success($submission);
    }

    public function show(string $id): JsonResponse
    {
        $submission = $this->submissionService->getSubmissionsById($id);

        return $this->success($submission);
    }

    public function store(SubmissionCreateData $data): JsonResponse
    {
        $submission = $this->submissionService->createSubmission($data);

        return $this->success(data: $submission, statusCode: Response::HTTP_CREATED);
    }

    public function update(string $id, SubmissionUpdateData $data): JsonResponse
    {
        $submission = $this->submissionService->updateSubmission($id, $data);

        return $this->success(data: $submission);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->submissionService->deleteSubmission($id);

        return $this->success(statusCode: Response::HTTP_NO_CONTENT);
    }
}
