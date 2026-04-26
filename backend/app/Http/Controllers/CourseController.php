<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Data\Course\CourseCreateData;
use App\Data\Course\CourseUpdateData;
use App\Services\CourseService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

final readonly class CourseController extends BaseController
{
    public function __construct(private CourseService $courseService) {}

    public function index(): JsonResponse
    {
        $courses = $this->courseService->getAllCourses($this->getPerPage());

        return $this->success($courses);
    }

    public function show(string $id): JsonResponse
    {
        $course = $this->courseService->getCourseById($id);

        return $this->success($course);
    }

    public function store(CourseCreateData $data): JsonResponse
    {
        $course = $this->courseService->createCourse($data);

        return $this->success(data: $course, statusCode: Response::HTTP_CREATED);
    }

    public function update(CourseUpdateData $course, string $id): JsonResponse
    {
        $course = $this->courseService->updateCourse($id, $course);

        return $this->success($course);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->courseService->deleteCourse($id);

        return $this->success(statusCode: Response::HTTP_NO_CONTENT);
    }
}
