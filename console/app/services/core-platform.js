import Service from '@ember/service';
import { inject as service } from '@ember/service';
import config from '@fleetbase/console/config/environment';

/**
 * Thin HTTP client for the private NestJS core-platform (:3010).
 * No Fleetbase imports on the server side — console only talks over REST.
 */
export default class CorePlatformService extends Service {
    @service fetch;
    @service notifications;
    @service currentUser;

    get baseUrl() {
        return (config.APP.corePlatformUrl || 'http://localhost:3010').replace(/\/$/, '');
    }

    get companyUuid() {
        return this.currentUser?.companyId || this.currentUser?.company?.uuid || '';
    }

    async request(path, options = {}) {
        const url = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
        const method = (options.method || 'GET').toUpperCase();
        const headers = {
            Accept: 'application/json',
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...(options.headers || {}),
        };

        let fullUrl = url;
        if (options.query && typeof options.query === 'object') {
            const qs = new URLSearchParams();
            Object.entries(options.query).forEach(([k, v]) => {
                if (v !== undefined && v !== null && v !== '') qs.append(k, String(v));
            });
            const s = qs.toString();
            if (s) fullUrl += (fullUrl.includes('?') ? '&' : '?') + s;
        }

        try {
            if (typeof this.fetch?.request === 'function') {
                return await this.fetch.request(fullUrl, {
                    method,
                    headers,
                    body: options.body,
                    external: true,
                });
            }
        } catch (err) {
            // fall through to native fetch
            if (err && err.message && !String(err.message).includes('Failed to fetch')) {
                throw err;
            }
        }

        const res = await fetch(fullUrl, {
            method,
            headers,
            body: options.body ? JSON.stringify(options.body) : undefined,
        });
        const text = await res.text();
        let json = null;
        try {
            json = text ? JSON.parse(text) : null;
        } catch {
            json = text;
        }
        if (!res.ok) {
            const message = (json && (json.message || json.error)) || `HTTP ${res.status}`;
            const error = new Error(message);
            error.status = res.status;
            error.payload = json;
            throw error;
        }
        return json;
    }

    health() {
        return this.request('/health');
    }

    // ── Compliance ──────────────────────────────────────────────
    complianceHealth() {
        return this.request('/api/compliance/health');
    }
    vahanVerify(plateNumber) {
        return this.request(`/api/compliance/vahan/verify/${encodeURIComponent(plateNumber)}`, { method: 'POST' });
    }
    generateEwayBill(body) {
        return this.request('/api/compliance/eway-bill/generate', { method: 'POST', body });
    }
    createLorryReceipt(body) {
        return this.request('/api/compliance/lorry-receipt', { method: 'POST', body });
    }

    // ── FASTag ──────────────────────────────────────────────────
    listFastagAccounts(companyUuid = this.companyUuid) {
        return this.request(`/api/fastag/accounts/${encodeURIComponent(companyUuid)}`);
    }
    createFastagAccount(body) {
        return this.request('/api/fastag/accounts', { method: 'POST', body });
    }
    fastagBalance(vehicleUuid) {
        return this.request(`/api/fastag/balance/${encodeURIComponent(vehicleUuid)}`);
    }
    fastagTransactions(vehicleUuid) {
        return this.request(`/api/fastag/transactions/${encodeURIComponent(vehicleUuid)}`);
    }
    initiateFastagRecharge(body) {
        return this.request('/api/fastag/recharge/initiate', { method: 'POST', body });
    }

    // ── Fuel Guard ──────────────────────────────────────────────
    submitFuelReport(body) {
        return this.request('/api/fuel-guard/reports', { method: 'POST', body });
    }
    getFuelReport(id) {
        return this.request(`/api/fuel-guard/reports/${encodeURIComponent(id)}`);
    }
    getFuelConfig(companyUuid = this.companyUuid) {
        return this.request(`/api/fuel-guard/config/${encodeURIComponent(companyUuid)}`);
    }
    updateFuelConfig(companyUuid, body) {
        return this.request(`/api/fuel-guard/config/${encodeURIComponent(companyUuid)}`, { method: 'PUT', body });
    }
    fuelDriverExplanation(query) {
        return this.request('/api/fuel-guard/driver-explanation', { query });
    }

    // ── Notifications ───────────────────────────────────────────
    sendAlert(body) {
        return this.request('/api/notifications/send', { method: 'POST', body });
    }
    notificationLogs(recipientUuid) {
        return this.request(`/api/notifications/logs/${encodeURIComponent(recipientUuid)}`);
    }
    getNotificationPreference(recipientUuid) {
        return this.request(`/api/notifications/preferences/${encodeURIComponent(recipientUuid)}`);
    }
    upsertNotificationPreference(recipientUuid, body) {
        return this.request(`/api/notifications/preferences/${encodeURIComponent(recipientUuid)}`, {
            method: 'PUT',
            body,
        });
    }

    // ── Billing ─────────────────────────────────────────────────
    registerSubscription(body) {
        return this.request('/api/billing/subscriptions', { method: 'POST', body });
    }
    getSubscription(companyUuid = this.companyUuid) {
        return this.request(`/api/billing/subscriptions/${encodeURIComponent(companyUuid)}`);
    }
    changePlan(companyUuid, body) {
        return this.request(`/api/billing/subscriptions/${encodeURIComponent(companyUuid)}/plan`, {
            method: 'PUT',
            body,
        });
    }

    // ── Driver ledger ───────────────────────────────────────────
    requestAdvance(body) {
        return this.request('/api/driver-ledger/advances', { method: 'POST', body });
    }
    listAdvances(driverUuid) {
        return this.request(`/api/driver-ledger/advances/${encodeURIComponent(driverUuid)}`);
    }
    driverBalance(driverUuid) {
        return this.request(`/api/driver-ledger/balance/${encodeURIComponent(driverUuid)}`);
    }
    calculateSettlement(body) {
        return this.request('/api/driver-ledger/settlements/calculate', { method: 'POST', body });
    }
    markSettlementPaid(tripUuid) {
        return this.request(`/api/driver-ledger/settlements/${encodeURIComponent(tripUuid)}/mark-paid`, {
            method: 'PUT',
        });
    }

    // ── Analytics ───────────────────────────────────────────────
    computeDriverScore(body) {
        return this.request('/api/analytics/driver-scores/compute', { method: 'POST', body });
    }
    driverScores(driverUuid) {
        return this.request(`/api/analytics/driver-scores/${encodeURIComponent(driverUuid)}`);
    }
    latestDriverScore(driverUuid) {
        return this.request(`/api/analytics/driver-scores/${encodeURIComponent(driverUuid)}/latest`);
    }
    companyDriverScores(companyUuid = this.companyUuid) {
        return this.request(`/api/analytics/companies/${encodeURIComponent(companyUuid)}/driver-scores`);
    }
    rateStats(query) {
        return this.request('/api/analytics/rates/stats', { query });
    }

    // ── Governance ──────────────────────────────────────────────
    recordConsent(body) {
        return this.request('/api/governance/consent', { method: 'POST', body });
    }
    consentHistory(subjectId, purpose) {
        return this.request(`/api/governance/consent/${encodeURIComponent(subjectId)}`, {
            query: purpose ? { purpose } : {},
        });
    }
    checkConsent(subjectId, purpose) {
        return this.request(`/api/governance/consent/${encodeURIComponent(subjectId)}/check`, {
            query: { purpose },
        });
    }
    retentionPolicies() {
        return this.request('/api/governance/retention-policies');
    }
    upsertRetentionPolicy(dataCategory, body) {
        return this.request(`/api/governance/retention-policies/${encodeURIComponent(dataCategory)}`, {
            method: 'PUT',
            body,
        });
    }
    listBreaches() {
        return this.request('/api/governance/breaches');
    }
    createBreach(body) {
        return this.request('/api/governance/breaches', { method: 'POST', body });
    }
    createDataRequest(body) {
        return this.request('/api/governance/data-requests', { method: 'POST', body });
    }
    listDataRequests() {
        return this.request('/api/governance/data-requests');
    }
    erasureChecklist(id) {
        return this.request(`/api/governance/data-requests/${encodeURIComponent(id)}/erasure-checklist`, {
            method: 'POST',
        });
    }
}
