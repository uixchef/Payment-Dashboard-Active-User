"use client"

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

const WEEK_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const

function toIsoDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

function parseIso(s: string): Date {
  return new Date(`${s}T12:00:00`)
}

type YearMonth = { y: number; m: number }

function addMonths(ym: YearMonth, delta: number): YearMonth {
  const d = new Date(ym.y, ym.m + delta, 1)
  return { y: d.getFullYear(), m: d.getMonth() }
}

function getCalendarCells(year: number, month: number): { date: Date; inMonth: boolean }[] {
  const first = new Date(year, month, 1)
  const startPadding = first.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: { date: Date; inMonth: boolean }[] = []
  const prevLast = new Date(year, month, 0).getDate()
  for (let i = startPadding - 1; i >= 0; i--) {
    cells.push({
      date: new Date(year, month - 1, prevLast - i),
      inMonth: false,
    })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true })
  }
  let n = 1
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, n++), inMonth: false })
  }
  return cells.slice(0, 42)
}

function rangeBounds(
  a: string | null,
  b: string | null
): { lo: string; hi: string } | null {
  if (!a || !b) return null
  return a <= b ? { lo: a, hi: b } : { lo: b, hi: a }
}

function isToday(d: Date): boolean {
  const t = new Date()
  return (
    d.getFullYear() === t.getFullYear() &&
    d.getMonth() === t.getMonth() &&
    d.getDate() === t.getDate()
  )
}

type DateRangePickerMenuProps = {
  open: boolean
  committedStartIso: string
  committedEndIso: string
  onApply: (startIso: string, endIso: string) => void
  onCancel: () => void
}

/** Figma 1048:13998 — dual-month picker menu + footer Cancel / Confirm */
export function DateRangePickerMenu({
  open,
  committedStartIso,
  committedEndIso,
  onApply,
  onCancel,
}: DateRangePickerMenuProps) {
  const [draftStart, setDraftStart] = useState<string | null>(null)
  const [draftEnd, setDraftEnd] = useState<string | null>(null)
  const [leftMonth, setLeftMonth] = useState<YearMonth>(() => {
    const n = new Date()
    return { y: n.getFullYear(), m: n.getMonth() }
  })

  const syncFromCommitted = useCallback(() => {
    setDraftStart(committedStartIso || null)
    setDraftEnd(committedEndIso || null)
    if (committedStartIso) {
      const d = parseIso(committedStartIso)
      setLeftMonth({ y: d.getFullYear(), m: d.getMonth() })
    } else {
      const n = new Date()
      setLeftMonth({ y: n.getFullYear(), m: n.getMonth() })
    }
  }, [committedStartIso, committedEndIso])

  useEffect(() => {
    if (open) syncFromCommitted()
  }, [open, syncFromCommitted])

  const rightMonth = addMonths(leftMonth, 1)

  const handleDayClick = (iso: string) => {
    if (!draftStart || (draftStart && draftEnd)) {
      setDraftStart(iso)
      setDraftEnd(null)
      return
    }
    if (iso < draftStart) {
      setDraftEnd(draftStart)
      setDraftStart(iso)
    } else {
      setDraftEnd(iso)
    }
  }

  const handleConfirm = () => {
    if (!draftStart) {
      onCancel()
      return
    }
    const end = draftEnd ?? draftStart
    const lo = draftStart <= end ? draftStart : end
    const hi = draftStart <= end ? end : draftStart
    onApply(lo, hi)
  }

  return (
    <div className="flex w-[min(100vw-2rem,580px)] flex-col gap-2">
      <div className="flex gap-2">
        <MonthGrid
          className="border-r border-[#e0e2e9] pr-3"
          year={leftMonth.y}
          month={leftMonth.m}
          draftStart={draftStart}
          draftEnd={draftEnd}
          onDayClick={handleDayClick}
          onPrevYear={() => setLeftMonth((m) => addMonths(m, -12))}
          onPrevMonth={() => setLeftMonth((m) => addMonths(m, -1))}
          onNextMonth={() => setLeftMonth((m) => addMonths(m, 1))}
          onNextYear={() => setLeftMonth((m) => addMonths(m, 12))}
        />
        <MonthGrid
          className="pl-3"
          year={rightMonth.y}
          month={rightMonth.m}
          draftStart={draftStart}
          draftEnd={draftEnd}
          onDayClick={handleDayClick}
          onPrevYear={() => setLeftMonth((m) => addMonths(m, -12))}
          onPrevMonth={() => setLeftMonth((m) => addMonths(m, -1))}
          onNextMonth={() => setLeftMonth((m) => addMonths(m, 1))}
          onNextYear={() => setLeftMonth((m) => addMonths(m, 12))}
        />
      </div>
      <div className="flex justify-end gap-1 border-t border-[#f2f4f7] pt-2">
        <button
          type="button"
          className="inline-flex h-7 shrink-0 items-center justify-center rounded-[4px] border border-[#d0d5dd] bg-white px-2 text-[14px] font-semibold leading-[20px] text-[#475467] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#f9fafb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004eeb]"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="inline-flex h-7 shrink-0 items-center justify-center rounded-[4px] border border-[#155eef] bg-[#155eef] px-2 text-sm font-semibold leading-5 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#155eef]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004eeb]"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

type MonthGridProps = {
  className?: string
  year: number
  month: number
  draftStart: string | null
  draftEnd: string | null
  onDayClick: (iso: string) => void
  onPrevYear: () => void
  onPrevMonth: () => void
  onNextMonth: () => void
  onNextYear: () => void
}

function MonthGrid({
  className,
  year,
  month,
  draftStart,
  draftEnd,
  onDayClick,
  onPrevYear,
  onPrevMonth,
  onNextMonth,
  onNextYear,
}: MonthGridProps) {
  const cells = getCalendarCells(year, month)
  const monthLabel = new Date(year, month, 1).toLocaleString("en-US", {
    month: "short",
  })
  const rb = rangeBounds(draftStart, draftEnd)
  const single = Boolean(draftStart && !draftEnd)

  return (
    <div
      className={cn(
        "flex w-[276px] shrink-0 flex-col gap-2",
        className
      )}
    >
      <div className="flex w-full items-center justify-between gap-1">
        <div className="flex items-center">
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-[4px] p-1 text-[#101828] hover:bg-[#f2f4f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004eeb]"
            aria-label="Previous year"
            onClick={onPrevYear}
          >
            <ChevronsLeft className="size-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-[4px] p-1 text-[#101828] hover:bg-[#f2f4f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004eeb]"
            aria-label="Previous month"
            onClick={onPrevMonth}
          >
            <ChevronLeft className="size-4" strokeWidth={2} />
          </button>
        </div>
        <div className="flex items-center gap-0.5">
          <span className="rounded px-1 text-base font-semibold leading-6 text-[#1d2939]">
            {monthLabel}
          </span>
          <span className="rounded px-1 text-base font-semibold leading-6 text-[#1d2939]">
            {year}
          </span>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-[4px] p-1 text-[#101828] hover:bg-[#f2f4f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004eeb]"
            aria-label="Next month"
            onClick={onNextMonth}
          >
            <ChevronRight className="size-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-[4px] p-1 text-[#101828] hover:bg-[#f2f4f7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004eeb]"
            aria-label="Next year"
            onClick={onNextYear}
          >
            <ChevronsRight className="size-4" strokeWidth={2} />
          </button>
        </div>
      </div>
      <div className="grid w-full grid-cols-7 gap-x-4 border-b border-[#f2f4f7] py-2">
        {WEEK_LABELS.map((d) => (
          <div
            key={d}
            className="flex size-6 items-center justify-center text-sm font-semibold leading-5 text-[#98a2b3]"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid w-full grid-cols-7 gap-x-4 gap-y-2">
        {cells.map(({ date, inMonth }, i) => {
          const iso = toIsoDate(date)
          const inRange = Boolean(
            rb && iso >= rb.lo && iso <= rb.hi
          )
          const isStart =
            Boolean(draftStart && draftEnd && rb && iso === rb.lo)
          const isEnd =
            Boolean(draftStart && draftEnd && rb && iso === rb.hi)
          const isOnlyStart = single && iso === draftStart
          const showRangeFill = inRange && !isStart && !isEnd
          const showToday = isToday(date)
          const highlighted = isStart || isEnd || isOnlyStart

          return (
            <button
              key={`${iso}-${i}`}
              type="button"
              disabled={!inMonth}
              className={cn(
                "relative flex size-6 items-center justify-center rounded-[4px] text-[13px] font-medium leading-[18px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004eeb]",
                !inMonth && "cursor-default text-[#d0d5dd]",
                inMonth &&
                  !showRangeFill &&
                  !highlighted &&
                  "text-[#475467] hover:bg-[#f2f4f7]",
                showRangeFill &&
                  inMonth &&
                  "bg-[#eff4ff] text-[#475467] hover:bg-[#e0eaff]",
                highlighted &&
                  "bg-[#155eef] font-medium text-white hover:bg-[#155eef] hover:text-white",
                isOnlyStart && "rounded-[4px]"
              )}
              onClick={() => inMonth && onDayClick(iso)}
              aria-label={inMonth ? iso : undefined}
              aria-hidden={!inMonth}
            >
              <span className="relative z-[1]">{date.getDate()}</span>
              {showToday && inMonth && !highlighted ? (
                <span
                  className="absolute right-0.5 top-0.5 size-1 rounded-full bg-[#155eef]"
                  aria-hidden
                />
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
