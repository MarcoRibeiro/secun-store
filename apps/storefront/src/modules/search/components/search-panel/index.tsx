"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { MagnifyingGlass, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

type SearchPanelProps = {
  recommendedProducts: HttpTypes.StoreProduct[]
}

export default function SearchPanel({ recommendedProducts }: SearchPanelProps) {
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
        aria-label="Search"
        title="Search"
        onClick={() => setOpen(true)}
        className="grid h-10 w-10 place-items-center rounded-md text-slate-200 transition hover:bg-sky-500/10 hover:text-sky-300"
        data-testid="search-button"
      >
        <MagnifyingGlass />
      </button>

      {open && (
        <div className="fixed inset-x-0 top-16 z-[60] border-b border-sky-400/20 bg-slate-950 text-slate-100 shadow-2xl shadow-sky-950/30 backdrop-blur">
          <div
            className="fixed inset-0 top-16 -z-10 bg-black/35"
            onClick={() => setOpen(false)}
          />
          <div className="content-container py-5">
            <form onSubmit={submitSearch} className="flex items-center gap-3">
              <MagnifyingGlass className="shrink-0 text-sky-300" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search products"
                className="h-12 flex-1 border-0 bg-transparent text-xl text-white outline-none placeholder:text-slate-500"
              />
              <button
                type="button"
                aria-label="Close search"
                title="Close search"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-md text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <XMark />
              </button>
            </form>

            <div className="mt-6 grid gap-6 small:grid-cols-[220px_1fr]">
              <div>
                <p className="text-small-semi uppercase tracking-[0.14em] text-sky-300">
                  Quick links
                </p>
                <div className="mt-3 grid gap-2 text-sm text-slate-300">
                  <LocalizedClientLink
                    href="/store"
                    onClick={() => setOpen(false)}
                    className="hover:text-white"
                  >
                    Shop all
                  </LocalizedClientLink>
                  <LocalizedClientLink
                    href="/about-us"
                    onClick={() => setOpen(false)}
                    className="hover:text-white"
                  >
                    About us
                  </LocalizedClientLink>
                </div>
              </div>

              <div>
                <p className="text-small-semi uppercase tracking-[0.14em] text-slate-400">
                  Recommended
                </p>
                <div className="mt-3 grid gap-3 small:grid-cols-2">
                  {recommendedProducts.slice(0, 4).map((product) => (
                    <LocalizedClientLink
                      key={product.id}
                      href={`/products/${product.handle}`}
                      onClick={() => setOpen(false)}
                      className="grid grid-cols-[64px_1fr] items-center gap-3 rounded-md border border-slate-800 bg-slate-900/70 p-2 transition hover:border-sky-400/50 hover:bg-slate-900"
                    >
                      <div className="relative aspect-square overflow-hidden rounded bg-slate-800">
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
                        <p className="truncate text-sm text-white">
                          {product.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          View product
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
