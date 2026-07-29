/**
 * GSTIN format validator — optional on onboarding.
 * Pattern: 2 digit state + 10 char PAN + entity + Z + checksum
 */
export const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export function normalizeGstin(value = '') {
    return String(value).toUpperCase().trim();
}

/**
 * Returns true when blank (optional) or when format is valid.
 */
export function isValidGstin(value, { required = false } = {}) {
    const normalized = normalizeGstin(value);
    if (!normalized) {
        return !required;
    }
    return GSTIN_REGEX.test(normalized);
}

export default isValidGstin;
