// Calls core-platform via REST at this feature's route prefix. No business logic lives here — see
// core-platform/src/modules/fuel-guard/.
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '@fleetbase/console/config/environment';

export default class FuelConnectorService extends Service {
    @service fetch;

    get baseUrl() {
        return config.APP.corePlatformUrl || 'http://localhost:3010';
    }

    request(path, options = {}) {
        const url = `${this.baseUrl}/api/fuel-guard${path}`;
        return this.fetch.request(url, { ...options, external: true });
    }

    reportFill(payload) {
        return this.request('/fills', { method: 'POST', body: payload });
    }

    listAnomalies(query = {}) {
        return this.request('/anomalies', { method: 'GET', query });
    }
}
