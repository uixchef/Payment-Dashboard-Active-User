"use client"

import type { ReactNode } from "react"
import {
  Area,
  AreaChart,
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

const cardClass = `flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-hidden rounded border border-[#d0d5dd] bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.1),0_1px_2px_rgba(16,24,40,0.06)] ${CHART_CARD_MIN_HEIGHT_CLASS}`

/** Figma 378:12219 — line x-axis */
const revenueTrend = [
  { date: "Oct 1", value: 420 },
  { date: "Oct 8", value: 560 },
  { date: "Oct 16", value: 640 },
  { date: "Oct 24", value: 780 },
  { date: "Oct 30", value: 900 },
]

/** Figma — bar chart */
const productRevenue = [
  { name: "Pro Plan", value: 70000 },
  { name: "Enterprise", value: 48000 },
  { name: "Starter", value: 42000 },
  { name: "Add ons", value: 28000 },
  { name: "Premium", value: 26000 },
]

const axisTick = { fill: "#475467", fontSize: 14 }
const gridStroke = "#e4e7ec"

function ChartYLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-[17px] shrink-0 flex-col items-center justify-center self-stretch pb-6">
      <span className="block -rotate-90 whitespace-nowrap text-center text-sm font-semibold leading-5 text-[#475467]">
        {children}
      </span>
    </div>
  )
}

export function RevenueCharts() {
  return (
    <section className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      {/* Revenue trends — Figma 378:12220 */}
      <div className={cardClass}>
        <div className="flex h-[37px] shrink-0 flex-col justify-center gap-0">
          <h3 className="text-base font-semibold leading-6 text-[#101828]">
            Revenue trends
          </h3>
          <p className="text-sm font-normal leading-5 text-[#475467]">
            MRR growth trajectory.
          </p>
        </div>
        <div className={`flex w-full flex-1 gap-1 ${CHART_PLOT_MIN_HEIGHT_CLASS}`}>
          <ChartYLabel>Revenue (in USD)</ChartYLabel>
          <div className={`min-w-0 flex-1 ${CHART_PLOT_MIN_HEIGHT_CLASS}`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueTrend}
                margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#155eef" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#155eef" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke={gridStroke}
                  strokeDasharray="0"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  padding={{ left: 8, right: 8 }}
                />
                <YAxis
                  domain={[0, 1000]}
                  ticks={[0, 200, 400, 600, 800, 1000]}
                  tickFormatter={(v) => `$${v.toLocaleString()}`}
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  width={44}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e4e7ec",
                    fontSize: 12,
                  }}
                  formatter={(val) =>
                    val != null
                      ? [`$${Number(val).toLocaleString()}`, "Revenue"]
                      : ["", "Revenue"]
                  }
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#155eef"
                  strokeWidth={2}
                  fill="url(#revenueArea)"
                  dot={false}
                  activeDot={{ r: 4, fill: "#155eef", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <p className="pt-2 text-center text-sm font-semibold leading-5 text-[#475467]">
          Month
        </p>
      </div>

      {/* Product revenue distribution — Figma 378:12231 */}
      <div className={cardClass}>
        <div className="flex h-[37px] shrink-0 flex-col justify-center gap-0">
          <h3 className="text-base font-semibold leading-6 text-[#101828]">
            Product revenue distribution
          </h3>
          <p className="text-sm font-normal leading-5 text-[#475467]">
            Top performing products by revenue.
          </p>
        </div>
        <div className={`flex w-full flex-1 gap-1 ${CHART_PLOT_MIN_HEIGHT_CLASS}`}>
          <ChartYLabel>Revenue (in USD)</ChartYLabel>
          <div className={`min-w-0 flex-1 ${CHART_PLOT_MIN_HEIGHT_CLASS}`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productRevenue}
                margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
                barCategoryGap="18%"
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
                  height={48}
                />
                <YAxis
                  domain={[0, 75000]}
                  ticks={[0, 15000, 30000, 45000, 60000, 75000]}
                  tickFormatter={(v) =>
                    v === 0 ? "$0k" : `$${v / 1000}k`
                  }
                  tick={axisTick}
                  tickLine={false}
                  axisLine={false}
                  width={44}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e4e7ec",
                    fontSize: 12,
                  }}
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
          Plans
        </p>
      </div>
    </section>
  )
}
