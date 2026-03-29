# New user experience (Payment Hub)

## Purpose

Route: **`/payment-hub/onboarding`**

Experience for accounts with **zero transactions** (or before setup is complete). The **active** hub is **`/payment-hub/active`** (metrics, charts, full dashboard).

## Decision rule (product)

| Condition | Primary experience |
|-----------|---------------------|
| `transactionCount === 0` (or onboarding incomplete) | `/payment-hub/onboarding` or conditional empty state inside hub |
| `transactionCount >= 1` | `/payment-hub/active` |

Wire this in the data layer or layout when APIs exist; until then both routes are reachable for design and QA.

## Files

| Path | Role |
|------|------|
| `app/payment-hub/onboarding/page.tsx` | Shell + metadata for the onboarding route |
| `components/payment-hub/onboarding/new-user-welcome-panel.tsx` | First-time / empty-state content block |

## Figma

1. Align frames for **0 transactions** vs **1+ transactions** to the same grid and shell (sidebar + top bar).
2. Drop specs or node links here when ready so engineering can match spacing and copy.

## Next steps

- [ ] Replace placeholder steps and primary CTA with real flows.
- [ ] Redirect from `/` or `/payment-hub/active` → `/payment-hub/onboarding` when `transactionCount === 0` (if product chooses server-driven routing).
- [ ] Add analytics events for onboarding start / complete.
