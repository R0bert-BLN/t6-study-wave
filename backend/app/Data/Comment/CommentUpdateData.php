<?php

declare(strict_types=1);

namespace App\Data\Comment;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class CommentUpdateData extends Data
{
    public function __construct(

        public readonly string $commentableType,
        public readonly string $body,
        public readonly string $createdBy,
        public readonly bool $isPrivate,
    ) {}

}
