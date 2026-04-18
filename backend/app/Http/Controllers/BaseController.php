<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Traits\ApiResponse;
use App\Traits\HasPagination;

abstract readonly class BaseController
{
    use ApiResponse;
    use HasPagination;
}
