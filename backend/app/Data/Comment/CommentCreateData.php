<?php

declare(strict_types=1);

namespace App\Data\Comment;

use Spatie\LaravelData\Data;

class CommentCreateData extends Data
{
    public function __construct(

        public readonly string $commentableId,
        public readonly string $commentableType,
        public readonly string $body,
        public readonly string $createdBy,
        public readonly bool $isPrivate,
    ) {}

}
