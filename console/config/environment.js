'use strict';
const toBoolean = require('./utils/to-boolean');
const getenv = require('./utils/getenv');
const fixApiHost = require('./utils/fix-api-host');
const asArray = require('./utils/as-array');
const { version } = require('../package');

module.exports = function (environment) {
    const ENV = {
        modulePrefix: '@fleetbase/console',
        version,
        environment,
        rootURL: '/',
        locationType: 'history',
        EmberENV: {
            EXTEND_PROTOTYPES: true,
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
            },
        },

        APP: {
            autoboot: true,
            extensions: asArray(getenv('EXTENSIONS')),
            disableRuntimeConfig: toBoolean(getenv('DISABLE_RUNTIME_CONFIG', environment === 'production')),
            disableFleetbaseAttribution: toBoolean(getenv('DISABLE_FLEETBASE_ATTRIBUTION', false)),
            corePlatformUrl: getenv('CORE_PLATFORM_URL', 'http://localhost:3010'),
            appName: getenv('APP_NAME', 'FleetIndia'),
            supportEmail: getenv('SUPPORT_EMAIL', 'support@fleetindia.local'),
            supportUrl: getenv('SUPPORT_URL', 'https://fleetindia.local'),
        },

        API: {
            host: fixApiHost(getenv('API_HOST'), toBoolean(getenv('API_SECURE'))),
            namespace: getenv('API_NAMESPACE', 'int/v1'),
        },

        osrm: {
            host: getenv('OSRM_HOST', 'https://router.project-osrm.org'),
            servers: {},
        },

        socket: {
            path: getenv('SOCKETCLUSTER_PATH', '/socketcluster/'),
            hostname: getenv('SOCKETCLUSTER_HOST'),
            secure: toBoolean(getenv('SOCKETCLUSTER_SECURE', false)),
            port: getenv('SOCKETCLUSTER_PORT', 38000),
        },

        stripe: {
            publishableKey: getenv('STRIPE_KEY'),
        },

        // NOTE: The flb-assets S3 bucket below is Fleetbase's upstream CDN.
        // Override each DEFAULT_* env var (in fleetbase.config.json or docker-compose) to point
        // at self-hosted or locally-served copies so the browser does not phone home.
        defaultValues: {
            categoryImage: getenv('DEFAULT_CATEGORY_IMAGE', '/images/fallbacks/placeholder-1.png'),
            placeholderImage: getenv('DEFAULT_PLACEHOLDER_IMAGE', '/images/fallbacks/image-file-icon.png'),
            placeholderImageOld: getenv('DEFAULT_PLACEHOLDER_IMAGE_OLD', '/images/fallbacks/placeholder-2.png'),
            driverImage: getenv('DEFAULT_DRIVER_IMAGE', '/images/fallbacks/no-avatar.png'),
            userImage: getenv('DEFAULT_USER_IMAGE', '/images/fallbacks/no-avatar.png'),
            contactImage: getenv('DEFAULT_CONTACT_IMAGE', '/images/fallbacks/no-avatar.png'),
            entityImage: getenv('DEFAULT_ENTITY_IMAGE', '/images/fallbacks/parcel.png'),
            vendorImage: getenv('DEFAULT_VENDOR_IMAGE', '/images/fallbacks/no-avatar.png'),
            vehicleImage: getenv('DEFAULT_VEHICLE_IMAGE', '/images/fallbacks/vehicle-placeholder.png'),
            vehicleAvatar: getenv('DEFAULT_VEHICLE_AVATAR', '/images/fallbacks/mini-bus.svg'),
            driverAvatar: getenv('DEFAULT_DRIVER_AVATAR', '/images/fallbacks/moto-driver.png'),
            placeAvatar: getenv('DEFAULT_PLACE_AVATAR', '/images/fallbacks/basic-building.png'),
            extensionIcon: getenv('DEFAULT_EXTENSION_ICON', '/images/fallbacks/extension-icon.svg'),
        },

        'ember-simple-auth': {
            routeAfterAuthentication: 'console',
        },

        'ember-local-storage': {
            namespace: '@fleetindia',
            keyDelimiter: '/',
            includeEmberDataSupport: true,
        },

        'ember-cli-notifications': {
            autoClear: true,
            clearDuration: 1000 * 3.5,
        },
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
        ENV.APP.autoboot = false;
    }

    if (environment === 'production') {
        // here you can enable a production-specific feature
    }

    return ENV;
};
