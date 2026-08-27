import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text } from "@modules/common/components/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import BrandLogo from "@modules/layout/components/brand-logo"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()
  const topCategories = productCategories
    ?.filter((category) => !category.parent_category)
    .slice(0, 6)

  return (
    <footer className="w-full border-t border-slate-200 bg-white text-slate-600">
      <div className="content-container flex w-full flex-col">
        <div className="flex flex-col gap-y-10 py-24 xsmall:flex-row xsmall:items-start xsmall:justify-between">
          <div className="max-w-xs">
            <LocalizedClientLink
              href="/"
              className="inline-flex items-center"
            >
              <BrandLogo className="h-12 w-auto" />
            </LocalizedClientLink>
            <p className="mt-4 text-sm text-slate-500">
              Secure shopping with a clean, product-first storefront experience.
            </p>
          </div>

          <div className="text-small-regular grid grid-cols-2 gap-10 md:gap-x-16 small:grid-cols-3">
            {!!topCategories?.length && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-slate-950">Categories</span>
                <ul
                  className="grid grid-cols-1 gap-2 text-slate-600"
                  data-testid="footer-categories"
                >
                  {topCategories.map((category) => (
                    <li key={category.id}>
                      <LocalizedClientLink
                        className="hover:text-sky-600"
                        href={`/categories/${category.handle}`}
                        data-testid="category-link"
                      >
                        {category.name}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!!collections?.length && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-slate-950">Collections</span>
                <ul className="grid grid-cols-1 gap-2 text-slate-600">
                  {collections.slice(0, 6).map((collection) => (
                    <li key={collection.id}>
                      <LocalizedClientLink
                        className="hover:text-sky-600"
                        href={`/collections/${collection.handle}`}
                      >
                        {collection.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-slate-950">Company</span>
              <ul className="grid grid-cols-1 gap-y-2 text-slate-600">
                <li>
                  <LocalizedClientLink
                    href="/about-us"
                    className="hover:text-sky-600"
                  >
                    About us
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="hover:text-sky-600"
                  >
                    Shop
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/cart"
                    className="hover:text-sky-600"
                  >
                    Bag
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12 flex w-full justify-between text-slate-500">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Secunstore. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
