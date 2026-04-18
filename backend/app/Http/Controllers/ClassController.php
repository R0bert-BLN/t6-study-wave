<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Data\ClassData;
use App\Models\ClassCourse;
use App\Services\ClassService;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class ClassController extends Controller
{
    public function __construct(private ClassService $classService) {}

    public function index(): JsonResponse
    {
        $data = $this->classService->getAllClasses();

        return response()->success(data: $data);
    }

    public function show(ClassCourse $classCourse): JsonResponse
    {
        $data = $this->classService->getClass($classCourse->id);

        return response()->success(data: $data);
    }

    public function store(ClassData $classData): JsonResponse
    {
        $data = $this->classService->createClass($classData);

        return response()->success(data: $data);
    }

    public function update(ClassCourse $classCourse, ClassData $classData): JsonResponse
    {
        $data = $this->classService->updateClass($classCourse->id, $classData);

        return response()->success(data: $data);
    }

    public function destroy(ClassCourse $classCourse): JsonResponse
    {
        $this->classService->deleteClass($classCourse->id);

        return response()->success(message: 'Class deleted successfully');
    }
}
