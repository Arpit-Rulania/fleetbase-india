import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ConsoleIndiaController extends Controller {
    @service intl;

    get navigationItems() {
        return [
            { label: 'Overview', icon: 'gauge-high', route: 'console.india.index', keywords: ['overview', 'home'] },
            { label: 'Compliance', icon: 'file-contract', route: 'console.india.compliance', keywords: ['vahan', 'eway', 'lorry', 'gst'] },
            { label: 'FASTag', icon: 'road', route: 'console.india.fastag', keywords: ['toll', 'recharge'] },
            { label: 'Fuel Guard', icon: 'gas-pump', route: 'console.india.fuel-guard', keywords: ['fuel', 'fraud', 'anomaly'] },
            { label: 'Notifications', icon: 'comment-sms', route: 'console.india.notifications', keywords: ['whatsapp', 'ivr'] },
            { label: 'Billing', icon: 'credit-card', route: 'console.india.billing', keywords: ['razorpay', 'mandate', 'subscription'] },
            { label: 'Driver Ledger', icon: 'wallet', route: 'console.india.driver-ledger', keywords: ['advance', 'settlement'] },
            { label: 'Analytics', icon: 'chart-line', route: 'console.india.analytics', keywords: ['score', 'rates'] },
            { label: 'Governance', icon: 'shield-halved', route: 'console.india.governance', keywords: ['consent', 'dpdp', 'dsar'] },
        ];
    }
}
