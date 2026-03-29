# Reusing the Payment Hub layout in other projects

## What “the layout” is

1. **App shell:** `Sidebar` + `Topbar` + main column chrome (see `app/payment-hub/active/page.tsx`).
2. **Root layout:** fonts + `globals.css` on `body` (`app/layout.tsx`).
3. **Dependencies:** `components/payment-hub/*`, `components/ui/*` (shadcn), `lib/utils.ts` (`cn`), Tailwind + CSS variables in `app/globals.css`.

Anything you share must either **ship with the same Tailwind/CSS setup** or you accept **duplicating token values** in the consumer.

---

## Recommended: publish an internal package

Best for **multiple separate repos** (e.g. this dashboard + onboarding + another app).

1. Create a package (e.g. `packages/payment-hub-shell` in a monorepo, or its own repo) with:
   - `PaymentHubShell` (or `HubLayout`) = `{ children }` wrapping sidebar + topbar + scroll region.
   - Move **only** what the shell needs: `Sidebar`, `Topbar`, and their imports (icons, UI primitives, context if any).
2. **`package.json`:** list `react`, `react-dom`, `next` as **peerDependencies**; keep `lucide-react`, `radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge` as **dependencies** or peers (match your policy).
3. **Tailwind v4 in the consumer:** add the package path to **content / source scanning** so classes in `node_modules/your-package` are not purged (see Next + Tailwind docs for `content` / `@source`).
4. **CSS variables:** export a small **`shell.css`** (or document “import these layers from our globals”) so `--background`, `--foreground`, etc. match.
5. **Publish:** npm private scope (`@yourorg/payment-hub-shell`), or **GitHub Packages**, or **`npm pack`** + install via `file:` for local dev.

**Outcome:** bump one version in other projects instead of copy-paste.

---

## Alternative: one monorepo (pnpm / npm workspaces)

If “other projects” live in **one git repo**, add:

```text
packages/
  payment-hub-shell/   # shared layout package
  dashboard-app/         # this app, depends on workspace:*
  onboarding-app/
```

Use **workspace protocol** so all apps resolve the same shell without publishing.

---

## Not recommended long term

- **Copy-pasting** `components/payment-hub` into each repo — fastest today, drift tomorrow.
- **Git submodules** for UI — awkward with bundlers and Tailwind.

---

## Minimal checklist when you extract

- [ ] Single exported layout component with `children` for the main area.
- [ ] Peer versions aligned with Next/React across apps.
- [ ] Tailwind sees the package’s class names (no “missing styles” in prod).
- [ ] Shared `globals` / tokens documented or bundled once.
- [ ] Storybook or a tiny `/demo` route in the package (optional) to verify the shell in isolation.

---

## Next step in this repo (optional)

To actually extract: create `packages/payment-hub-shell`, move shell components + tests, then replace imports here with `@yourorg/payment-hub-shell`. That is a deliberate refactor; do it when you are ready to pay the one-time extraction cost for long-term reuse.
