import { ArrowRight } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const Hero = ({ product }: { product?: HttpTypes.StoreProduct }) => {
  const heroImage = product?.thumbnail || product?.images?.[0]?.url

  return (
    <section className="relative min-h-[74vh] overflow-hidden border-b border-sky-400/20 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(14,165,233,0.24),transparent_34%),linear-gradient(135deg,#020617_0%,#07111f_48%,#0f172a_100%)]" />
      <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(90deg,rgba(2,6,23,0),rgba(56,189,248,0.14))]" />

      <div className="content-container relative grid min-h-[74vh] items-end pb-14 pt-28 small:grid-cols-[1.1fr_0.9fr] small:gap-12">
        <div className="max-w-3xl">
          <p className="text-small-semi uppercase tracking-[0.18em] text-sky-300">
            Premium storefront
          </p>
          <h1 className="mt-5 text-[44px] font-normal leading-[1.02] text-white small:text-[76px]">
            Redefine your setup with sharp, secure essentials.
          </h1>
          <p className="mt-6 max-w-xl text-base-regular text-slate-300">
            Explore a curated product selection with a darker, cleaner shopping
            experience inspired by modern editorial commerce.
          </p>
          <LocalizedClientLink
            href="/store"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            Explore now <ArrowRight />
          </LocalizedClientLink>
        </div>

        <div className="mt-12 grid gap-4 small:mt-0">
          <div className="relative aspect-[4/5] overflow-hidden border border-sky-400/20 bg-slate-900/60">
            {heroImage ? (
              <Image
                src={heroImage}
                alt={product?.title || "Featured product"}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-[linear-gradient(135deg,#0f172a,#0284c7_52%,#020617)]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-small-semi uppercase tracking-[0.16em] text-sky-300">
                Featured
              </p>
              <p className="mt-2 text-2xl-regular text-white">
                {product?.title || "Black base, electric blue accents"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-slate-800 bg-slate-950/80 p-5 text-slate-300">
              <p className="text-2xl-semi text-white">01</p>
              <p className="mt-2 text-sm">Fast discovery</p>
            </div>
            <div className="border border-slate-800 bg-slate-950/80 p-5 text-slate-300">
              <p className="text-2xl-semi text-white">02</p>
              <p className="mt-2 text-sm">Clean checkout path</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
