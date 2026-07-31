/**
 * Register FleetIndia header nav + shortcuts for core-platform modules.
 */
export function initialize(appInstance) {
    const menuService = appInstance.lookup('service:universe/menu-service');
    if (!menuService || typeof menuService.registerHeaderMenuItem !== 'function') {
        return;
    }

    menuService.registerHeaderMenuItem('FleetIndia', 'console.india', {
        icon: 'map-location-dot',
        priority: 1,
        id: 'fleetindia',
        slug: 'fleetindia',
        description: 'India compliance, FASTag, fuel guard, billing, driver ledger, and DPDP governance.',
        shortcuts: [
            { title: 'Overview', description: 'All India modules at a glance.', icon: 'gauge-high', route: 'console.india.index' },
            { title: 'Compliance', description: 'VAHAN, e-way bill, lorry receipt.', icon: 'file-contract', route: 'console.india.compliance' },
            { title: 'FASTag', description: 'Balances, top-ups, auto-recharge.', icon: 'road', route: 'console.india.fastag' },
            { title: 'Fuel Guard', description: 'Fill reports and fraud anomalies.', icon: 'gas-pump', route: 'console.india.fuel-guard' },
            { title: 'Notifications', description: 'WhatsApp / IVR prefs and alerts.', icon: 'comment-sms', route: 'console.india.notifications' },
            { title: 'Billing', description: 'Razorpay mandates and plans.', icon: 'credit-card', route: 'console.india.billing' },
            { title: 'Driver Ledger', description: 'Advances and trip settlements.', icon: 'wallet', route: 'console.india.driver-ledger' },
            { title: 'Analytics', description: 'Driver scores and lane rates.', icon: 'chart-line', route: 'console.india.analytics' },
            { title: 'Governance', description: 'Consent, retention, DSAR.', icon: 'shield-halved', route: 'console.india.governance' },
        ],
    });
}

export default {
    name: 'register-fleetindia-menu',
    after: 'load-extensions',
    initialize,
};
