#!/bin/sh
set -e

echo "Waiting for DB..."
until nc -z -v -w30 db 5432; do
  echo "Waiting for DB connection..."
  sleep 5
done
echo "DB connected!"

echo "Syncing database schema..."
prisma db push --skip-generate --accept-data-loss

echo "Starting Next.js server..."
export HOSTNAME="0.0.0.0"
export PORT=3000

exec node server.js
