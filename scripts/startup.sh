#!/bin/sh
set -e

echo "SQLite database detected, skipping network wait..."

echo "Syncing database schema..."
prisma db push --skip-generate --accept-data-loss

echo "Starting Next.js server..."
export HOSTNAME="0.0.0.0"
export PORT=3000

exec node server.js
