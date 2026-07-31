import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ConsoleIndiaBillingController extends Controller {
    @service corePlatform;
    @service notifications;
    @tracked companyUuid = '';
    @tracked planCode = 'starter';
    @tracked amount = 999;
    @tracked result = null;
    @tracked busy = false;
    get resultJson() { return this.result ? JSON.stringify(this.result, null, 2) : ''; }

    @action async loadSub(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.getSubscription(this.companyUuid.trim());
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async register(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.registerSubscription({
                companyUuid: this.companyUuid.trim(),
                planCode: this.planCode,
                amount: Number(this.amount),
            });
            this.notifications.success('Mandate registered');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async changePlan(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.changePlan(this.companyUuid.trim(), {
                planCode: this.planCode,
                amount: Number(this.amount),
            });
            this.notifications.success('Plan update requested');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }
}
