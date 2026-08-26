import { HttpTypes } from "@medusajs/types"
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
  title = "Featured products",
}: ProductCarouselProps) {
  if (!products.length) {
    return null
  }

  return (
    <CarouselShell title={title}>
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
