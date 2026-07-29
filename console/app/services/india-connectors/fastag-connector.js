// Calls core-platform via REST at this feature's route prefix. No business logic lives here — see
// core-platform/src/modules/fastag/.
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '@fleetbase/console/config/environment';

export default class FastagConnectorService extends Service {
    @service fetch;

    get baseUrl() {
        return config.APP.corePlatformUrl || 'http://localhost:3010';
    }

    request(path, options = {}) {
        const url = `${this.baseUrl}/api/fastag${path}`;
        return this.fetch.request(url, { ...options, external: true });
    }

    getBalance(tagId) {
        return this.request(`/tags/${encodeURIComponent(tagId)}/balance`);
    }

    listTransactions(tagId, query = {}) {
        return this.request(`/tags/${encodeURIComponent(tagId)}/transactions`, { method: 'GET', query });
    }
}
