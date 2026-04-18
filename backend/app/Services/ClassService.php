<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\ClassData;
use App\Models\ClassCourse;
use Spatie\LaravelData\DataCollection;

class ClassService
{
    public function createClass(ClassData $data): ClassData
    {
        $class = ClassCourse::create([
            'name' => $data->name,
            'description' => $data->description,
            'code' => $data->code,
            'created_by' => $data->createdBy->id,
        ]);

        return ClassData::from($class->load('createdBy'));
    }

    public function deleteClass(string $id): void
    {
        ClassCourse::findOrFail($id)->delete();
    }

    public function updateClass(string $id, ClassData $data): ClassData
    {
        $class = ClassCourse::findOrFail($id);
        $class->update([
            'name' => $data->name,
            'description' => $data->description,
            'code' => $data->code,
            'created_by' => $data->createdBy->id,
        ]);

        return ClassData::from($class->load('createdBy'));
    }

    public function getClass(string $id): ClassData
    {
        return ClassData::from(ClassCourse::with('createdBy')->findOrFail($id));
    }

    public function getAllClasses(): DataCollection
    {
        return ClassData::collect(ClassCourse::with('createdBy')->get());
    }
}
