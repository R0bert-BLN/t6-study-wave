#!/bin/bash
set -e

if [ ! -f "package.json" ]; then
  echo "Initializing React project..."

  cd /tmp
  printf 'y\n' | bunx --yes create-vite@latest app --template react-ts

  cp -a /tmp/app/. /app/
  rm -rf /tmp/app

  cd /app
fi

echo "Installing dependencies..."
bun install

echo "Starting server..."
exec "$@"
