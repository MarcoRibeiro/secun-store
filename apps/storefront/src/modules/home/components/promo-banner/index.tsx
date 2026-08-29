import { ArrowRight } from "@medusajs/icons"

import { getStorefrontContent } from "@lib/content/storefront"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function PromoBanner() {
  const content = getStorefrontContent()

  return (
    <section className="content-container py-8">
      <div className="relative overflow-hidden border border-slate-200 bg-white px-6 py-14 shadow-sm small:px-12">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(14,165,233,0.12),transparent_45%),radial-gradient(circle_at_90%_10%,rgba(56,189,248,0.14),transparent_28%)]" />
        <div className="relative flex flex-col justify-between gap-8 small:flex-row small:items-center">
          <div>
            <p className="text-small-semi uppercase tracking-[0.16em] text-sky-600">
              {content.home.promoEyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl-regular text-slate-950">
              {content.home.promoTitle}
            </h2>
          </div>
          <LocalizedClientLink
            href="/store"
            className="inline-flex w-max items-center gap-2 rounded-md border border-sky-500 px-5 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-500 hover:text-white"
          >
            {content.home.promoCta} <ArrowRight />
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}
