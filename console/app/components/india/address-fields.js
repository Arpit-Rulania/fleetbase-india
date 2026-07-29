import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { INDIAN_STATES_AND_UTS } from '../../utils/indian-states';

/**
 * India-aware address fields: PIN Code (6 digit) + state/UT dropdown when country=IN.
 */
export default class IndiaAddressFieldsComponent extends Component {
    states = INDIAN_STATES_AND_UTS;

    @tracked pinCode = this.args.postalCode ?? this.args.postal_code ?? '';
    @tracked state = this.args.state ?? '';

    get isIndia() {
        const country = (this.args.country || 'IN').toString().toUpperCase();
        return country === 'IN' || country === 'IND' || country === 'INDIA';
    }

    @action onPinInput(event) {
        const digits = String(event.target.value || '')
            .replace(/\D/g, '')
            .slice(0, 6);
        this.pinCode = digits;
        if (typeof this.args.onPostalCodeChange === 'function') {
            this.args.onPostalCodeChange(digits);
        }
    }

    @action onStateChange(event) {
        this.state = event.target.value;
        if (typeof this.args.onStateChange === 'function') {
            this.args.onStateChange(this.state);
        }
    }
}
