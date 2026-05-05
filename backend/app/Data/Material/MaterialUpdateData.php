<?php

declare(strict_types=1);

namespace App\Data\Material;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Optional;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class MaterialUpdateData extends Data
{
    /**
     * @param  UploadedFile[]  $attachments
     * @param  string[]  $deletedAttachments
     */
    public function __construct(
        public readonly Optional|string $title = new Optional,
        public readonly Optional|string $description = new Optional,
        public readonly Optional|string $category = new Optional,
        public readonly array $attachments = [],
        public readonly array $deletedAttachments = [],
    ) {}
}
