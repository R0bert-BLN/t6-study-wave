#!/bin/bash
set -e

if [ ! -f "composer.json" ]; then
  echo "Initializing Laravel project..."
  composer create-project laravel/laravel /tmp/app

  cp -a /tmp/app/. /app/
  rm -rf /tmp/app
fi

echo "Installing dependencies..."
composer install --no-interaction

echo "Starting Reverb server..."
# php artisan reverb:start --host=0.0.0.0 --port=8080 --debug &

echo "Starting Web server..."
exec "$@"
