import Image from "next/image"

import { getStorefrontContent } from "@lib/content/storefront"
import { listProducts } from "@lib/data/products"
import { getMetadataImage } from "@lib/util/metadata-image"
import { ArrowRight } from "@medusajs/icons"
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
  const content = getStorefrontContent()
  const featuredCollections = collections.slice(0, 5)

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
          <p className="text-small-semi uppercase tracking-[0.16em] text-sky-600">
            {content.home.collectionsEyebrow}
          </p>
          <h2 className="mt-2 text-3xl-regular text-slate-950">
            {content.home.collectionsTitle}
          </h2>
        </div>
        <LocalizedClientLink
          href="/store"
          className="text-sm font-semibold text-sky-700 hover:text-sky-500"
        >
          {content.home.collectionsCta}
        </LocalizedClientLink>
      </div>

      <div className="grid gap-3 small:grid-cols-2 large:grid-cols-5">
        {collectionsWithProducts.map(({ collection, product }) => {
          const image =
            getMetadataImage(collection) ||
            product?.thumbnail ||
            product?.images?.[0]?.url

          return (
            <LocalizedClientLink
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-lg hover:shadow-slate-200/80"
            >
              <div className="relative aspect-[4/3] bg-slate-50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(14,165,233,0.12),transparent_34%)]" />
                {image ? (
                  <div className="absolute inset-5">
                    <Image
                      src={image}
                      alt={collection.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 220px"
                      className="object-contain transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-5 bg-[linear-gradient(135deg,#e0f2fe,#ffffff)]" />
                )}
              </div>
              <div className="border-t border-slate-100 p-4">
                <p className="text-small-semi uppercase tracking-[0.16em] text-sky-600">
                  {content.home.collectionLabel}
                </p>
                <h3 className="mt-2 truncate text-xl-regular text-slate-950">
                  {collection.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition group-hover:text-sky-500">
                  {content.home.collectionCardCta}
                  <ArrowRight />
                </span>
              </div>
            </LocalizedClientLink>
          )
        })}
      </div>
    </section>
  )
}
