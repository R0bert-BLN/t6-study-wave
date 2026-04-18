<?php

declare(strict_types=1);

namespace App\Traits;

/**
 * @method static cases()
 */
trait BaseEnum
{
    public static function values(): array
    {
        /** @var array<int, static> $cases */
        $cases = static::cases();

        return array_map(fn ($c) => $c->value, $cases);
    }

    public static function names(): array
    {
        /** @var array<int, static> $cases */
        $cases = static::cases();

        return array_map(fn ($c) => $c->name, $cases);
    }
}
