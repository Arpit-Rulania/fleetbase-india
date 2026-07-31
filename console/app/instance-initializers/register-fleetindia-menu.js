/**
 * Register FleetIndia in the header nav (and universe fallback).
 * Slug MUST be `india` so links resolve to /india (not /fleetindia → virtual → home).
 */
export function initialize(appInstance) {
    const options = {
        icon: 'truck',
        priority: 1,
        id: 'india',
        slug: 'india',
        description: 'India compliance, FASTag, fuel guard, billing, driver ledger, and governance.',
        shortcuts: [
            { title: 'Overview', icon: 'home', route: 'console.india.index', slug: 'india-overview' },
            { title: 'Compliance', icon: 'file', route: 'console.india.compliance', slug: 'india-compliance' },
            { title: 'FASTag', icon: 'road', route: 'console.india.fastag', slug: 'india-fastag' },
            { title: 'Fuel Guard', icon: 'gas-pump', route: 'console.india.fuel-guard', slug: 'india-fuel-guard' },
            { title: 'Notifications', icon: 'bell', route: 'console.india.notifications', slug: 'india-notifications' },
            { title: 'Billing', icon: 'credit-card', route: 'console.india.billing', slug: 'india-billing' },
            { title: 'Driver Ledger', icon: 'wallet', route: 'console.india.driver-ledger', slug: 'india-driver-ledger' },
            { title: 'Analytics', icon: 'chart-line', route: 'console.india.analytics', slug: 'india-analytics' },
            { title: 'Governance', icon: 'shield-halved', route: 'console.india.governance', slug: 'india-governance' },
        ],
    };

    const menuService = appInstance.lookup('service:universe/menu-service');
    if (menuService?.registerHeaderMenuItem) {
        menuService.registerHeaderMenuItem('FleetIndia', 'console.india', options);
    }

    // Older path still used by some header layouts
    const universe = appInstance.lookup('service:universe');
    if (universe?.registerHeaderMenuItem) {
        try {
            universe.registerHeaderMenuItem('FleetIndia', 'console.india', options);
        } catch (_) {
            // ignore duplicate registration
        }
    }
}

export default {
    name: 'register-fleetindia-menu',
    after: 'load-extensions',
    initialize,
};
