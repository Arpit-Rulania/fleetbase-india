// Calls core-platform via REST at this feature's route prefix. No business logic lives here — see
// core-platform/src/modules/notifications/.
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '@fleetbase/console/config/environment';

export default class NotificationConnectorService extends Service {
    @service fetch;

    get baseUrl() {
        return config.APP.corePlatformUrl || 'http://localhost:3010';
    }

    request(path, options = {}) {
        const url = `${this.baseUrl}/api/notifications${path}`;
        return this.fetch.request(url, { ...options, external: true });
    }

    send(payload) {
        return this.request('/send', { method: 'POST', body: payload });
    }

    listTemplates() {
        return this.request('/templates');
    }
}
