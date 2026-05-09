<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\FluxService;
use Illuminate\Http\JsonResponse;

final readonly class FluxController extends BaseController
{
    public function __construct(private FluxService $fluxService) {}

    public function getFlux(string $courseId): JsonResponse
    {
        $flux = $this->fluxService->getCourseFlux($courseId);

        return $this->success($flux);
    }
}
