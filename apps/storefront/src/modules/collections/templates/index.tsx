import { Suspense } from "react"
import Image from "next/image"

import { getMetadataImage } from "@lib/util/metadata-image"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const collectionImage = getMetadataImage(collection)

  return (
    <div className="content-container py-6">
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="relative mb-8 min-h-[260px] overflow-hidden border border-slate-800 bg-slate-900 p-8 small:min-h-[360px]">
          {collectionImage ? (
            <Image
              src={collectionImage}
              alt={collection.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f172a,#075985,#020617)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          <div className="relative flex min-h-[220px] items-end small:min-h-[300px]">
            <div>
              <p className="text-small-semi uppercase tracking-[0.16em] text-sky-300">
                Collection
              </p>
              <h1 className="mt-2 text-3xl-regular text-white">
                {collection.title}
              </h1>
            </div>
          </div>
        </div>
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={collection.products?.length}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
