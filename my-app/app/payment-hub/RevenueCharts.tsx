"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar
} from "recharts"

const revenueData = [
  { month: "Oct 1", value: 400 },
  { month: "Oct 5", value: 520 },
  { month: "Oct 10", value: 600 },
  { month: "Oct 15", value: 750 },
  { month: "Oct 20", value: 700 },
  { month: "Oct 25", value: 820 },
  { month: "Oct 30", value: 900 },
]

const productData = [
  { name: "Pro Plan", value: 72000 },
  { name: "Enterprise", value: 45000 },
  { name: "Starter", value: 42000 },
  { name: "Add ons", value: 36000 },
  { name: "Premium", value: 32000 },
]

export default function RevenueCharts() {
  return (
    <div className="grid grid-cols-2 gap-6 mt-8">
      
      {/* Revenue Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Product Revenue */}
      <Card>
        <CardHeader>
          <CardTitle>Product revenue distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  )
}