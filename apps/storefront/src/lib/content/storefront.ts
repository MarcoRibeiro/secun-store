export const defaultLocale = "pt"

export const storefrontContent = {
  pt: {
    nav: {
      shop: "Loja",
      collections: "Coleções",
      about: "Sobre nós",
      shopAll: "Ver tudo",
      bag: "Carrinho",
      account: "Conta",
      search: "Pesquisar",
    },
    home: {
      heroEyebrow: "Reparação e tecnologia recondicionada",
      heroTitle: "Damos nova vida aos teus equipamentos.",
      heroText:
        "Reparação de computadores, smartphones e tablets, com artigos em segunda mão selecionados, testados e prontos a usar.",
      heroCta: "Ver produtos",
      featuredEyebrow: "Destaque",
      featuredFallback: "Equipamentos testados e prontos a usar",
      statOne: "Reparações rápidas",
      statTwo: "Artigos verificados",
      collectionsEyebrow: "Coleções",
      collectionsTitle: "Explora por tipo de equipamento",
      collectionsCta: "Ver tudo",
      collectionLabel: "Coleção",
      collectionDescription:
        "Equipamentos e acessórios selecionados para esta categoria.",
      promoEyebrow: "Serviços e usados",
      promoTitle:
        "Repara o teu equipamento ou encontra uma alternativa em segunda mão.",
      promoCta: "Explorar loja",
      productsEyebrow: "Produtos",
      productsTitle: "Produtos em destaque",
    },
    listing: {
      shopEyebrow: "Loja",
      allProducts: "Todos os produtos",
      sort: "Ordenar",
      category: "Categoria",
      allCategories: "Todas as categorias",
      latest: "Mais recentes",
      priceLowHigh: "Preço: menor para maior",
      priceHighLow: "Preço: maior para menor",
      categoryLabel: "Categoria",
      collectionLabel: "Coleção",
    },
    search: {
      title: "Pesquisa",
      placeholder: "Pesquisar produtos ou serviços",
      quickLinks: "Acessos rápidos",
      recommended: "Recomendados",
      shopAll: "Ver loja",
      about: "Sobre nós",
      viewProduct: "Ver produto",
      resultsTitle: "Resultados para",
      empty: "Não encontrámos produtos. Tenta pesquisar por outro termo.",
    },
    about: {
      title: "Sobre nós",
      description: "Conhece melhor a nossa loja.",
      eyebrow: "Sobre nós",
      heading: "Reparação, reutilização e tecnologia com mais vida.",
      intro:
        "Somos uma loja especializada em reparação de computadores, smartphones e equipamentos eletrónicos, com venda de artigos em segunda mão revistos e preparados para voltar ao dia a dia.",
      cards: [
        {
          title: "Reparação técnica",
          text: "Diagnóstico e intervenção em computadores, smartphones, tablets e acessórios.",
        },
        {
          title: "Segunda mão verificada",
          text: "Equipamentos testados, limpos e selecionados antes de chegarem à loja.",
        },
        {
          title: "Apoio próximo",
          text: "Ajuda direta para escolher, reparar ou substituir o equipamento certo.",
        },
      ],
      cta: "Explorar produtos",
    },
    footer: {
      description:
        "Reparação técnica e venda de equipamentos recondicionados ou em segunda mão.",
      categories: "Categorias",
      collections: "Coleções",
      company: "Empresa",
      about: "Sobre nós",
      shop: "Loja",
      bag: "Carrinho",
      rights: "Todos os direitos reservados.",
    },
    account: {
      registerTitle: "Criar conta Secunstore",
      registerText:
        "Cria o teu perfil para acompanhares encomendas, dados de contacto e uma experiência de compra mais simples.",
      termsIntro: "Ao criar uma conta, aceitas a",
      privacy: "Política de Privacidade",
      terms: "Termos de Utilização",
      join: "Criar conta",
      alreadyMember: "Já tens conta?",
      signIn: "Entrar",
    },
  },
} as const

export type StorefrontLocale = keyof typeof storefrontContent

export function getStorefrontContent(locale: StorefrontLocale = defaultLocale) {
  return storefrontContent[locale]
}
