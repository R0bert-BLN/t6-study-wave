<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\AssignmentFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Assignment extends Model
{
    /** @use HasFactory<AssignmentFactory> */
    use HasFactory;

    use HasUuids;

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'class_id',
        'created_by',
    ];

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function classCourse(): BelongsTo
    {
        return $this->belongsTo(ClassCourse::class, 'class_id');
    }

    public function reminders(): HasMany
    {
        return $this->hasMany(Reminder::class, 'assignment_id');
    }
}
