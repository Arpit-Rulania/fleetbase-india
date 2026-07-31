# Modifications to Fleetbase Core
| File | Type of change | Reason | Date |
|------|----------------|--------|------|
| console/ember-cli-build.js | Build hardening | Add ember-cli-terser config to strip /*! license banners from production bundle; add extensions:['js'] to sourcemaps block | 2026-07-31 |
| console/app/utils/router-refresh-patch.js | Branding / AGPL hygiene | Remove @author Fleetbase Pte Ltd <hello@fleetbase.io> from JSDoc | 2026-07-31 |
| console/app/index.html | Branding | Change msapplication-TileColor from Fleetbase orange #da532c to FleetIndia blue #2563eb; change mask-icon color from Fleetbase teal #5bbad5 to #2563eb | 2026-07-31 |
| console/public/favicon/browserconfig.xml | Branding | Change Windows tile color from Fleetbase #da532c to #2563eb | 2026-07-31 |
| console/public/favicon/site.webmanifest | Branding | Change theme_color/background_color from Fleetbase white-on-white to FleetIndia blue/slate | 2026-07-31 |
| console/public/images/fleetbase-logo-svg.svg | Branding | Replace upstream Fleetbase wordmark SVG with FleetIndia truck + wordmark; breaks stock asset hash | 2026-07-31 |
| console/public/images/icon.svg | Branding | Replace Fleetbase F-swirl SVG icon with FleetIndia truck icon on blue background; breaks stock asset hash | 2026-07-31 |
| console/config/environment.js | Branding / fingerprint | Change ember-local-storage namespace from @fleetbase to @fleetindia | 2026-07-31 |
| api/config/app.php | Branding | Change APP_NAME fallback from 'Fleetbase' to 'FleetIndia' | 2026-07-31 |
| console/ember-cli-build.js | Build hardening | Explicitly disable sourcemaps in production builds; prevents JS/CSS map files from being generated and exposing source paths | 2026-07-31 |
| console/nginx.conf | Build hardening / privacy | Block *.map files (404); add /images/fallbacks/ location with local SVG fallback so placeholder requests never reach upstream CDN | 2026-07-31 |
| console/Dockerfile | Build hardening | Default DISABLE_FLEETBASE_ATTRIBUTION=true so production images omit upstream branding out-of-the-box | 2026-07-31 |
| console/Dockerfile.server-build | Build hardening | Default DISABLE_FLEETBASE_ATTRIBUTION=true (parity with Dockerfile) | 2026-07-31 |
| console/public/images/fleetbase-logo-svg.svg | Branding / privacy | Replace stock Fleetbase wordmark SVG (Adobe Illustrator export with Fleetbase letter-paths) with FleetIndia SVG — eliminates the most visible upstream brand fingerprint shown as fallback logo on onboarding, invite, and branding pages | 2026-07-31 |
| console/config/environment.js | Privacy / phone-home | Replace hard-coded flb-assets.s3 CDN URLs (13 default image fallbacks) with local /images/fallbacks/* paths; annotate that DEFAULT_* env vars must be overridden to self-hosted assets to fully eliminate upstream CDN fetches | 2026-07-31 |
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
| console/ember-cli-build.js | Fingerprint hygiene | Disable sourcemaps in prod; strip /*! @license banners via terser | 2026-07-31 |
| console/nginx.conf | Fingerprint hygiene | Deny *.map; local fallback images (no flb-assets CDN) | 2026-07-31 |
| Caddyfile.console | Fingerprint hygiene | Block *.map responses | 2026-07-31 |
| console/config/environment.js | Fingerprint hygiene | Local fallback image defaults; @fleetindia storage ns | 2026-07-31 |
| console/app/index.html | Fingerprint hygiene | FleetIndia title; app-loader class (not fleetbase-loader) | 2026-07-31 |
| console/public/favicon/* | Fingerprint hygiene | Distinct teal FI favicons (new Shodan hash) | 2026-07-31 |
| console/public/images/icon.svg | Branding | FleetIndia mark | 2026-07-31 |
| console/public/images/fleetbase-logo-svg.svg | Branding | Neutral/FleetIndia logo SVG | 2026-07-31 |
| console/app/router.js | FleetIndia UI | Add console.india/* routes for core-platform modules | 2026-07-31 |
| console/router.map.js | FleetIndia UI | Source-of-truth router map (extensions generator overwrites app/router.js) — india routes live here | 2026-07-31 |
| console/app/instance-initializers/register-fleetindia-menu.js | FleetIndia UI | Header menu item FleetIndia + shortcuts | 2026-07-31 |
| console/app/services/core-platform.js | FleetIndia UI | REST client for :3010 modules | 2026-07-31 |
| console/app/routes/console/india*.js | FleetIndia UI | India section routes | 2026-07-31 |
| console/app/controllers/console/india*.js | FleetIndia UI | Module page controllers | 2026-07-31 |
| console/app/templates/console/india*.hbs | FleetIndia UI | Module page templates | 2026-07-31 |
| console/app/templates/console/home.hbs | FleetIndia UI | Teal home panel linking to all India modules | 2026-07-31 |
| console/app/components/fleetindia-home-links.* | FleetIndia UI | Home dashboard entry for India modules | 2026-07-31 |
| PRODUCT.md | Docs | Plain-English product map: what customers use vs plumbing | 2026-07-31 |
