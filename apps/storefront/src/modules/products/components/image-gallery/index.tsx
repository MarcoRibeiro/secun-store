import { HttpTypes } from "@medusajs/types"
import { Container } from "@modules/common/components/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative aspect-[29/34] w-full overflow-hidden border border-slate-200 bg-slate-50"
              id={image.id}
            >
              {!!image.url && (
                <div className="absolute inset-6 small:inset-10">
                  <Image
                    src={image.url}
                    priority={index <= 2 ? true : false}
                    className="object-contain object-center"
                    alt={`Product image ${index + 1}`}
                    fill
                    sizes="(max-width: 576px) 240px, (max-width: 768px) 320px, (max-width: 992px) 440px, 720px"
                  />
                </div>
              )}
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
