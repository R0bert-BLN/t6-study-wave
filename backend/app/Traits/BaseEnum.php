<?php

namespace App\Traits;

/**
 * @method static cases()
 */
trait BaseEnum
{
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }
}
