import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ConsoleIndiaNotificationsController extends Controller {
    @service corePlatform;
    @service notifications;
    @tracked recipientUuid = '';
    @tracked alertType = 'trip_assigned';
    @tracked body = 'Trip assigned. Reply YES to accept.';
    @tracked channel = 'whatsapp';
    @tracked result = null;
    @tracked busy = false;
    get resultJson() { return this.result ? JSON.stringify(this.result, null, 2) : ''; }

    @action async loadPrefs(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.getNotificationPreference(this.recipientUuid.trim());
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async savePrefs(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.upsertNotificationPreference(this.recipientUuid.trim(), {
                channel: this.channel,
                language: 'hi',
                quietHoursStart: '22:00',
                quietHoursEnd: '07:00',
            });
            this.notifications.success('Preferences saved');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }

    @action async sendAlert(e) {
        e.preventDefault();
        this.busy = true;
        try {
            this.result = await this.corePlatform.sendAlert({
                recipientUuid: this.recipientUuid.trim(),
                type: this.alertType,
                body: this.body,
                channel: this.channel,
            });
            this.notifications.success('Alert queued/sent');
        } catch (err) {
            this.result = { error: err.message };
            this.notifications.error(err.message);
        } finally { this.busy = false; }
    }
}
