import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import {
  AlertCircle,
  DollarSign,
  FileText,
  Info,
  Repeat,
  RefreshCw,
  Users,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type IconTone = "success" | "warning" | "error"

const toneIconBg: Record<IconTone, string> = {
  success: "bg-[#d1fadf]",
  warning: "bg-[#fef0c7]",
  error: "bg-[#fee4e2]",
}

/** Icon stroke color per pill (matches Figma semantic tones) */
const toneIconColor: Record<IconTone, string> = {
  success: "text-[#027a48]",
  warning: "text-[#b54708]",
  error: "text-[#b42318]",
}

const STAT_META: Record<
  string,
  {
    icon: LucideIcon
    tone: IconTone
    showInfo?: boolean
    /** Figma 583:44967 — tooltip on info hover */
    tooltip?: string
  }
> = {
  "Total revenue": { icon: DollarSign, tone: "success" },
  "Recurring revenue": { icon: Repeat, tone: "success" },
  "Outstanding invoices": { icon: FileText, tone: "warning" },
  "Ongoing subscriptions": {
    icon: RefreshCw,
    tone: "success",
    showInfo: true,
    tooltip:
      "Includes subscriptions in the following states - active, unpaid, overdue, trialing.",
  },
  "Failed transactions": { icon: AlertCircle, tone: "error" },
  "New customers": { icon: Users, tone: "success" },
}

type StatCardProps = {
  title: string
  value: string
  change: string
  isPositive: boolean
}

function parseChangeDisplay(change: string) {
  return change.replace(/^[+-]/, "").trim()
}

export function StatCard({ title, value, change, isPositive }: StatCardProps) {
  const meta = STAT_META[title] ?? {
    icon: DollarSign,
    tone: "success" as const,
  }
  const Icon = meta.icon
  const percent = parseChangeDisplay(change)

  return (
    <div
      className={cn(
        "flex min-h-[174px] w-full flex-col justify-center overflow-hidden rounded border border-[#d0d5dd] bg-white p-4",
        "shadow-[0_1px_3px_rgba(16,24,40,0.1),0_1px_2px_rgba(16,24,40,0.06)]"
      )}
    >
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-2">
            <div
              className={cn(
                "relative flex size-8 shrink-0 items-center justify-center rounded-2xl",
                toneIconBg[meta.tone]
              )}
            >
              <Icon
                className={cn("size-[18px]", toneIconColor[meta.tone])}
                strokeWidth={2}
                aria-hidden
              />
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <h3 className="text-base font-semibold leading-6 tracking-normal text-[#101828]">
                {title}
              </h3>
              {meta.showInfo && meta.tooltip ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex text-[#101828] hover:text-[#101828]/80"
                        aria-label={`About ${title}`}
                      >
                        <Info className="size-[18px]" strokeWidth={2} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">{meta.tooltip}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : meta.showInfo ? (
                <button
                  type="button"
                  className="inline-flex text-[#101828] hover:text-[#101828]/80"
                  aria-label={`About ${title}`}
                >
                  <Info className="size-[18px]" strokeWidth={2} />
                </button>
              ) : null}
            </div>
          </div>
          <p className="min-w-0 text-[30px] font-semibold leading-[38px] tracking-normal text-[#101828]">
            {value}
          </p>
        </div>

        <div className="flex w-full items-center gap-2">
          {isPositive ? (
            <span className="inline-flex h-7 max-h-7 min-h-7 shrink-0 items-center justify-center gap-0.5 rounded-full border border-[#039855] bg-white px-2 text-sm font-medium leading-5 text-[#027a48]">
              <Image
                src="/icons/stat-trends/triangle-up.svg"
                alt=""
                width={18}
                height={18}
                unoptimized
                className="size-[18px] shrink-0"
                aria-hidden
              />
              {percent}
            </span>
          ) : (
            <span className="inline-flex h-7 max-h-7 min-h-7 shrink-0 items-center justify-center gap-0.5 rounded-full border border-[#d92d20] bg-white px-2 text-sm font-medium leading-5 text-[#b42318]">
              <Image
                src="/icons/stat-trends/triangle-down.svg"
                alt=""
                width={18}
                height={18}
                unoptimized
                className="size-[18px] shrink-0"
                aria-hidden
              />
              {percent}
            </span>
          )}
          <p className="min-w-0 flex-1 text-base font-medium leading-6 text-[#475467]">
            vs last month
          </p>
        </div>
      </div>
    </div>
  )
}
