<?php

declare(strict_types=1);

namespace App\Data\Attachment;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class AttachmentUpdateData extends Data
{
    public function __construct(
        public readonly string $name,
    ) {}
}
