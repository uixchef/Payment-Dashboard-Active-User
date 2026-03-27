"use client"

import Image from "next/image"
import {
  Lightbulb,
  Megaphone,
  PlayCircle,
  Share2,
  X,
} from "lucide-react"
import { useState } from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

const cardShadow =
  "shadow-[0px_1px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]"

/** Figma 378:12354 — demo card copy + actions (gap 16 / gap 8, Shadow/xs on buttons). */
const demoCardButtonShadow =
  "shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"

const demoCardButtonClass =
  `flex w-full items-center justify-center gap-2 overflow-hidden rounded-[4px] border border-[#d0d5dd] bg-white px-[10px] py-[6px] text-base font-semibold leading-6 tracking-normal text-[#344054] ${demoCardButtonShadow} hover:bg-[#f9fafb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004eeb]`

type UpdateTagVariant = "success" | "primary" | "warning"

const tagStyles: Record<
  UpdateTagVariant,
  string
> = {
  success: "bg-[#ecfdf3] text-[#027a48]",
  primary: "bg-[#eff4ff] text-[#004eeb]",
  warning: "bg-[#fffaeb] text-[#b54708]",
}

/** Figma 363:8904 — full list for “View all” side panel; first 4 mirror the card preview. */
const allProductUpdates = [
  {
    title: "Enhanced abandoned cart recovery",
    description:
      "New AI-powered email sequences with 40% higher recovery rates.",
    tag: "Live now",
    variant: "success" as const,
  },
  {
    title: "Payment provider updates",
    description: "Stripe Connect now supports instant payouts to vendors.",
    tag: "Enhancement",
    variant: "primary" as const,
  },
  {
    title: "Tax calculation changes",
    description: "Updated tax rates for Q1 2025 - review your settings.",
    tag: "Action required",
    variant: "warning" as const,
  },
  {
    title: "Inventory management automation",
    description:
      "New tools for automated stock tracking and reordering.",
    tag: "Coming soon",
    variant: "success" as const,
  },
  {
    title: "User experience improvements",
    description:
      "Enhanced navigation and faster load times for mobile app.",
    tag: "Live now",
    variant: "primary" as const,
  },
  {
    title: "Referral program launch",
    description:
      "New incentives for user referrals to drive customer growth.",
    tag: "Upcoming",
    variant: "warning" as const,
  },
  {
    title: "Data privacy enhancements",
    description:
      "Stronger encryption and compliance with GDPR updates.",
    tag: "Enhancement",
    variant: "success" as const,
  },
  {
    title: "Feature request voting system",
    description:
      "Users can vote on upcoming features to prioritize development.",
    tag: "Live now",
    variant: "primary" as const,
  },
  {
    title: "Collaboration Tools Update",
    description:
      "New shared workspaces and improved commenting features",
    tag: "Coming Soon",
    variant: "warning" as const,
  },
  {
    title: "Performance Analytics Dashboard",
    description:
      "New real-time analytics for tracking key performance metrics",
    tag: "Upcoming",
    variant: "success" as const,
  },
  {
    title: "Mobile App Redesign",
    description:
      "A refreshed look and feel for a more intuitive user experience",
    tag: "Coming Soon",
    variant: "success" as const,
  },
  {
    title: "Customer Feedback Integration",
    description:
      "New system for incorporating user feedback into product development",
    tag: "Live now",
    variant: "primary" as const,
  },
] as const

const productUpdatesPreview = allProductUpdates.slice(0, 4)

/** Figma 571:16104 — play_circle_filled (white disk + play glyph); not the Lucide outline. */
function PaymentsDemoOverlayPlayIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" fill="white" />
      <path
        d="M10 8.5L16 12L10 15.5z"
        fill="#101828"
        fillOpacity={0.9}
      />
    </svg>
  )
}

const tips = [
  {
    title: "Automate follow-ups",
    description:
      "Set up workflows to automatically send payment reminders and follow-up sequences.",
    cta: "Create workflow",
  },
  {
    title: "Smart payment links",
    description:
      "Use conditional logic in workflows to send personalized payment links based on customer behavior.",
    cta: "Setup smart links",
  },
  {
    title: "Revenue optimization",
    description:
      "Connect payment events to workflows for upselling, cross-selling, and retention campaigns.",
    cta: "Optimize revenue",
  },
  {
    title: "Customer insights",
    description:
      "Analyze payment data trends to identify customer preferences and improve service offerings.",
    cta: "Generate insights",
  },
] as const

/**
 * Figma 378:12346 — Demo video + Product updates + Tips (three-column canvas block).
 * “View all” opens Figma 363:8900 — Products updates side panel.
 */
export function PaymentsHubInsightsSection() {
  const [updatesPanelOpen, setUpdatesPanelOpen] = useState(false)

  return (
    <>
    <section
      className="flex w-full flex-col gap-4 lg:flex-row lg:items-stretch"
      aria-label="Payments demo, updates, and tips"
    >
      {/* Demo video */}
      <div
        className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[4px] bg-[#f2f4f7] ${cardShadow}`}
      >
        <div className="relative h-[190px] w-full shrink-0 overflow-hidden bg-white">
          <Image
            alt=""
            className="object-cover"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=720&q=80"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            priority={false}
          />
          <div
            className="absolute inset-0 bg-[rgba(18,18,18,0.5)]"
            aria-hidden
          />
          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Play demo video"
          >
            <PaymentsDemoOverlayPlayIcon className="size-16 drop-shadow-md" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 h-full w-full flex-col items-start gap-4 p-6">
          <div className="flex w-full shrink-0 flex-col items-start">
            <div className="flex w-full flex-col gap-2">
              <h3 className="w-full text-[24px] font-semibold leading-8 tracking-normal text-[#101828]">
                Watch how to configure payments easily
              </h3>
              <p className="w-full text-sm font-normal leading-5 tracking-normal text-[#475467]">
                Set up once and go. We&apos;ll show you how to configure
                payments, route approvals, and launch faster so you can focus
                on revenue, not admin.
              </p>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-2">
            <button type="button" className={demoCardButtonClass}>
              <PlayCircle
                className="size-4 shrink-0"
                strokeWidth={2}
                aria-hidden
              />
              <span className="shrink-0 whitespace-nowrap">
                Watch the 3-minute demo
              </span>
            </button>
            <button type="button" className={demoCardButtonClass}>
              <Share2 className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              <span className="shrink-0 whitespace-nowrap">
                Read documentation
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Product updates */}
      <div
        className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[4px] border border-[#d0d5dd] bg-white ${cardShadow} lg:h-[486px] lg:max-h-[486px]`}
      >
        <header className="flex shrink-0 items-center justify-between gap-6 px-4 pb-0.5 pt-4">
          <div className="flex min-w-0 items-center gap-2">
            <Megaphone
              className="size-5 shrink-0 text-[#101828]"
              strokeWidth={2}
              aria-hidden
            />
            <h2 className="text-base font-semibold leading-6 text-[#101828]">
              Product updates
            </h2>
          </div>
          <button
            type="button"
            className="shrink-0 text-base font-medium leading-6 text-[#004eeb] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004eeb]"
            onClick={() => setUpdatesPanelOpen(true)}
          >
            View all
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <ul className="divide-y divide-[#eaecf0]">
            {productUpdatesPreview.map((item) => (
              <li key={item.title} className="px-4 py-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-col gap-px">
                    <p className="text-base font-medium leading-6 text-[#101828]">
                      {item.title}
                    </p>
                    <p className="text-sm font-normal leading-5 text-[#475467]">
                      {item.description}
                    </p>
                  </div>
                  <span
                    className={`inline-flex h-6 w-fit items-center rounded px-2 text-sm font-medium leading-5 ${tagStyles[item.variant]}`}
                  >
                    {item.tag}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tips */}
      <div
        className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[4px] border border-[#d0d5dd] bg-white ${cardShadow} lg:h-[486px] lg:max-h-[486px]`}
      >
        <header className="flex shrink-0 items-center gap-2 px-4 pb-0.5 pt-4">
          <Lightbulb
            className="size-5 shrink-0 text-[#101828]"
            strokeWidth={2}
            aria-hidden
          />
          <h2 className="text-base font-semibold leading-6 text-[#101828]">
            Tips to maximize your payments
          </h2>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <ul className="divide-y divide-[#eaecf0]">
            {tips.map((item) => (
              <li key={item.title} className="px-4 py-4">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-px">
                    <p className="text-base font-medium leading-6 text-[#101828]">
                      {item.title}
                    </p>
                    <p className="text-sm font-normal leading-5 text-[#475467]">
                      {item.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="w-fit text-left text-base font-medium leading-6 text-[#004eeb] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004eeb]"
                  >
                    {item.cta}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <Dialog open={updatesPanelOpen} onOpenChange={setUpdatesPanelOpen}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-[rgba(16,24,40,0.7)]"
        className="fixed top-0 right-0 bottom-0 left-auto z-50 flex h-full max-h-[100dvh] w-[min(100vw,360px)] max-w-full translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 border-l border-[#f2f4f7] bg-white p-0 shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)] duration-200 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-[360px]"
      >
        <DialogDescription className="sr-only">
          Full list of product updates and release notes.
        </DialogDescription>
        <div className="flex h-full min-h-0 w-full flex-col gap-0.5 overflow-hidden py-3">
          <div className="flex shrink-0 items-center gap-6 px-4">
            <DialogTitle className="flex-1 text-base font-semibold leading-6 text-[#101828]">
              Products updates
            </DialogTitle>
            <DialogClose
              type="button"
              className="flex shrink-0 items-center justify-center rounded-sm text-[#101828] opacity-80 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-[#004eeb] focus-visible:ring-offset-2"
              aria-label="Close product updates"
            >
              <X className="size-6" strokeWidth={2} aria-hidden />
            </DialogClose>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
            <ul className="divide-y divide-[#eaecf0]">
              {allProductUpdates.map((item) => (
                <li key={item.title} className="px-4 py-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-col gap-px">
                      <p className="text-base font-medium leading-6 text-[#101828]">
                        {item.title}
                      </p>
                      <p className="text-sm font-normal leading-5 text-[#475467]">
                        {item.description}
                      </p>
                    </div>
                    <span
                      className={`inline-flex h-6 min-h-6 w-fit max-w-full items-center rounded px-2 text-sm font-medium leading-5 ${tagStyles[item.variant]}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}
