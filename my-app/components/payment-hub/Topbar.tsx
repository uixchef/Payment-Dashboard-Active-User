"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Phone,
  Megaphone,
  HelpCircle,
  Bell,
  ChevronDown,
  Plus,
  FileText,
  Repeat2,
  Link2,
  Package,
  BarChart3,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const primaryTabs = [
  { id: "overview", label: "Overview" },
  { id: "invoices", label: "Invoices & estimates" },
  { id: "docs", label: "Docs & contracts" },
  { id: "subscriptions", label: "Subscriptions" },
  { id: "products", label: "Products" },
  { id: "integrations", label: "Integrations" },
] as const

/** Figma node 205:126700 — Create new dropdown */
const createNewMenuItems: {
  label: string
  description: string
  icon: LucideIcon
}[] = [
  {
    label: "Invoice",
    description: "Create a professional invoice for services or products.",
    icon: FileText,
  },
  {
    label: "Subscription",
    description: "Set up recurring billing for services.",
    icon: Repeat2,
  },
  {
    label: "Payment link",
    description: "Generate a shareable payment link for quick sales.",
    icon: Link2,
  },
  {
    label: "Product",
    description: "Add a new product to your ecommerce store.",
    icon: Package,
  },
  {
    label: "Estimate",
    description: "Generate a project estimate or quote.",
    icon: BarChart3,
  },
]

export function Topbar() {
  return (
    <header className="w-full min-w-0 border-b border-[#d0d5dd] bg-white">
      <div className="flex w-full min-w-0 flex-col gap-0">
        {/* Row 1 — Figma Primary Header (node 441:16538) */}
        <div className="relative border-b border-[#d0d5dd] bg-white">
          <div className="flex w-full flex-col gap-3 px-4 py-2 md:h-10 md:flex-row md:items-stretch md:justify-between md:gap-12 md:py-0">
            <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-3">
              <h1 className="shrink-0 text-xl font-semibold leading-[30px] tracking-normal text-[#101828]">
                Payments
              </h1>
              <nav
                className="flex min-h-0 min-w-0 flex-1 items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                aria-label="Payments sections"
              >
                {primaryTabs.map((tab) => {
                  const isActive = tab.id === "overview"
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      className={cn(
                        "inline-flex h-10 shrink-0 items-center border-b-2 px-2 text-base leading-6 transition-colors",
                        isActive
                          ? "border-[#004eeb] font-semibold text-[#004eeb]"
                          : "border-transparent font-medium text-[#667085] hover:text-[#101828]"
                      )}
                    >
                      <span className="whitespace-nowrap">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="flex h-full shrink-0 items-center gap-3">
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-lg p-1.5 hover:bg-slate-50"
                aria-label="Phone"
              >
                <span className="relative flex size-5 items-center justify-center rounded-full bg-[#34d399]">
                  <Phone className="size-3 text-white" strokeWidth={2} />
                </span>
              </button>
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-lg p-1.5 text-[#667085] hover:bg-slate-50 hover:text-[#101828]"
                aria-label="Announcements"
              >
                <Megaphone className="size-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-lg p-1.5 text-[#667085] hover:bg-slate-50 hover:text-[#101828]"
                aria-label="Help"
              >
                <HelpCircle className="size-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                className="relative flex size-8 items-center justify-center rounded-lg p-1.5 text-[#667085] hover:bg-slate-50 hover:text-[#101828]"
                aria-label="Notifications"
              >
                <Bell className="size-5" strokeWidth={2} />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#f56565]" />
              </button>
              <div
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#d9d6fe] text-sm font-medium leading-5 text-[#475467]"
                aria-hidden
              >
                SG
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 — Figma Header (node 441:16611) */}
        <div className="flex w-full flex-col gap-3 bg-white px-4 py-2 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <h2 className="text-base font-semibold leading-6 tracking-normal text-[#101828]">
              Payment dashboard
            </h2>
            <p className="text-sm font-normal leading-5 text-[#475467]">
              Monitor performance, manage transactions, and grow your business.
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="shrink-0 gap-2 rounded border border-[#155eef] bg-[#155eef] px-2.5 py-1.5 text-base font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#155eef]/90"
              >
                <Plus className="size-4 shrink-0" strokeWidth={2.5} />
                Create new
                <ChevronDown className="size-4 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[min(100vw-2rem,28rem)] rounded border border-[#d0d5dd] bg-white p-1 text-[#101828] shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.1),0px_2px_4px_-2px_rgba(16,24,40,0.06)]"
            >
              {createNewMenuItems.map(({ label, description, icon: Icon }) => (
                <DropdownMenuItem
                  key={label}
                  className="cursor-pointer items-start gap-2 rounded-sm px-4 py-2 text-left focus:bg-slate-50 data-[highlighted]:bg-slate-50"
                >
                  <span className="flex shrink-0 items-center justify-center py-1">
                    <Icon
                      className="size-4 text-[#475467]"
                      strokeWidth={2}
                      aria-hidden
                    />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-base font-medium leading-6 text-[#101828]">
                      {label}
                    </span>
                    <span className="text-sm font-normal leading-5 text-[#475467]">
                      {description}
                    </span>
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
