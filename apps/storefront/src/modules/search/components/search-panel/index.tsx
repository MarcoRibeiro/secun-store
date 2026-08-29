"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { MagnifyingGlass, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"

import { getStorefrontContent } from "@lib/content/storefront"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

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
        <div className="fixed inset-x-0 top-16 z-[60] border-b border-slate-200 bg-white text-slate-900 shadow-xl shadow-slate-200/80 backdrop-blur">
          <div
            className="fixed inset-0 top-16 -z-10 bg-slate-950/20"
            onClick={() => setOpen(false)}
          />
          <div className="content-container py-5">
            <form onSubmit={submitSearch} className="flex items-center gap-3">
              <MagnifyingGlass className="shrink-0 text-sky-600" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder={content.search.placeholder}
                className="h-12 flex-1 border-0 bg-transparent text-xl text-slate-950 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                aria-label="Fechar pesquisa"
                title="Fechar pesquisa"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
              >
                <XMark />
              </button>
            </form>

            <div className="mt-6 grid gap-6 small:grid-cols-[220px_1fr]">
              <div>
                <p className="text-small-semi uppercase tracking-[0.14em] text-sky-600">
                  {content.search.quickLinks}
                </p>
                <div className="mt-3 grid gap-2 text-sm text-slate-600">
                  <LocalizedClientLink
                    href="/store"
                    onClick={() => setOpen(false)}
                    className="hover:text-sky-600"
                  >
                    {content.search.shopAll}
                  </LocalizedClientLink>
                  <LocalizedClientLink
                    href="/about-us"
                    onClick={() => setOpen(false)}
                    className="hover:text-sky-600"
                  >
                    {content.search.about}
                  </LocalizedClientLink>
                </div>
              </div>

              <div>
                <p className="text-small-semi uppercase tracking-[0.14em] text-slate-500">
                  {content.search.recommended}
                </p>
                <div className="mt-3 grid gap-3 small:grid-cols-2">
                  {recommendedProducts.slice(0, 4).map((product) => (
                    <LocalizedClientLink
                      key={product.id}
                      href={`/products/${product.handle}`}
                      onClick={() => setOpen(false)}
                      className="grid grid-cols-[64px_1fr] items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-2 transition hover:border-sky-300 hover:bg-white"
                    >
                      <div className="relative aspect-square overflow-hidden rounded bg-slate-100">
                        {product.thumbnail && (
                          <Image
                            src={product.thumbnail}
                            alt={product.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm text-slate-950">
                          {product.title}
                        </p>
                        <p className="text-xs text-slate-500">
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
      )}
    </div>
  )
}
