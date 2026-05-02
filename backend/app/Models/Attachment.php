<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\AttachmentFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Attachment extends Model
{
    //
    /**@use HasFactory<AttachmentFactory> */
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'attachable_id',
        'attachable_type',
        'name',
        'size',
        'extension',
        'owned_by',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owned_by');
    }

    public function attached(): MorphTo
    {
        return $this->morphTo();
    }
}
