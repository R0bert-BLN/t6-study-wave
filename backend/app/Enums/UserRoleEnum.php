<?php

namespace App\Enums;

use App\Traits\BaseEnum;

enum UserRoleEnum: int
{
    use BaseEnum;

    case STUDENT = 1;
    case PROFESSOR = 2;
}
