<?php

declare(strict_types=1);

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;

class ApiExceptionHandler
{
    private array $dontLog = [
        ValidationException::class,
        AuthenticationException::class,
    ];

    public function render(Throwable $e, Request $request): ?JsonResponse
    {
        if (! $this->shouldHandleAsApi($request)) {
            return null;
        }

        $this->logException($e, $request);

        $statusCode = $this->getStatusCode($e);
        $response = [
            'success' => false,
            'error' => [
                'code' => $statusCode,
                'message' => $this->getMessage($e, $statusCode),
            ],
        ];

        if ($e instanceof ValidationException) {
            $response['error']['details'] = $e->errors();
        }

        return response()->json($response, $statusCode);
    }

    protected function shouldHandleAsApi(Request $request): bool
    {
        return $request->is('api/*') || $request->expectsJson();
    }

    protected function logException(Throwable $e, Request $request): void
    {
        foreach ($this->dontLog as $type) {
            if ($e instanceof $type) {
                return;
            }
        }

        if (! $e instanceof HttpExceptionInterface || $e->getStatusCode() >= 500) {
            Log::channel('openobserve')->error($e->getMessage(), [
                'exception' => get_class($e),
                'url' => $request->fullUrl(),
                'method' => $request->method(),
                'user_id' => $request->user()?->id,
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }

    protected function getStatusCode(Throwable $e): int
    {
        if ($e instanceof ValidationException) {
            return $e->status;
        }

        if ($e instanceof AuthenticationException) {
            return Response::HTTP_UNAUTHORIZED;
        }

        if ($e instanceof HttpExceptionInterface) {
            return $e->getStatusCode();
        }

        return $e->getCode() >= 100 && $e->getCode() <= 599 ? $e->getCode() : Response::HTTP_INTERNAL_SERVER_ERROR;
    }

    protected function getMessage(Throwable $e, int $statusCode): string
    {
        if (! config('app.debug') && $statusCode >= 500) {
            return 'Internal Server Error';
        }

        if (! empty($e->getMessage())) {
            return $e->getMessage();
        }

        return Response::$statusTexts[$statusCode] ?? 'Unknown Error';
    }
}
