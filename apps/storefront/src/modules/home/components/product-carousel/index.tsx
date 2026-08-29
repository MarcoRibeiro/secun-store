import { HttpTypes } from "@medusajs/types"
import { getStorefrontContent } from "@lib/content/storefront"
import ProductPreview from "@modules/products/components/product-preview"

import CarouselShell from "./carousel-shell"

type ProductCarouselProps = {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
  title?: string
}

export default function ProductCarousel({
  products,
  region,
  title,
}: ProductCarouselProps) {
  const content = getStorefrontContent()

  if (!products.length) {
    return null
  }

  return (
    <CarouselShell title={title || content.home.productsTitle}>
      {products.map((product) => (
        <div
          key={product.id}
          className="w-[72vw] shrink-0 snap-start small:w-[38vw] medium:w-[28vw] large:w-[22vw]"
        >
          <ProductPreview product={product} region={region} isFeatured />
        </div>
      ))}
    </CarouselShell>
  )
}
