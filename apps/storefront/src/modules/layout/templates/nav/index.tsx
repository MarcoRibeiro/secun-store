import { Suspense } from "react"

import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listProducts } from "@lib/data/products"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import { User } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SearchPanel from "@modules/search/components/search-panel"

export default async function Nav({ countryCode }: { countryCode: string }) {
  const [
    regions,
    locales,
    currentLocale,
    productCategories,
    { collections },
    {
      response: { products },
    },
  ] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
    listCategories(),
    listCollections({
      fields: "id, handle, title",
      limit: "6",
    }),
    listProducts({
      countryCode,
      queryParams: {
        limit: 4,
      },
    }),
  ])

  const topCategories = productCategories
    ?.filter((category) => !category.parent_category)
    .slice(0, 6)

  return (
    <div className="sticky inset-x-0 top-0 z-50 group">
      <header className="relative h-16 border-b border-sky-400/20 bg-slate-950/95 text-slate-200 backdrop-blur">
        <nav className="content-container flex h-full w-full items-center justify-between text-small-regular">
          <div className="flex h-full flex-1 basis-0 items-center">
            <div className="h-full">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
            <div className="ml-8 hidden h-full items-center gap-x-2 small:flex">
              <div className="group/shop relative flex h-full items-center">
                <LocalizedClientLink
                  href="/store"
                  className="flex h-full items-center border-b border-transparent px-3 text-sm uppercase tracking-[0.14em] text-slate-300 transition hover:border-sky-300 hover:text-white"
                >
                  Shop
                </LocalizedClientLink>
                <div className="invisible absolute left-0 top-full grid min-w-[260px] translate-y-2 gap-2 border border-slate-800 bg-slate-950 p-4 opacity-0 shadow-2xl shadow-black/40 transition group-hover/shop:visible group-hover/shop:translate-y-0 group-hover/shop:opacity-100">
                  <LocalizedClientLink
                    href="/store"
                    className="text-sm font-semibold text-white hover:text-sky-300"
                  >
                    Shop all
                  </LocalizedClientLink>
                  {topCategories?.map((category) => (
                    <LocalizedClientLink
                      key={category.id}
                      href={`/categories/${category.handle}`}
                      className="text-sm text-slate-400 hover:text-sky-300"
                    >
                      {category.name}
                    </LocalizedClientLink>
                  ))}
                </div>
              </div>

              <div className="group/collections relative flex h-full items-center">
                <LocalizedClientLink
                  href="/store"
                  className="flex h-full items-center border-b border-transparent px-3 text-sm uppercase tracking-[0.14em] text-slate-300 transition hover:border-sky-300 hover:text-white"
                >
                  Collections
                </LocalizedClientLink>
                <div className="invisible absolute left-0 top-full grid min-w-[260px] translate-y-2 gap-2 border border-slate-800 bg-slate-950 p-4 opacity-0 shadow-2xl shadow-black/40 transition group-hover/collections:visible group-hover/collections:translate-y-0 group-hover/collections:opacity-100">
                  {collections?.slice(0, 6).map((collection) => (
                    <LocalizedClientLink
                      key={collection.id}
                      href={`/collections/${collection.handle}`}
                      className="text-sm text-slate-300 hover:text-sky-300"
                    >
                      {collection.title}
                    </LocalizedClientLink>
                  ))}
                </div>
              </div>

              <LocalizedClientLink
                href="/about-us"
                className="flex h-full items-center border-b border-transparent px-3 text-sm uppercase tracking-[0.14em] text-slate-300 transition hover:border-sky-300 hover:text-white"
              >
                About us
              </LocalizedClientLink>
            </div>
          </div>

          <div className="absolute left-1/2 flex h-full -translate-x-1/2 items-center">
            <LocalizedClientLink
              href="/"
              className="text-lg font-semibold uppercase tracking-[0.26em] text-white transition hover:text-sky-300"
              data-testid="nav-store-link"
            >
              Secun
            </LocalizedClientLink>
          </div>

          <div className="flex h-full flex-1 basis-0 items-center justify-end gap-x-2">
            <SearchPanel recommendedProducts={products} />
            <div className="hidden items-center small:flex">
              <LocalizedClientLink
                className="grid h-10 w-10 place-items-center rounded-md text-slate-200 transition hover:bg-sky-500/10 hover:text-sky-300"
                href="/account"
                aria-label="Account"
                title="Account"
                data-testid="nav-account-link"
              >
                <User />
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex h-10 items-center gap-2 rounded-md px-2 text-slate-200"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Bag (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
