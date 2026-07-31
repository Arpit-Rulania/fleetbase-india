# What is FleetIndia? (plain English)

This is **fleet management software for Indian trucking companies**.

If you sell it, the customer (a fleet owner / dispatcher) logs into **one website** and runs their business from there.

---

## What the paying customer uses

**One product UI:** the console at port **4200** (in production: your domain, e.g. `app.yourcompany.com`).

| They use this | To do what |
|---|---|
| **Fleet-Ops** (top nav — came with Fleetbase) | Create trips/orders, assign drivers & trucks, live map, places |
| **IAM** | Users, roles, who can see what |
| **FleetIndia** (our addition) | India-specific ops listed below |
| **Developers** (optional) | API keys if they integrate their own systems |

### FleetIndia modules (what we built for India)

| Screen | Customer job |
|---|---|
| Compliance | Check vehicle RC via VAHAN, make e-way bills, print lorry receipts |
| FASTag | See tag balance, top up, auto-recharge when low |
| Fuel Guard | Spot suspicious fuel fills (wrong place / too much) |
| Notifications | WhatsApp / call drivers (trip accept, POD, advances) |
| Billing | Their subscription to *your* SaaS (Razorpay mandate) |
| Driver Ledger | Driver cash advances and trip settlements |
| Analytics | Driver scores, corridor rate history |
| Governance | Consent logs, data requests (DPDP-style) |

They do **not** open ports 3010, 3002, or 8000. Those are backend plumbing.

---

## What we built under the hood (not customer-facing)

```
Customer browser
       │
       ▼
┌──────────────────┐
│ Console :4200    │  ← THE PRODUCT UI (what you sell)
└────────┬─────────┘
         │
    ┌────┴─────┐
    ▼          ▼
:8000        :3010
Fleetbase    core-platform     ← India APIs we wrote (NestJS)
(orders,     (GST/VAHAN/FASTag/
 drivers…)    fuel/billing/…)
                 │
                 ▼
              :3002
         telematics-gateway   ← GPS devices (optional)
```

| Piece | Role | Customer sees it? |
|---|---|---|
| `fleetbase-india` console :4200 | Website / app UI | **Yes — this is the product** |
| Fleetbase API :8000 | Orders, drivers, vehicles DB | No (behind UI) |
| `core-platform` :3010 | India business logic APIs | No (behind UI) |
| `telematics-gateway` :3002 | GPS boxes talking TCP/MQTT | No (devices talk to it) |

---

## Honest status right now

**Working as a local developer demo:**

- Console runs, Fleet-Ops engines work (upstream product)
- India screens exist and call `:3010` when that API is up
- Many India flows are **scaffolded / mock-friendly** (mock bank, mock WhatsApp in non-prod) — good for demos, not yet a finished commercial release

**Not yet a turnkey “sell tomorrow” product:**

- No polished onboarding for a stranger customer
- No production payments/KYC/VAHAN live credentials wired
- AGPL: the Fleetbase-based console still carries open-source obligations unless you buy Fleetbase’s commercial license or replace that stack
- Driver mobile app (`navigator`) not built in this repo yet

---

## How to open India features locally

1. Start stack (Fleetbase + console + core-platform)
2. Open **http://localhost:4200** and log in
3. On the **home dashboard**, use the teal **“FleetIndia — India modules”** panel (always visible)
4. Or go to **http://localhost:4200/india**

Top nav “FleetIndia” may also appear after login (extension menu).
