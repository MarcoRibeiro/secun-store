import { getStorefrontContent } from "@lib/content/storefront"
import { ArrowRight, ListCheckbox, ShieldCheck } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const Hero = ({ product }: { product?: HttpTypes.StoreProduct }) => {
  const content = getStorefrontContent()
  const heroImage = product?.thumbnail || product?.images?.[0]?.url
  const trustBadges = [
    {
      value: "30+",
      label: content.home.statOne,
      icon: <ListCheckbox />,
    },
    {
      value: "12",
      label: content.home.statTwo,
      icon: <ShieldCheck />,
    },
  ]

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

        <div className="grid justify-items-center small:justify-items-end">
          <div className="relative w-full max-w-[320px] small:max-w-[560px]">
            <div className="absolute -right-2 bottom-8 z-20 hidden w-[240px] overflow-hidden rounded-md border border-slate-200 bg-white/95 shadow-xl shadow-slate-200/70 backdrop-blur small:block">
              <p className="border-b border-slate-100 bg-slate-50 px-4 py-3 text-small-semi uppercase tracking-[0.14em] text-sky-600">
                Verificado por nós
              </p>
              {trustBadges.map((badge) => (
                <div
                  key={badge.value}
                  className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-sky-50 text-sky-600">
                    {badge.icon}
                  </span>
                  <div>
                    <p className="text-[30px] font-semibold leading-none text-slate-950">
                      {badge.value}
                    </p>
                    <p className="mt-1.5 text-xs leading-4 text-slate-600">
                      {badge.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative aspect-[4/5] overflow-hidden border border-slate-200 bg-white shadow-2xl shadow-slate-200/80 small:mr-36 small:max-w-[370px]">
              {heroImage ? (
                <div className="absolute inset-x-6 bottom-24 top-10 small:top-16">
                  <Image
                    src={heroImage}
                    alt={product?.title || content.home.featuredFallback}
                    fill
                    priority
                    sizes="(max-width: 1024px) 280px, 360px"
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="h-full w-full bg-[linear-gradient(135deg,#f8fafc,#7dd3fc_52%,#ffffff)]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-small-semi uppercase tracking-[0.16em] text-sky-200">
                  {content.home.featuredEyebrow}
                </p>
                <p className="mt-2 text-2xl-regular text-white">
                  {product?.title || content.home.featuredFallback}
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 small:hidden">
              {trustBadges.map((badge) => (
                <div
                  key={badge.value}
                  className="rounded-md border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-md bg-sky-50 text-sky-600">
                      {badge.icon}
                    </span>
                    <p className="text-2xl-semi leading-none text-slate-950">
                      {badge.value}
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-4 text-slate-600">
                    {badge.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
