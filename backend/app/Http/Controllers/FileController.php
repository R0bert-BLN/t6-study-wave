<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\CloudStorageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

final readonly class FileController extends BaseController
{
    public function __construct(private CloudStorageService $storage) {}

    public function access(string $path, Request $request): StreamedResponse
    {
        if (! $this->storage->exists($path)) {
            abort(404, 'File not found.');
        }

        $stream = Storage::disk('s3')->readStream($path);

        if (! $stream) {
            abort(404, 'File not found.');
        }

        $isDownload = $request->query('download') === '1';
        $fileName = $request->query('name', basename($path));
        $mimeType = Storage::disk('s3')->mimeType($path) ?: 'application/octet-stream';

        $headers = [
            'Content-Type' => $mimeType,
        ];

        if ($isDownload) {
            $headers['Content-Disposition'] = 'attachment; filename="'.addslashes($fileName).'"';
        }

        return response()->stream(function () use ($stream) {
            fpassthru($stream);

            if (is_resource($stream)) {
                fclose($stream);
            }

        }, Response::HTTP_OK, $headers);
    }
}
