"use client"

import { ReactNode, useRef } from "react"
import { ArrowLeft, ArrowRight } from "@medusajs/icons"

export default function CarouselShell({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (direction: "left" | "right") => {
    const scroller = scrollerRef.current

    if (!scroller) {
      return
    }

    scroller.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    })
  }

  return (
    <section className="content-container overflow-hidden py-14 small:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-small-semi uppercase tracking-[0.16em] text-sky-300">
            Products
          </p>
          <h2 className="mt-2 text-3xl-regular text-white">{title}</h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous products"
            title="Previous products"
            onClick={() => scrollBy("left")}
            className="grid h-10 w-10 place-items-center rounded-md border border-slate-700 text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            aria-label="Next products"
            title="Next products"
            onClick={() => scrollBy("right")}
            className="grid h-10 w-10 place-items-center rounded-md border border-slate-700 text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
      >
        {children}
      </div>
    </section>
  )
}
