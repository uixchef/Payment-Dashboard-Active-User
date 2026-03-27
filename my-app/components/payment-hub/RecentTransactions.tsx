"use client"

const recentTransactionsShellClass =
  "flex w-full flex-col gap-0 overflow-hidden rounded-[4px] border border-[#d0d5dd] bg-white p-0 shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]"

const recentTransactions: { activity: string; amount: string }[] = [
  { activity: "Invoice #INV-2024-089 paid by Acme Corp", amount: "2,450.00" },
  { activity: "New ecommerce order #ORD-2024-156", amount: "189.99" },
  { activity: "Monthly subscription renewed - Pro plan", amount: "99.00" },
  { activity: "Payment link shared: Product demo", amount: "299.00" },
  { activity: "Refund processed for Invoice #INV-2024-085", amount: "14,500,000.00" },
  { activity: "Customer feedback received for order #ORD-2024-143", amount: "300.00" },
  { activity: "Trial period ended - Basic plan", amount: "75.00" },
  { activity: "Invoice #INV-2024-090 sent to Green Tech", amount: "1,200.50" },
  { activity: "New feature update released for app version 2.1", amount: "57.25" },
  { activity: "Customer support ticket #TKT-2024-045 resolved", amount: "450.75" },
  { activity: "Payment reminder sent for Invoice #INV-2024-091", amount: "1,800.00" },
  { activity: "Product review requested for order #ORD-2024-157", amount: "3,750.00" },
  { activity: "Invoice #INV-2024-092 paid by Beta Solutions", amount: "89.99" },
  { activity: "New ecommerce order #ORD-2024-158", amount: "500.00" },
  { activity: "Monthly subscription downgraded - Basic plan", amount: "1,050.00" },
  { activity: "Payment confirmation received for Invoice #INV-2024-093", amount: "22.50" },
  { activity: "Customer survey invitation sent for order #ORD-2024-159", amount: "2,999.99" },
  { activity: "Wire transfer received — reference #WT-2024-8821", amount: "12,400.00" },
  { activity: "Subscription upgrade: Pro to Enterprise", amount: "4,999.00" },
  { activity: "Chargeback opened for order #ORD-2024-161", amount: "2,150.00" },
  { activity: "Invoice #INV-2024-094 partially paid", amount: "640.00" },
  { activity: "Payout scheduled to connected account ****4421", amount: "8,920.50" },
  { activity: "Failed card charge — retry scheduled", amount: "0.00" },
  { activity: "Annual plan renewal — Northwind LLC", amount: "9,600.00" },
  { activity: "Adjustment: credit memo #CM-2024-014", amount: "-125.00" },
  { activity: "POS sale captured — Store #12", amount: "43.18" },
  { activity: "Invoice #INV-2024-095 sent to Aurora Labs", amount: "0.00" },
  { activity: "ACH return: insufficient funds", amount: "1,275.00" },
  { activity: "Loyalty discount applied — order #ORD-2024-162", amount: "18.00" },
  { activity: "Bulk export: transaction history (fee)", amount: "5.00" },
  { activity: "Recurring add-on: SMS usage overage", amount: "34.50" },
  { activity: "Manual refund approved — support case #SUP-4412", amount: "199.00" },
  { activity: "Cross-border fee — EUR settlement", amount: "12.80" },
]

const RECENT_TX_TOTAL_COUNT = recentTransactions.length

const txTableCell =
  "h-9 border-b border-r border-[#d0d5dd] px-3 text-left align-middle text-base font-medium leading-6 text-[#475467] last:border-r-0"

const txCellActivity = `${txTableCell} min-w-0`

const txCellAmount = `${txTableCell} text-right tabular-nums`

/** Sticky header cells; `border-separate` keeps `position:sticky` reliable on `<th>`. */
const thBase =
  "sticky top-0 z-10 h-9 border-b border-[#d0d5dd] bg-[#f2f4f7] px-3 align-middle"

/**
 * Figma 517:144328 — toolbar + bordered grid table; scroll only moves rows (header sticky).
 */
export default function RecentTransactions() {
  return (
    <div className="h-full min-h-0 min-w-0 w-full">
      <div
        className={`${recentTransactionsShellClass} h-full min-h-0`}
        role="region"
        aria-label="Recent transactions table"
      >
        <div className="flex w-full shrink-0 items-center gap-4 border-b border-[#d0d5dd] px-3 py-2">
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <h3 className="text-base font-semibold leading-6 text-[#101828]">
              Recent transactions
            </h3>
            <span className="inline-flex h-6 shrink-0 items-center justify-center rounded bg-[#f2f4f7] px-2 text-sm font-medium leading-5 text-[#344054]">
              {RECENT_TX_TOTAL_COUNT}
            </span>
          </div>
          <button
            type="button"
            className="shrink-0 text-base font-medium leading-6 text-[#004eeb] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004eeb]"
          >
            View all
          </button>
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border-x border-b border-[#eaecf0] bg-white">
          <div className="isolate min-h-0 flex-1 overflow-y-auto overflow-x-auto overscroll-contain">
            <table className="table-fixed min-w-0 w-full border-separate border-spacing-0 text-base">
              <caption className="sr-only">
                Recent transactions: activity and amount in USD
              </caption>
              <colgroup>
                <col className="min-w-0" />
                <col className="w-[196px]" />
              </colgroup>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className={`${thBase} min-w-0 border-r border-[#d0d5dd] text-left`}
                  >
                    <div className="flex min-w-0 items-center gap-1">
                      <img
                        src="/icons/recent-transactions/slab-serif.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="size-5 shrink-0"
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1 truncate text-base font-semibold leading-6 text-[#101828]">
                        Activity
                      </span>
                      <img
                        src="/icons/recent-transactions/filter-lines.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="size-3.5 shrink-0"
                        aria-hidden
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className={`${thBase} w-[196px] min-w-[196px] max-w-[196px] text-right`}
                  >
                    <div className="flex items-center justify-end gap-1">
                      <img
                        src="/icons/recent-transactions/credit-card.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="size-5 shrink-0"
                        aria-hidden
                      />
                      <span className="truncate text-base font-semibold leading-6 text-[#101828]">
                        Amount (in USD)
                      </span>
                      <img
                        src="/icons/recent-transactions/filter-lines.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="size-3.5 shrink-0"
                        aria-hidden
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((row) => (
                  <tr key={row.activity} className="bg-white">
                    <td className={txCellActivity}>
                      <span className="block min-w-0 truncate opacity-80">
                        {row.activity}
                      </span>
                    </td>
                    <td className={txCellAmount}>
                      <span className="inline-flex gap-0.5 opacity-80">
                        <span>$</span>
                        <span>{row.amount}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
