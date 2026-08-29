import { notFound } from "next/navigation"
import { Suspense } from "react"
import Image from "next/image"

import { getStorefrontContent } from "@lib/content/storefront"
import { getMetadataImage } from "@lib/util/metadata-image"
import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import ProductListingControls from "@modules/store/components/product-listing-controls"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const content = getStorefrontContent()
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)
  const categoryImage = getMetadataImage(category)

  return (
    <div
      className="content-container py-10"
      data-testid="category-container"
    >
      <div className="w-full">
        <div className="relative mb-8 min-h-[150px] overflow-hidden border border-slate-200 bg-white p-5 shadow-sm small:min-h-[200px]">
          {categoryImage ? (
            <Image
              src={categoryImage}
              alt={category.name}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8fafc,#7dd3fc,#ffffff)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
          <div className="relative flex min-h-[110px] flex-col justify-end small:min-h-[160px]">
            {!!parents.length && (
              <div className="mb-4 flex flex-wrap gap-2 text-sm text-slate-100">
                {parents.map((parent) => (
                  <LocalizedClientLink
                    key={parent.id}
                    className="hover:text-sky-300"
                    href={`/categories/${parent.handle}`}
                    data-testid="sort-by-link"
                  >
                    {parent.name}
                  </LocalizedClientLink>
                ))}
              </div>
            )}
            <p className="text-small-semi uppercase tracking-[0.16em] text-sky-200">
              {content.listing.categoryLabel}
            </p>
            <h1
              className="mt-2 text-3xl-regular text-white"
              data-testid="category-page-title"
            >
              {category.name}
            </h1>
          </div>
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular text-slate-600">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          <div className="mb-8 text-base-large">
            <ul className="grid grid-cols-1 gap-2">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <InteractiveLink href={`/categories/${c.handle}`}>
                    {c.name}
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <ProductListingControls
          sortBy={sort}
          showCategoryFilter={false}
        />
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
