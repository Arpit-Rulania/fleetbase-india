#!/usr/bin/env bash
# Ensure FleetIndia privacy overrides are present in the application container.
# Prefer docker-compose volume mounts (see docker-compose.override.yml). This
# script is a fallback when mounts are not configured.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SERVICE="${1:-application}"
SRC="$ROOT/api/overrides/core-api"
BASE=/fleetbase/api/vendor/fleetbase/core-api

cd "$ROOT"

if docker compose exec -T "$SERVICE" grep -q 'FleetIndia override' "$BASE/src/Support/Telemetry.php" 2>/dev/null; then
  echo "Telemetry override already active (volume mount or prior copy)"
else
  docker compose cp \
    "$SRC/src/Support/Telemetry.php" \
    "$SERVICE:$BASE/src/Support/Telemetry.php"
  docker compose cp \
    "$SRC/src/Http/Controllers/Internal/v1/LookupController.php" \
    "$SERVICE:$BASE/src/Http/Controllers/Internal/v1/LookupController.php"
  echo "Privacy overrides copied into $SERVICE"
fi

docker compose exec -T "$SERVICE" bash -c 'rm -f /fleetbase/api/.fleetbase-id' || true
echo "Done."
