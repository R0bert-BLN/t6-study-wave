<?php

declare(strict_types=1);

namespace App\Data\Attachment;

use App\Data\User\UserData;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\AutoWhenLoadedLazy;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class AttachmentData extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $attachableId,
        public readonly string $attachableType,
        public readonly string $name,
        public readonly string $path,
        public readonly float $size,
        public readonly string $extension,

        #[AutoWhenLoadedLazy]
        public readonly UserData|Lazy|null $ownedBy,

        public readonly Carbon $createdAt,
        public readonly Carbon $updatedAt,
    ) {}
}
