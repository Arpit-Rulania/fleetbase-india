// Calls core-platform via REST at this feature's route prefix. No business logic lives here — see
// core-platform/src/modules/compliance/.
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '@fleetbase/console/config/environment';

export default class GstConnectorService extends Service {
    @service fetch;

    get baseUrl() {
        return config.APP.corePlatformUrl || 'http://localhost:3010';
    }

    request(path, options = {}) {
        const url = `${this.baseUrl}/api/compliance${path}`;
        return this.fetch.request(url, { ...options, external: true });
    }

    verifyGstin(gstin) {
        return this.request('/gstin/verify', { method: 'POST', body: { gstin } });
    }

    createEwayBill(payload) {
        return this.request('/eway-bill', { method: 'POST', body: payload });
    }
}
