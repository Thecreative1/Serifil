export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const translations = {
  pt: {
    htmlLang: "pt-PT",
    meta: {
      title: "Serifil | Impressão de Sacos para Calçado em Guimarães",
      description:
        "Impressão e personalização de sacos em tecido para calçado, sacos plásticos e capas guarda-fatos em Guimarães. Peça um orçamento à Serifil.",
      openGraphDescription:
        "Sacos em tecido para calçado, sacos plásticos e capas guarda-fatos personalizados em Guimarães.",
      imageAlt: "Processo de serigrafia na SERIFIL",
      locale: "pt_PT",
    },
    businessDescription:
      "Serigrafia e personalização de sacos em tecido e plástico para o setor do calçado.",
    header: {
      descriptor: "Serigrafia & Personalização",
      homeLabel: "SERIFIL, voltar ao início",
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
        { href: "#sobre", label: "Sobre" },
        { href: "#contacto", label: "Contacto" },
      ],
    },
    hero: {
      eyebrow: "ESPECIALISTAS EM IMPRESSÃO DE SACOS TÊXTEIS E PLÁSTICOS",
      lineOne: "Imprimimos ideias.",
      lineTwo: "Entregamos resultados.",
      description:
        "Impressão e personalização de sacos em tecido para calçado, sacos plásticos e capas guarda-fatos para fábricas, marcas e empresas.",
      quote: "Pedir orçamento",
      work: "Ver trabalhos",
      specialties: "Sacos em tecido · Sacos plásticos · Capas guarda-fatos",
      imageAlt: "Processo de serigrafia com tinta a ser puxada através de uma tela",
      continueLabel: "Continuar para a introdução",
    },
    marquee: {
      line: "SACOS EM TECIDO PARA CALÇADO · SACOS PLÁSTICOS · CAPAS GUARDA-FATOS · SERIGRAFIA · PRODUÇÃO EM GUIMARÃES ·",
      label:
        "Especialidades: sacos em tecido para calçado, sacos plásticos, capas guarda-fatos e serigrafia em Guimarães",
    },
    introduction: {
      eyebrow: "DA IDEIA À PRODUÇÃO",
      title: "Impressão especializada para o setor do calçado.",
      description:
        "Trabalhamos sobretudo para o setor do calçado, imprimindo sacos em tecido, sacos plásticos e capas guarda-fatos com acompanhamento técnico e comunicação direta.",
    },
    services: {
      eyebrow: "ESPECIALIDADE PRINCIPAL",
      title: "Sacos personalizados para o setor do calçado.",
      description:
        "A maior parte do nosso trabalho concentra-se na impressão de sacos em tecido, sacos plásticos e capas guarda-fatos.",
      otherServices: "OUTROS SERVIÇOS",
      quote: "Pedir orçamento",
      shortQuote: "Orçamento",
      quoteLabel: "Pedir orçamento para",
      items: [
        {
          number: "01",
          title: "Sacos em tecido para calçado",
          description:
            "Impressão de logótipos e elementos de marca em sacos de tecido utilizados para proteger e apresentar calçado.",
          emphasis: "primary",
          label: "Principal especialidade",
        },
        {
          number: "02",
          title: "Sacos plásticos impressos",
          description:
            "Personalização de sacos plásticos para calçado, comércio e embalagem, de acordo com o material e a imagem pretendida.",
          emphasis: "supporting",
          label: "Produção frequente",
        },
        {
          number: "03",
          title: "Capas guarda-fatos",
          description:
            "Impressão em capas guarda-fatos, também conhecidas como porta-fatos, para marcas de vestuário, lojas e confeção.",
          emphasis: "supporting",
          label: "Produção especializada",
        },
        {
          number: "04",
          title: "Serigrafia têxtil e roupa profissional",
          description:
            "Impressão resistente para t-shirts, sweatshirts, uniformes e vestuário de equipas, comércio, construção e restauração.",
          emphasis: "complementary",
          label: "Serviço complementar",
        },
        {
          number: "05",
          title: "Merchandising e eventos",
          description:
            "Produção personalizada para empresas, associações, campanhas, festas, eventos e projetos locais, adaptada à necessidade de cada pedido.",
          emphasis: "complementary",
          label: "Serviço complementar",
        },
        {
          number: "06",
          title: "Gravação e corte laser",
          description:
            "Gravação e corte de madeira, acrílico e outros materiais para placas, brindes, decoração, protótipos e sinalética.",
          emphasis: "complementary",
          label: "Serviço complementar",
        },
      ],
    },
    portfolio: {
      eyebrow: "APLICAÇÕES",
      title: "Soluções pensadas para diferentes setores.",
      description:
        "Cada projeto é acompanhado desde o ficheiro inicial até à produção final, com atenção ao material, à técnica e ao resultado pretendido.",
      items: [
        {
          category: "Calçado",
          name: "Sacos em tecido para calçado",
          technique: "Serigrafia em tecido",
          description: "Impressão de marca em sacos de proteção destinados ao setor do calçado.",
        },
        {
          category: "Calçado",
          name: "Sacos plásticos impressos",
          technique: "Impressão em plástico",
          description: "Personalização de sacos plásticos para acondicionamento e apresentação de calçado.",
        },
        {
          category: "Vestuário",
          name: "Capas guarda-fatos",
          technique: "Impressão em capas",
          description: "Aplicação de logótipos em capas de proteção para fatos e outras peças de vestuário.",
        },
        {
          category: "Merchandising",
          name: "Sweatshirts personalizadas",
          technique: "Impressão direta",
          description: "Produção têxtil personalizada para marcas, equipas e iniciativas.",
        },
        {
          category: "Sinalética",
          name: "Placas gravadas",
          technique: "Gravação laser",
          description: "Gravação precisa em madeira e acrílico para placas e sinalética.",
        },
        {
          category: "Equipas",
          name: "Roupa profissional",
          technique: "Serigrafia têxtil",
          description: "Personalização coordenada para vestuário de trabalho e equipas.",
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
          description: "A data necessária é considerada logo na análise inicial do pedido.",
        },
        {
          title: "Solução adaptada",
          description: "A proposta considera o material, a quantidade e a utilização final.",
        },
      ],
    },
    process: {
      eyebrow: "COMO FUNCIONA",
      title: "Da ideia à peça final.",
      items: [
        { number: "01", title: "Pedido", description: "Indique o produto, a quantidade e a data pretendida." },
        { number: "02", title: "Orçamento", description: "Analisamos o trabalho e apresentamos uma proposta clara." },
        {
          number: "03",
          title: "Aprovação",
          description: "Confirmamos o design, as dimensões, as cores e os detalhes técnicos.",
        },
        { number: "04", title: "Produção", description: "O trabalho entra em produção depois da aprovação." },
        { number: "05", title: "Entrega", description: "A encomenda é preparada para levantamento ou envio." },
      ],
    },
    about: {
      eyebrow: "A SERIFIL",
      title: "Experiência de produção. Nova ambição.",
      description:
        "A Serifil é uma empresa de serigrafia e personalização em Guimarães, com experiência na impressão de sacos em tecido e plástico para o setor do calçado e de capas guarda-fatos. Trabalhamos também com empresas, equipas, associações e marcas que procuram acompanhamento próximo e comunicação direta.",
      principles: [
        ["01", "Produção local"],
        ["02", "Comunicação direta"],
        ["03", "Acompanhamento técnico"],
      ],
    },
    quoteCta: {
      eyebrow: "VAMOS PRODUZIR",
      title: "Precisa de sacos personalizados?",
      description:
        "Indique o material, as medidas, a quantidade e as cores de impressão para receber uma análise inicial.",
      button: "Pedir orçamento",
    },
    quoteForm: {
      eyebrow: "PEDIDO DE ORÇAMENTO",
      title: "Conte-nos o que pretende produzir.",
      description:
        "Quanto mais informação enviar sobre o material, a quantidade e a data, mais clara poderá ser a análise inicial.",
      noteOne: "Indique o produto, o material, a quantidade e a data pretendida.",
      noteTwo: "Depois do primeiro contacto poderá enviar os ficheiros de produção.",
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
      date: "Data pretendida",
      message: "Mensagem",
      messagePlaceholder:
        "Indique o tipo de saco, material, medidas, número de cores e outras informações úteis.",
      privacy: "Autorizo o tratamento destes dados para resposta ao pedido de orçamento.",
      submissionError: "Não foi possível enviar o pedido. Verifique a ligação e tente novamente.",
      submitting: "A enviar pedido",
      submit: "Enviar pedido",
      subject: "Novo pedido de orçamento através do site Serifil",
      serviceOptions: [
        "Sacos em tecido para calçado",
        "Sacos plásticos impressos",
        "Capas guarda-fatos",
        "Serigrafia têxtil",
        "Roupa profissional",
        "Merchandising",
        "Gravação ou corte laser",
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
        privacy: "É necessário aceitar o tratamento dos dados deste pedido.",
      },
    },
    contact: {
      eyebrow: "CONTACTO",
      title: "Falamos do seu projeto?",
      descriptionPrefix: "Estamos em",
      descriptionSuffix:
        "Envie os detalhes através do formulário para prepararmos a análise inicial.",
      location: "Localização",
      phone: "Telefone",
      call: "Ligar",
      email: "E-mail",
      whatsapp: "WhatsApp",
      address: "Morada",
      hours: "Horário",
      instagram: "Instagram",
      visit: "VISITE-NOS",
      directions: "Obter direções",
      mapTitle: "Mapa com a localização da SERIFIL em Guimarães",
    },
    footer: {
      tagline: "Imprimimos ideias. Entregamos resultados.",
      navigation: "Navegação",
      information: "Informação",
      formRequests: "Pedidos através do formulário",
      rights: "Todos os direitos reservados.",
      production: "Produção e personalização em Guimarães.",
    },
  },
  en: {
    htmlLang: "en",
    meta: {
      title: "Serifil | Custom Shoe Bags and Screen Printing in Portugal",
      description:
        "Custom printing for fabric shoe bags, plastic bags and garment covers in Guimarães, Portugal. Request a quote from Serifil.",
      openGraphDescription:
        "Custom fabric shoe bags, printed plastic bags and garment covers, produced in Guimarães, Portugal.",
      imageAlt: "Screen-printing process at SERIFIL",
      locale: "en_GB",
    },
    businessDescription:
      "Screen printing and customisation of fabric and plastic bags for the footwear industry.",
    header: {
      descriptor: "Screen Printing & Customisation",
      homeLabel: "SERIFIL, back to the top",
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
        { href: "#sobre", label: "About" },
        { href: "#contacto", label: "Contact" },
      ],
    },
    hero: {
      eyebrow: "SPECIALISTS IN PRINTED FABRIC AND PLASTIC BAGS",
      lineOne: "We print ideas.",
      lineTwo: "We deliver results.",
      description:
        "Printing and customisation of fabric shoe bags, plastic bags and garment covers for factories, brands and businesses.",
      quote: "Request a quote",
      work: "View our work",
      specialties: "Fabric bags · Plastic bags · Garment covers",
      imageAlt: "Ink being pulled across a screen during the screen-printing process",
      continueLabel: "Continue to the introduction",
    },
    marquee: {
      line: "FABRIC SHOE BAGS · PLASTIC BAGS · GARMENT COVERS · SCREEN PRINTING · MADE IN GUIMARÃES ·",
      label:
        "Specialities: fabric shoe bags, plastic bags, garment covers and screen printing in Guimarães",
    },
    introduction: {
      eyebrow: "FROM IDEA TO PRODUCTION",
      title: "Specialist printing for the footwear industry.",
      description:
        "We work primarily with the footwear industry, printing fabric bags, plastic bags and garment covers with technical guidance and direct communication.",
    },
    services: {
      eyebrow: "CORE SPECIALITY",
      title: "Custom bags for the footwear industry.",
      description:
        "Most of our work focuses on printing fabric bags, plastic bags and garment covers.",
      otherServices: "OTHER SERVICES",
      quote: "Request a quote",
      shortQuote: "Quote",
      quoteLabel: "Request a quote for",
      items: [
        {
          number: "01",
          title: "Fabric shoe bags",
          description:
            "Logos and brand elements printed on fabric bags designed to protect and present footwear.",
          emphasis: "primary",
          label: "Core speciality",
        },
        {
          number: "02",
          title: "Printed plastic bags",
          description:
            "Custom plastic bags for footwear, retail and packaging, matched to the chosen material and brand identity.",
          emphasis: "supporting",
          label: "Regular production",
        },
        {
          number: "03",
          title: "Garment covers",
          description:
            "Printed garment and suit covers for clothing brands, retailers and manufacturers.",
          emphasis: "supporting",
          label: "Specialist production",
        },
        {
          number: "04",
          title: "Textile printing and workwear",
          description:
            "Durable printing for T-shirts, sweatshirts, uniforms and clothing for teams, retail, construction and hospitality.",
          emphasis: "complementary",
          label: "Additional service",
        },
        {
          number: "05",
          title: "Merchandise and events",
          description:
            "Custom production for businesses, associations, campaigns, celebrations, events and local projects, tailored to each brief.",
          emphasis: "complementary",
          label: "Additional service",
        },
        {
          number: "06",
          title: "Laser engraving and cutting",
          description:
            "Wood, acrylic and other materials engraved or cut for signs, gifts, decoration and prototypes.",
          emphasis: "complementary",
          label: "Additional service",
        },
      ],
    },
    portfolio: {
      eyebrow: "APPLICATIONS",
      title: "Solutions for different industries.",
      description:
        "Every project is supported from the initial artwork to final production, with close attention to the material, technique and intended result.",
      items: [
        {
          category: "Footwear",
          name: "Fabric shoe bags",
          technique: "Fabric screen printing",
          description: "Brand printing on protective fabric bags made for the footwear industry.",
        },
        {
          category: "Footwear",
          name: "Printed plastic bags",
          technique: "Plastic printing",
          description: "Custom plastic bags for packaging and presenting footwear.",
        },
        {
          category: "Clothing",
          name: "Garment covers",
          technique: "Cover printing",
          description: "Logos printed on protective covers for suits and other garments.",
        },
        {
          category: "Merchandise",
          name: "Custom sweatshirts",
          technique: "Direct printing",
          description: "Custom textile production for brands, teams and initiatives.",
        },
        {
          category: "Signage",
          name: "Engraved signs",
          technique: "Laser engraving",
          description: "Precise engraving on wood and acrylic for plaques and signage.",
        },
        {
          category: "Teams",
          name: "Workwear",
          technique: "Textile screen printing",
          description: "Coordinated customisation for workwear and team clothing.",
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
      title: "From idea to finished piece.",
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
      title: "Production experience. New ambition.",
      description:
        "Serifil is a screen-printing and customisation company in Guimarães, Portugal, experienced in printing fabric and plastic bags for the footwear industry and garment covers. We also work with businesses, teams, associations and brands looking for attentive support and direct communication.",
      principles: [
        ["01", "Local production"],
        ["02", "Direct communication"],
        ["03", "Technical guidance"],
      ],
    },
    quoteCta: {
      eyebrow: "LET'S MAKE IT",
      title: "Need custom bags?",
      description:
        "Tell us the material, dimensions, quantity and print colours for an initial assessment.",
      button: "Request a quote",
    },
    quoteForm: {
      eyebrow: "QUOTE REQUEST",
      title: "Tell us what you need to produce.",
      description:
        "The more detail you provide about the material, quantity and date, the more precise our initial assessment can be.",
      noteOne: "Include the product, material, quantity and required date.",
      noteTwo: "You can send production artwork after our first contact.",
      successTitle: "Request sent.",
      successDescription:
        "We have received your project details and will contact you as soon as possible.",
      anotherRequest: "Create another request",
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
      date: "Required date",
      message: "Message",
      messagePlaceholder:
        "Include the bag type, material, dimensions, number of print colours and any other useful details.",
      privacy: "I authorise the use of this data to reply to my quote request.",
      submissionError: "We could not send your request. Check your connection and try again.",
      submitting: "Sending request",
      submit: "Send request",
      subject: "New quote request from the Serifil website",
      serviceOptions: [
        "Fabric shoe bags",
        "Printed plastic bags",
        "Garment covers",
        "Textile screen printing",
        "Workwear",
        "Merchandise",
        "Laser engraving or cutting",
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
        privacy: "You must accept the use of this data for your request.",
      },
    },
    contact: {
      eyebrow: "CONTACT",
      title: "Shall we discuss your project?",
      descriptionPrefix: "We are based in",
      descriptionSuffix: "Send the details through the form for an initial assessment.",
      location: "Location",
      phone: "Phone",
      call: "Call",
      email: "Email",
      whatsapp: "WhatsApp",
      address: "Address",
      hours: "Opening hours",
      instagram: "Instagram",
      visit: "VISIT US",
      directions: "Get directions",
      mapTitle: "Map showing SERIFIL's location in Guimarães",
    },
    footer: {
      tagline: "We print ideas. We deliver results.",
      navigation: "Navigation",
      information: "Information",
      formRequests: "Requests through the form",
      rights: "All rights reserved.",
      production: "Production and customisation in Guimarães, Portugal.",
    },
  },
};

export type SiteContent = (typeof translations)[Locale];
