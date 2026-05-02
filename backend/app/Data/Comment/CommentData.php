<?php

declare(strict_types=1);

namespace App\Data\Comment;

use App\Data\User\UserData;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\AutoWhenLoadedLazy;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class CommentData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $commentableId,
        public readonly string $commentableType,
        public readonly string $body,

        #[AutoWhenLoadedLazy]
        public readonly UserData $createdBy,
        public readonly bool $isPrivate,
        public readonly Carbon $createdAt,
        public readonly Carbon $updatedAt,
    ) {}
}
