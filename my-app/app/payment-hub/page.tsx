import { redirect } from "next/navigation"

/** `/payment-hub` resolves to the active dashboard; use `/payment-hub/onboarding` for new users. */
export default function PaymentHubIndexPage() {
  redirect("/payment-hub/active")
}
