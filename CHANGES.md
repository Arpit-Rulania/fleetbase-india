# Modifications to Fleetbase Core
| File | Type of change | Reason | Date |
|------|----------------|--------|------|
| console/translations/en-us.yaml | Branding + i18n keys | Set app.name to FleetIndia; added india.* keys | 2026-07-30 |
| console/fleetbase.config.json | Branding / runtime config | Added appName, supportEmail, supportUrl, CORE_PLATFORM_URL | 2026-07-30 |
| console/app/index.html | Branding | Set document title to FleetIndia | 2026-07-30 |
| console/public/favicon/site.webmanifest | Branding | Renamed PWA name to FleetIndia | 2026-07-30 |
| console/app/services/india-connectors/gst-connector.js | Connector scaffold | Thin REST adapter to core-platform compliance | 2026-07-30 |
| console/app/services/india-connectors/vahan-connector.js | Connector scaffold | Thin REST adapter to core-platform VAHAN | 2026-07-30 |
| console/app/services/india-connectors/fastag-connector.js | Connector scaffold | Thin REST adapter to core-platform FASTag | 2026-07-30 |
| console/app/services/india-connectors/fuel-connector.js | Connector scaffold | Thin REST adapter to core-platform fuel-guard | 2026-07-30 |
| console/app/services/india-connectors/notification-connector.js | Connector scaffold | Thin REST adapter to core-platform notifications | 2026-07-30 |
| console/app/formats.js | Currency defaults | Added INR number format | 2026-07-30 |
| console/app/controllers/console.js | Currency/country defaults | Default new org currency INR and country IN | 2026-07-30 |
| console/app/components/phone-input.js | Phone default | Override PhoneInput to default +91 / IN | 2026-07-30 |
| console/app/components/phone-input.hbs | Phone default | Template for PhoneInput override | 2026-07-30 |
| console/app/components/currency-select.js | Currency default | Override CurrencySelect to default INR | 2026-07-30 |
| console/app/components/currency-select.hbs | Currency default | Template for CurrencySelect override | 2026-07-30 |
| console/app/helpers/format-currency.js | Currency helper | Currency-aware formatter defaulting to ₹ | 2026-07-30 |
| console/config/environment.js | Env wiring | Expose CORE_PLATFORM_URL and branding env | 2026-07-30 |
| console/config/dotenv.js | Env wiring | Allow CORE_PLATFORM_URL client keys | 2026-07-30 |
| console/app/utils/runtime-config.js | Env wiring | Map CORE_PLATFORM_URL and branding from runtime JSON | 2026-07-30 |
| console/environments/.env.development | Env wiring | Local CORE_PLATFORM_URL and branding | 2026-07-30 |
| console/environments/.env.production | Env wiring | Prod placeholders for CORE_PLATFORM_URL/branding | 2026-07-30 |
| console/translations/hi-in.yaml | i18n | Hindi (hi-IN) translations | 2026-07-30 |
| console/translations/mr-in.yaml | i18n | Marathi (mr-IN) translations | 2026-07-30 |
| console/translations/gu-in.yaml | i18n | Gujarati (gu-IN) translations | 2026-07-30 |
| console/app/utils/indian-states.js | Indian formats | 28 states + 8 UT list | 2026-07-30 |
| console/app/utils/validators/vehicle-plate.js | Indian formats | Vehicle plate regex validator | 2026-07-30 |
| console/app/utils/validators/gstin.js | Indian formats | Optional GSTIN format validator | 2026-07-30 |
| console/app/components/india/address-fields.js | Indian formats | PIN + state/UT address fields | 2026-07-30 |
| console/app/components/india/address-fields.hbs | Indian formats | PIN + state/UT address template | 2026-07-30 |
| console/app/components/india/vehicle-plate-input.js | Indian formats | Vehicle plate input with validation | 2026-07-30 |
| console/app/components/india/vehicle-plate-input.hbs | Indian formats | Vehicle plate input template | 2026-07-30 |
| console/app/components/onboarding/form.js | Onboarding | GSTIN optional; INR/IN defaults | 2026-07-30 |
| console/app/components/onboarding/form.hbs | Onboarding | GSTIN + India address fields on signup | 2026-07-30 |
| api/overrides/core-api/src/Support/Telemetry.php | Privacy / vendor override | Replace upstream Telemetry — no posts to telemetry.fleetbase.io; no source.modified / GitHub commit fingerprint | 2026-07-31 |
| api/overrides/core-api/src/Http/Controllers/Internal/v1/LookupController.php | Privacy / vendor override | Short-circuit fleetbaseBlog when FLEETBASE_BLOG_DISABLED (default) — no blog.fleetbase.io RSS | 2026-07-31 |
| api/overrides/README.md | Docs | Document privacy override mounts | 2026-07-31 |
| scripts/apply-privacy-overrides.sh | Ops | Re-apply privacy vendor overrides into running container | 2026-07-31 |
| docker-compose.yml | Privacy env | Clear REGISTRY_HOST; set TELEMETRY_DISABLED + FLEETBASE_BLOG_DISABLED | 2026-07-31 |
| docker-compose.override.yml | Privacy mounts + env | Mount Telemetry/LookupController overrides; disable registry/telemetry/blog; attribution flag on console | 2026-07-31 |
| console/app/instance-initializers/initialize-widgets.js | Privacy | Stop auto-registering fleetbase-blog + github-card widgets | 2026-07-31 |
| console/app/components/fleetbase-blog.js | Privacy | No-op blog fetch (no lookup/fleetbase-blog) | 2026-07-31 |
| console/app/components/fleetbase-blog.hbs | Privacy | Remove www.fleetbase.io/blog link | 2026-07-31 |
| console/app/components/github-card.js | Privacy | No-op GitHub API fetches to repos/fleetbase/fleetbase | 2026-07-31 |
| console/app/controllers/install.js | Privacy | Remove fleetbase.io docs URLs | 2026-07-31 |
| console/environments/.env.development | Privacy | DISABLE_FLEETBASE_ATTRIBUTION=true | 2026-07-31 |
| console/environments/.env.production | Privacy | DISABLE_FLEETBASE_ATTRIBUTION=true | 2026-07-31 |
| api/config/mail.php | Privacy | Default MAIL_FROM_ADDRESS noreply@localhost (not hello@fleetbase.io) | 2026-07-31 |
