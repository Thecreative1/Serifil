export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const translations = {
  pt: {
    htmlLang: "pt-PT",
    meta: {
      title: "Serigrafia e Impressão Industrial em Guimarães | SERIFIL",
      description:
        "SERIFIL – Serigrafia e impressão industrial em Guimarães. Impressão em PVC, têxtil, TNT, componentes, sacos, porta-fatos e outros suportes para empresas.",
      openGraphDescription:
        "Serigrafia e impressão industrial para empresas em Guimarães. Impressão em PVC, têxtil, TNT e componentes, sobre materiais fornecidos pelo cliente ou em projetos completos.",
      imageAlt: "Processo de serigrafia industrial na SERIFIL",
      locale: "pt_PT",
    },
    businessDescription:
      "A SERIFIL é uma empresa de serigrafia e impressão industrial em Guimarães, Portugal, especializada em impressão sobre PVC, têxtil, TNT e componentes para empresas, fábricas e marcas.",
    header: {
      descriptor: "Serigrafia & Impressão Industrial",
      homeLabel: "SERIFIL, voltar ao início",
      skipToContent: "Saltar para o conteúdo",
      navigationLabel: "Navegação principal",
      mobileNavigationLabel: "Navegação móvel",
      mobileDialogLabel: "Menu de navegação",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      quote: "Pedir orçamento",
      languageLabel: "Escolher idioma",
      nav: [
        { href: "#servicos", label: "Serviços" },
        { href: "#trabalhos", label: "Trabalhos" },
        { href: "#processo", label: "Processo" },
        { href: "/pt/guias/", label: "Guias" },
        { href: "#sobre", label: "Sobre" },
        { href: "#contacto", label: "Contacto" },
      ],
    },
    hero: {
      eyebrow: "SERIGRAFIA E IMPRESSÃO INDUSTRIAL PARA EMPRESAS",
      lineOne: "Serigrafia e impressão",
      lineTwo: "industrial em Guimarães",
      description:
        "Impressão em PVC, têxtil, TNT, componentes e diferentes suportes para produção industrial.",
      descriptionSecondary:
        "Trabalhamos sobre materiais fornecidos pelo cliente ou em projetos completos com fornecimento e personalização do suporte.",
      quote: "Pedir orçamento",
      work: "Conhecer serviços",
      specialties: "PVC · Têxtil · TNT · Componentes · Sacos · Porta-fatos",
      imageAlt: "Processo de serigrafia com tinta a ser puxada através de uma tela",
      continueLabel: "Continuar para a introdução",
    },
    marquee: {
      line: "SERIGRAFIA INDUSTRIAL · PVC · TÊXTIL · TNT · COMPONENTES · SACOS PERSONALIZADOS · PORTA-FATOS · CAPAS · PROJETOS ESPECIAIS · PRODUÇÃO EM GUIMARÃES ·",
      label:
        "Especialidades da Serifil: serigrafia industrial, impressão em PVC, têxtil e TNT, componentes, sacos personalizados, porta-fatos, capas e projetos especiais",
    },
    introduction: {
      eyebrow: "SERIGRAFIA E IMPRESSÃO INDUSTRIAL",
      title: "A sua produção. A nossa impressão.",
      description:
        "A SERIFIL é especializada em serigrafia e impressão industrial para empresas. Trabalhamos com diferentes materiais, formatos e aplicações, desde componentes e peças fornecidas pelo cliente até projetos completos que incluem o fornecimento e personalização do suporte.",
    },
    services: {
      eyebrow: "O QUE FAZEMOS",
      title: "Capacidade de impressão para produção industrial.",
      description:
        "Realizamos serigrafia e personalização em sacos, capas, porta-fatos, componentes e outros suportes, fornecidos pelo cliente ou integrados em projetos de produção.",
      otherServices: "APLICAÇÕES E PRODUTOS",
      quote: "Pedir orçamento",
      shortQuote: "Orçamento",
      quoteLabel: "Pedir orçamento para",
      items: [
        {
          number: "01",
          title: "Serigrafia Industrial",
          description:
            "Impressão serigráfica sobre peças, componentes e suportes fornecidos pelo cliente ou integrados em projetos de produção, com preparação técnica para cada material.",
          emphasis: "primary",
          label: "Especialidade principal",
        },
        {
          number: "02",
          title: "Impressão em PVC",
          description:
            "Impressão sobre PVC transparente ou colorido para embalagem, proteção, apresentação de produto e peças técnicas.",
          emphasis: "supporting",
          label: "Capacidade de impressão",
        },
        {
          number: "03",
          title: "Impressão em Têxtil",
          description:
            "Serigrafia sobre tecido para vestuário, roupa profissional, capas, sacos, têxtil-lar e outras peças de produção.",
          emphasis: "supporting",
          label: "Capacidade de impressão",
        },
        {
          number: "04",
          title: "Impressão em TNT",
          description:
            "Impressão sobre tecido não tecido para sacos, capas e soluções de proteção e comunicação de marca.",
          emphasis: "supporting",
          label: "Capacidade de impressão",
        },
        {
          number: "05",
          title: "Impressão em Componentes",
          description:
            "Impressão e personalização de palmilhas, palas e outros componentes utilizados em linhas de produção, nomeadamente na indústria do calçado.",
          emphasis: "complementary",
          label: "Aplicação",
        },
        {
          number: "06",
          title: "Sacos Personalizados",
          description:
            "Personalização e fornecimento de sacos para aplicações industriais, comerciais e promocionais, em PVC, têxtil ou TNT.",
          emphasis: "complementary",
          label: "Aplicação",
        },
        {
          number: "07",
          title: "Porta-fatos e Capas",
          description:
            "Impressão em porta-fatos, capas e coberturas de proteção para vestuário, confeção, hotelaria e comércio.",
          emphasis: "complementary",
          label: "Aplicação",
        },
        {
          number: "08",
          title: "Projetos Especiais e Produção Personalizada",
          description:
            "Soluções desenvolvidas em conjunto para requisitos específicos, incluindo séries especiais, artigos para campanhas e eventos, gravação e corte laser.",
          emphasis: "complementary",
          label: "Produção",
        },
      ],
    },
    workModes: {
      eyebrow: "COMO TRABALHAMOS",
      title: "Duas formas de avançar com o seu projeto.",
      items: [
        {
          label: "OPÇÃO 1",
          title: "O cliente fornece o material",
          description:
            "Recebemos as peças, componentes ou suportes e realizamos a impressão de acordo com as especificações do projeto.",
        },
        {
          label: "OPÇÃO 2",
          title: "Projeto completo",
          description:
            "Quando necessário, podemos estudar soluções que incluam o fornecimento do suporte e respetiva personalização.",
        },
      ],
      note:
        "O fornecimento de materiais ou produtos depende das características, quantidades e requisitos de cada projeto.",
    },
    sectors: {
      eyebrow: "SETORES",
      title: "Produção para empresas e indústria.",
      description:
        "Trabalhamos em regime B2B com empresas, fábricas e marcas que precisam de impressão integrada na sua produção.",
      items: [
        "Calçado",
        "Têxtil",
        "Têxtil-lar",
        "Embalagem",
        "Componentes industriais",
        "Comércio e distribuição",
        "Marcas e produtores",
      ],
    },
    portfolio: {
      eyebrow: "TRABALHOS",
      title: "Produção real, material a material.",
      description:
        "Uma seleção de trabalhos produzidos pela SERIFIL em PVC, tecido e TNT, com impressão adaptada ao material e à aplicação de cada projeto.",
      items: [
        {
          category: "PVC",
          name: "Impressão em PVC transparente",
          technique: "Serigrafia sobre PVC",
          description:
            "Aplicação de logótipos, elementos gráficos e informação técnica em peças transparentes para apresentação, embalagem e proteção.",
          images: [
            {
              src: "/images/trabalhos/pvc-01.webp",
              alt: "Peça em PVC transparente com impressão ornamental dourada",
            },
            {
              src: "/images/trabalhos/pvc-02.webp",
              alt: "Embalagem transparente em PVC personalizada com logótipo",
            },
            {
              src: "/images/trabalhos/pvc-03.webp",
              alt: "Detalhe de informação técnica impressa sobre PVC transparente",
            },
          ],
        },
        {
          category: "Tecido",
          name: "Capas e peças em tecido",
          technique: "Serigrafia têxtil",
          description:
            "Personalização de capas, sacos e outros suportes têxteis, com impressão de marca preparada para cada formato e cor de base.",
          images: [
            {
              src: "/images/trabalhos/tecido-01.webp",
              alt: "Tecido preto personalizado com impressão dourada",
            },
            {
              src: "/images/trabalhos/tecido-02.webp",
              alt: "Capa em tecido preto com logótipo branco",
            },
            {
              src: "/images/trabalhos/tecido-03.webp",
              alt: "Peça em tecido claro com texto impresso a preto",
            },
            {
              src: "/images/trabalhos/tecido-04.webp",
              alt: "Tecido cinzento-escuro personalizado com logótipo dourado",
            },
          ],
        },
        {
          category: "TNT",
          name: "Sacos personalizados em TNT",
          technique: "Serigrafia sobre não tecido",
          description:
            "Produção de sacos e capas em TNT com logótipos, mensagens e grafismos para apresentação, proteção e comunicação de marca.",
          images: [
            {
              src: "/images/trabalhos/tnt-02.webp",
              alt: "Saco preto em TNT com logótipo impresso a duas cores",
            },
            {
              src: "/images/trabalhos/tnt-03.webp",
              alt: "Saco preto em TNT com impressão branca",
            },
            {
              src: "/images/trabalhos/tnt-04.webp",
              alt: "Saco azul em TNT com logótipo branco",
            },
            {
              src: "/images/trabalhos/tnt-05.webp",
              alt: "Saco preto em TNT com impressão verde e branca",
            },
          ],
        },
      ],
    },
    benefits: {
      eyebrow: "PORQUÊ A SERIFIL",
      title: "Produção sem complicações.",
      advantage: "Vantagem",
      items: [
        {
          title: "Produção local em Guimarães",
          description: "Contacto próximo com quem acompanha e produz o trabalho.",
        },
        {
          title: "Acompanhamento técnico",
          description: "Verificamos ficheiros, dimensões, materiais e a solução de impressão adequada.",
        },
        {
          title: "Aprovação antes da produção",
          description: "Os detalhes do trabalho são confirmados antes de avançar para a máquina.",
        },
        {
          title: "Prazos claros",
          description: "A data pretendida é considerada logo na análise inicial do pedido.",
        },
        {
          title: "Solução adaptada",
          description: "A proposta considera o material, a quantidade e a utilização final.",
        },
      ],
    },
    process: {
      eyebrow: "COMO FUNCIONA",
      title: "Da ideia ao resultado final.",
      items: [
        { number: "01", title: "Pedido", description: "Indique o produto, a quantidade e a data pretendida." },
        { number: "02", title: "Orçamento", description: "Analisamos o trabalho e apresentamos uma proposta clara." },
        {
          number: "03",
          title: "Aprovação",
          description: "Confirmamos a arte final, as dimensões, as cores e os detalhes técnicos.",
        },
        { number: "04", title: "Produção", description: "O trabalho entra em produção depois da aprovação." },
        { number: "05", title: "Entrega", description: "A encomenda é preparada para levantamento ou envio." },
      ],
    },
    about: {
      eyebrow: "A SERIFIL",
      title: "Serigrafia e impressão industrial em Guimarães.",
      description:
        "A Serifil é uma empresa de serigrafia e impressão industrial em Guimarães, com experiência em impressão sobre PVC, têxtil, TNT e componentes. Trabalhamos sobre peças e suportes fornecidos pelo cliente e, quando o projeto o justifica, estudamos soluções completas que incluem o fornecimento e personalização de sacos, porta-fatos, capas e outros suportes para empresas, fábricas e marcas de diferentes setores, incluindo o calçado.",
      principles: [
        ["01", "Produção local"],
        ["02", "Comunicação direta"],
        ["03", "Acompanhamento técnico"],
      ],
    },
    quoteCta: {
      eyebrow: "VAMOS PRODUZIR",
      title: "Precisa de impressão para a sua produção?",
      description:
        "Indique o material, as medidas, a quantidade e o número de cores. Diga-nos também se fornece o material ou se precisa do fornecimento do suporte.",
      button: "Pedir orçamento",
      secondaryButton: "Fale connosco sobre o seu projeto",
    },
    quoteForm: {
      eyebrow: "PEDIDO DE ORÇAMENTO",
      title: "Conte-nos o que pretende produzir.",
      description:
        "Quanto mais informação enviar sobre o material, as dimensões, a quantidade e as cores, mais clara poderá ser a análise inicial.",
      noteOne: "Indique o material ou suporte, as dimensões, a quantidade e o número de cores.",
      noteTwo: "Diga-nos se fornece o material ou se precisa também do fornecimento do produto.",
      successTitle: "Pedido enviado.",
      successDescription:
        "Recebemos os detalhes do seu projeto e entraremos em contacto assim que possível.",
      anotherRequest: "Criar outro pedido",
      formLabel: "Formulário de pedido de orçamento",
      optional: "opcional",
      name: "Nome",
      company: "Empresa",
      email: "E-mail",
      phone: "Telefone",
      service: "Serviço pretendido",
      selectOption: "Selecione uma opção",
      quantity: "Quantidade aproximada",
      quantityPlaceholder: "Ex.: 250 unidades",
      material: "Material ou suporte",
      materialPlaceholder: "Ex.: PVC, tecido, TNT, componente",
      dimensions: "Dimensões",
      dimensionsPlaceholder: "Ex.: 30 x 40 cm",
      colors: "Número de cores",
      colorsPlaceholder: "Ex.: 2 cores",
      supply: "Fornecimento do material",
      supplyOptions: [
        "Forneço o material",
        "Preciso do fornecimento do material",
        "A definir",
      ],
      date: "Prazo pretendido",
      message: "Mensagem",
      messagePlaceholder:
        "Descreva o projeto: material ou suporte, medidas, quantidade, número de cores, se fornece o material e o prazo pretendido.",
      privacy: "Autorizo o tratamento destes dados para que a SERIFIL possa responder ao meu pedido de orçamento.",
      submissionError: "Não foi possível enviar o pedido. Verifique a ligação e tente novamente.",
      submitting: "A enviar pedido",
      submit: "Enviar pedido",
      subject: "Novo pedido de orçamento através do site Serifil",
      serviceOptions: [
        "Serigrafia industrial",
        "Impressão em PVC",
        "Impressão em têxtil",
        "Impressão em TNT",
        "Impressão em componentes",
        "Sacos personalizados",
        "Porta-fatos e capas",
        "Projetos especiais e produção personalizada",
        "Outro",
      ],
      errors: {
        name: "Indique o seu nome.",
        email: "Introduza um endereço de e-mail válido.",
        phone: "Indique um contacto telefónico.",
        service: "Selecione o serviço pretendido.",
        quantity: "Indique uma quantidade aproximada.",
        date: "Indique a data pretendida.",
        pastDate: "Escolha uma data a partir de hoje.",
        message: "Descreva o projeto com pelo menos 15 caracteres.",
        privacy: "É necessário autorizar o tratamento destes dados para enviar o pedido.",
      },
    },
    contact: {
      eyebrow: "CONTACTO",
      title: "Falamos do seu projeto?",
      descriptionPrefix: "Estamos em",
      descriptionSuffix:
        "Envie os detalhes através do formulário ou por e-mail para prepararmos a análise inicial.",
      location: "Localização",
      directContact: "Contacto direto",
      phone: "Telefone",
      call: "Ligar",
      email: "E-mail",
      whatsapp: "WhatsApp",
      whatsappMessage: "Olá SERIFIL! Queria pedir um orçamento. O meu projeto é:",
      whatsappMessageFloating: "Olá SERIFIL! Vi o vosso site e queria pedir um orçamento.",
      address: "Morada",
      hours: "Horário",
      instagram: "Instagram",
      visit: "VISITE-NOS",
      directions: "Obter direções",
      mapTitle: "Mapa com a localização da SERIFIL em Guimarães",
    },
    footer: {
      tagline: "A sua produção. A nossa impressão.",
      navigation: "Navegação",
      information: "Informação",
      formRequests: "Orçamentos por formulário, e-mail, telefone ou WhatsApp",
      rights: "Todos os direitos reservados.",
      production: "Serigrafia e impressão industrial em Guimarães.",
      cookiePreferences: "Preferências de cookies",
      legal: {
        title: "Informação legal",
        commercialName: "Nome comercial",
        owner: "Titular da atividade",
        taxId: "NIF",
        activity: "Atividade",
        activityValue: "Serigrafia, impressão industrial e personalização",
        address: "Morada do estabelecimento",
        email: "E-mail",
        phone: "Telefone",
      },
    },
    analytics: {
      ariaLabel: "Preferências de analítica",
      title: "Medição e privacidade",
      description:
        "Com a sua autorização, usamos o Google Analytics para perceber como o site é utilizado, melhorar o site e facilitar o contacto. Nunca enviamos os dados introduzidos no formulário.",
      reject: "Recusar",
      accept: "Aceitar cookies analíticos",
    },
  },
  en: {
    htmlLang: "en",
    meta: {
      title: "Industrial Screen Printing in Guimarães | SERIFIL",
      description:
        "SERIFIL – Industrial screen printing in Guimarães, Portugal. Printing on PVC, textiles, non-woven materials, components, bags, garment bags and other substrates for businesses.",
      openGraphDescription:
        "Industrial screen printing for businesses in Guimarães. Printing on PVC, textiles, non-woven materials and components, on materials supplied by the client or as complete projects.",
      imageAlt: "Industrial screen-printing process at SERIFIL",
      locale: "en_GB",
    },
    businessDescription:
      "SERIFIL is a screen-printing and industrial printing company in Guimarães, Portugal, specialising in printing on PVC, textiles, non-woven materials and components for businesses, manufacturers and brands.",
    header: {
      descriptor: "Screen Printing & Industrial Printing",
      homeLabel: "SERIFIL, back to the top",
      skipToContent: "Skip to content",
      navigationLabel: "Main navigation",
      mobileNavigationLabel: "Mobile navigation",
      mobileDialogLabel: "Navigation menu",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      quote: "Request a quote",
      languageLabel: "Choose language",
      nav: [
        { href: "#servicos", label: "Services" },
        { href: "#trabalhos", label: "Work" },
        { href: "#processo", label: "Process" },
        { href: "/en/guias/", label: "Guides" },
        { href: "#sobre", label: "About" },
        { href: "#contacto", label: "Contact" },
      ],
    },
    hero: {
      eyebrow: "INDUSTRIAL SCREEN PRINTING FOR BUSINESSES",
      lineOne: "Industrial screen",
      lineTwo: "printing in Guimarães",
      description:
        "Printing on PVC, textiles, non-woven materials, components and other substrates for industrial production.",
      descriptionSecondary:
        "We print on materials supplied by the client, or deliver complete projects that include supplying and customising the substrate.",
      quote: "Request a quote",
      work: "Explore services",
      specialties: "PVC · Textiles · Non-woven · Components · Bags · Garment bags",
      imageAlt: "Ink being pulled across a screen during the screen-printing process",
      continueLabel: "Continue to the introduction",
    },
    marquee: {
      line: "INDUSTRIAL SCREEN PRINTING · PVC · TEXTILES · NON-WOVEN · COMPONENTS · CUSTOM BAGS · GARMENT BAGS · COVERS · SPECIAL PROJECTS · MADE IN GUIMARÃES ·",
      label:
        "Serifil specialities: industrial screen printing, printing on PVC, textiles and non-woven materials, components, custom bags, garment bags, covers and special projects",
    },
    introduction: {
      eyebrow: "SCREEN PRINTING AND INDUSTRIAL PRINTING",
      title: "Your production. Our printing.",
      description:
        "SERIFIL specialises in screen printing and industrial printing for businesses. We work with different materials, formats and applications, from components and parts supplied by the client through to complete projects that include supplying and customising the substrate.",
    },
    services: {
      eyebrow: "WHAT WE DO",
      title: "Printing capacity for industrial production.",
      description:
        "We screen print and customise bags, covers, garment bags, components and other substrates, supplied by the client or integrated into production projects.",
      otherServices: "APPLICATIONS AND PRODUCTS",
      quote: "Request a quote",
      shortQuote: "Quote",
      quoteLabel: "Request a quote for",
      items: [
        {
          number: "01",
          title: "Industrial Screen Printing",
          description:
            "Screen printing on parts, components and substrates supplied by the client or integrated into production projects, with technical preparation for each material.",
          emphasis: "primary",
          label: "Core capability",
        },
        {
          number: "02",
          title: "PVC Printing",
          description:
            "Printing on clear or coloured PVC for packaging, protection, product presentation and technical parts.",
          emphasis: "supporting",
          label: "Printing capability",
        },
        {
          number: "03",
          title: "Textile Printing",
          description:
            "Screen printing on fabric for clothing, workwear, covers, bags, home textiles and other production items.",
          emphasis: "supporting",
          label: "Printing capability",
        },
        {
          number: "04",
          title: "Non-Woven Printing",
          description:
            "Printing on non-woven material for bags, covers and solutions for protection and brand communication.",
          emphasis: "supporting",
          label: "Printing capability",
        },
        {
          number: "05",
          title: "Component Printing",
          description:
            "Printing and customisation of insoles, vamps and other components used on production lines, including the footwear industry.",
          emphasis: "complementary",
          label: "Application",
        },
        {
          number: "06",
          title: "Custom Bags",
          description:
            "Customisation and supply of bags for industrial, retail and promotional use, in PVC, fabric or non-woven material.",
          emphasis: "complementary",
          label: "Application",
        },
        {
          number: "07",
          title: "Garment Bags and Covers",
          description:
            "Printing on garment bags, covers and protective covers for clothing, manufacturing, hospitality and retail.",
          emphasis: "complementary",
          label: "Application",
        },
        {
          number: "08",
          title: "Special Projects and Custom Production",
          description:
            "Solutions developed together for specific requirements, including special runs, items for campaigns and events, laser engraving and cutting.",
          emphasis: "complementary",
          label: "Production",
        },
      ],
    },
    workModes: {
      eyebrow: "HOW WE WORK",
      title: "Two ways to move your project forward.",
      items: [
        {
          label: "OPTION 1",
          title: "The client supplies the material",
          description:
            "We receive the parts, components or substrates and print them to the specifications of the project.",
        },
        {
          label: "OPTION 2",
          title: "Complete project",
          description:
            "When needed, we can develop solutions that include supplying the substrate and customising it.",
        },
      ],
      note:
        "Supplying materials or products depends on the characteristics, quantities and requirements of each project.",
    },
    sectors: {
      eyebrow: "SECTORS",
      title: "Production for businesses and industry.",
      description:
        "We work B2B with businesses, manufacturers and brands that need printing integrated into their production.",
      items: [
        "Footwear",
        "Textiles",
        "Home textiles",
        "Packaging",
        "Industrial components",
        "Retail and distribution",
        "Brands and manufacturers",
      ],
    },
    portfolio: {
      eyebrow: "OUR WORK",
      title: "Real work, one material at a time.",
      description:
        "A selection of work produced by SERIFIL in PVC, fabric and non-woven materials, with printing adapted to the material and intended application of each project.",
      items: [
        {
          category: "PVC",
          name: "Printing on clear PVC",
          technique: "Screen printing on PVC",
          description:
            "Logos, graphics and technical information printed on clear PVC items for presentation, packaging and protection.",
          images: [
            {
              src: "/images/trabalhos/pvc-01.webp",
              alt: "Clear PVC piece with an ornamental gold print",
            },
            {
              src: "/images/trabalhos/pvc-02.webp",
              alt: "Clear PVC packaging customised with a logo",
            },
            {
              src: "/images/trabalhos/pvc-03.webp",
              alt: "Detail of technical information printed on clear PVC",
            },
          ],
        },
        {
          category: "Fabric",
          name: "Fabric covers and textile items",
          technique: "Textile screen printing",
          description:
            "Customised covers, bags and other textile items, with each print adapted to the item format and base colour.",
          images: [
            {
              src: "/images/trabalhos/tecido-01.webp",
              alt: "Black fabric customised with a gold print",
            },
            {
              src: "/images/trabalhos/tecido-02.webp",
              alt: "Black fabric cover with a white logo",
            },
            {
              src: "/images/trabalhos/tecido-03.webp",
              alt: "Light fabric item with black printed lettering",
            },
            {
              src: "/images/trabalhos/tecido-04.webp",
              alt: "Dark grey fabric customised with a gold logo",
            },
          ],
        },
        {
          category: "Non-woven",
          name: "Custom non-woven bags",
          technique: "Screen printing on non-woven material",
          description:
            "Bags and covers produced in non-woven material with logos, messages and graphics for presentation, protection and brand communication.",
          images: [
            {
              src: "/images/trabalhos/tnt-02.webp",
              alt: "Black non-woven bag with a two-colour logo",
            },
            {
              src: "/images/trabalhos/tnt-03.webp",
              alt: "Black non-woven bag with white printing",
            },
            {
              src: "/images/trabalhos/tnt-04.webp",
              alt: "Blue non-woven bag with a white logo",
            },
            {
              src: "/images/trabalhos/tnt-05.webp",
              alt: "Black non-woven bag with green and white printing",
            },
          ],
        },
      ],
    },
    benefits: {
      eyebrow: "WHY SERIFIL",
      title: "Straightforward production.",
      advantage: "Benefit",
      items: [
        {
          title: "Local production in Guimarães",
          description: "Direct contact with the people managing and producing your order.",
        },
        {
          title: "Technical guidance",
          description: "We check artwork, dimensions, materials and the right printing solution.",
        },
        {
          title: "Approval before production",
          description: "Every detail is confirmed before the job reaches the machine.",
        },
        {
          title: "Clear timelines",
          description: "Your required delivery date is considered from the first assessment.",
        },
        {
          title: "A tailored solution",
          description: "Our proposal reflects the material, quantity and intended use.",
        },
      ],
    },
    process: {
      eyebrow: "HOW IT WORKS",
      title: "From idea to final result.",
      items: [
        { number: "01", title: "Brief", description: "Tell us the product, quantity and required date." },
        { number: "02", title: "Quote", description: "We assess the job and provide a clear proposal." },
        {
          number: "03",
          title: "Approval",
          description: "We confirm the design, dimensions, colours and technical details.",
        },
        { number: "04", title: "Production", description: "Production begins once the work is approved." },
        { number: "05", title: "Delivery", description: "Your order is prepared for collection or shipping." },
      ],
    },
    about: {
      eyebrow: "SERIFIL",
      title: "Industrial screen printing in Guimarães.",
      description:
        "Serifil is a screen-printing and industrial printing company based in Guimarães, Portugal, with experience printing on PVC, textiles, non-woven materials and components. We print on parts and substrates supplied by the client and, when the project calls for it, we study complete solutions that include supplying and customising bags, garment bags, covers and other substrates for businesses, manufacturers and brands across a range of industries, including footwear.",
      principles: [
        ["01", "Local production"],
        ["02", "Direct communication"],
        ["03", "Technical guidance"],
      ],
    },
    quoteCta: {
      eyebrow: "LET'S MAKE IT",
      title: "Need printing for your production?",
      description:
        "Tell us the material, dimensions, quantity and number of print colours. Let us know whether you supply the material or need the substrate supplied as well.",
      button: "Request a quote",
      secondaryButton: "Talk to us about your project",
    },
    quoteForm: {
      eyebrow: "QUOTE REQUEST",
      title: "Tell us what you need us to produce.",
      description:
        "The more detail you provide about the material, dimensions, quantity and colours, the more precise our initial assessment can be.",
      noteOne: "Include the material or substrate, dimensions, quantity and number of colours.",
      noteTwo: "Let us know whether you supply the material or also need the product supplied.",
      successTitle: "Request sent.",
      successDescription:
        "We have received your project details and will contact you as soon as possible.",
      anotherRequest: "Start another request",
      formLabel: "Quote request form",
      optional: "optional",
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      service: "Required service",
      selectOption: "Select an option",
      quantity: "Approximate quantity",
      quantityPlaceholder: "E.g. 250 units",
      material: "Material or substrate",
      materialPlaceholder: "E.g. PVC, fabric, non-woven, component",
      dimensions: "Dimensions",
      dimensionsPlaceholder: "E.g. 30 x 40 cm",
      colors: "Number of colours",
      colorsPlaceholder: "E.g. 2 colours",
      supply: "Material supply",
      supplyOptions: [
        "I supply the material",
        "I need the material supplied",
        "To be defined",
      ],
      date: "Required date",
      message: "Message",
      messagePlaceholder:
        "Describe the project: material or substrate, dimensions, quantity, number of colours, whether you supply the material and the required date.",
      privacy: "I consent to the processing of this data so that SERIFIL can respond to my quote request.",
      submissionError: "We could not send your request. Check your connection and try again.",
      submitting: "Sending request",
      submit: "Send request",
      subject: "New quote request from the Serifil website",
      serviceOptions: [
        "Industrial screen printing",
        "PVC printing",
        "Textile printing",
        "Non-woven printing",
        "Component printing",
        "Custom bags",
        "Garment bags and covers",
        "Special projects and custom production",
        "Other",
      ],
      errors: {
        name: "Enter your name.",
        email: "Enter a valid email address.",
        phone: "Enter a phone number.",
        service: "Select the required service.",
        quantity: "Enter an approximate quantity.",
        date: "Enter the required date.",
        pastDate: "Choose today or a future date.",
        message: "Describe your project in at least 15 characters.",
        privacy: "You must consent to the processing of this data to send your request.",
      },
    },
    contact: {
      eyebrow: "CONTACT",
      title: "Shall we discuss your project?",
      descriptionPrefix: "We are based in",
      descriptionSuffix: "Send the details through the form or by email for an initial assessment.",
      location: "Location",
      directContact: "Direct contact",
      phone: "Phone",
      call: "Call",
      email: "Email",
      whatsapp: "WhatsApp",
      whatsappMessage: "Hello SERIFIL! I'd like a quote. My project is:",
      whatsappMessageFloating: "Hello SERIFIL! I found you through your website and I'd like a quote.",
      address: "Address",
      hours: "Opening hours",
      instagram: "Instagram",
      visit: "VISIT US",
      directions: "Get directions",
      mapTitle: "Map showing SERIFIL's location in Guimarães",
    },
    footer: {
      tagline: "Your production. Our printing.",
      navigation: "Navigation",
      information: "Information",
      formRequests: "Quotes via form, email, phone or WhatsApp",
      rights: "All rights reserved.",
      production: "Screen printing and industrial printing in Guimarães, Portugal.",
      cookiePreferences: "Cookie preferences",
      legal: {
        title: "Legal information",
        commercialName: "Trading name",
        owner: "Business owner",
        taxId: "Portuguese tax number (NIF)",
        activity: "Activity",
        activityValue: "Screen printing, industrial printing and customisation",
        address: "Business address",
        email: "Email",
        phone: "Telephone",
      },
    },
    analytics: {
      ariaLabel: "Analytics preferences",
      title: "Measurement and privacy",
      description:
        "With your permission, we use Google Analytics to understand how the site is used, improve the site and make it easier to contact us. We never send the information entered in the form.",
      reject: "Reject",
      accept: "Accept analytics",
    },
  },
};

export type SiteContent = (typeof translations)[Locale];
