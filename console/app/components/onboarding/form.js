import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { getProperties } from '@ember/object';
import { isBlank } from '@ember/utils';
import { task } from 'ember-concurrency';
import OnboardValidations from '../../validations/onboard';
import lookupValidator from 'ember-changeset-validations';
import Changeset from 'ember-changeset';
import { isValidGstin, normalizeGstin } from '../../utils/validators/gstin';

export default class OnboardingFormComponent extends Component {
    @service fetch;
    @service session;
    @service router;
    @service notifications;
    @service urlSearchParams;
    @service intl;
    @tracked name;
    @tracked email;
    @tracked phone;
    @tracked organization_name;
    @tracked gstin = '';
    @tracked pin_code = '';
    @tracked state = '';
    @tracked password;
    @tracked password_confirmation;
    @tracked error;

    get filled() {
        // eslint-disable-next-line ember/no-get
        const input = getProperties(this, 'name', 'email', 'phone', 'organization_name', 'password', 'password_confirmation');
        return Object.values(input).every((val) => !isBlank(val));
    }

    @task *onboard(event) {
        event?.preventDefault?.();

        // eslint-disable-next-line ember/no-get
        const input = getProperties(this, 'name', 'email', 'phone', 'organization_name', 'password', 'password_confirmation');
        const changeset = new Changeset(input, lookupValidator(OnboardValidations), OnboardValidations);

        yield changeset.validate();

        if (changeset.get('isInvalid')) {
            const errorMessage = changeset.errors.firstObject.validation.firstObject;

            this.notifications.error(errorMessage);
            return;
        }

        // GSTIN is optional — validate format only when provided
        if (!isValidGstin(this.gstin, { required: false })) {
            this.notifications.error(this.intl.t('india.gstin-invalid'));
            return;
        }

        // Set user timezone and India defaults
        input.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        input.currency = 'INR';
        input.country = 'IN';
        input.gstin = normalizeGstin(this.gstin) || null;
        input.postal_code = this.pin_code || null;
        input.state = this.state || null;

        try {
            const { status, skipVerification, token, session } = yield this.fetch.post('onboard/create-account', input);
            if (status !== 'success') {
                this.notifications.error('Onboard failed');
                return;
            }

            // save session
            this.args.context.persist('session', session);

            if (skipVerification === true && token) {
                // only manually authenticate if skip verification
                this.session.isOnboarding().manuallyAuthenticate(token);

                yield this.router.transitionTo('console');
                return this.notifications.success('Welcome to FleetIndia!');
            } else {
                this.args.orchestrator.next();
                this.urlSearchParams.setParamsToCurrentUrl({
                    step: this.args.orchestrator?.current?.id,
                    session,
                });
            }
        } catch (err) {
            this.notifications.serverError(err);
        }
    }
}
