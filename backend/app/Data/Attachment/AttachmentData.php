<?php

declare(strict_types=1);

namespace App\Data\Attachment;

use App\Data\User\UserData;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Uuid;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class AttachmentData extends Data
{
    public function __construct(
        #[Uuid]
        public readonly string $id,
        public readonly string $attachableId,
        public readonly string $attachableType,
        public readonly string $name,
        public readonly float $size,
        public readonly string $extension,
        public readonly UserData $ownedBy,
        public readonly Carbon $createdAt,
        public readonly Carbon $updatedAt,
    ) {}
}
