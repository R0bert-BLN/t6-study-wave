<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Course\CourseCreateData;
use App\Data\Course\CourseData;
use App\Data\Course\CourseUpdateData;
use App\Models\Course;
use App\Repositories\CourseRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

final readonly class CourseService
{
    public function __construct(private CourseRepository $courseRepository) {}

    public function getAllCourses(int $perPage): LengthAwarePaginator
    {
        return $this->courseRepository->getAllPaginated($perPage);
    }

    public function getCourseById(string $id): ?CourseData
    {
        /** @var Course|null $course */
        $course = $this->courseRepository->getById($id);

        return $course ? CourseData::from($course) : null;
    }

    public function createCourse(CourseCreateData $data): CourseData
    {
        $course = Course::query()->create([
            'name' => $data->name,
            'description' => $data->description,
            'code' => Str::random(6),
            'created_by' => $data->createdBy,
        ]);

        return CourseData::from($course);
    }

    public function updateCourse(string $id, CourseUpdateData $data): CourseData
    {
        $course = Course::query()->findOrFail($id);
        $course->update($data->toArray());

        return CourseData::from($course);
    }

    public function deleteCourse(string $id): void
    {
        $course = Course::query()->findOrFail($id);
        $course->delete();
    }
}
