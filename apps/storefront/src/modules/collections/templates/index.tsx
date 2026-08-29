import { Suspense } from "react"
import Image from "next/image"

import { getStorefrontContent } from "@lib/content/storefront"
import { listCategories } from "@lib/data/categories"
import { getMetadataImage } from "@lib/util/metadata-image"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import ProductListingControls from "@modules/store/components/product-listing-controls"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import { HttpTypes } from "@medusajs/types"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  selectedCategoryId,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  selectedCategoryId?: string
  countryCode: string
}) {
  const content = getStorefrontContent()
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"
  const collectionImage = getMetadataImage(collection)
  const categoriesPromise = listCategories()

  return (
    <div className="content-container py-10">
      <div className="w-full">
        <div className="relative mb-8 min-h-[150px] overflow-hidden border border-slate-200 bg-white p-5 shadow-sm small:min-h-[200px]">
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
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fafc,#7dd3fc,#ffffff)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
          <div className="relative flex min-h-[110px] items-end small:min-h-[160px]">
            <div>
              <p className="text-small-semi uppercase tracking-[0.16em] text-sky-200">
                {content.listing.collectionLabel}
              </p>
              <h1 className="mt-2 text-3xl-regular text-white">
                {collection.title}
              </h1>
            </div>
          </div>
        </div>
        <Suspense>
          <ProductListingControlsWrapper
            sortBy={sort}
            selectedCategoryId={selectedCategoryId}
            categoriesPromise={categoriesPromise}
          />
        </Suspense>
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
            selectedCategoryId={selectedCategoryId}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

async function ProductListingControlsWrapper({
  sortBy,
  selectedCategoryId,
  categoriesPromise,
}: {
  sortBy: SortOptions
  selectedCategoryId?: string
  categoriesPromise: ReturnType<typeof listCategories>
}) {
  const categories = await categoriesPromise

  return (
    <ProductListingControls
      sortBy={sortBy}
      categories={categories}
      selectedCategoryId={selectedCategoryId}
    />
  )
}
