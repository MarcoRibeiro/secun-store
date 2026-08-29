import { getStorefrontContent } from "@lib/content/storefront"
import { ArrowRight } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const Hero = ({ product }: { product?: HttpTypes.StoreProduct }) => {
  const content = getStorefrontContent()
  const heroImage = product?.thumbnail || product?.images?.[0]?.url

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(14,165,233,0.16),transparent_34%),linear-gradient(135deg,#ffffff_0%,#f8fafc_48%,#e0f2fe_100%)]" />
      <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(56,189,248,0.12))]" />

      <div className="content-container relative grid min-h-[520px] items-center gap-10 py-14 small:grid-cols-[1.1fr_0.9fr] small:py-16">
        <div className="max-w-2xl">
          <p className="text-small-semi uppercase tracking-[0.18em] text-sky-600">
            {content.home.heroEyebrow}
          </p>
          <h1 className="mt-4 text-[38px] font-normal leading-[1.05] text-slate-950 small:text-[58px]">
            {content.home.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-base-regular text-slate-600">
            {content.home.heroText}
          </p>
          <LocalizedClientLink
            href="/store"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
          >
            {content.home.heroCta} <ArrowRight />
          </LocalizedClientLink>
        </div>

        <div className="grid justify-items-center gap-4 small:justify-items-end">
          <div className="relative aspect-[4/5] w-full max-w-[300px] overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/80 small:max-w-[360px]">
            {heroImage ? (
              <Image
                src={heroImage}
                alt={product?.title || content.home.featuredFallback}
                fill
                priority
                sizes="(max-width: 1024px) 300px, 360px"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[linear-gradient(135deg,#f8fafc,#7dd3fc_52%,#ffffff)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-small-semi uppercase tracking-[0.16em] text-sky-200">
                {content.home.featuredEyebrow}
              </p>
              <p className="mt-2 text-2xl-regular text-white">
                {product?.title || content.home.featuredFallback}
              </p>
            </div>
          </div>
          <div className="grid w-full max-w-[360px] grid-cols-2 gap-4">
            <div className="border border-slate-200 bg-white p-5 text-slate-600 shadow-sm">
              <p className="text-2xl-semi text-sky-600">01</p>
              <p className="mt-2 text-sm">{content.home.statOne}</p>
            </div>
            <div className="border border-slate-200 bg-white p-5 text-slate-600 shadow-sm">
              <p className="text-2xl-semi text-sky-600">02</p>
              <p className="mt-2 text-sm">{content.home.statTwo}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
