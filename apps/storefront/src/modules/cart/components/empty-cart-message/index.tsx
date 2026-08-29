import { Heading, Text } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="flex flex-col items-start justify-center px-2 py-32"
      data-testid="empty-cart-message"
    >
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        Carrinho
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        Ainda não tens artigos no carrinho. Explora os nossos equipamentos
        recondicionados e usados verificados.
      </Text>
      <div>
        <InteractiveLink href="/store">Explorar produtos</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
