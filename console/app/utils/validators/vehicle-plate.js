/**
 * Indian vehicle registration plate validator.
 * Accepts forms like: MH 01 AB 1234, MH01AB1234, MH-01-AB-1234
 */
export const VEHICLE_PLATE_REGEX = /^[A-Z]{2}\s?[0-9]{1,2}\s?[A-Z]{1,3}\s?[0-9]{1,4}$/;
export const VEHICLE_PLATE_HINT = 'e.g. MH 01 AB 1234';

export function normalizeVehiclePlate(value = '') {
    return String(value).toUpperCase().trim();
}

export function isValidVehiclePlate(value) {
    if (!value) {
        return false;
    }
    return VEHICLE_PLATE_REGEX.test(normalizeVehiclePlate(value));
}

export default isValidVehiclePlate;
