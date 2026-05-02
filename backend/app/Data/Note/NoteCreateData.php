<?php

declare(strict_types=1);

namespace App\Data\Note;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Uuid;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class NoteCreateData extends Data
{
    public function __construct(
        public readonly string $title,
        public readonly string $body,

        #[Uuid]
        public readonly string $createdBy,
        public readonly ?string $category,
    ) {}
}
