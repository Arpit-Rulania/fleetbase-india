import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ConsoleIndiaAnalyticsController extends Controller {
    @service corePlatform;
    @service notifications;
    @tracked driverUuid = '';
    @tracked companyUuid = '';
    @tracked corridor = 'Mumbai-Pune';
    @tracked result = null;
    @tracked busy = false;
    get resultJson() { return this.result ? JSON.stringify(this.result, null, 2) : ''; }

    @action async compute(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.computeDriverScore({
                driverUuid: this.driverUuid.trim(),
                companyUuid: this.companyUuid.trim() || undefined,
            });
            this.notifications.success('Score computed');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async latest(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.latestDriverScore(this.driverUuid.trim());
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async rates(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.rateStats({ corridor: this.corridor.trim() });
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }
}
