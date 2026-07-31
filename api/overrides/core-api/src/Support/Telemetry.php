<?php

namespace Fleetbase\Support;

/**
 * FleetIndia override — permanently disables outbound telemetry.
 *
 * Upstream Fleetbase core-api phones home to https://telemetry.fleetbase.io/
 * with instance id, company name, domain, version, user/order counts, geo IP,
 * and a `source.modified` flag derived from comparing local commits to
 * github.com/fleetbase/fleetbase. That is removed here so local installs do not
 * report fingerprints to Fleetbase infrastructure.
 *
 * Mounted over vendor via docker-compose. See api/overrides/README.md.
 * Logged in CHANGES.md (AGPL modification notice).
 */
class Telemetry
{
    protected static string $endpoint = '';

    protected static function isDisabled(): bool
    {
        return true;
    }

    public static function send(array $payload = []): bool
    {
        return false;
    }

    public static function ping(): void
    {
        // no-op
    }

    protected static function getInstanceId(): string
    {
        return 'disabled';
    }

    protected static function getCompanyName(): string
    {
        return 'disabled';
    }

    protected static function getVersion(): string
    {
        return config('fleetbase.version', '0.0.0');
    }

    public static function generateInstanceId(): string
    {
        return 'disabled';
    }

    public static function getInstallationType(): string
    {
        return 'disabled';
    }

    public static function countUsers(): int
    {
        return 0;
    }

    public static function countCompanies(): int
    {
        return 0;
    }

    public static function countOrders(): int
    {
        return 0;
    }

    public static function isSourceModified(): bool
    {
        return false;
    }

    public static function getCurrentCommitHash(): ?string
    {
        return null;
    }

    public static function getOfficialRepoCommitHash(): ?string
    {
        return null;
    }

    protected static function getIpInfo(): array
    {
        return [];
    }
}
