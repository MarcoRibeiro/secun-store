import { Suspense } from "react"

import { getStorefrontContent } from "@lib/content/storefront"
import { listCategories } from "@lib/data/categories"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import ProductListingControls from "@modules/store/components/product-listing-controls"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  categoryId,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  categoryId?: string
  countryCode: string
}) => {
  const content = getStorefrontContent()
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const categoriesPromise = listCategories()

  return (
    <div
      className="content-container py-10"
      data-testid="category-container"
    >
      <div className="w-full">
        <div className="mx-auto mb-8 max-w-[1040px]">
          <p className="text-small-semi uppercase tracking-[0.16em] text-sky-600">
            {content.listing.shopEyebrow}
          </p>
          <h1
            className="mt-2 text-3xl-regular text-slate-950"
            data-testid="store-page-title"
          >
            {content.listing.allProducts}
          </h1>
        </div>
        <Suspense>
          <ProductListingControlsWrapper
            sortBy={sort}
            categoryId={categoryId}
            categoriesPromise={categoriesPromise}
          />
        </Suspense>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            selectedCategoryId={categoryId}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

async function ProductListingControlsWrapper({
  sortBy,
  categoryId,
  categoriesPromise,
}: {
  sortBy: SortOptions
  categoryId?: string
  categoriesPromise: ReturnType<typeof listCategories>
}) {
  const categories = await categoriesPromise

  return (
    <ProductListingControls
      sortBy={sortBy}
      categories={categories}
      selectedCategoryId={categoryId}
    />
  )
}

export default StoreTemplate
