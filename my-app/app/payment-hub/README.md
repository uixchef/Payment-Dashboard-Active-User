# Payment Hub routes

| Route | Experience |
|-------|------------|
| **`/payment-hub/onboarding`** | New users (0 transactions / setup) |
| **`/payment-hub/active`** | Active dashboard (1+ transactions — KPIs, charts, activity) |
| **`/payment-hub`** | Redirects → **`/payment-hub/active`** |

App root **`/`** redirects → **`/payment-hub/active`**. Swap that entry redirect when you add logic to send new users to onboarding.
