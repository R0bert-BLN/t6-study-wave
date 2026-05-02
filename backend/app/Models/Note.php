<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\NoteFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    /** @use HasFactory<NoteFactory> */
    use HasFactory;

    use HasUuids;

    protected $fillable = [
        'id',
        'title',
        'body',
        'created_by',
        'category',
    ];

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
