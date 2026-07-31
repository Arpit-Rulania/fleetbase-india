import Component from '@glimmer/component';

const LINKS = [
    { title: 'Compliance', route: 'console.india.compliance', blurb: 'VAHAN, e-way bill, LR' },
    { title: 'FASTag', route: 'console.india.fastag', blurb: 'Toll balance & recharge' },
    { title: 'Fuel Guard', route: 'console.india.fuel-guard', blurb: 'Fill fraud checks' },
    { title: 'Notifications', route: 'console.india.notifications', blurb: 'WhatsApp / IVR' },
    { title: 'Billing', route: 'console.india.billing', blurb: 'Subscriptions' },
    { title: 'Driver Ledger', route: 'console.india.driver-ledger', blurb: 'Advances & settlement' },
    { title: 'Analytics', route: 'console.india.analytics', blurb: 'Driver scores' },
    { title: 'Governance', route: 'console.india.governance', blurb: 'Consent & DSAR' },
];

export default class FleetindiaHomeLinksComponent extends Component {
    get links() {
        return LINKS;
    }
}
