# Vendor overrides (FleetIndia privacy / phone-home removal)

These files replace paths inside Composer-installed `fleetbase/core-api` at
container runtime. They exist because the AGPL packages live under
`vendor/` in the Docker image (not in this git tree as editable source).

## Mounted files

| Host path | Container path | Purpose |
|---|---|---|
| `src/Support/Telemetry.php` | `.../core-api/src/Support/Telemetry.php` | Kill all posts to `telemetry.fleetbase.io` and GitHub commit-hash fingerprinting |
| `src/Http/Controllers/Internal/v1/LookupController.php` | same under core-api | Disable Fleetbase blog RSS fetch (`blog.fleetbase.io`) by default |

## Apply

Already wired in `docker-compose.override.yml`. After pull/rebuild:

```bash
docker compose up -d application
# or re-copy without restart:
./scripts/apply-privacy-overrides.sh
```

## Related env (compose)

- `TELEMETRY_DISABLED=true`
- `FLEETBASE_BLOG_DISABLED=true`
- `REGISTRY_HOST=` (empty — no `registry.fleetbase.io`)
- Console: `DISABLE_FLEETBASE_ATTRIBUTION=true`

Every override that touches Fleetbase core must stay listed in repo-root `CHANGES.md`.
