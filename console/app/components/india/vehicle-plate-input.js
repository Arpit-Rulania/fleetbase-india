import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { isValidVehiclePlate, normalizeVehiclePlate, VEHICLE_PLATE_HINT } from '../../utils/validators/vehicle-plate';

export default class IndiaVehiclePlateInputComponent extends Component {
    hint = VEHICLE_PLATE_HINT;
    @tracked value = this.args.value ?? '';
    @tracked error = null;

    get isValid() {
        return !this.value || isValidVehiclePlate(this.value);
    }

    @action onInput(event) {
        const next = normalizeVehiclePlate(event.target.value);
        this.value = next;
        this.error = next && !isValidVehiclePlate(next) ? this.hint : null;
        if (typeof this.args.onInput === 'function') {
            this.args.onInput(next, this.isValid);
        }
    }
}
