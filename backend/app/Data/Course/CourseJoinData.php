<?php

declare(strict_types=1);

namespace App\Data\Course;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class, SnakeCaseMapper::class)]
class CourseJoinData extends Data
{
    public function __construct(
        public readonly string $code,
    ) {}
}
