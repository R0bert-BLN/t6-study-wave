<?php

declare(strict_types=1);

namespace App\Data\Submission;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Uuid;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class SubmissionCreateData extends Data
{
    /**
     * @param  UploadedFile[]  $attachments
     */
    public function __construct(
        #[Uuid]
        public readonly string $assignmentId,

        public readonly array $attachments = [],
    ) {}
}
