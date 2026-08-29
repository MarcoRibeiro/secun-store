import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { getStorefrontContent } from "@lib/content/storefront"
import { Text } from "@modules/common/components/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import BrandLogo from "@modules/layout/components/brand-logo"
import Facebook from "@modules/common/icons/facebook"
import Instagram from "@modules/common/icons/instagram"

export default async function Footer() {
  const content = getStorefrontContent()
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
        <div className="grid gap-12 py-16 small:py-20 large:grid-cols-[minmax(0,1fr)_auto] large:gap-20">
          <div className="max-w-xl">
            <LocalizedClientLink
              href="/"
              className="inline-flex items-center"
            >
              <BrandLogo className="h-12 w-auto" />
            </LocalizedClientLink>
            <p className="mt-4 text-sm text-slate-500">
              {content.footer.description}
            </p>

            <div className="mt-8 grid gap-5 text-sm text-slate-600 small:grid-cols-3">
              <div>
                <p className="txt-small-plus text-slate-950">
                  {content.footer.addressTitle}
                </p>
                <a
                  href={content.footer.addressUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 block hover:text-sky-600"
                >
                  {content.footer.address}
                </a>
              </div>

              <div>
                <p className="txt-small-plus text-slate-950">
                  {content.footer.scheduleTitle}
                </p>
                <p className="mt-2">{content.footer.schedule}</p>
              </div>

              <div>
                <p className="txt-small-plus text-slate-950">
                  {content.footer.contactTitle}
                </p>
                <a
                  href={content.footer.phoneUrl}
                  className="mt-2 block hover:text-sky-600"
                >
                  {content.footer.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="text-small-regular grid grid-cols-2 gap-10 md:gap-x-16 small:grid-cols-4">
            {!!topCategories?.length && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus text-slate-950">
                  {content.footer.categories}
                </span>
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
                <span className="txt-small-plus text-slate-950">
                  {content.footer.collections}
                </span>
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
              <span className="txt-small-plus text-slate-950">
                {content.footer.company}
              </span>
              <ul className="grid grid-cols-1 gap-y-2 text-slate-600">
                <li>
                  <LocalizedClientLink
                    href="/about-us"
                    className="hover:text-sky-600"
                  >
                    {content.footer.about}
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/store"
                    className="hover:text-sky-600"
                  >
                    {content.footer.shop}
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/cart"
                    className="hover:text-sky-600"
                  >
                    {content.footer.bag}
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus text-slate-950">
                {content.footer.socialTitle}
              </span>
              <ul className="flex items-center gap-3 text-slate-600">
                <li>
                  <a
                    href={content.footer.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={content.footer.facebook}
                    title={content.footer.facebook}
                    className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600"
                  >
                    <Facebook size={20} />
                  </a>
                </li>
                <li>
                  <a
                    href={content.footer.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={content.footer.instagram}
                    title={content.footer.instagram}
                    className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600"
                  >
                    <Instagram size={20} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-10 flex w-full justify-between border-t border-slate-100 pt-6 text-slate-500">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Secunstore. {content.footer.rights}
          </Text>
        </div>
      </div>
    </footer>
  )
}
