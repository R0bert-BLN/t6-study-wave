<?php

declare(strict_types=1);

namespace App\Data\Attachment;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Uuid;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class AttachmentCreateData extends Data
{
    public function __construct(
        #[Uuid]
        public readonly string $attachableId,
        public readonly string $attachableType,
        public readonly UploadedFile $file,
    ) {}
}
