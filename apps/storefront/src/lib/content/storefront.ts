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
      heroTitle: "Recondicionado não é sinónimo de risco.",
      heroText:
        "É uma escolha inteligente quando cada equipamento é verificado, testado e entregue com garantia. Na Secunstore reparamos tecnologia e vendemos artigos em segunda mão prontos a usar, sem surpresas na caixa.",
      heroCta: "Ver produtos",
      featuredEyebrow: "Destaque",
      featuredFallback: "Equipamentos testados e certificados",
      statOne: "Mais de 30 pontos de controlo",
      statTwo: "12 meses de garantia Secunstore",
      collectionsEyebrow: "Coleções",
      collectionsTitle: "Explora por tipo de equipamento",
      collectionsCta: "Ver tudo",
      collectionLabel: "Coleção",
      collectionDescription:
        "Equipamentos e acessórios selecionados, verificados e prontos a usar.",
      promoEyebrow: "Compra com tranquilidade",
      promoTitle:
        "Tecnologia de qualidade, verificada por nós, para que poupes sem abdicar da confiança.",
      promoText:
        "Cada produto passa por uma verificação cuidada ao ecrã, bateria, câmaras, ligações, botões, sensores e estrutura. Se não cumprir os nossos critérios, não entra na loja.",
      promoHighlights: [
        "Relatório detalhado do estado real do produto",
        "14 dias para devolução, como numa loja tradicional",
        "Envio seguro ou levantamento em loja",
      ],
      promoCta: "Explorar loja",
      productsEyebrow: "Produtos",
      productsTitle: "Recondicionados e usados em destaque",
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
      description:
        "Conhece a Secunstore: reparação técnica, tecnologia recondicionada e artigos em segunda mão verificados.",
      eyebrow: "Sobre nós",
      heading: "Reparamos, verificamos e damos uma segunda vida à tecnologia.",
      intro:
        "A Secunstore existe para tornar a compra de tecnologia usada mais transparente e segura. Trabalhamos com computadores, smartphones, tablets e acessórios, combinando reparação técnica com venda de equipamentos recondicionados ou em segunda mão, sempre avaliados por nós.",
      story:
        "Sabemos as dúvidas normais de quem compra usado: se a bateria dura, se há avarias escondidas, se o equipamento está mesmo em bom estado. Por isso, verificamos cada artigo com critérios claros, explicamos o estado real do produto e só colocamos à venda o que merece chegar às mãos do cliente.",
      cards: [
        {
          title: "Verificação rigorosa",
          text: "Mais de 30 pontos de controlo, incluindo ecrã, bateria, câmaras, ligações, botões, sensores e estrutura.",
        },
        {
          title: "Garantia e devolução",
          text: "Todos os artigos incluem 12 meses de garantia Secunstore e 14 dias para devolução.",
        },
        {
          title: "Reparação próxima",
          text: "Diagnóstico e intervenção em computadores, smartphones, tablets e acessórios, com apoio direto e claro.",
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
      addressTitle: "Morada",
      address: "Rua António Saldanha nº 119, Fafe",
      addressUrl:
        "https://www.google.com/maps?q=Rua+Ant%C3%B3nio+Saldanha+119,+Fafe",
      scheduleTitle: "Horário",
      schedule: "Seg-Sex: 10:00-13:00; 15:00-19:30",
      contactTitle: "Contacto",
      phone: "+351 911 179 900",
      phoneUrl: "tel:+351911179900",
      socialTitle: "Siga-nos",
      facebook: "Facebook",
      facebookUrl: "https://www.facebook.com/crcsmartphones/",
      instagram: "Instagram",
      instagramUrl: "https://www.instagram.com/secun.store/",
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
