<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Material;
use App\Services\EmailService;

final readonly class MaterialObserver
{
    public function __construct(private EmailService $emailService) {}

    public function created(Material $material): void
    {
        $this->emailService->sendMaterialCreated($material);
    }
}
