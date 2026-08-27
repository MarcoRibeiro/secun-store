import Image from "next/image"

type BrandLogoProps = {
  className?: string
  priority?: boolean
}

export default function BrandLogo({
  className = "h-9 w-auto",
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src="/logotipo.png"
      alt="Secunstore"
      width={260}
      height={103}
      priority={priority}
      className={className}
    />
  )
}
