import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Loja",
  description:
    "Explora produtos em segunda mão, equipamentos recondicionados e acessórios.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    category_id?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page, category_id } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      categoryId={category_id}
      countryCode={params.countryCode}
    />
  )
}
