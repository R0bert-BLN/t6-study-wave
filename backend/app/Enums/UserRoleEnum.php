<?php

namespace App\Enums;

use App\Traits\HasBaseEnum;

enum UserRoleEnum: int
{
    use HasBaseEnum;

    case STUDENT = 1;
    case TEACHER = 2;
}
