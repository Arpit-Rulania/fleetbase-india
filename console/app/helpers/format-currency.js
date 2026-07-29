import { helper } from '@ember/component/helper';
import getCurrency from '@fleetbase/ember-ui/utils/get-currency';
import formatMoney from '@fleetbase/ember-accounting/utils/format-money';

/**
 * Currency-aware amount formatter. Defaults to INR (₹).
 * Usage: {{format-currency amount currency="INR"}}
 */
export function formatCurrency([amount = 0], { currency: currencyCode = 'INR' } = {}) {
    let currency = getCurrency(currencyCode) ?? {
        code: currencyCode,
        symbol: currencyCode === 'INR' ? '₹' : `${currencyCode} `,
        precision: 2,
        thousandSeparator: ',',
        decimalSeparator: '.',
    };

    return formatMoney(!currency.decimalSeparator ? amount : amount / 100, currency.symbol, currency.precision, currency.thousandSeparator, currency.decimalSeparator);
}

export default helper(formatCurrency);
