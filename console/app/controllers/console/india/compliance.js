import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ConsoleIndiaComplianceController extends Controller {
    @service corePlatform;
    @service notifications;

    @tracked plateNumber = '';
    @tracked lrVehicle = '';
    @tracked lrOrigin = '';
    @tracked lrDestination = '';
    @tracked lrGoods = '';
    @tracked ewbGstin = '';
    @tracked ewbVehicle = '';
    @tracked ewbFrom = '';
    @tracked ewbTo = '';
    @tracked ewbDoc = '';
    @tracked result = null;
    @tracked busy = false;

    get resultJson() {
        return this.result ? JSON.stringify(this.result, null, 2) : '';
    }

    @action async verifyVahan(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.vahanVerify(this.plateNumber.trim());
            this.notifications.success('VAHAN lookup complete');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message || 'VAHAN failed');
        } finally {
            this.busy = false;
        }
    }

    @action async createLr(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.createLorryReceipt({
                vehicleNumber: this.lrVehicle,
                origin: this.lrOrigin,
                destination: this.lrDestination,
                goods: this.lrGoods,
            });
            this.notifications.success('Lorry receipt created');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message || 'LR failed');
        } finally {
            this.busy = false;
        }
    }

    @action async createEwb(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.generateEwayBill({
                gstin: this.ewbGstin,
                vehicleNumber: this.ewbVehicle,
                fromPlace: this.ewbFrom,
                toPlace: this.ewbTo,
                documentNumber: this.ewbDoc,
            });
            this.notifications.success('E-way bill requested');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message || 'E-way bill failed');
        } finally {
            this.busy = false;
        }
    }
}
