import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { debug } from '@ember/debug';
import intlTelInput from 'intl-tel-input';
import lookupUserIp from '@fleetbase/ember-core/utils/lookup-user-ip';

/**
 * FleetIndia override: default dial country to India (+91).
 * Mirrors @fleetbase/ember-ui PhoneInput with IN as the fallback instead of US.
 */
export default class PhoneInputComponent extends Component {
    @service fetch;
    @tracked iti;

    @action setupIntlTelInput(element) {
        const preferred = (this.args.initialCountry || this.args.country || 'in').toLowerCase();

        this.iti = intlTelInput(element, {
            containerClass: `w-full ${this.args.wrapperClass ?? ''}`,
            initialCountry: preferred === 'auto' ? 'auto' : preferred,
            separateDialCode: true,
            formatAsYouType: true,
            geoIpLookup: async (success) => {
                try {
                    const ipData = await lookupUserIp();
                    if (ipData && ipData.country_code) {
                        success(ipData.country_code);
                    } else {
                        debug('No country code in IP lookup response, defaulting to IN');
                        success('in');
                    }
                } catch (error) {
                    debug('Failed to lookup country code, defaulting to IN: ' + error.message);
                    success('in');
                }
            },
            utilsScript: '/assets/libphonenumber/utils.js',
        });

        if (typeof this.args.onInit === 'function') {
            this.args.onInit(this.iti);
        }

        element.addEventListener('countrychange', this.args.onCountryChange);
    }

    @action onInput() {
        const { onInput } = this.args;
        const number = this.iti.getNumber(intlTelInput.utils.numberFormat.E164);

        if (typeof onInput === 'function') {
            onInput(number, ...arguments);
        }
    }
}
