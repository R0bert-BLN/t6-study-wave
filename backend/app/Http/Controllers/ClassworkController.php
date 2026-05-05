<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\ClassworkService;
use Illuminate\Http\JsonResponse;

final readonly class ClassworkController extends BaseController
{
    public function __construct(private ClassworkService $classworkService) {}

    public function getClasswork(string $courseId): JsonResponse
    {
        $classwork = $this->classworkService->getCourseClasswork($courseId);

        return $this->success($classwork);
    }
}
