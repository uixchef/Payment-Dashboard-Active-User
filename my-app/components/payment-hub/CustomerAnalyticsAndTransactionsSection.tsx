import { TopCustomersChannelsSection } from "@/components/payment-hub/TopCustomersChannelsSection"
import RecentTransactions from "@/components/payment-hub/RecentTransactions"

/**
 * Groups Figma 399:11100 (top customers + revenue by channels) with recent transactions (517:144328).
 */
export function CustomerAnalyticsAndTransactionsSection() {
  return (
    <section
      className="grid h-[760px] w-full min-w-0 grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start lg:gap-4"
      aria-label="Customer analytics and recent transactions"
    >
      <div className="flex min-h-0 min-w-0 flex-col">
        <TopCustomersChannelsSection />
      </div>
      <div className="flex min-h-0 min-w-0 flex-col self-stretch">
        <RecentTransactions />
      </div>
    </section>
  )
}
