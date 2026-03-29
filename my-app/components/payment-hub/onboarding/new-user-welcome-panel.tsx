import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CreditCard } from "lucide-react"

/**
 * First-time / zero-transaction state for Payment Hub.
 * Replace copy and actions when wiring real data + Figma.
 */
export function NewUserWelcomePanel() {
  return (
    <section
      className="flex w-full min-w-0 flex-col gap-6 rounded-xl border border-dashed border-[#d0d5dd] bg-[#f9fafb] p-8 md:p-10"
      aria-labelledby="new-user-welcome-heading"
    >
      <div className="flex flex-col gap-2">
        <div className="flex size-12 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-[#eaecf0]">
          <CreditCard className="size-6 text-[#344054]" strokeWidth={1.75} aria-hidden />
        </div>
        <h1
          id="new-user-welcome-heading"
          className="text-xl font-semibold tracking-tight text-[#101828] md:text-2xl"
        >
          Welcome to your payment hub
        </h1>
        <p className="max-w-2xl text-base leading-6 text-[#475467]">
          When you have one or more transactions, you&apos;ll see revenue, charts, and activity
          here. This space is for onboarding and setup until then.
        </p>
      </div>

      <ul className="flex list-none flex-col gap-3 text-sm text-[#344054]">
        <li className="flex gap-2">
          <span className="font-medium text-[#101828]">1.</span>
          Connect a payment provider or import your first transaction (placeholder).
        </li>
        <li className="flex gap-2">
          <span className="font-medium text-[#101828]">2.</span>
          Confirm business details and payout preferences (placeholder).
        </li>
        <li className="flex gap-2">
          <span className="font-medium text-[#101828]">3.</span>
          Return here to track revenue and customer activity.
        </li>
      </ul>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button type="button" className="gap-2" disabled aria-disabled title="Wire to product flow">
          Get started
          <ArrowRight className="size-4" aria-hidden />
        </Button>
        <Button variant="outline" asChild>
          <Link href="/payment-hub/active">Preview active dashboard</Link>
        </Button>
      </div>
    </section>
  )
}
