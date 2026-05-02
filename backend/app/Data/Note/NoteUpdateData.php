<?php

declare(strict_types=1);

namespace App\Data\Note;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Optional;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class NoteUpdateData extends Data
{
    public function __construct(
        public readonly Optional|string $title = new Optional,
        public readonly Optional|string $body = new Optional,
        public readonly Optional|string $category = new Optional,
    ) {}
}
