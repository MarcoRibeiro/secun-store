"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { MagnifyingGlass, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"

import { getStorefrontContent } from "@lib/content/storefront"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import BrandLogo from "@modules/layout/components/brand-logo"

type SearchPanelProps = {
  recommendedProducts: HttpTypes.StoreProduct[]
}

export default function SearchPanel({ recommendedProducts }: SearchPanelProps) {
  const content = getStorefrontContent()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { countryCode } = useParams()

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleaned = query.trim()

    if (!cleaned) {
      return
    }

    setOpen(false)
    router.push(`/${countryCode}/results/${encodeURIComponent(cleaned)}`)
  }

  return (
    <div>
      <button
        type="button"
        aria-label={content.nav.search}
        title={content.nav.search}
        onClick={() => setOpen(true)}
        className="grid h-10 w-10 place-items-center rounded-md text-slate-700 transition hover:bg-sky-50 hover:text-sky-600"
        data-testid="search-button"
      >
        <MagnifyingGlass />
      </button>

      {open && (
        <>
          <div className="fixed inset-x-0 top-0 z-[70] border-b border-slate-200 bg-white text-slate-900 shadow-sm">
            <div className="content-container flex h-16 items-center gap-5 px-4 small:px-8 large:px-0">
              <LocalizedClientLink
                href="/"
                onClick={() => setOpen(false)}
                className="flex shrink-0 items-center"
              >
                <BrandLogo className="h-8 w-auto small:h-9" priority />
              </LocalizedClientLink>

              <form
                onSubmit={submitSearch}
                className="flex min-w-0 flex-1 items-center gap-3"
              >
                <MagnifyingGlass className="shrink-0 text-sky-600" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="search"
                  placeholder={content.search.placeholder}
                  className="h-12 min-w-0 flex-1 border-0 bg-transparent text-base text-slate-950 outline-none placeholder:text-slate-400 small:text-xl"
                />
                <button
                  type="button"
                  aria-label="Fechar pesquisa"
                  title="Fechar pesquisa"
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  <XMark />
                </button>
              </form>
            </div>
          </div>

          <div
            className="fixed inset-0 top-16 z-[55] bg-slate-950/15 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          <div className="fixed inset-x-0 top-16 z-[60] border-b border-slate-200 bg-white text-slate-900 shadow-xl shadow-slate-200/80">
            <div className="content-container px-4 py-7 small:px-8 large:px-0">
              <div className="grid gap-8 small:grid-cols-[200px_1fr]">
                <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
                  <p className="text-small-semi uppercase tracking-[0.14em] text-sky-600">
                    {content.search.quickLinks}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-600 small:grid">
                    <LocalizedClientLink
                      href="/store"
                      onClick={() => setOpen(false)}
                      className="rounded-md border border-slate-200 bg-white px-3 py-2 transition hover:border-sky-300 hover:text-sky-600"
                    >
                      {content.search.shopAll}
                    </LocalizedClientLink>
                    <LocalizedClientLink
                      href="/about-us"
                      onClick={() => setOpen(false)}
                      className="rounded-md border border-slate-200 bg-white px-3 py-2 transition hover:border-sky-300 hover:text-sky-600"
                    >
                      {content.search.about}
                    </LocalizedClientLink>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-small-semi uppercase tracking-[0.14em] text-slate-500">
                      {content.search.recommended}
                    </p>
                    <LocalizedClientLink
                      href="/store"
                      onClick={() => setOpen(false)}
                      className="text-sm font-semibold text-sky-700 hover:text-sky-500"
                    >
                      {content.search.shopAll}
                    </LocalizedClientLink>
                  </div>
                  <div className="mt-4 grid gap-3 small:grid-cols-2 large:grid-cols-4">
                    {recommendedProducts.slice(0, 4).map((product) => (
                      <LocalizedClientLink
                        key={product.id}
                        href={`/products/${product.handle}`}
                        onClick={() => setOpen(false)}
                        className="group overflow-hidden rounded-md border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-lg hover:shadow-slate-200/80"
                      >
                        <div className="relative aspect-[4/3] bg-slate-50">
                          {product.thumbnail && (
                            <div className="absolute inset-4">
                              <Image
                                src={product.thumbnail}
                                alt={product.title}
                                fill
                                sizes="(max-width: 1024px) 50vw, 180px"
                                className="object-contain transition duration-300 group-hover:scale-[1.03]"
                              />
                            </div>
                          )}
                        </div>
                        <div className="border-t border-slate-100 p-3">
                          <p className="truncate text-sm font-medium text-slate-950">
                            {product.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {content.search.viewProduct}
                          </p>
                        </div>
                      </LocalizedClientLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
