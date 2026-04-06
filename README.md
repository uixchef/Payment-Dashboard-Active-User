# Payments dashboard — active user experience

Operational surface for **HighLevel payments**: a data-rich hub where businesses with live transaction volume monitor revenue, subscriptions, failures, and customer signals—without treating invoices as the front door to the product.

This repository is one half of a broader **payments ecosystem redesign**. It ships the **fintech-grade dashboard** used after activation; onboarding and first-run education live elsewhere by design, so each experience can optimize for clarity, performance, and release cadence without compromising the other.

---

## Context: payments system redesign

Payments historically behaved like a **feature cluster tucked behind invoices**. Revenue truth, subscription health, and operational exceptions were hard to see in one place, which pushed teams toward exports, ad hoc reports, and context switching.

The redesign introduces a **dual experience system**:

- **Active user experience (this repo):** a centralized operational dashboard for accounts with real transaction and subscription data.
- **New user experience (separate repo):** guided onboarding, setup, and activation—optimized for comprehension and completion, not dense monitoring.

Together, they move payments from an **invoice-first mental model** to a **payments hub** that matches how operators actually run the business day to day.

---

## What this repo covers

- The **active user dashboard** only: KPIs, charts, tables, and activity tuned for ongoing operations.
- A **data-forward interface** for businesses that already have transactions—built to answer “how are we doing?” and “what needs attention?” in one session.

First-run flows, marketing-style onboarding, and empty-account education are **intentionally out of scope** here; they ship as a separate application and deep-link into this hub when the account is ready.

---

## Core capabilities

- **Revenue metrics** — totals, recurring vs one-time signals, and period comparisons aligned to business reporting.
- **Subscription insights** — recurring revenue posture and plan-level movement (where surfaced in the UI).
- **Failed transactions** — visibility into payment friction and recoverable loss (tracking and drill paths as implemented).
- **Customer metrics** — concentration, segments, and top-customer snapshots paired with channel context.
- **Charts** — trends over time, distribution views, and channel breakdowns for fast pattern recognition.
- **Recent activity** — a scannable feed of operational events and line items so finance and ops can validate reality against expectations.

---

## Product thinking

- **At-a-glance business health** — the primary grid reads as a control room: status first, detail on demand.
- **Clickable metrics → deep workflows** — summary tiles and rows are entry points into investigation, not dead-end decorations.
- **Less reliance on external reporting** — the hub reduces “export to spreadsheet” as the default answer for routine questions.
- **Fast creation via global “create new”** — common payment and subscription actions stay reachable from the shell so operators do not lose momentum.

---

## UX decisions

- **Modular card layout** — metrics, charts, and feeds compose as discrete surfaces that can evolve independently.
- **Progressive disclosure** — overview first; dense tables and secondary panels reinforce trust without overwhelming first load.
- **Empty state handling** — accounts without meaningful data should degrade gracefully (and are candidates to route toward onboarding content in the companion experience).
- **Filter-driven insights** — time-range presets and search anchor the dashboard to the operator’s question (“this week,” “this month,” “custom”).

---

## System architecture

- **Widget-oriented dashboard** — sections map to coherent product modules (KPI strip, revenue visualization, customer analytics, transactions, insights).
- **Data aggregation across domains** — the UI is structured to consume **transactions** and **subscriptions** (and related customer/channel dimensions) as inputs to unified summaries; wire-up to live services is isolated from presentation.
- **Explicit state for filters and metrics** — date presets and shell state are modeled so the same layout can sync period selection with chart and table surfaces.
- **Separation of UI and data layers** — presentational components (cards, charts, tables) stay reusable; data fetching, caching, and transformation belong at the boundary so the dashboard can swap backends without redesigning the shell.

---

## Scalability and extensibility

- **Add widgets without rewriting the page** — new surfaces slot into the grid as long as they respect the shell contract.
- **Plug in new metrics** — KPI tiles and chart series can expand as product adds instruments (tax, payouts, disputes) without breaking the mental model.
- **Room for analytics layers** — the layout anticipates richer segmentation, cohort views, and eventually user-defined lenses on top of the same primitives.

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js** (App Router) |
| UI | **React**, **Tailwind CSS**, **shadcn/ui**-style primitives, **Radix UI** |
| Charts | **Recharts** |
| Icons | **Lucide React** |
| Language | **TypeScript** |
| Tooling | **ESLint**, **Node.js 22** |

Application source lives under **`my-app/`** at the repository root.

---

## Developer experience

- **Reusable building blocks** — shared cards, tables, chart wrappers, and layout primitives keep new work consistent with existing patterns.
- **Config-driven widgets** — metrics definitions and chart datasets lean on structured configuration (for example, shared metric metadata alongside chart components) so additions are reviewable diffs, not one-off JSX archaeology.
- **Layout reuse guidance** — see [`docs/reusing-this-layout.md`](docs/reusing-this-layout.md) for extracting the shell into an internal package or monorepo workspace when multiple apps need the same hub chrome.

---

## Setup instructions

```bash
cd my-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000); the app root redirects to **`/payment-hub`**.

For route-level notes, see [`my-app/app/payment-hub/README.md`](my-app/app/payment-hub/README.md).

---

## Folder structure

```text
.
├── docs/
│   └── reusing-this-layout.md    # Shell extraction and cross-app reuse
├── my-app/                       # Next.js application
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Redirect to payment hub
│   │   └── payment-hub/
│   │       ├── page.tsx          # Dashboard route
│   │       └── README.md
│   ├── components/
│   │   ├── payment-hub/          # Dashboard modules (sidebar, KPIs, charts, tables)
│   │   └── ui/                   # Shared primitives (button, card, table, …)
│   └── lib/                      # Utilities (date presets, cn helper, …)
└── README.md
```

---

## Screenshots and demo

Add **hero and module screenshots** (desktop and one narrow viewport) once visuals are approved. Recommended captures:

- Full dashboard with date filter and KPI row.
- Revenue charts and customer or channel section.
- Recent transactions or activity surface.

Replace this subsection with image links or a short Loom when available.

---

## Related repositories

**Explore the onboarding experience →** [INSERT NEW USER REPO LINK]

That repository owns **new user / first-run** flows; this repository owns **steady-state operations** after value is live in the account.

---

## Future enhancements

- **AI insights** — natural-language summaries of period movement, anomalies, and suggested next actions (with human-verifiable citations to underlying transactions).
- **Alerts** — proactive notifications for failure spikes, churn risk, or payout anomalies tied to the same metrics model as the dashboard.
- **Custom dashboards** — saved views, pinned widgets, and role-aware defaults for finance vs operations.

---

## License

**Proprietary — internal HighLevel use only.**  
Not licensed for public redistribution or external use unless explicitly granted by HighLevel.
