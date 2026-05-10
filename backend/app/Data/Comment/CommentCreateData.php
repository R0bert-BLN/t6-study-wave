<?php

declare(strict_types=1);

namespace App\Data\Comment;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Uuid;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class CommentCreateData extends Data
{
    public function __construct(
        #[Uuid]
        public readonly string $commentableId,
        public readonly string $commentableType,
        public readonly string $body,

        #[Uuid]
        public readonly string $createdBy,
        public readonly bool $isPrivate,
    ) {}
}
