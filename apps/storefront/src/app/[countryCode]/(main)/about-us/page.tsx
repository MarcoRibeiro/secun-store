import { Metadata } from "next"

import { getStorefrontContent } from "@lib/content/storefront"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const content = getStorefrontContent()

export const metadata: Metadata = {
  title: content.about.title,
  description: content.about.description,
}

export default function AboutUsPage() {
  return (
    <main className="content-container py-16">
      <div className="grid gap-10 small:grid-cols-[1fr_0.8fr] small:items-end">
        <div>
          <p className="text-small-semi uppercase tracking-[0.16em] text-sky-600">
            {content.about.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-[44px] font-normal leading-[1.05] text-slate-950 small:text-[72px]">
            {content.about.heading}
          </h1>
        </div>
        <div className="space-y-4 text-base-regular text-slate-600">
          <p>{content.about.intro}</p>
          <p>{content.about.story}</p>
        </div>
      </div>

      <div className="mt-14 grid gap-4 small:grid-cols-3">
        {content.about.cards.map((item) => (
            <div
              key={item.title}
              className="border border-slate-200 bg-white p-6 text-slate-900 shadow-sm"
            >
              <p className="text-large-semi">{item.title}</p>
              <p className="mt-3 text-sm text-slate-500">
                {item.text}
              </p>
            </div>
        ))}
      </div>

      <LocalizedClientLink
        href="/store"
        className="mt-10 inline-flex rounded-md bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
      >
        {content.about.cta}
      </LocalizedClientLink>
    </main>
  )
}
