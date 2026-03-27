"use client"

import type { ReactNode } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  CHART_CARD_MIN_HEIGHT_CLASS,
  CHART_PLOT_MIN_HEIGHT_CLASS,
} from "@/components/payment-hub/chart-card-metrics"

const cardClass = `flex w-full flex-col gap-4 overflow-hidden rounded-[4px] border border-[#d0d5dd] bg-white p-4 shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] ${CHART_CARD_MIN_HEIGHT_CLASS}`

const axisTick = { fill: "#475467", fontSize: 14 }
const gridStroke = "#e4e7ec"
const yDomain = [0, 75000] as const
const yTicks = [0, 15000, 30000, 45000, 60000, 75000]

/** Figma 379:29387 — Top customers */
const topCustomers = [
  { name: "Acme Corp", value: 26000 },
  { name: "TechStart Inc", value: 32000 },
  { name: "Global Ventures", value: 44000 },
  { name: "Design Studio", value: 70000 },
  { name: "Innovation Labs", value: 68000 },
]

/** Figma 517:145305 — Revenue by channels */
const channelRevenue = [
  { name: "Funnel", value: 72000 },
  { name: "Invoice", value: 65000 },
  { name: "Payment link", value: 56000 },
  { name: "Subscription", value: 48000 },
  { name: "Form", value: 36000 },
  { name: "Website", value: 30000 },
]

const tooltipStyle = {
  borderRadius: 8,
  border: "1px solid #e4e7ec",
  fontSize: 12,
}

function formatYTick(v: number) {
  if (v === 0) return "$0k"
  return `$${v / 1000}k`
}

function ChartYLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-[17px] shrink-0 flex-col items-center justify-center self-stretch pb-6">
      <span className="block -rotate-90 whitespace-nowrap text-center text-sm font-semibold leading-5 text-[#475467]">
        {children}
      </span>
    </div>
  )
}

/**
 * Figma 399:11100 — stacked “Top customers” + “Revenue by channels” bar charts.
 */
export function TopCustomersChannelsSection() {
  return (
    <section
      className="flex w-full flex-col gap-4"
      aria-label="Top customers and revenue by channels"
    >
      <div className={cardClass}>
        <div className="flex min-h-[37px] shrink-0 flex-col justify-center gap-0">
          <h3 className="text-base font-semibold leading-6 text-[#101828]">
            Top customers
          </h3>
          <p className="text-sm font-normal leading-5 text-[#475467]">
            Highest revenue contributors.
          </p>
        </div>
        <div className={`flex w-full flex-1 gap-1 ${CHART_PLOT_MIN_HEIGHT_CLASS}`}>
          <ChartYLabel>Revenue in (USD)</ChartYLabel>
          <div className={`min-w-0 flex-1 ${CHART_PLOT_MIN_HEIGHT_CLASS}`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topCustomers}
                margin={{ top: 4, right: 8, left: 0, bottom: 4 }}
                barCategoryGap="12%"
              >
                <CartesianGrid
                  stroke={gridStroke}
                  strokeDasharray="0"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={0}
                  height={40}
                />
                <YAxis
                  domain={yDomain}
                  ticks={[...yTicks]}
                  tickFormatter={formatYTick}
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  width={44}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(val) =>
                    val != null
                      ? [`$${Number(val).toLocaleString()}`, "Revenue"]
                      : ["", "Revenue"]
                  }
                />
                <Bar
                  dataKey="value"
                  fill="#2970ff"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <p className="pt-2 text-center text-sm font-semibold leading-5 text-[#475467]">
          Customer
        </p>
      </div>

      <div className={cardClass}>
        <div className="flex shrink-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <h3 className="text-base font-semibold leading-6 text-[#101828]">
            Revenue by channels
          </h3>
          <p className="text-sm font-normal leading-5 text-[#475467] sm:text-right">
            Total revenue: $123.4k
          </p>
        </div>
        <div className={`flex w-full flex-1 gap-1 ${CHART_PLOT_MIN_HEIGHT_CLASS}`}>
          <ChartYLabel>Revenue (in USD)</ChartYLabel>
          <div className={`min-w-0 flex-1 ${CHART_PLOT_MIN_HEIGHT_CLASS}`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={channelRevenue}
                margin={{ top: 4, right: 8, left: 0, bottom: 4 }}
                barCategoryGap="10%"
              >
                <CartesianGrid
                  stroke={gridStroke}
                  strokeDasharray="0"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={6}
                  interval={0}
                  height={52}
                />
                <YAxis
                  domain={yDomain}
                  ticks={[...yTicks]}
                  tickFormatter={formatYTick}
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  width={44}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(val) =>
                    val != null
                      ? [`$${Number(val).toLocaleString()}`, "Revenue"]
                      : ["", "Revenue"]
                  }
                />
                <Bar
                  dataKey="value"
                  fill="#2970ff"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <p className="pt-2 text-center text-sm font-semibold leading-5 text-[#475467]">
          Channels
        </p>
      </div>
    </section>
  )
}
