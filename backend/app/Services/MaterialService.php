<?php

declare(strict_types=1);

namespace App\Services;

use App\Data\Material\MaterialCreateData;
use App\Data\Material\MaterialData;
use App\Data\Material\MaterialUpdateData;
use App\Events\ClassworkCreated;
use App\Models\Attachment;
use App\Models\Material;
use App\Repositories\MaterialRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;

final readonly class MaterialService
{
    public function __construct(private MaterialRepository $materialRepository, private CloudStorageService $storageService) {}

    public function getAllMaterials(int $perPage): LengthAwarePaginator
    {
        return $this->materialRepository->getAllPaginated($perPage);
    }

    public function getMaterialById(string $id): MaterialData
    {
        /** @var Material|null $material */
        $material = $this->materialRepository->getById($id);

        return MaterialData::from($material);
    }

    public function createMaterial(MaterialCreateData $data): MaterialData
    {
        $payload = $data->toArray();
        unset($payload['attachments']);

        $material = Material::query()->create($payload);
        $this->storeAttachments($material, $data->attachments);

        event(new ClassworkCreated($material->course_id, MaterialData::from($material)->toArray()));

        return MaterialData::from($material);
    }

    public function updateMaterial(string $id, MaterialUpdateData $data): MaterialData
    {
        $material = Material::query()->findOrFail($id);
        $payload = $data->toArray();

        unset($payload['attachments']);
        unset($payload['deletedAttachments']);

        $material->update($payload);

        $this->storeAttachments($material, $data->attachments);
        $this->deleteAttachments($material, $data->deletedAttachments);

        return MaterialData::from($material);
    }

    public function deleteMaterial(string $id): void
    {
        $material = Material::query()->findOrFail($id);
        $material->delete();
    }

    /**
     * @param  UploadedFile[]  $files
     */
    private function storeAttachments(Material $material, array $files): void
    {
        if ($files === []) {
            return;
        }

        foreach ($files as $file) {
            $path = $this->storageService->uploadFile($file, 'materials');

            $material->attachments()->create([
                'name' => $file->getClientOriginalName(),
                'path' => $path,
                'size' => $file->getSize() ?? 0,
                'extension' => $file->getClientOriginalExtension(),
                'owned_by' => auth()->id(),
            ]);
        }
    }

    /**
     * @param  string[]  $attachmentIds
     */
    private function deleteAttachments(Material $material, array $attachmentIds): void
    {
        if ($attachmentIds === []) {
            return;
        }

        $attachments = $material->attachments()->whereIn('id', $attachmentIds)->get();

        foreach ($attachments as $attachment) {
            $attachment->delete();

            if (Attachment::query()->where('path', $attachment->path)->doesntExist()) {
                $this->storageService->deleteFile($attachment->path);
            }
        }
    }
}
