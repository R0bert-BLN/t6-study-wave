<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use RuntimeException;

final readonly class CloudStorageService
{
    public function uploadFile(UploadedFile $file, string $folder = 'uploads'): string
    {
        $hash = hash_file('sha256', $file->getRealPath());
        $extension = $file->getClientOriginalExtension();

        $fileName = "{$hash}.{$extension}";
        $path = "{$folder}/{$fileName}";

        if (! Storage::disk('s3')->exists($path)) {
            $uploaded = Storage::disk('s3')->putFileAs($folder, $file, $fileName);

            if (! $uploaded) {
                throw new RuntimeException('File upload failed.');
            }
        }

        return $path;
    }

    public function getSignedUrl(string $path, int $minutesValid = 60): string
    {
        if (! Storage::disk('s3')->exists($path)) {
            throw new RuntimeException('File not found');
        }

        return Storage::disk('s3')->temporaryUrl(
            $path,
            now()->addMinutes($minutesValid)
        );
    }

    public function deleteFile(string $path): bool
    {
        if (Storage::disk('s3')->exists($path)) {
            return Storage::disk('s3')->delete($path);
        }

        return false;
    }

    public function getFileContents(string $path): ?string
    {
        return Storage::disk('s3')->get($path);
    }
}
