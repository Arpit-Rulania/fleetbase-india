import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ConsoleIndiaFuelGuardController extends Controller {
    @service corePlatform;
    @service notifications;
    @tracked companyUuid = '';
    @tracked vehicleUuid = '';
    @tracked driverUuid = '';
    @tracked liters = 100;
    @tracked amountPaid = 9500;
    @tracked lat = 19.07;
    @tracked lng = 72.87;
    @tracked odometerKm = 120000;
    @tracked result = null;
    @tracked busy = false;
    get resultJson() { return this.result ? JSON.stringify(this.result, null, 2) : ''; }

    @action async loadConfig(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.getFuelConfig(this.companyUuid.trim());
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async submitReport(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.submitFuelReport({
                companyUuid: this.companyUuid.trim(),
                vehicleUuid: this.vehicleUuid.trim(),
                driverUuid: this.driverUuid.trim(),
                liters: Number(this.liters),
                amountPaid: Number(this.amountPaid),
                lat: Number(this.lat),
                lng: Number(this.lng),
                odometerKm: Number(this.odometerKm),
            });
            this.notifications.success('Fuel report submitted');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }
}
