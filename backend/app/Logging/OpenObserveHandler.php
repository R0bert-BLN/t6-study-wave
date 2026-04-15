<?php

declare(strict_types=1);

namespace App\Logging;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;
use Monolog\Handler\AbstractProcessingHandler;
use Monolog\Level;
use Monolog\LogRecord;

class OpenObserveHandler extends AbstractProcessingHandler
{
    public function __construct(int|string|Level $level = Level::Debug, bool $bubble = true)
    {
        parent::__construct($level, $bubble);
    }

    protected function write(LogRecord $record): void
    {
        $user = config('logging.channels.openobserve.username');
        $pass = config('logging.channels.openobserve.password');
        $url = config('logging.channels.openobserve.url');

        if (empty($user) || empty($pass) || empty($url)) {
            return;
        }

        $payload = [[
            'timestamp' => $record->datetime->format('Y-m-d\TH:i:s.u\Z'),
            'level' => $record->level->getName(),
            'message' => $record->message,
            'context' => json_encode($record->context),
            'extra' => json_encode($record->extra),
            'environment' => app()->environment(),
            'service' => 'backend-laravel',
        ]
        ];

        try {
            Http::timeout(3)->withBasicAuth((string) $user, (string) $pass)->post((string) $url, $payload);
        } catch (ConnectionException $e) {
            error_log('OpenObserve Log Failed: ' . $e->getMessage());
        }
    }
}
