"use client"

import { Calendar } from "lucide-react"
import { useMemo, useState } from "react"

import { DateRangePickerMenu } from "@/components/payment-hub/date-range-picker-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  formatPresetRangeLabel,
  type DateRangePresetId,
} from "@/lib/date-range-presets"
import { cn } from "@/lib/utils"

/** Figma 583:75132 trigger; dropdown panel Figma 441:17862. */
const PRESETS: { value: DateRangePresetId; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "last-7-days", label: "Last 7 days" },
  { value: "last-30-days", label: "Last 30 days" },
  { value: "this-month", label: "This month" },
  { value: "last-month", label: "Last month" },
  { value: "custom", label: "Custom" },
]

/** Figma 441:17862 list; 441:18035 selected row (#eff4ff + primary check) */
const dateRangeItemClassName =
  "cursor-pointer text-base font-medium leading-6 tracking-normal data-[highlighted]:bg-[#f2f4f7] data-[state=checked]:bg-[#eff4ff] data-[state=checked]:data-[highlighted]:bg-[#eff4ff]"

/** MM/DD/YYYY for custom range trigger labels */
const usMdY: Intl.DateTimeFormatOptions = {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
}

function formatIsoDateLabel(iso: string): string {
  if (!iso) return ""
  const d = new Date(`${iso}T12:00:00`)
  return d.toLocaleDateString("en-US", usMdY)
}

/** Parity with Vue `HLDatePicker type="daterange"` placeholders (HighRise is Vue-only in-repo). */
const DATE_RANGE_PLACEHOLDERS = ["Start date", "End date"] as const

/** Figma 583:75240 + 1048:13998 — custom preset + picker menu on field click. */
export function DateRangePresetField() {
  const [preset, setPreset] = useState<DateRangePresetId>("last-month")
  const [customStartIso, setCustomStartIso] = useState("")
  const [customEndIso, setCustomEndIso] = useState("")
  const [pickerOpen, setPickerOpen] = useState(false)

  const rangeLabel = useMemo(
    () => formatPresetRangeLabel(preset),
    [preset]
  )

  return (
    <div className="flex flex-wrap items-center gap-[12px]">
      <div className="w-[140px] shrink-0">
        <Select
          value={preset}
          onValueChange={(v) => setPreset(v as DateRangePresetId)}
        >
          <SelectTrigger
            size="dateRange"
            className="w-[140px]"
            aria-label="Date range preset"
          >
            <SelectValue placeholder="Last month" />
          </SelectTrigger>
          <SelectContent
            align="start"
            position="popper"
            className="min-w-[200px] rounded-[4px] border border-[#d0d5dd] bg-white p-0 shadow-[0px_4px_8px_-2px_rgba(16,24,40,0.1),0px_2px_4px_-2px_rgba(16,24,40,0.06)] data-[state=open]:animate-in data-[state=closed]:animate-out"
          >
            {PRESETS.map((p) => (
              <SelectItem
                key={p.value}
                value={p.value}
                className={dateRangeItemClassName}
              >
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {preset === "custom" ? (
        <div
          className="flex min-w-0 shrink-0 items-stretch gap-2"
          data-date-range-picker="true"
        >
          <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex h-9 w-[300px] min-w-0 cursor-pointer flex-row overflow-hidden rounded-[4px] border border-[#d0d5dd] bg-white text-left shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] divide-x divide-[#d0d5dd] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004eeb]"
                aria-expanded={pickerOpen}
                aria-haspopup="dialog"
                aria-label="Custom date range"
              >
                <span className="flex min-w-0 flex-1 items-center gap-1 px-2">
                  <Calendar
                    className="size-4 shrink-0 text-[#475467]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span
                    className={cn(
                      "truncate text-base font-normal leading-6",
                      customStartIso ? "text-[#101828]" : "text-[#475467]"
                    )}
                  >
                    {customStartIso
                      ? formatIsoDateLabel(customStartIso)
                      : DATE_RANGE_PLACEHOLDERS[0]}
                  </span>
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-1 px-2">
                  <Calendar
                    className="size-4 shrink-0 text-[#475467]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span
                    className={cn(
                      "truncate text-base font-normal leading-6",
                      customEndIso ? "text-[#101828]" : "text-[#475467]"
                    )}
                  >
                    {customEndIso
                      ? formatIsoDateLabel(customEndIso)
                      : DATE_RANGE_PLACEHOLDERS[1]}
                  </span>
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-2">
              <DateRangePickerMenu
                open={pickerOpen}
                committedStartIso={customStartIso}
                committedEndIso={customEndIso}
                onApply={(startIso, endIso) => {
                  setCustomStartIso(startIso)
                  setCustomEndIso(endIso)
                  setPickerOpen(false)
                }}
                onCancel={() => setPickerOpen(false)}
              />
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <p className="text-base font-normal leading-6 text-[#101828]">
          {rangeLabel}
        </p>
      )}
    </div>
  )
}
