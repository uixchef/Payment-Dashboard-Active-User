"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type PaymentHubSidebarContextValue = {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
  toggleCollapsed: () => void
}

const PaymentHubSidebarContext =
  createContext<PaymentHubSidebarContextValue | null>(null)

export function PaymentHubSidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = useCallback(() => {
    setCollapsed((c) => !c)
  }, [])

  const value = useMemo(
    () => ({ collapsed, setCollapsed, toggleCollapsed }),
    [collapsed]
  )

  return (
    <PaymentHubSidebarContext.Provider value={value}>
      {children}
    </PaymentHubSidebarContext.Provider>
  )
}

export function usePaymentHubSidebar() {
  const ctx = useContext(PaymentHubSidebarContext)
  if (!ctx) {
    throw new Error(
      "usePaymentHubSidebar must be used within PaymentHubSidebarProvider"
    )
  }
  return ctx
}
