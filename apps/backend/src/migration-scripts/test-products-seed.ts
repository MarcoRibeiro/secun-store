import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createCollectionsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
} from "@medusajs/medusa/core-flows"

type SeedEntity = {
  id: string
  title?: string
  name?: string
  handle?: string
}

const imageBaseUrl = process.env.TEST_PRODUCT_IMAGE_BASE_URL || "http://localhost:9000/static"

const images = {
  macbook: `${imageBaseUrl}/1788017120430-61VT7IJ7s8L._AC_SL1500_.jpg`,
  laptop: `${imageBaseUrl}/1788017120431-61aUBxqc5PL._AC_SL1500_.jpg`,
  iphoneOrange: `${imageBaseUrl}/1788017120432-617Yjkfn3ZL._AC_SL1500_.jpg`,
  iphoneDark: `${imageBaseUrl}/1788017120432-71JR0740C5L._AC_SL1500_.jpg`,
  phone: `${imageBaseUrl}/1787780626942-images.jfif`,
  tablet: `${imageBaseUrl}/1787780939819-images (1).jfif`,
}

const categories = ["Smartphones", "Portáteis", "Tablets", "Acessórios"]
const collections = ["iPhone", "MacBook", "Windows", "Android", "iPad"]

const products = [
  {
    title: "iPhone 15 Pro 256GB Recondicionado",
    handle: "test-iphone-15-pro-256gb",
    sku: "TEST-IP15PRO-256",
    category: "Smartphones",
    collection: "iPhone",
    price: 849,
    image: images.iphoneDark,
    description:
      "iPhone recondicionado, testado em mais de 30 pontos de controlo e entregue com 12 meses de garantia Secunstore.",
  },
  {
    title: "iPhone 14 128GB Grau A",
    handle: "test-iphone-14-128gb",
    sku: "TEST-IP14-128",
    category: "Smartphones",
    collection: "iPhone",
    price: 579,
    image: images.iphoneOrange,
    description:
      "Equipamento desbloqueado, verificado e pronto a usar com qualquer operadora.",
  },
  {
    title: "Samsung Galaxy S23 128GB",
    handle: "test-samsung-galaxy-s23",
    sku: "TEST-SGS23-128",
    category: "Smartphones",
    collection: "Android",
    price: 499,
    image: images.phone,
    description:
      "Smartphone Android em excelente estado, com ecrã, câmaras, sensores e bateria testados.",
  },
  {
    title: "MacBook Pro 14 2021",
    handle: "test-macbook-pro-14-2021",
    sku: "TEST-MBP14-2021",
    category: "Portáteis",
    collection: "MacBook",
    price: 1235,
    image: images.macbook,
    description:
      "Portátil Apple em segunda mão, limpo, verificado e preparado para trabalho intensivo.",
  },
  {
    title: "MacBook Air M1 13",
    handle: "test-macbook-air-m1-13",
    sku: "TEST-MBA-M1-13",
    category: "Portáteis",
    collection: "MacBook",
    price: 699,
    image: images.laptop,
    description:
      "MacBook leve e silencioso, ideal para estudo, trabalho e uso diário.",
  },
  {
    title: "Lenovo ThinkPad T14",
    handle: "test-lenovo-thinkpad-t14",
    sku: "TEST-T14",
    category: "Portáteis",
    collection: "Windows",
    price: 449,
    image: images.laptop,
    description:
      "Portátil Windows profissional, recondicionado e com garantia de funcionamento.",
  },
  {
    title: "HP EliteBook 840 G8",
    handle: "test-hp-elitebook-840-g8",
    sku: "TEST-ELITEBOOK-840G8",
    category: "Portáteis",
    collection: "Windows",
    price: 529,
    image: images.macbook,
    description:
      "Computador portátil robusto para produtividade, com revisão técnica Secunstore.",
  },
  {
    title: "iPad Air 64GB Wi-Fi",
    handle: "test-ipad-air-64gb",
    sku: "TEST-IPADAIR-64",
    category: "Tablets",
    collection: "iPad",
    price: 389,
    image: images.tablet,
    description:
      "Tablet Apple testado, com bom estado geral e autonomia verificada.",
  },
  {
    title: "Samsung Galaxy Tab S8",
    handle: "test-samsung-galaxy-tab-s8",
    sku: "TEST-TABS8",
    category: "Tablets",
    collection: "Android",
    price: 349,
    image: images.tablet,
    description:
      "Tablet Android para trabalho, estudo e entretenimento, revisto pela nossa equipa.",
  },
  {
    title: "Carregador USB-C 65W",
    handle: "test-carregador-usb-c-65w",
    sku: "TEST-USBC-65W",
    category: "Acessórios",
    collection: "Windows",
    price: 29,
    image: images.phone,
    description:
      "Carregador compatível com vários computadores, tablets e smartphones USB-C.",
  },
  {
    title: "Cabo USB-C Reforçado",
    handle: "test-cabo-usb-c-reforcado",
    sku: "TEST-CABO-USBC",
    category: "Acessórios",
    collection: "Android",
    price: 12,
    image: images.phone,
    description:
      "Cabo de carregamento e dados para uso diário, resistente e testado em loja.",
  },
  {
    title: "AirPods Pro Recondicionados",
    handle: "test-airpods-pro",
    sku: "TEST-AIRPODS-PRO",
    category: "Acessórios",
    collection: "iPhone",
    price: 129,
    image: images.iphoneOrange,
    description:
      "Auriculares Apple verificados, limpos e prontos a usar com garantia Secunstore.",
  },
]

function findByName(items: SeedEntity[], name: string) {
  return items.find((item) => item.name === name || item.title === name)
}

export default async function seed_test_products({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  logger.info("Seeding Secunstore test products...")

  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle"],
  })

  const existingHandles = new Set(
    (existingProducts as SeedEntity[]).map((product) => product.handle)
  )

  const productsToCreate = products.filter(
    (product) => !existingHandles.has(product.handle)
  )

  if (!productsToCreate.length) {
    logger.info("All Secunstore test products already exist. Nothing to do.")
    return
  }

  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id", "name"],
  })
  const shippingProfile = (shippingProfiles as SeedEntity[])[0]

  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })
  const salesChannel =
    (salesChannels as SeedEntity[]).find(
      (channel) => channel.name === "Default Sales Channel"
    ) || (salesChannels as SeedEntity[])[0]

  if (!shippingProfile || !salesChannel) {
    throw new Error("Missing shipping profile or sales channel.")
  }

  const { data: existingCategories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name", "handle"],
  })

  const missingCategories = categories.filter(
    (category) => !findByName(existingCategories as SeedEntity[], category)
  )

  let categoryResult = existingCategories as SeedEntity[]

  if (missingCategories.length) {
    const { result: createdCategories } = await createProductCategoriesWorkflow(
      container
    ).run({
      input: {
        product_categories: missingCategories.map((name) => ({
          name,
          is_active: true,
        })),
      },
    })

    categoryResult = [...categoryResult, ...(createdCategories as SeedEntity[])]
  }

  const { data: existingCollections } = await query.graph({
    entity: "product_collection",
    fields: ["id", "title", "handle"],
  })

  const missingCollections = collections.filter(
    (collection) => !findByName(existingCollections as SeedEntity[], collection)
  )

  let collectionResult = existingCollections as SeedEntity[]

  if (missingCollections.length) {
    const { result: createdCollections } = await createCollectionsWorkflow(
      container
    ).run({
      input: {
        collections: missingCollections.map((title) => ({
          title,
        })),
      },
    })

    collectionResult = [
      ...collectionResult,
      ...(createdCollections as SeedEntity[]),
    ]
  }

  await createProductsWorkflow(container).run({
    input: {
      products: productsToCreate.map((product) => {
        const category = findByName(categoryResult, product.category)
        const collection = findByName(collectionResult, product.collection)

        if (!category || !collection) {
          throw new Error(`Missing category or collection for ${product.title}`)
        }

        return {
          title: product.title,
          handle: product.handle,
          description: product.description,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          category_ids: [category.id],
          collection_id: collection.id,
          images: [{ url: product.image }],
          options: [
            {
              title: "Estado",
              values: ["Recondicionado"],
            },
          ],
          variants: [
            {
              title: "Recondicionado",
              sku: product.sku,
              manage_inventory: false,
              options: {
                Estado: "Recondicionado",
              },
              prices: [
                {
                  amount: product.price,
                  currency_code: "eur",
                },
              ],
            },
          ],
          sales_channels: [
            {
              id: salesChannel.id,
            },
          ],
        }
      }),
    },
  })

  logger.info(`Created ${productsToCreate.length} Secunstore test products.`)
}
