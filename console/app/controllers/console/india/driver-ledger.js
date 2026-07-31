import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ConsoleIndiaDriverLedgerController extends Controller {
    @service corePlatform;
    @service notifications;
    @tracked driverUuid = '';
    @tracked tripUuid = '';
    @tracked amount = 2000;
    @tracked totalFreight = 25000;
    @tracked result = null;
    @tracked busy = false;
    get resultJson() { return this.result ? JSON.stringify(this.result, null, 2) : ''; }

    @action async loadBalance(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.driverBalance(this.driverUuid.trim());
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async requestAdvance(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.requestAdvance({
                driverUuid: this.driverUuid.trim(),
                tripUuid: this.tripUuid.trim(),
                amount: Number(this.amount),
            });
            this.notifications.success('Advance recorded');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async settle(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.calculateSettlement({
                tripUuid: this.tripUuid.trim(),
                totalFreight: Number(this.totalFreight),
            });
            this.notifications.success('Settlement calculated');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }
}
