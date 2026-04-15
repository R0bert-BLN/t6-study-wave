<?php

declare(strict_types=1);

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    protected function success(mixed $data = null, ?string $message = null, int $statusCode = 200): JsonResponse
    {
        $response = [
            'success' => true,
        ];

        if ($data !== null) {
            $response['data'] = $data;
        }

        if ($message !== null) {
            $response['message'] = $message;
        }

        return response()->json($response, $statusCode);
    }

    protected function error(?string $message = null, ?int $code = null, int $statusCode = 500): JsonResponse
    {
        $response = [
            'success' => false,
        ];

        if ($message !== null) {
            $response['error']['message'] = $message;
        }

        if ($code !== null) {
            $response['error']['code'] = $code;
        }

        return response()->json($response, $statusCode);
    }
}
