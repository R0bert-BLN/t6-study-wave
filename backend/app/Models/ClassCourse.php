<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\ClassCourseFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClassCourse extends Model
{
    /** @use HasFactory<ClassCourseFactory> */
    use HasFactory;

    use HasUuids;

    protected $fillable = [
        'name',
        'description',
        'code',
        'is_archived',
        'created_by',
    ];

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
