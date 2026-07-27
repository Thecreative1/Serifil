export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const translations = {
  pt: {
    htmlLang: "pt-PT",
    meta: {
      title: "Serifil | Serigrafia em PVC, Tecido e TNT em Guimarães",
      description:
        "Impressão e personalização em PVC, tecido e TNT para sacos, capas, porta-fatos, componentes e outras aplicações. Produção em Guimarães para empresas e marcas, incluindo o setor do calçado.",
      openGraphDescription:
        "Impressão personalizada em PVC, tecido e TNT para empresas, marcas e diferentes setores de atividade, incluindo soluções para o setor do calçado.",
      imageAlt: "Processo de serigrafia na SERIFIL",
      locale: "pt_PT",
    },
    businessDescription:
      "Serigrafia e personalização em PVC, tecido e TNT para sacos, capas, componentes e outras aplicações.",
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
      eyebrow: "ESPECIALISTAS EM SERIGRAFIA E PERSONALIZAÇÃO",
      lineOne: "Imprimimos ideias.",
      lineTwo: "Entregamos resultados.",
      description:
        "Impressão e personalização em PVC, tecido e TNT para sacos, capas, porta-fatos, componentes e outras aplicações destinadas a empresas e marcas.",
      quote: "Pedir orçamento",
      work: "Ver trabalhos",
      specialties: "PVC · Tecido · TNT · Componentes · Personalização",
      imageAlt: "Processo de serigrafia com tinta a ser puxada através de uma tela",
      continueLabel: "Continuar para a introdução",
    },
    marquee: {
      line: "PVC · TECIDO · TNT · SACOS PERSONALIZADOS · CAPAS · PORTA-FATOS · COMPONENTES · SETOR DO CALÇADO · PRODUÇÃO EM GUIMARÃES ·",
      label:
        "Especialidades da Serifil: impressão em PVC, tecido e TNT, sacos personalizados, capas, porta-fatos, componentes e soluções para o setor do calçado",
    },
    introduction: {
      eyebrow: "DA IDEIA AO RESULTADO FINAL",
      title: "Impressão adaptada a diferentes materiais e aplicações.",
      description:
        "Trabalhamos com empresas e marcas de diferentes setores, incluindo o setor do calçado, produzindo impressão em PVC, tecido e TNT para sacos, capas, porta-fatos, componentes e outras aplicações, com acompanhamento técnico e comunicação direta.",
    },
    services: {
      eyebrow: "ESPECIALIDADE PRINCIPAL",
      title: "Impressão e personalização para diferentes setores.",
      description:
        "Produzimos sacos, capas, porta-fatos, componentes e outros artigos personalizados em PVC, tecido e TNT, incluindo soluções específicas para o setor do calçado.",
      otherServices: "OUTROS SERVIÇOS",
      quote: "Pedir orçamento",
      shortQuote: "Orçamento",
      quoteLabel: "Pedir orçamento para",
      items: [
        {
          number: "01",
          title: "Sacos em PVC, tecido e TNT",
          description:
            "Impressão de logótipos e elementos de marca em sacos para apresentação, proteção, acondicionamento e utilização promocional.",
          emphasis: "primary",
          label: "Principal especialidade",
        },
        {
          number: "02",
          title: "Capas e porta-fatos",
          description:
            "Impressão em capas e porta-fatos de tecido ou TNT para vestuário, hotelaria, comércio, marcas e confeção.",
          emphasis: "supporting",
          label: "Produção frequente",
        },
        {
          number: "03",
          title: "Componentes para calçado",
          description:
            "Impressão e personalização de palmilhas, palas e outros componentes utilizados na produção de calçado.",
          emphasis: "supporting",
          label: "Produção especializada",
        },
        {
          number: "04",
          title: "Serigrafia têxtil e roupa profissional",
          description:
            "Impressão em t-shirts, sweatshirts, uniformes, vestuário profissional e outros artigos têxteis.",
          emphasis: "complementary",
          label: "Serviço complementar",
        },
        {
          number: "05",
          title: "Produção personalizada para empresas",
          description:
            "Impressão de artigos para empresas, marcas, hotelaria, comércio, associações, campanhas e eventos, adaptada a cada projeto.",
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
      title: "Soluções para empresas, marcas e diferentes setores.",
      description:
        "Cada trabalho é acompanhado desde o ficheiro inicial até ao resultado final, com atenção ao material, à técnica e à aplicação pretendida, incluindo soluções específicas para o setor do calçado.",
      items: [
        {
          category: "Sacos",
          name: "Sacos em PVC, tecido e TNT",
          technique: "Serigrafia em diferentes materiais",
          description:
            "Personalização de sacos para apresentação, proteção, embalagem, hotelaria, comércio e ações promocionais.",
        },
        {
          category: "Vestuário",
          name: "Capas e porta-fatos",
          technique: "Impressão em tecido e TNT",
          description:
            "Aplicação de logótipos em capas e porta-fatos destinados a vestuário, hotelaria, lojas e confeção.",
        },
        {
          category: "Calçado",
          name: "Componentes para calçado",
          technique: "Impressão em componentes",
          description:
            "Impressão e personalização de palmilhas, palas e outros componentes utilizados na produção de calçado.",
        },
        {
          category: "Têxtil",
          name: "Roupa profissional",
          technique: "Serigrafia têxtil",
          description:
            "Personalização de vestuário profissional para empresas, equipas, restauração, construção e outros setores.",
        },
        {
          category: "Empresas",
          name: "Produções personalizadas",
          technique: "Produção por projeto",
          description:
            "Soluções personalizadas para empresas, marcas, hotelaria, campanhas, eventos e outras aplicações.",
        },
        {
          category: "Sinalética",
          name: "Placas gravadas",
          technique: "Gravação laser",
          description: "Gravação precisa em madeira e acrílico para placas e sinalética.",
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
      title: "Da ideia ao resultado final.",
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
        "A Serifil é uma empresa de serigrafia e personalização em Guimarães, com experiência em impressão sobre PVC, tecido e TNT. Produzimos sacos, capas, porta-fatos, artigos têxteis e outras soluções para empresas, fábricas e marcas de diferentes setores. Trabalhamos também com o setor do calçado, nomeadamente na personalização de sacos, palmilhas, palas e outros componentes.",
      principles: [
        ["01", "Produção local"],
        ["02", "Comunicação direta"],
        ["03", "Acompanhamento técnico"],
      ],
    },
    quoteCta: {
      eyebrow: "VAMOS PRODUZIR",
      title: "Precisa de impressão personalizada?",
      description:
        "Indique o produto, o material, as medidas, a quantidade e as cores de impressão para receber uma análise inicial.",
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
        "Indique o produto, o material, as medidas, a quantidade, o número de cores e outras informações úteis.",
      privacy: "Autorizo o tratamento destes dados para resposta ao pedido de orçamento.",
      submissionError: "Não foi possível enviar o pedido. Verifique a ligação e tente novamente.",
      submitting: "A enviar pedido",
      submit: "Enviar pedido",
      subject: "Novo pedido de orçamento através do site Serifil",
      serviceOptions: [
        "Sacos em PVC, tecido e TNT",
        "Capas e porta-fatos",
        "Componentes para calçado",
        "Serigrafia têxtil e roupa profissional",
        "Produção personalizada para empresas",
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
      directContact: "Contacto direto",
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
      formRequests: "Orçamentos por formulário, telefone ou WhatsApp",
      rights: "Todos os direitos reservados.",
      production: "Produção e personalização em Guimarães.",
    },
  },
  en: {
    htmlLang: "en",
    meta: {
      title: "Serifil | PVC, Fabric and Non-Woven Screen Printing",
      description:
        "Printing and customisation on PVC, fabric and non-woven materials for bags, covers, footwear components and other applications. Produced in Guimarães, Portugal, for businesses and brands across different industries.",
      openGraphDescription:
        "Custom printing on PVC, fabric and non-woven materials for businesses, brands and different industries, including specialist solutions for the footwear sector.",
      imageAlt: "Screen-printing process at SERIFIL",
      locale: "en_GB",
    },
    businessDescription:
      "Screen printing and customisation on PVC, fabric and non-woven materials for bags, covers, components and other applications.",
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
      eyebrow: "SPECIALISTS IN SCREEN PRINTING AND CUSTOMISATION",
      lineOne: "We print ideas.",
      lineTwo: "We deliver results.",
      description:
        "Printing and customisation on PVC, fabric and non-woven materials for bags, covers, garment bags, components and other applications for businesses and brands.",
      quote: "Request a quote",
      work: "View our work",
      specialties: "PVC · Fabric · Non-woven · Components · Customisation",
      imageAlt: "Ink being pulled across a screen during the screen-printing process",
      continueLabel: "Continue to the introduction",
    },
    marquee: {
      line: "PVC · FABRIC · NON-WOVEN · CUSTOM BAGS · COVERS · GARMENT BAGS · COMPONENTS · FOOTWEAR SECTOR · MADE IN GUIMARÃES ·",
      label:
        "Serifil specialities: printing on PVC, fabric and non-woven materials, custom bags, covers, garment bags, components and solutions for the footwear sector",
    },
    introduction: {
      eyebrow: "FROM IDEA TO FINAL RESULT",
      title: "Printing adapted to different materials and applications.",
      description:
        "We work with businesses and brands across different industries, including the footwear sector, printing on PVC, fabric and non-woven materials for bags, covers, garment bags, components and other applications, with technical guidance and direct communication.",
    },
    services: {
      eyebrow: "CORE SPECIALITY",
      title: "Printing and customisation for different industries.",
      description:
        "We produce customised bags, covers, garment bags, components and other items in PVC, fabric and non-woven materials, including specialist solutions for the footwear industry.",
      otherServices: "OTHER SERVICES",
      quote: "Request a quote",
      shortQuote: "Quote",
      quoteLabel: "Request a quote for",
      items: [
        {
          number: "01",
          title: "PVC, fabric and non-woven bags",
          description:
            "Logos and brand elements printed on bags for presentation, protection, packaging and promotional use.",
          emphasis: "primary",
          label: "Core speciality",
        },
        {
          number: "02",
          title: "Covers and garment bags",
          description:
            "Printing on fabric and non-woven covers and garment bags for clothing, hospitality, retail, brands and manufacturers.",
          emphasis: "supporting",
          label: "Regular production",
        },
        {
          number: "03",
          title: "Footwear components",
          description:
            "Printing and customisation of insoles, uppers and other components used in footwear production.",
          emphasis: "supporting",
          label: "Specialist production",
        },
        {
          number: "04",
          title: "Textile printing and workwear",
          description:
            "Printing on T-shirts, sweatshirts, uniforms, professional clothing and other textile items.",
          emphasis: "complementary",
          label: "Additional service",
        },
        {
          number: "05",
          title: "Custom production for businesses",
          description:
            "Custom printing for businesses, brands, hospitality, retail, associations, campaigns and events, adapted to each project.",
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
      title: "Solutions for businesses, brands and different industries.",
      description:
        "Every project is supported from the initial artwork to the final result, with close attention to the material, technique and intended application, including specialist solutions for the footwear sector.",
      items: [
        {
          category: "Bags",
          name: "PVC, fabric and non-woven bags",
          technique: "Screen printing on different materials",
          description:
            "Custom bags for presentation, protection, packaging, hospitality, retail and promotional campaigns.",
        },
        {
          category: "Clothing",
          name: "Covers and garment bags",
          technique: "Printing on fabric and non-woven materials",
          description:
            "Logos printed on covers and garment bags for clothing, hospitality, retail and manufacturing.",
        },
        {
          category: "Footwear",
          name: "Footwear components",
          technique: "Component printing",
          description:
            "Printing and customisation of insoles, uppers and other components used in footwear production.",
        },
        {
          category: "Textiles",
          name: "Workwear",
          technique: "Textile screen printing",
          description:
            "Custom workwear for businesses, teams, hospitality, construction and other industries.",
        },
        {
          category: "Businesses",
          name: "Custom production",
          technique: "Project-based production",
          description:
            "Custom solutions for businesses, brands, hospitality, campaigns, events and other applications.",
        },
        {
          category: "Signage",
          name: "Engraved signs",
          technique: "Laser engraving",
          description: "Precise engraving on wood and acrylic for plaques and signage.",
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
      title: "Production experience. New ambition.",
      description:
        "Serifil is a screen-printing and customisation company based in Guimarães, Portugal, with experience printing on PVC, fabric and non-woven materials. We produce bags, covers, garment bags, textile items and other solutions for businesses, factories and brands across different industries. We also serve the footwear sector, including the customisation of shoe bags, insoles, uppers and other components.",
      principles: [
        ["01", "Local production"],
        ["02", "Direct communication"],
        ["03", "Technical guidance"],
      ],
    },
    quoteCta: {
      eyebrow: "LET'S MAKE IT",
      title: "Need custom printing?",
      description:
        "Tell us the product, material, dimensions, quantity and print colours for an initial assessment.",
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
        "Include the product, material, dimensions, quantity, number of print colours and any other useful details.",
      privacy: "I authorise the use of this data to reply to my quote request.",
      submissionError: "We could not send your request. Check your connection and try again.",
      submitting: "Sending request",
      submit: "Send request",
      subject: "New quote request from the Serifil website",
      serviceOptions: [
        "PVC, fabric and non-woven bags",
        "Covers and garment bags",
        "Footwear components",
        "Textile printing and workwear",
        "Custom production for businesses",
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
      directContact: "Direct contact",
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
      formRequests: "Quotes via form, phone or WhatsApp",
      rights: "All rights reserved.",
      production: "Production and customisation in Guimarães, Portugal.",
    },
  },
};

export type SiteContent = (typeof translations)[Locale];
