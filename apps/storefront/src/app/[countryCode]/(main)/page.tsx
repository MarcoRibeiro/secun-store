import { Metadata } from "next"

import { getStorefrontContent } from "@lib/content/storefront"
import CollectionsGrid from "@modules/home/components/collections-grid"
import Hero from "@modules/home/components/hero"
import ProductCarousel from "@modules/home/components/product-carousel"
import PromoBanner from "@modules/home/components/promo-banner"
import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Secunstore",
  description:
    "Reparação de computadores, smartphones e venda de artigos em segunda mão.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params
  const content = getStorefrontContent()

  const region = await getRegion(countryCode)

  const [
    { collections },
    {
      response: { products },
    },
  ] = await Promise.all([
    listCollections({
      fields: "id,handle,title,metadata",
    }),
    listProducts({
      countryCode,
      queryParams: {
        limit: 12,
      },
    }),
  ])

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero product={products[0]} />
      <CollectionsGrid collections={collections} countryCode={countryCode} />
      <PromoBanner />
      <ProductCarousel
        products={products}
        region={region}
        title={content.home.productsTitle}
      />
    </>
  )
}
