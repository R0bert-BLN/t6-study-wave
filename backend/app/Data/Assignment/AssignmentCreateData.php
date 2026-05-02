<?php

declare(strict_types=1);

namespace App\Data\Assignment;

use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Uuid;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class AssignmentCreateData extends Data
{
    /**
     * @param  UploadedFile[]  $attachments
     */
    public function __construct(
        public readonly string $title,
        public readonly ?string $description,
        public readonly ?Carbon $dueDate,

        #[Uuid]
        public readonly string $courseId,

        #[Uuid]
        public readonly string $createdBy,
        public readonly array $attachments = [],
    ) {}
}
