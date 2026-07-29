/* eslint-env node */

'use strict';

module.exports = function (env) {
    return {
        clientAllowedKeys: ['API_HOST', 'CORE_PLATFORM_URL', 'APP_NAME', 'SUPPORT_EMAIL', 'SUPPORT_URL'],
        fastbootAllowedKeys: [],
        failOnMissingKey: false,
        path: `./environments/.env.${env}`,
    };
};
