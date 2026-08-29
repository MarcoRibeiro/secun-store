"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

import { getStorefrontContent } from "@lib/content/storefront"
import { HttpTypes } from "@medusajs/types"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

type ProductListingControlsProps = {
  sortBy: SortOptions
  categories?: HttpTypes.StoreProductCategory[]
  selectedCategoryId?: string
  showCategoryFilter?: boolean
}

export default function ProductListingControls({
  sortBy,
  categories = [],
  selectedCategoryId,
  showCategoryFilter = true,
}: ProductListingControlsProps) {
  const content = getStorefrontContent()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)

      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }

      params.delete("page")

      const query = params.toString()
      router.push(query ? `${pathname}?${query}` : pathname)
    },
    [pathname, router, searchParams]
  )

  const topLevelCategories = categories.filter(
    (category) => !category.parent_category
  )
  const sortOptions: { value: SortOptions; label: string }[] = [
    {
      value: "created_at",
      label: content.listing.latest,
    },
    {
      value: "price_asc",
      label: content.listing.priceLowHigh,
    },
    {
      value: "price_desc",
      label: content.listing.priceHighLow,
    },
  ]

  return (
    <div className="mx-auto mb-8 flex w-full max-w-[1040px] flex-col gap-3 small:flex-row small:items-end small:justify-between">
      {showCategoryFilter && !!topLevelCategories.length && (
        <label className="flex w-full max-w-[260px] flex-col gap-2">
          <span className="text-small-semi uppercase tracking-[0.14em] text-slate-500">
            {content.listing.category}
          </span>
          <select
            value={selectedCategoryId || ""}
            onChange={(event) =>
              updateQueryString("category_id", event.target.value)
            }
            className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition hover:border-sky-500 focus:border-sky-500"
            data-testid="category-filter-select"
          >
            <option value="">{content.listing.allCategories}</option>
            {topLevelCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="flex w-full max-w-[260px] flex-col gap-2 small:ml-auto">
        <span className="text-small-semi uppercase tracking-[0.14em] text-slate-500 small:text-right">
          {content.listing.sort}
        </span>
        <select
          value={sortBy}
          onChange={(event) =>
            updateQueryString("sortBy", event.target.value)
          }
          className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition hover:border-sky-500 focus:border-sky-500"
          data-testid="sort-by-select"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
