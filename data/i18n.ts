export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const translations = {
  pt: {
    htmlLang: "pt-PT",
    meta: {
      title: "SERIFIL | Serigrafia em PVC, Tecido e TNT em Guimarães",
      description:
        "A SERIFIL é uma empresa de serigrafia e personalização em Guimarães, especializada em PVC, tecido e TNT para sacos, capas e componentes para calçado.",
      openGraphDescription:
        "Impressão personalizada em PVC, tecido e TNT para empresas, marcas e diferentes setores de atividade, incluindo soluções para o setor do calçado.",
      imageAlt: "Processo de serigrafia na SERIFIL",
      locale: "pt_PT",
    },
    businessDescription:
      "A SERIFIL é uma empresa de serigrafia e personalização em Guimarães, Portugal, especializada em impressão sobre PVC, tecido e TNT para empresas e marcas.",
    header: {
      descriptor: "Serigrafia & Personalização",
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
        { href: "#sobre", label: "Sobre" },
        { href: "#contacto", label: "Contacto" },
      ],
    },
    hero: {
      eyebrow: "ESPECIALISTAS EM SERIGRAFIA E PERSONALIZAÇÃO",
      lineOne: "Imprimimos ideias.",
      lineTwo: "Entregamos resultados.",
      description:
        "Impressão e personalização em PVC, tecido e TNT para sacos, capas, porta-fatos e outras aplicações destinadas a empresas e marcas, além de diferentes componentes para calçado.",
      quote: "Pedir orçamento",
      work: "Ver trabalhos",
      specialties: "PVC · Tecido · TNT · Componentes · Personalização",
      imageAlt: "Processo de serigrafia com tinta a ser puxada através de uma tela",
      continueLabel: "Continuar para a introdução",
    },
    marquee: {
      line: "PVC · TECIDO · TNT · SACOS PERSONALIZADOS · CAPAS · PORTA-FATOS · COMPONENTES · SETOR DO CALÇADO · PRODUÇÃO EM GUIMARÃES ·",
      label:
        "Especialidades da Serifil: impressão em PVC, tecido e TNT, sacos personalizados, capas, porta-fatos e diferentes componentes para o setor do calçado",
    },
    introduction: {
      eyebrow: "DA IDEIA AO RESULTADO FINAL",
      title: "Impressão adaptada a diferentes materiais e aplicações.",
      description:
        "Trabalhamos com empresas e marcas de diferentes setores, incluindo o setor do calçado, realizando impressão em PVC, tecido e TNT para sacos, capas, porta-fatos e outras aplicações, assim como em diferentes componentes utilizados na produção de calçado, com acompanhamento técnico e comunicação direta.",
    },
    services: {
      eyebrow: "ESPECIALIDADE PRINCIPAL",
      title: "Impressão e personalização para diferentes setores.",
      description:
        "Produzimos sacos, capas, porta-fatos e outros artigos personalizados em PVC, tecido e TNT, incluindo impressão em diferentes componentes para o setor do calçado.",
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
      title: "Serigrafia e personalização em Guimarães.",
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
      privacy: "Autorizo o tratamento destes dados para que a SERIFIL possa responder ao meu pedido de orçamento.",
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
      formRequests: "Orçamentos por formulário, e-mail, telefone ou WhatsApp",
      rights: "Todos os direitos reservados.",
      production: "Produção e personalização em Guimarães.",
      cookiePreferences: "Preferências de cookies",
      legal: {
        title: "Informação legal",
        commercialName: "Nome comercial",
        owner: "Titular da atividade",
        taxId: "NIF",
        activity: "Atividade",
        activityValue: "Serigrafia, impressão e personalização",
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
      title: "SERIFIL | PVC, Fabric and Non-Woven Screen Printing",
      description:
        "SERIFIL is a screen-printing and customisation company in Guimarães, Portugal, specialising in PVC, fabric and non-woven materials for businesses and brands.",
      openGraphDescription:
        "Custom printing on PVC, fabric and non-woven materials for businesses and brands across a range of industries, including specialist solutions for the footwear sector.",
      imageAlt: "Screen-printing process at SERIFIL",
      locale: "en_GB",
    },
    businessDescription:
      "SERIFIL is a screen-printing and customisation company in Guimarães, Portugal, specialising in PVC, fabric and non-woven materials for businesses and brands.",
    header: {
      descriptor: "Screen Printing & Customisation",
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
        { href: "#sobre", label: "About" },
        { href: "#contacto", label: "Contact" },
      ],
    },
    hero: {
      eyebrow: "SPECIALISTS IN SCREEN PRINTING AND CUSTOMISATION",
      lineOne: "We print ideas.",
      lineTwo: "We deliver results.",
      description:
        "Printing and customisation on PVC, fabric and non-woven materials for bags, covers, garment bags and other applications for businesses and brands, as well as a range of footwear components.",
      quote: "Request a quote",
      work: "View our work",
      specialties: "PVC · Fabric · Non-woven · Components · Customisation",
      imageAlt: "Ink being pulled across a screen during the screen-printing process",
      continueLabel: "Continue to the introduction",
    },
    marquee: {
      line: "PVC · FABRIC · NON-WOVEN · CUSTOM BAGS · COVERS · GARMENT BAGS · COMPONENTS · FOOTWEAR SECTOR · MADE IN GUIMARÃES ·",
      label:
        "Serifil specialities: printing on PVC, fabric and non-woven materials, custom bags, covers, garment bags and different components for the footwear sector",
    },
    introduction: {
      eyebrow: "FROM IDEA TO FINAL RESULT",
      title: "Printing adapted to different materials and applications.",
      description:
        "We work with businesses and brands across a range of industries, including the footwear sector, printing on PVC, fabric and non-woven materials for bags, covers, garment bags and other applications, as well as on a range of components used in footwear production, with technical guidance and direct communication.",
    },
    services: {
      eyebrow: "CORE SPECIALITY",
      title: "Printing and customisation for a range of industries.",
      description:
        "We produce customised bags, covers, garment bags and other items in PVC, fabric and non-woven materials, including printing on a range of components for the footwear industry.",
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
            "Printing and customisation of insoles, vamps and other components used in footwear production.",
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
      title: "Screen printing and customisation in Guimarães.",
      description:
        "Serifil is a screen-printing and customisation company based in Guimarães, Portugal, with experience printing on PVC, fabric and non-woven materials. We produce bags, covers, garment bags, textile items and other solutions for businesses, manufacturers and brands across a range of industries. We also serve the footwear sector, including the customisation of shoe bags, insoles, vamps and other components.",
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
      title: "Tell us what you need us to produce.",
      description:
        "The more detail you provide about the material, quantity and date, the more precise our initial assessment can be.",
      noteOne: "Include the product, material, quantity and required date.",
      noteTwo: "You can send production artwork after our first contact.",
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
      date: "Required date",
      message: "Message",
      messagePlaceholder:
        "Include the product, material, dimensions, quantity, number of print colours and any other useful details.",
      privacy: "I consent to the processing of this data so that SERIFIL can respond to my quote request.",
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
      formRequests: "Quotes via form, email, phone or WhatsApp",
      rights: "All rights reserved.",
      production: "Production and customisation in Guimarães, Portugal.",
      cookiePreferences: "Cookie preferences",
      legal: {
        title: "Legal information",
        commercialName: "Trading name",
        owner: "Business owner",
        taxId: "Portuguese tax number (NIF)",
        activity: "Activity",
        activityValue: "Screen printing, printing and customisation",
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
