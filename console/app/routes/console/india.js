import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ConsoleIndiaRoute extends Route {
    @service sidebar;

    activate() {
        this.sidebar?.enable?.();
    }
}
