import { Metadata } from "next"

import { getStorefrontContent } from "@lib/content/storefront"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"

export const metadata: Metadata = {
  title: "Resultados de pesquisa",
  description: "Pesquisa produtos e equipamentos.",
}

export default async function SearchResultsPage(props: {
  params: Promise<{ countryCode: string; query: string }>
}) {
  const { countryCode, query } = await props.params
  const content = getStorefrontContent()
  const decodedQuery = decodeURIComponent(query)
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products },
  } = await listProducts({
    countryCode,
    queryParams: {
      limit: 100,
    },
  })

  const normalizedQuery = decodedQuery.toLowerCase()
  const filteredProducts = products.filter((product) => {
    return [product.title, product.handle, product.description]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(normalizedQuery))
  })

  return (
    <main className="content-container min-h-[60vh] py-12">
      <div className="mb-8">
        <p className="text-small-semi uppercase tracking-[0.16em] text-sky-600">
          {content.search.title}
        </p>
        <h1 className="mt-2 text-3xl-regular text-slate-950">
          {content.search.resultsTitle} "{decodedQuery}"
        </h1>
      </div>

      {filteredProducts.length > 0 ? (
        <ul
          className="grid grid-cols-2 gap-x-6 gap-y-10 small:grid-cols-3 medium:grid-cols-4"
          data-testid="products-list"
        >
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
          {content.search.empty}
        </div>
      )}
    </main>
  )
}
