<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\ReminderFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reminder extends Model
{
    /** @use HasFactory<ReminderFactory> */
    use HasFactory;

    use HasUuids;

    protected $fillable = [
        'title',
        'description',
        'scheduled_at',
        'created_by',
        'assignment_id',

    ];

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    //    public function assignment(): BelongsTo
    //    {
    //        return $this->belongsTo(Assignment::class, 'assignment_id');
    //    }
}
