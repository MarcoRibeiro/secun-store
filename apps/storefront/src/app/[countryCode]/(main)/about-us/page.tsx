import { Metadata } from "next"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "About us",
  description: "Learn more about our store.",
}

export default function AboutUsPage() {
  return (
    <main className="content-container py-16">
      <div className="grid gap-10 small:grid-cols-[1fr_0.8fr] small:items-end">
        <div>
          <p className="text-small-semi uppercase tracking-[0.16em] text-sky-600">
            About us
          </p>
          <h1 className="mt-4 max-w-3xl text-[44px] font-normal leading-[1.05] text-slate-950 small:text-[72px]">
            Built for sharp spaces and everyday use.
          </h1>
        </div>
        <p className="text-base-regular text-slate-600">
          A curated store experience with a clean visual system, crisp product
          discovery, and a quieter premium feel.
        </p>
      </div>

      <div className="mt-14 grid gap-4 small:grid-cols-3">
        {["Curated catalog", "Secure checkout", "Fast fulfillment"].map(
          (item) => (
            <div
              key={item}
              className="border border-slate-200 bg-white p-6 text-slate-900 shadow-sm"
            >
              <p className="text-large-semi">{item}</p>
              <p className="mt-3 text-sm text-slate-500">
                Designed to keep the shopping flow simple, direct, and polished.
              </p>
            </div>
          )
        )}
      </div>

      <LocalizedClientLink
        href="/store"
        className="mt-10 inline-flex rounded-md bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
      >
        Explore products
      </LocalizedClientLink>
    </main>
  )
}
