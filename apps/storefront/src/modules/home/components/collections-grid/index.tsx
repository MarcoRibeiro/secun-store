import Image from "next/image"

import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CollectionsGridProps = {
  collections: HttpTypes.StoreCollection[]
  countryCode: string
}

export default async function CollectionsGrid({
  collections,
  countryCode,
}: CollectionsGridProps) {
  const featuredCollections = collections.slice(0, 3)

  if (!featuredCollections.length) {
    return null
  }

  const collectionsWithProducts = await Promise.all(
    featuredCollections.map(async (collection) => {
      const {
        response: { products },
      } = await listProducts({
        countryCode,
        queryParams: {
          collection_id: collection.id,
          limit: 1,
        },
      })

      return {
        collection,
        product: products[0],
      }
    })
  )

  return (
    <section className="content-container py-14 small:py-20">
      <div className="mb-8 flex flex-col justify-between gap-4 small:flex-row small:items-end">
        <div>
          <p className="text-small-semi uppercase tracking-[0.16em] text-sky-300">
            Collections
          </p>
          <h2 className="mt-2 text-3xl-regular text-white">
            Explore the latest edits
          </h2>
        </div>
        <LocalizedClientLink
          href="/store"
          className="text-sm font-semibold text-sky-300 hover:text-sky-200"
        >
          View all
        </LocalizedClientLink>
      </div>

      <div className="grid gap-3 small:grid-cols-2 small:grid-rows-2">
        {collectionsWithProducts.map(({ collection, product }, index) => {
          const image = product?.thumbnail || product?.images?.[0]?.url

          return (
            <LocalizedClientLink
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className={[
                "group relative min-h-[280px] overflow-hidden border border-slate-800 bg-slate-900",
                index === 1 ? "small:row-span-2" : "",
              ].join(" ")}
            >
              {image ? (
                <Image
                  src={image}
                  alt={collection.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(135deg,#0f172a,#075985,#020617)]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-small-semi uppercase tracking-[0.16em] text-sky-300">
                  Collection
                </p>
                <h3 className="mt-2 text-2xl-regular text-white">
                  {collection.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm text-slate-300 opacity-0 transition duration-300 group-hover:opacity-100">
                  Discover selected products from this collection.
                </p>
              </div>
            </LocalizedClientLink>
          )
        })}
      </div>
    </section>
  )
}
