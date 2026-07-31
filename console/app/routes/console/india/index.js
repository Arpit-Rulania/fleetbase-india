import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ConsoleIndiaIndexRoute extends Route {
    @service corePlatform;

    async model() {
        try {
            const health = await this.corePlatform.health();
            return { health, online: true };
        } catch (err) {
            return { health: null, online: false, error: err.message };
        }
    }
}
