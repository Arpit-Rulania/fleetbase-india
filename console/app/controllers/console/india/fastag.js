import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ConsoleIndiaFastagController extends Controller {
    @service corePlatform;
    @service notifications;
    @tracked companyUuid = '';
    @tracked vehicleUuid = '';
    @tracked plateNumber = '';
    @tracked bankCode = 'IDFC';
    @tracked rechargeAmount = 500;
    @tracked result = null;
    @tracked busy = false;
    get resultJson() { return this.result ? JSON.stringify(this.result, null, 2) : ''; }

    @action async loadAccounts(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.listFastagAccounts(this.companyUuid.trim());
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async createAccount(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.createFastagAccount({
                companyUuid: this.companyUuid.trim(),
                vehicleUuid: this.vehicleUuid.trim(),
                plateNumber: this.plateNumber.trim(),
                bankCode: this.bankCode,
            });
            this.notifications.success('FASTag account created');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async checkBalance(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.fastagBalance(this.vehicleUuid.trim());
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async recharge(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.initiateFastagRecharge({
                vehicleUuid: this.vehicleUuid.trim(),
                amount: Number(this.rechargeAmount),
            });
            this.notifications.success('Recharge initiated');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }
}
