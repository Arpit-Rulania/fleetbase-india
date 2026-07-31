import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ConsoleIndiaGovernanceController extends Controller {
    @service corePlatform;
    @service notifications;
    @tracked companyUuid = '';
    @tracked subjectId = '';
    @tracked purpose = 'location_tracking';
    @tracked consentGiven = true;
    @tracked result = null;
    @tracked busy = false;
    get resultJson() { return this.result ? JSON.stringify(this.result, null, 2) : ''; }

    @action async check(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.checkConsent(this.subjectId.trim(), this.purpose);
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async record(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.recordConsent({
                companyUuid: this.companyUuid.trim(),
                subjectType: 'driver',
                subjectId: this.subjectId.trim(),
                purpose: this.purpose,
                consentGiven: this.consentGiven,
                source: 'console',
            });
            this.notifications.success('Consent recorded');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async policies(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.retentionPolicies();
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async dsar(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.createDataRequest({
                companyUuid: this.companyUuid.trim(),
                subjectId: this.subjectId.trim(),
                requestType: 'access',
            });
            this.notifications.success('DSAR created');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }
}
