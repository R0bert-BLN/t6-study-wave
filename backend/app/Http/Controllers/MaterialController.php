<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Data\Material\MaterialCreateData;
use App\Data\Material\MaterialUpdateData;
use App\Services\MaterialService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

final readonly class MaterialController extends BaseController
{
    public function __construct(private MaterialService $materialService) {}

    public function index(): JsonResponse
    {
        $materials = $this->materialService->getAllMaterials($this->getPerPage());

        return $this->success($materials);
    }

    public function show(string $id): JsonResponse
    {
        $material = $this->materialService->getMaterialById($id);

        return $this->success($material);
    }

    public function store(MaterialCreateData $data): JsonResponse
    {
        $material = $this->materialService->createMaterial($data);

        return $this->success(data: $material, statusCode: Response::HTTP_CREATED);
    }

    public function update(string $id, MaterialUpdateData $data): JsonResponse
    {
        $material = $this->materialService->updateMaterial($id, $data);

        return $this->success($material);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->materialService->deleteMaterial($id);

        return $this->success(statusCode: Response::HTTP_NO_CONTENT);
    }
}
