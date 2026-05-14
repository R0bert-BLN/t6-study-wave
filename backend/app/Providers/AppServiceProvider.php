<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\Announcement;
use App\Models\Assignment;
use App\Models\Material;
use App\Observers\AnnouncementObserver;
use App\Observers\AssignmentObserver;
use App\Observers\MaterialObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Announcement::observe(AnnouncementObserver::class);
        Material::observe(MaterialObserver::class);
        Assignment::observe(AssignmentObserver::class);
    }
}
