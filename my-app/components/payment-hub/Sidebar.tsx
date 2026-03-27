"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const ICON = "/icons/sidebar"

const navGroupBeforePayments = [
  { label: "Launchpad", file: "arrow-circle-up.svg" },
  { label: "Dashboard", file: "layout-alt-04.svg" },
  { label: "Conversations", file: "message-circle-02.svg" },
  { label: "Calendars", file: "calendar.svg" },
  { label: "Contacts", file: "user-square.svg" },
  { label: "Opportunities", file: "custom-opportunities.svg" },
  { label: "Payments", file: "credit-card-02.svg" },
]

const navGroupAfterPayments = [
  { label: "Marketing", file: "send-03.svg" },
  { label: "Automation", file: "repeat-03.svg" },
  { label: "Sites", file: "globe-06.svg" },
  { label: "Memberships", file: "memberships.svg" },
  { label: "Media storage", file: "photo_size_select_actual.svg" },
  { label: "Reputation", file: "star-01.svg" },
  { label: "Reporting", file: "line-chart-up-02.svg" },
  { label: "App marketplace", file: "grid-01.svg" },
  { label: "Mobile App", file: "tablet_mac.svg" },
]

function SidebarNavIcon({ file, active }: { file: string; active?: boolean }) {
  return (
    <Image
      src={`${ICON}/${file}`}
      alt=""
      width={24}
      height={24}
      unoptimized
      className={cn(
        "size-6 shrink-0 object-contain",
        active && "brightness-0 invert"
      )}
      aria-hidden
    />
  )
}

function NavRow({
  label,
  iconFile,
  active,
  collapsed,
}: {
  label: string
  iconFile: string
  active?: boolean
  collapsed: boolean
}) {
  return (
    <Link
      href="#"
      title={collapsed ? label : undefined}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg text-base font-medium leading-6 transition-colors",
        collapsed ? "h-10 shrink-0 justify-center p-2" : "p-2",
        active
          ? "bg-[#1d2939] text-white"
          : "text-[#d0d5dd] hover:bg-white/5 hover:text-white"
      )}
    >
      <SidebarNavIcon file={iconFile} active={active} />
      {collapsed ? (
        <span className="sr-only">{label}</span>
      ) : (
        <span className="min-w-0 flex-1 truncate">{label}</span>
      )}
    </Link>
  )
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setCollapsed(true)
    }
  }, [])

  return (
    <aside
      className={cn(
        "relative shrink-0 overflow-visible transition-[width] duration-200 ease-out",
        collapsed ? "w-[56px] max-w-[56px]" : "w-[280px] max-w-[280px]"
      )}
    >
      <div
        className={cn(
          "flex h-screen flex-col gap-5 bg-[#101828] px-2 py-4 text-[#d0d5dd]",
          collapsed && "items-center"
        )}
      >
        <div
          className={cn(
            "flex min-h-0 flex-1 flex-col gap-4",
            collapsed && "w-full items-center"
          )}
        >
          {/* Logo + subaccount */}
          <div
            className={cn(
              "flex shrink-0 flex-col gap-2",
              collapsed && "w-full items-center"
            )}
          >
            <div
              className={cn(
                "flex h-10 items-center justify-center",
                collapsed ? "w-full max-w-[40px]" : "w-full"
              )}
            >
              <Image
                src="/payment-hub-logo.png"
                alt="Brand logo"
                width={160}
                height={40}
                className={cn(
                  "h-10 w-auto max-w-full object-contain object-center",
                  collapsed && "max-h-10"
                )}
                priority
              />
            </div>

            {collapsed ? (
              <button
                type="button"
                className="flex w-full max-w-[40px] items-center justify-center rounded-lg bg-[#344054] p-2 hover:bg-[#344054]/90"
                aria-label="Switch subaccount"
              >
                <Image
                  src={`${ICON}/chevron-right.svg`}
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                  className="size-4 shrink-0"
                  aria-hidden
                />
              </button>
            ) : (
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg bg-[#344054] p-2 text-left text-sm font-medium text-white/90 hover:bg-[#344054]/90"
              >
                <span className="min-w-0 flex-1 truncate opacity-[0.71]">
                  Headquarters 1800-PLUMBER-200..
                </span>
                <Image
                  src={`${ICON}/chevron-right.svg`}
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                  className="size-4 shrink-0"
                  aria-hidden
                />
              </button>
            )}
          </div>

          {/* Search + quick action */}
          {collapsed ? (
            <div className="flex w-full flex-col gap-2">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-lg border border-[#344054] p-1 hover:bg-white/5"
                aria-label="Search"
              >
                <Image
                  src={`${ICON}/search-md.svg`}
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                  className="size-4 shrink-0"
                  aria-hidden
                />
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-lg bg-[#344054] px-[11px] py-1.5 hover:bg-[#3d4a5f]"
                aria-label="Quick actions"
              >
                <Image
                  src={`${ICON}/icon_quickact.svg`}
                  alt=""
                  width={20}
                  height={20}
                  unoptimized
                  className="size-5"
                  aria-hidden
                />
              </button>
            </div>
          ) : (
            <div className="flex shrink-0 gap-2">
              <div className="flex min-h-9 min-w-0 flex-1 items-center justify-between rounded-lg border border-[#344054] py-1 pl-2 pr-1">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <Image
                    src={`${ICON}/search-md.svg`}
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                    className="size-4 shrink-0"
                    aria-hidden
                  />
                  <Input
                    type="search"
                    placeholder="Search"
                    className="h-auto min-w-0 flex-1 border-0 bg-transparent p-0 text-base leading-6 text-white placeholder:text-[#98a2b3] focus-visible:ring-0"
                  />
                </div>
                <kbd className="shrink-0 rounded border border-[#344054] bg-[#344054] px-1 py-0.5 text-xs font-normal leading-5 text-[#d0d5dd]">
                  ⌘K
                </kbd>
              </div>
              <button
                type="button"
                className="flex shrink-0 items-center justify-center rounded-lg bg-[#344054] px-[11px] py-1.5 hover:bg-[#3d4a5f]"
                aria-label="Quick actions"
              >
                <Image
                  src={`${ICON}/icon_quickact.svg`}
                  alt=""
                  width={20}
                  height={20}
                  unoptimized
                  className="size-5"
                  aria-hidden
                />
              </button>
            </div>
          )}

          {/* Scrollable nav */}
          <nav
            className={cn(
              "flex min-h-0 w-full flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden",
              collapsed && "items-center"
            )}
          >
            <div
              className={cn(
                "flex w-full flex-col gap-1",
                collapsed && "items-center"
              )}
            >
              {navGroupBeforePayments.map((item) => (
                <NavRow
                  key={item.label}
                  label={item.label}
                  iconFile={item.file}
                  active={item.label === "Payments"}
                  collapsed={collapsed}
                />
              ))}
            </div>

            <Separator
              className={cn(
                "bg-[#eaecf0]",
                collapsed && "h-px w-10 shrink-0 self-center"
              )}
            />

            <div
              className={cn(
                "flex w-full flex-col gap-1",
                collapsed && "items-center"
              )}
            >
              {navGroupAfterPayments.map((item) => (
                <NavRow
                  key={item.label}
                  label={item.label}
                  iconFile={item.file}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </nav>
        </div>

        {/* Settings + bottom divider */}
        <div
          className={cn(
            "flex shrink-0 flex-col gap-2",
            collapsed && "w-full items-center"
          )}
        >
          <Separator
            className={cn(
              "bg-[#eaecf0]",
              collapsed ? "h-px w-10 self-center" : "w-full"
            )}
          />
          <NavRow
            label="Settings"
            iconFile="settings-01.svg"
            collapsed={collapsed}
          />
        </div>
      </div>

      {/* Toggle: Figma collapsed = chevron-right (expand); expanded = chevron-left (collapse) */}
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute bottom-6 -right-3 border-0 bg-transparent p-0 shadow-none hover:opacity-90"
      >
        <Image
          src={`${ICON}/chevron-left.svg`}
          alt=""
          width={30}
          height={30}
          unoptimized
          className={cn(
            "block size-[30px] transition-transform duration-200",
            collapsed && "rotate-180"
          )}
        />
      </button>
    </aside>
  )
}
