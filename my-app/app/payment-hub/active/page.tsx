import type { Metadata } from "next"
import { Sidebar } from "@/components/payment-hub/Sidebar"
import { Topbar } from "@/components/payment-hub/Topbar"
import { StatCard } from "@/components/payment-hub/StatCard"
import { RevenueCharts } from "@/components/payment-hub/RevenueCharts"
import { CustomerAnalyticsAndTransactionsSection } from "@/components/payment-hub/CustomerAnalyticsAndTransactionsSection"
import { PaymentsHubInsightsSection } from "@/components/payment-hub/PaymentsHubInsightsSection"
import { Input } from "@/components/ui/input"
import { DateRangePresetField } from "@/components/payment-hub/date-range-preset-select"
import { Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard | Payment Dashboard",
  description: "Revenue, charts, and activity for accounts with transactions.",
}

export default function PaymentHubActivePage() {
  const stats = [
    { title: "Total revenue", value: "$123,400", change: "+12.5%", isPositive: true },
    { title: "Recurring revenue", value: "$130,000", change: "+12.5%", isPositive: true },
    { title: "Outstanding invoices", value: "$18,420", change: "-5.3%", isPositive: false },
    { title: "Ongoing subscriptions", value: "847", change: "+2.8%", isPositive: true },
    { title: "Failed transactions", value: "8", change: "-27%", isPositive: false },
    { title: "New customers", value: "44", change: "+5%", isPositive: true },
  ]

  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-slate-100/70 text-foreground">
      <Sidebar />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-slate-50">
        <Topbar />

        <main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#ECEEF2] p-4">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden overscroll-y-contain rounded-[12px] border border-white bg-white p-4 shadow-[0_12px_16px_-4px_rgba(16,24,40,0.08),0_4px_6px_-2px_rgba(16,24,40,0.03)]">
            <div className="mx-auto flex w-full min-w-0 max-w-[1160px] flex-col gap-8">
              <section
                className="flex w-full min-w-0 flex-col gap-4"
                aria-label="Period, KPIs, revenue, and customer analytics"
              >
                <div className="flex w-full flex-col items-stretch justify-between gap-4 md:flex-row md:items-center">
                  <DateRangePresetField />
                  <div className="w-full shrink-0 md:w-[216px]">
                    <div className="flex h-9 w-full items-center gap-2 rounded border border-[#d0d5dd] bg-white px-2 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
                      <Search
                        className="size-4 shrink-0 text-[#667085]"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <Input
                        type="search"
                        placeholder="Search"
                        className="h-auto min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none font-normal text-base leading-6 tracking-normal text-[#475467] placeholder:text-[#475467] focus-visible:text-[#101828] focus-visible:ring-0 focus-visible:shadow-none md:text-base"
                      />
                    </div>
                  </div>
                </div>
                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {stats.map((stat) => (
                    <StatCard
                      key={stat.title}
                      title={stat.title}
                      value={stat.value}
                      change={stat.change}
                      isPositive={stat.isPositive}
                    />
                  ))}
                </section>
                <RevenueCharts />
                <CustomerAnalyticsAndTransactionsSection />
              </section>
              <PaymentsHubInsightsSection />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
