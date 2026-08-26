import { ArrowRight } from "@medusajs/icons"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function PromoBanner() {
  return (
    <section className="content-container py-8">
      <div className="relative overflow-hidden border border-sky-400/20 bg-slate-900 px-6 py-14 small:px-12">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(14,165,233,0.18),transparent_45%),radial-gradient(circle_at_90%_10%,rgba(56,189,248,0.18),transparent_28%)]" />
        <div className="relative flex flex-col justify-between gap-8 small:flex-row small:items-center">
          <div>
            <p className="text-small-semi uppercase tracking-[0.16em] text-sky-300">
              New drop
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl-regular text-white">
              Refined essentials with a sharper visual edge.
            </h2>
          </div>
          <LocalizedClientLink
            href="/store"
            className="inline-flex w-max items-center gap-2 rounded-md border border-sky-400 px-5 py-3 text-sm font-semibold text-sky-200 transition hover:bg-sky-400 hover:text-slate-950"
          >
            Shop the edit <ArrowRight />
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
