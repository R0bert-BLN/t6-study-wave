<?php

declare(strict_types=1);

namespace App\Data\Material;

use App\Data\Attachment\AttachmentData;
use App\Data\Comment\CommentData;
use App\Data\Course\CourseData;
use App\Data\User\UserData;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\AutoWhenLoadedLazy;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class MaterialData extends Data
{
    public string $type = 'material';

    /**
     * @param  AttachmentData[]|Lazy|null  $attachments
     * @param  CommentData[]|Lazy|null  $comments
     */
    public function __construct(
        public readonly string $id,
        public readonly string $title,
        public readonly ?string $description,
        public readonly string $category,
        public readonly Carbon $createdAt,
        public readonly Carbon $updatedAt,

        #[AutoWhenLoadedLazy]
        public readonly CourseData|Lazy $course,

        #[AutoWhenLoadedLazy]
        public readonly UserData|Lazy $createdBy,

        #[AutoWhenLoadedLazy]
        public readonly array|Lazy|null $attachments,

        #[AutoWhenLoadedLazy]
        public readonly array|Lazy|null $comments,
    ) {}
}
