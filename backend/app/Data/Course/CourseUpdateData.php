<?php

declare(strict_types=1);

namespace App\Data\Course;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Optional;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class CourseUpdateData extends Data
{
    public function __construct(
        public readonly Optional|string $name,
        public readonly Optional|string $description,
    ) {}
}
