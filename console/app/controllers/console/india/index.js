import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

const MODULES = [
    { title: 'Compliance', route: 'console.india.compliance', blurb: 'VAHAN verification, e-way bills, lorry receipts.', icon: 'file-contract', api: '/api/compliance/*' },
    { title: 'FASTag', route: 'console.india.fastag', blurb: 'Tag balances, Razorpay top-ups, auto-recharge.', icon: 'road', api: '/api/fastag/*' },
    { title: 'Fuel Guard', route: 'console.india.fuel-guard', blurb: 'Fill reports, geo/consumption anomalies.', icon: 'gas-pump', api: '/api/fuel-guard/*' },
    { title: 'Notifications', route: 'console.india.notifications', blurb: 'WhatsApp / IVR alerts with quiet hours.', icon: 'comment-sms', api: '/api/notifications/*' },
    { title: 'Billing', route: 'console.india.billing', blurb: 'Razorpay mandates, plan changes, dunning.', icon: 'credit-card', api: '/api/billing/*' },
    { title: 'Driver Ledger', route: 'console.india.driver-ledger', blurb: 'Advances and trip settlements.', icon: 'wallet', api: '/api/driver-ledger/*' },
    { title: 'Analytics', route: 'console.india.analytics', blurb: 'Driver scores (60% fuel / 40% safety) and rates.', icon: 'chart-line', api: '/api/analytics/*' },
    { title: 'Governance', route: 'console.india.governance', blurb: 'Consent logs, retention, breach, DSAR.', icon: 'shield-halved', api: '/api/governance/*' },
];

export default class ConsoleIndiaIndexController extends Controller {
    @service router;

    get modules() {
        return MODULES;
    }
}
