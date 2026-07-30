import type { Locale } from "@/data/i18n";

export const serviceKeys = ["pvc", "fabric", "nonwoven", "footwear"] as const;

export type ServiceKey = (typeof serviceKeys)[number];

type ServiceImage = {
  src: string;
  alt: string;
};

export type ServicePageContent = {
  key: ServiceKey;
  slug: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  image: ServiceImage;
  introduction: {
    title: string;
    paragraphs: string[];
  };
  facts: Array<{
    label: string;
    value: string;
  }>;
  technique: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  applications: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    images: ServiceImage[];
  };
  preparation: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      label: string;
      value: string;
    }>;
  };
  questions: {
    eyebrow: string;
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
};

type ServicePageUi = {
  breadcrumbsLabel: string;
  home: string;
  services: string;
  quote: string;
  seeWork: string;
  realWork: string;
  relatedEyebrow: string;
  relatedTitle: string;
  relatedDescription: string;
  learnMore: string;
  materialGuides: string;
  materialGuidesDescription: string;
  quoteTitle: string;
};

const slugs: Record<Locale, Record<ServiceKey, string>> = {
  pt: {
    pvc: "serigrafia-pvc",
    fabric: "serigrafia-tecido",
    nonwoven: "sacos-tnt",
    footwear: "componentes-calcado",
  },
  en: {
    pvc: "pvc-screen-printing",
    fabric: "fabric-screen-printing",
    nonwoven: "non-woven-bags",
    footwear: "footwear-components",
  },
};

export const servicePageUi: Record<Locale, ServicePageUi> = {
  pt: {
    breadcrumbsLabel: "Navegação estrutural",
    home: "Início",
    services: "Serviços",
    quote: "Pedir orçamento",
    seeWork: "Ver trabalhos",
    realWork: "Produção real da SERIFIL",
    relatedEyebrow: "OUTROS MATERIAIS E APLICAÇÕES",
    relatedTitle: "Explore as restantes soluções.",
    relatedDescription:
      "Cada suporte pede uma preparação própria. Consulte as páginas relacionadas ou envie-nos uma amostra para avaliação.",
    learnMore: "Saber mais",
    materialGuides: "Guias de materiais e técnicas",
    materialGuidesDescription:
      "Perceba como trabalhamos cada suporte e que informação ajuda a preparar o seu projeto.",
    quoteTitle: "Tem um projeto neste material?",
  },
  en: {
    breadcrumbsLabel: "Breadcrumb navigation",
    home: "Home",
    services: "Services",
    quote: "Request a quote",
    seeWork: "See our work",
    realWork: "Real production by SERIFIL",
    relatedEyebrow: "OTHER MATERIALS AND APPLICATIONS",
    relatedTitle: "Explore our other solutions.",
    relatedDescription:
      "Each substrate requires its own preparation. Explore the related pages or send us a sample for assessment.",
    learnMore: "Learn more",
    materialGuides: "Material and technique guides",
    materialGuidesDescription:
      "Understand how each substrate is approached and what information helps us prepare your project.",
    quoteTitle: "Have a project for this material?",
  },
};

const portuguesePages: Record<ServiceKey, ServicePageContent> = {
  pvc: {
    key: "pvc",
    slug: slugs.pt.pvc,
    shortName: "Serigrafia em PVC",
    metaTitle: "Serigrafia em PVC para Sacos e Embalagens | Serifil",
    metaDescription:
      "Impressão serigráfica em PVC transparente ou colorido para sacos, capas, embalagem e proteção. Produção personalizada em Guimarães.",
    eyebrow: "SERIGRAFIA EM PVC · GUIMARÃES",
    title: "Impressão em PVC, preparada para o suporte real.",
    lead:
      "Personalização direta de logótipos, elementos gráficos e informação técnica em peças de PVC transparente ou colorido.",
    image: {
      src: "/images/trabalhos/pvc-01.webp",
      alt: "Peças de PVC transparente com impressão ornamental dourada produzidas pela SERIFIL",
    },
    introduction: {
      title: "O que é o PVC e porque exige preparação?",
      paragraphs: [
        "O PVC, policloreto de vinilo, pode apresentar-se em formulações rígidas ou flexíveis. Em sacos, capas e peças de proteção é frequente trabalhar com PVC flexível, transparente ou colorido.",
        "Na serigrafia, o resultado depende da relação entre a superfície, a tinta e a aplicação final. Espessura, flexibilidade, transparência, acabamento e estado do material influenciam a preparação. Por isso, uma amostra do suporte é a forma mais segura de avaliar o projeto.",
      ],
    },
    facts: [
      {
        label: "SUPORTE",
        value: "PVC transparente ou colorido, fornecido em peça ou amostra.",
      },
      {
        label: "IMPRESSÃO",
        value: "Logótipos, grafismos e informação técnica, a uma ou mais cores.",
      },
      {
        label: "APLICAÇÃO",
        value: "Sacos, capas, embalagem, apresentação e proteção de produto.",
      },
    ],
    technique: {
      eyebrow: "COMO FUNCIONA",
      title: "Da arte final à impressão.",
      description:
        "Na serigrafia, uma raclete força a tinta através das zonas abertas de uma tela preparada. Cada cor é trabalhada separadamente, o que exige alinhamento entre a arte, a peça e o suporte.",
      steps: [
        {
          title: "Avaliação do PVC",
          description:
            "Identificamos o tipo de peça, a superfície, a transparência, a flexibilidade e a utilização prevista.",
        },
        {
          title: "Preparação da arte",
          description:
            "Confirmamos dimensões, posição e cores. Quando existem várias cores, cada uma precisa da sua separação.",
        },
        {
          title: "Tela e impressão",
          description:
            "A imagem é preparada na tela e a tinta é transferida para o PVC através da malha.",
        },
        {
          title: "Secagem e verificação",
          description:
            "O método de secagem e a compatibilidade são definidos em função do material e do resultado pretendido.",
        },
      ],
    },
    applications: {
      eyebrow: "APLICAÇÕES",
      title: "Onde usamos a impressão em PVC.",
      description:
        "A geometria da peça e o acabamento pretendido são avaliados antes da produção.",
      items: [
        "Sacos transparentes para apresentação de produto",
        "Capas e bolsas de proteção",
        "Elementos de embalagem e acondicionamento",
        "Identificação de marca e informação técnica",
        "Peças promocionais em PVC",
      ],
    },
    gallery: {
      eyebrow: "TRABALHOS EM PVC",
      title: "Transparência, cor e leitura.",
      images: [
        {
          src: "/images/trabalhos/pvc-02.webp",
          alt: "Embalagem transparente em PVC personalizada com logótipo",
        },
        {
          src: "/images/trabalhos/pvc-03.webp",
          alt: "Informação técnica impressa sobre uma peça em PVC transparente",
        },
      ],
    },
    preparation: {
      eyebrow: "PREPARAR O PEDIDO",
      title: "O que precisamos de saber.",
      description:
        "Estes dados permitem avaliar o suporte e preparar um orçamento mais rigoroso.",
      items: [
        { label: "Peça", value: "Fotografia, amostra ou desenho com medidas." },
        { label: "Quantidade", value: "Número aproximado de unidades." },
        { label: "Impressão", value: "Tamanho, posição e número de cores." },
        { label: "Arte final", value: "Logótipo ou grafismo, de preferência em formato vetorial." },
        { label: "Utilização", value: "Como será usada, manipulada ou acondicionada a peça." },
      ],
    },
    questions: {
      eyebrow: "PERGUNTAS FREQUENTES",
      title: "Antes de imprimir em PVC.",
      items: [
        {
          question: "É possível imprimir em PVC transparente?",
          answer:
            "Sim. A transparência e a cor do suporte entram na preparação, porque influenciam a leitura das cores e do grafismo.",
        },
        {
          question: "Todas as peças de PVC são iguais?",
          answer:
            "Não. Formulação, acabamento, flexibilidade e estado da superfície podem variar. A avaliação de uma amostra reduz incertezas.",
        },
        {
          question: "Posso enviar a minha própria peça?",
          answer:
            "Sim. Envie uma fotografia com medidas e, quando necessário, uma amostra física para confirmar a solução adequada.",
        },
      ],
    },
  },
  fabric: {
    key: "fabric",
    slug: slugs.pt.fabric,
    shortName: "Serigrafia em tecido",
    metaTitle: "Serigrafia em Tecido e Roupa Profissional | Serifil",
    metaDescription:
      "Serigrafia em tecido para sacos, capas, porta-fatos, vestuário e roupa profissional. Personalização para empresas em Guimarães.",
    eyebrow: "SERIGRAFIA TÊXTIL · GUIMARÃES",
    title: "Impressão em tecido, pensada para a peça e para o uso.",
    lead:
      "Personalização de sacos, capas, porta-fatos, vestuário e outros suportes têxteis para empresas e marcas.",
    image: {
      src: "/images/trabalhos/tecido-01.webp",
      alt: "Tecido preto com impressão dourada produzido pela SERIFIL",
    },
    introduction: {
      title: "O tecido não é um suporte único.",
      paragraphs: [
        "Composição, trama, textura, cor e acabamento alteram a forma como a tinta se deposita. Um tecido liso e um tecido mais aberto podem exigir decisões diferentes, mesmo quando recebem o mesmo grafismo.",
        "Na preparação avaliamos a peça, a área de impressão e a utilização prevista. Em artigos sujeitos a lavagem ou atrito, essa informação é essencial para escolher e validar a solução.",
      ],
    },
    facts: [
      { label: "SUPORTE", value: "Tecidos e peças confecionadas, sujeitos a avaliação." },
      { label: "IMPRESSÃO", value: "Cores diretas, logótipos, texto e grafismos." },
      { label: "APLICAÇÃO", value: "Sacos, capas, porta-fatos, uniformes e merchandising." },
    ],
    technique: {
      eyebrow: "COMO FUNCIONA",
      title: "A serigrafia têxtil, passo a passo.",
      description:
        "A tinta é aplicada com uma raclete através de uma tela de malha fina. Cada cor do desenho é impressa separadamente e alinhada com as restantes.",
      steps: [
        {
          title: "Leitura do tecido",
          description:
            "Observamos composição, cor, textura, formato da peça e condições de utilização.",
        },
        {
          title: "Separação das cores",
          description:
            "A arte é ajustada ao tamanho de impressão e preparada por cores.",
        },
        {
          title: "Posicionamento",
          description:
            "A peça é colocada de forma consistente para manter a impressão na zona definida.",
        },
        {
          title: "Impressão e cura",
          description:
            "A tinta é transferida e o processo de cura é adaptado ao conjunto entre tinta, tecido e utilização.",
        },
      ],
    },
    applications: {
      eyebrow: "APLICAÇÕES",
      title: "Têxteis personalizados para empresas.",
      description:
        "A solução é definida pelo tipo de artigo, pela imagem de marca e pelo contexto de utilização.",
      items: [
        "Sacos e embalagens em tecido",
        "Capas e porta-fatos",
        "T-shirts e sweatshirts",
        "Uniformes e roupa profissional",
        "Artigos promocionais e merchandising",
      ],
    },
    gallery: {
      eyebrow: "TRABALHOS EM TECIDO",
      title: "Diferentes bases, a mesma atenção ao detalhe.",
      images: [
        {
          src: "/images/trabalhos/tecido-02.webp",
          alt: "Capa em tecido preto com logótipo branco",
        },
        {
          src: "/images/trabalhos/tecido-03.webp",
          alt: "Peça em tecido claro com impressão tipográfica preta",
        },
        {
          src: "/images/trabalhos/tecido-04.webp",
          alt: "Tecido escuro personalizado com marca impressa",
        },
      ],
    },
    preparation: {
      eyebrow: "PREPARAR O PEDIDO",
      title: "Informação que ajuda a decidir.",
      description:
        "Quanto melhor conhecermos a peça e a sua utilização, mais direta será a avaliação.",
      items: [
        { label: "Artigo", value: "Tipo de peça, composição e cor do tecido." },
        { label: "Quantidade", value: "Número aproximado e variações de tamanho." },
        { label: "Grafismo", value: "Medidas, posição e número de cores." },
        { label: "Utilização", value: "Lavagem, atrito ou outras condições relevantes." },
        { label: "Prazo", value: "Data pretendida para a produção." },
      ],
    },
    questions: {
      eyebrow: "PERGUNTAS FREQUENTES",
      title: "Antes de personalizar tecido.",
      items: [
        {
          question: "A serigrafia funciona em qualquer tecido?",
          answer:
            "Muitos tecidos podem ser impressos, mas composição, textura, acabamento e formato precisam de ser avaliados. Uma amostra ajuda a confirmar a solução.",
        },
        {
          question: "É possível imprimir várias cores?",
          answer:
            "Sim. Cada cor é preparada e impressa separadamente, o que deve ser considerado na arte e no orçamento.",
        },
        {
          question: "O que devo indicar sobre a lavagem?",
          answer:
            "Explique como a peça será utilizada e lavada. A resistência final depende do conjunto entre material, tinta, cura e cuidados posteriores.",
        },
      ],
    },
  },
  nonwoven: {
    key: "nonwoven",
    slug: slugs.pt.nonwoven,
    shortName: "Sacos em TNT",
    metaTitle: "Sacos em TNT Personalizados e Serigrafia | Serifil",
    metaDescription:
      "O que é TNT e como personalizar sacos em tecido não tecido por serigrafia. Produção para empresas, comércio e marcas em Guimarães.",
    eyebrow: "SACOS EM TNT · GUIMARÃES",
    title: "TNT: o tecido não tecido que também comunica a sua marca.",
    lead:
      "Impressão de logótipos e grafismos em sacos, capas e outras peças de tecido não tecido para empresas e marcas.",
    image: {
      src: "/images/trabalhos/tnt-01.webp",
      alt: "Saco em tecido não tecido personalizado com impressão",
    },
    introduction: {
      title: "O que é TNT?",
      paragraphs: [
        "TNT significa tecido não tecido. Ao contrário de um tecido convencional, a sua estrutura não é formada por tecelagem ou tricotagem: resulta de fibras consolidadas por processos físicos ou químicos.",
        "O termo descreve a estrutura do material, não uma composição única. Muitos artigos correntes utilizam fibras sintéticas, mas a composição, gramagem, porosidade e acabamento podem variar. Esses fatores influenciam a forma como a impressão deve ser preparada.",
      ],
    },
    facts: [
      { label: "SIGNIFICADO", value: "TNT é a abreviatura de tecido não tecido." },
      { label: "ESTRUTURA", value: "Fibras consolidadas sem tecelagem nem tricotagem." },
      { label: "APLICAÇÃO", value: "Sacos, capas, proteção, comércio e ações promocionais." },
    ],
    technique: {
      eyebrow: "COMO FUNCIONA",
      title: "Serigrafia em tecido não tecido.",
      description:
        "A impressão é transferida através de uma tela. A gramagem, a textura e a porosidade do TNT são consideradas para controlar a deposição da tinta e a leitura do grafismo.",
      steps: [
        {
          title: "Identificação do TNT",
          description:
            "Confirmamos a peça, a gramagem quando disponível, a cor, a textura e o acabamento.",
        },
        {
          title: "Preparação do grafismo",
          description:
            "A arte é dimensionada e separada por cores de impressão.",
        },
        {
          title: "Posicionamento da peça",
          description:
            "Definimos uma zona de impressão compatível com costuras, asas, dobras e área útil.",
        },
        {
          title: "Impressão e secagem",
          description:
            "A tinta passa pela tela e o processo de secagem é ajustado ao suporte apresentado.",
        },
      ],
    },
    applications: {
      eyebrow: "APLICAÇÕES",
      title: "TNT para acondicionar, proteger e apresentar.",
      description:
        "O formato da peça, a gramagem e a finalidade devem ser definidos antes da produção.",
      items: [
        "Sacos para comércio e eventos",
        "Sacos para apresentação de produto",
        "Capas e porta-fatos",
        "Embalagem promocional",
        "Peças personalizadas para empresas e marcas",
      ],
    },
    gallery: {
      eyebrow: "TRABALHOS EM TNT",
      title: "Cor, contraste e escala de produção.",
      images: [
        {
          src: "/images/trabalhos/tnt-02.webp",
          alt: "Saco em TNT claro com logótipo impresso",
        },
        {
          src: "/images/trabalhos/tnt-03.webp",
          alt: "Sacos em tecido não tecido personalizados para uma marca",
        },
        {
          src: "/images/trabalhos/tnt-04.webp",
          alt: "Detalhe de impressão serigráfica sobre TNT",
        },
        {
          src: "/images/trabalhos/tnt-05.webp",
          alt: "Conjunto de sacos em TNT com impressão personalizada",
        },
      ],
    },
    preparation: {
      eyebrow: "PREPARAR O PEDIDO",
      title: "Dados para orçamentar sacos em TNT.",
      description:
        "Se o saco já estiver definido, envie uma fotografia ou amostra. Se ainda estiver em escolha, indique a aplicação prevista.",
      items: [
        { label: "Formato", value: "Medidas do saco, tipo de asa, costuras e dobras." },
        { label: "Material", value: "Cor, gramagem e composição, quando disponíveis." },
        { label: "Quantidade", value: "Número aproximado de unidades." },
        { label: "Impressão", value: "Tamanho, posição e número de cores." },
        { label: "Arte final", value: "Logótipo ou grafismo, idealmente em formato vetorial." },
      ],
    },
    questions: {
      eyebrow: "PERGUNTAS FREQUENTES",
      title: "O essencial sobre TNT.",
      items: [
        {
          question: "TNT é plástico ou tecido?",
          answer:
            "TNT descreve uma estrutura fibrosa não tecida. Pode ser produzido com diferentes matérias-primas, incluindo polímeros. Por isso, a composição concreta deve ser confirmada no artigo.",
        },
        {
          question: "TNT e tecido normal são a mesma coisa?",
          answer:
            "Não. Num tecido convencional os fios são tecidos ou tricotados. No TNT, as fibras são consolidadas por outros processos.",
        },
        {
          question: "É possível imprimir sacos de diferentes gramagens?",
          answer:
            "Sim, mas gramagem, textura e porosidade alteram o comportamento do suporte. A peça deve ser avaliada antes da produção.",
        },
      ],
    },
  },
  footwear: {
    key: "footwear",
    slug: slugs.pt.footwear,
    shortName: "Componentes para calçado",
    metaTitle: "Impressão em Componentes para Calçado | Serifil",
    metaDescription:
      "Impressão e personalização de palmilhas, palas e outros componentes para a indústria do calçado. Produção em Guimarães.",
    eyebrow: "SETOR DO CALÇADO · GUIMARÃES",
    title: "Impressão preparada para integrar o componente.",
    lead:
      "Personalização de palmilhas, palas e outros componentes utilizados na produção de calçado, com avaliação do material e da fase de montagem.",
    image: {
      src: "/images/hero-serigrafia.webp",
      alt: "Aplicação de tinta através de uma tela no processo de serigrafia",
    },
    introduction: {
      title: "O componente define a preparação.",
      paragraphs: [
        "Na produção de calçado, a impressão pode ser aplicada em componentes com materiais, geometrias e acabamentos diferentes. A posição do grafismo e a fase em que a peça será impressa devem ser consideradas desde o início.",
        "Trabalhamos a partir da peça e da especificação do cliente. Uma amostra permite avaliar a área útil, o posicionamento, a compatibilidade da superfície e a forma de manuseamento durante a produção.",
      ],
    },
    facts: [
      { label: "COMPONENTES", value: "Palmilhas, palas e outras peças sujeitas a avaliação." },
      { label: "IMPRESSÃO", value: "Marca, identificação e elementos gráficos." },
      { label: "CONTEXTO", value: "Produção para empresas e indústria do calçado." },
    ],
    technique: {
      eyebrow: "COMO FUNCIONA",
      title: "Da amostra à série de produção.",
      description:
        "A serigrafia transfere a tinta através de uma tela preparada. O formato do componente influencia o apoio, o posicionamento e a repetição do trabalho.",
      steps: [
        {
          title: "Receção da amostra",
          description:
            "Analisamos material, formato, acabamento, área útil e fase prevista para a impressão.",
        },
        {
          title: "Definição da marcação",
          description:
            "Confirmamos dimensões, posição, orientação e número de cores.",
        },
        {
          title: "Preparação técnica",
          description:
            "A tela e o método de apoio são preparados em função da peça apresentada.",
        },
        {
          title: "Produção",
          description:
            "A impressão é repetida de acordo com a referência aprovada e com a organização definida para a série.",
        },
      ],
    },
    applications: {
      eyebrow: "APLICAÇÕES",
      title: "Identificação dentro do processo de calçado.",
      description:
        "A lista é indicativa. Outros componentes podem ser analisados mediante amostra.",
      items: [
        "Palmilhas",
        "Palas",
        "Componentes têxteis",
        "Peças sintéticas",
        "Outros componentes com área adequada à impressão",
      ],
    },
    gallery: {
      eyebrow: "TÉCNICA",
      title: "A tela é preparada para cada grafismo.",
      images: [],
    },
    preparation: {
      eyebrow: "PREPARAR O PEDIDO",
      title: "O que enviar para avaliação.",
      description:
        "Uma referência completa ajuda a integrar a impressão no fluxo de produção do cliente.",
      items: [
        { label: "Amostra", value: "Componente físico ou fotografia detalhada com medidas." },
        { label: "Material", value: "Composição e acabamento, quando conhecidos." },
        { label: "Arte", value: "Grafismo, dimensões, posição e orientação." },
        { label: "Quantidade", value: "Volume aproximado por referência." },
        { label: "Produção", value: "Fase de montagem e prazo pretendido." },
      ],
    },
    questions: {
      eyebrow: "PERGUNTAS FREQUENTES",
      title: "Antes de imprimir um componente.",
      items: [
        {
          question: "Que componentes podem ser personalizados?",
          answer:
            "A SERIFIL trabalha com palmilhas, palas e outros componentes. A viabilidade depende do material, da geometria e da área disponível.",
        },
        {
          question: "É necessária uma amostra?",
          answer:
            "É recomendável, sobretudo numa referência nova. A amostra permite avaliar o apoio da peça, a superfície e o posicionamento.",
        },
        {
          question: "Podem trabalhar várias referências?",
          answer:
            "Sim, desde que cada referência seja identificada com a respetiva arte, medidas, quantidade e posição de impressão.",
        },
      ],
    },
  },
};

const englishPages: Record<ServiceKey, ServicePageContent> = {
  pvc: {
    ...portuguesePages.pvc,
    slug: slugs.en.pvc,
    shortName: "PVC screen printing",
    metaTitle: "PVC Screen Printing for Bags and Packaging | Serifil",
    metaDescription:
      "Screen printing on clear or coloured PVC for bags, covers, packaging and protection. Custom production in Guimarães, Portugal.",
    eyebrow: "PVC SCREEN PRINTING · GUIMARÃES",
    title: "PVC printing, prepared for the actual substrate.",
    lead:
      "Direct customisation of logos, graphics and technical information on clear or coloured PVC items.",
    image: {
      src: "/images/trabalhos/pvc-01.webp",
      alt: "Clear PVC items with gold ornamental printing produced by SERIFIL",
    },
    introduction: {
      title: "What is PVC and why does preparation matter?",
      paragraphs: [
        "PVC, or polyvinyl chloride, is available in rigid and flexible formulations. Flexible, clear or coloured PVC is often used for bags, covers and protective items.",
        "In screen printing, the result depends on the relationship between the surface, the ink and the end use. Thickness, flexibility, transparency, finish and surface condition influence preparation. A substrate sample is therefore the safest way to assess a project.",
      ],
    },
    facts: [
      { label: "SUBSTRATE", value: "Clear or coloured PVC, supplied as an item or sample." },
      { label: "PRINT", value: "Logos, graphics and technical information in one or more colours." },
      { label: "APPLICATION", value: "Bags, covers, packaging, presentation and product protection." },
    ],
    technique: {
      eyebrow: "HOW IT WORKS",
      title: "From artwork to print.",
      description:
        "In screen printing, a squeegee pushes ink through the open areas of a prepared screen. Each colour is handled separately, requiring alignment between the artwork, item and substrate.",
      steps: [
        { title: "PVC assessment", description: "We identify the item, surface, transparency, flexibility and intended use." },
        { title: "Artwork preparation", description: "We confirm size, position and colours. Multi-colour work requires a separation for each colour." },
        { title: "Screen and print", description: "The image is prepared on the screen and ink is transferred through the mesh onto the PVC." },
        { title: "Drying and verification", description: "Drying and compatibility are defined according to the material and intended result." },
      ],
    },
    applications: {
      eyebrow: "APPLICATIONS",
      title: "Where PVC printing is used.",
      description: "The item geometry and intended finish are assessed before production.",
      items: [
        "Clear bags for product presentation",
        "Protective covers and pouches",
        "Packaging and containment elements",
        "Brand identification and technical information",
        "Promotional PVC items",
      ],
    },
    gallery: {
      eyebrow: "PVC WORK",
      title: "Transparency, colour and legibility.",
      images: [
        { src: "/images/trabalhos/pvc-02.webp", alt: "Clear PVC packaging customised with a logo" },
        { src: "/images/trabalhos/pvc-03.webp", alt: "Technical information printed on a clear PVC item" },
      ],
    },
    preparation: {
      eyebrow: "PREPARE YOUR REQUEST",
      title: "What we need to know.",
      description: "These details help us assess the substrate and prepare a more accurate quote.",
      items: [
        { label: "Item", value: "Photograph, sample or drawing with measurements." },
        { label: "Quantity", value: "Approximate number of units." },
        { label: "Print", value: "Size, position and number of colours." },
        { label: "Artwork", value: "Logo or graphic, preferably in vector format." },
        { label: "Use", value: "How the item will be used, handled or packed." },
      ],
    },
    questions: {
      eyebrow: "FREQUENT QUESTIONS",
      title: "Before printing on PVC.",
      items: [
        { question: "Can you print on clear PVC?", answer: "Yes. Transparency and substrate colour are part of the preparation because they affect how colours and graphics are perceived." },
        { question: "Are all PVC items the same?", answer: "No. Formulation, finish, flexibility and surface condition can vary. Assessing a sample reduces uncertainty." },
        { question: "Can I supply my own item?", answer: "Yes. Send a photograph with measurements and, when needed, a physical sample to confirm the appropriate solution." },
      ],
    },
  },
  fabric: {
    ...portuguesePages.fabric,
    slug: slugs.en.fabric,
    shortName: "Fabric screen printing",
    metaTitle: "Fabric Screen Printing and Workwear | Serifil",
    metaDescription:
      "Fabric screen printing for bags, covers, garment bags, clothing and workwear. Custom production for businesses in Guimarães.",
    eyebrow: "FABRIC SCREEN PRINTING · GUIMARÃES",
    title: "Fabric printing designed around the item and its use.",
    lead:
      "Customisation of bags, covers, garment bags, clothing and other textile substrates for businesses and brands.",
    image: { src: "/images/trabalhos/tecido-01.webp", alt: "Black fabric with gold printing produced by SERIFIL" },
    introduction: {
      title: "Fabric is not a single substrate.",
      paragraphs: [
        "Composition, weave, texture, colour and finish change how ink is deposited. A smooth fabric and a more open fabric may require different decisions even when they receive the same graphic.",
        "Preparation considers the item, print area and intended use. For articles exposed to washing or abrasion, this information is essential when choosing and validating the solution.",
      ],
    },
    facts: [
      { label: "SUBSTRATE", value: "Fabrics and made-up items, subject to assessment." },
      { label: "PRINT", value: "Spot colours, logos, lettering and graphics." },
      { label: "APPLICATION", value: "Bags, covers, garment bags, uniforms and merchandise." },
    ],
    technique: {
      eyebrow: "HOW IT WORKS",
      title: "Fabric screen printing, step by step.",
      description:
        "Ink is applied with a squeegee through a fine-mesh screen. Each colour in the design is printed separately and aligned with the others.",
      steps: [
        { title: "Reading the fabric", description: "We consider composition, colour, texture, item format and conditions of use." },
        { title: "Colour separation", description: "Artwork is adjusted to the print size and prepared by colour." },
        { title: "Positioning", description: "The item is placed consistently to keep the print within the defined area." },
        { title: "Printing and curing", description: "Ink is transferred and the curing process is adapted to the ink, fabric and intended use." },
      ],
    },
    applications: {
      eyebrow: "APPLICATIONS",
      title: "Custom textiles for businesses.",
      description: "The solution is defined by the article, brand image and context of use.",
      items: [
        "Fabric bags and packaging",
        "Covers and garment bags",
        "T-shirts and sweatshirts",
        "Uniforms and workwear",
        "Promotional items and merchandise",
      ],
    },
    gallery: {
      eyebrow: "FABRIC WORK",
      title: "Different bases, the same attention to detail.",
      images: [
        { src: "/images/trabalhos/tecido-02.webp", alt: "Black fabric cover with a white logo" },
        { src: "/images/trabalhos/tecido-03.webp", alt: "Light fabric item with black typographic printing" },
        { src: "/images/trabalhos/tecido-04.webp", alt: "Dark fabric customised with a printed brand" },
      ],
    },
    preparation: {
      eyebrow: "PREPARE YOUR REQUEST",
      title: "Information that helps us decide.",
      description: "The more we know about the item and its use, the more direct the assessment can be.",
      items: [
        { label: "Article", value: "Item type, fabric composition and colour." },
        { label: "Quantity", value: "Approximate number and size variations." },
        { label: "Graphic", value: "Dimensions, position and number of colours." },
        { label: "Use", value: "Washing, abrasion or other relevant conditions." },
        { label: "Deadline", value: "Required production date." },
      ],
    },
    questions: {
      eyebrow: "FREQUENT QUESTIONS",
      title: "Before customising fabric.",
      items: [
        { question: "Does screen printing work on every fabric?", answer: "Many fabrics can be printed, but composition, texture, finish and item format need assessment. A sample helps confirm the solution." },
        { question: "Can you print several colours?", answer: "Yes. Each colour is prepared and printed separately, which should be considered in the artwork and quotation." },
        { question: "What should I say about washing?", answer: "Explain how the item will be used and washed. Final resistance depends on the material, ink, curing and aftercare together." },
      ],
    },
  },
  nonwoven: {
    ...portuguesePages.nonwoven,
    slug: slugs.en.nonwoven,
    shortName: "Non-woven bags",
    metaTitle: "Custom Non-Woven Bags and Screen Printing | Serifil",
    metaDescription:
      "What non-woven fabric is and how bags are customised with screen printing. Production for businesses and brands in Guimarães.",
    eyebrow: "NON-WOVEN BAGS · GUIMARÃES",
    title: "Non-woven material that carries your brand.",
    lead:
      "Printing of logos and graphics on bags, covers and other non-woven items for businesses and brands.",
    image: { src: "/images/trabalhos/tnt-01.webp", alt: "Non-woven bag with custom printing" },
    introduction: {
      title: "What is a non-woven?",
      paragraphs: [
        "Unlike conventional fabric, a non-woven structure is not made by weaving or knitting. It is an engineered fibrous assembly consolidated by physical or chemical means.",
        "The term describes the structure, not a single composition. Many everyday products use synthetic fibres, but composition, weight, porosity and finish can vary. Those factors influence how printing should be prepared.",
      ],
    },
    facts: [
      { label: "MEANING", value: "An engineered fibrous material that is not woven or knitted." },
      { label: "STRUCTURE", value: "Fibres consolidated through other physical or chemical processes." },
      { label: "APPLICATION", value: "Bags, covers, protection, retail and promotional campaigns." },
    ],
    technique: {
      eyebrow: "HOW IT WORKS",
      title: "Screen printing on non-woven material.",
      description:
        "Print is transferred through a screen. Material weight, texture and porosity are considered to control ink deposit and graphic legibility.",
      steps: [
        { title: "Identify the material", description: "We confirm the item, weight when available, colour, texture and finish." },
        { title: "Prepare the graphic", description: "Artwork is sized and separated by print colour." },
        { title: "Position the item", description: "We define a print area compatible with seams, handles, folds and usable space." },
        { title: "Print and dry", description: "Ink passes through the screen and drying is adjusted to the supplied substrate." },
      ],
    },
    applications: {
      eyebrow: "APPLICATIONS",
      title: "Non-woven items for packing, protecting and presenting.",
      description: "Item format, weight and purpose should be defined before production.",
      items: [
        "Bags for retail and events",
        "Bags for product presentation",
        "Covers and garment bags",
        "Promotional packaging",
        "Custom items for businesses and brands",
      ],
    },
    gallery: {
      eyebrow: "NON-WOVEN WORK",
      title: "Colour, contrast and production scale.",
      images: [
        { src: "/images/trabalhos/tnt-02.webp", alt: "Light non-woven bag with a printed logo" },
        { src: "/images/trabalhos/tnt-03.webp", alt: "Custom non-woven bags produced for a brand" },
        { src: "/images/trabalhos/tnt-04.webp", alt: "Detail of screen printing on non-woven material" },
        { src: "/images/trabalhos/tnt-05.webp", alt: "Set of non-woven bags with custom printing" },
      ],
    },
    preparation: {
      eyebrow: "PREPARE YOUR REQUEST",
      title: "Details for quoting non-woven bags.",
      description: "If the bag is already defined, send a photograph or sample. If not, tell us about its intended use.",
      items: [
        { label: "Format", value: "Bag size, handle type, seams and folds." },
        { label: "Material", value: "Colour, weight and composition, when available." },
        { label: "Quantity", value: "Approximate number of units." },
        { label: "Print", value: "Size, position and number of colours." },
        { label: "Artwork", value: "Logo or graphic, ideally in vector format." },
      ],
    },
    questions: {
      eyebrow: "FREQUENT QUESTIONS",
      title: "The essentials about non-wovens.",
      items: [
        { question: "Is a non-woven a plastic or a fabric?", answer: "Non-woven describes a fibrous structure. It can be made from different raw materials, including polymers, so the composition of the actual article should be confirmed." },
        { question: "Is non-woven material the same as conventional fabric?", answer: "No. Conventional fabric is woven or knitted. In a non-woven, fibres are consolidated through other processes." },
        { question: "Can you print bags of different weights?", answer: "Yes, but weight, texture and porosity change how the substrate behaves. The item should be assessed before production." },
      ],
    },
  },
  footwear: {
    ...portuguesePages.footwear,
    slug: slugs.en.footwear,
    shortName: "Footwear components",
    metaTitle: "Printing on Footwear Components | Serifil",
    metaDescription:
      "Printing and customisation of insoles, uppers and other components for the footwear industry. Production in Guimarães, Portugal.",
    eyebrow: "FOOTWEAR INDUSTRY · GUIMARÃES",
    title: "Printing prepared to become part of the component.",
    lead:
      "Customisation of insoles, uppers and other footwear production components, with assessment of the material and assembly stage.",
    image: { src: "/images/hero-serigrafia.webp", alt: "Ink being applied through a screen during the screen printing process" },
    introduction: {
      title: "The component defines the preparation.",
      paragraphs: [
        "In footwear production, print may be applied to components with different materials, shapes and finishes. Graphic position and the production stage at which the item is printed should be considered from the start.",
        "We work from the client’s item and specification. A sample allows us to assess the usable area, positioning, surface compatibility and handling during production.",
      ],
    },
    facts: [
      { label: "COMPONENTS", value: "Insoles, uppers and other items subject to assessment." },
      { label: "PRINT", value: "Branding, identification and graphic elements." },
      { label: "CONTEXT", value: "Production for businesses and the footwear industry." },
    ],
    technique: {
      eyebrow: "HOW IT WORKS",
      title: "From sample to production run.",
      description:
        "Screen printing transfers ink through a prepared screen. Component format influences support, positioning and repeatability.",
      steps: [
        { title: "Receive the sample", description: "We review material, format, finish, usable area and the intended print stage." },
        { title: "Define the marking", description: "We confirm dimensions, position, orientation and number of colours." },
        { title: "Technical preparation", description: "The screen and support method are prepared for the supplied item." },
        { title: "Production", description: "Print is repeated according to the approved reference and the organisation defined for the run." },
      ],
    },
    applications: {
      eyebrow: "APPLICATIONS",
      title: "Identification within footwear production.",
      description: "This list is indicative. Other components can be assessed from a sample.",
      items: [
        "Insoles",
        "Uppers",
        "Textile components",
        "Synthetic components",
        "Other components with a suitable print area",
      ],
    },
    gallery: {
      eyebrow: "TECHNIQUE",
      title: "The screen is prepared for each graphic.",
      images: [],
    },
    preparation: {
      eyebrow: "PREPARE YOUR REQUEST",
      title: "What to send for assessment.",
      description: "A complete reference helps integrate printing into the client’s production flow.",
      items: [
        { label: "Sample", value: "Physical component or detailed photograph with measurements." },
        { label: "Material", value: "Composition and finish, when known." },
        { label: "Artwork", value: "Graphic, dimensions, position and orientation." },
        { label: "Quantity", value: "Approximate volume per reference." },
        { label: "Production", value: "Assembly stage and required deadline." },
      ],
    },
    questions: {
      eyebrow: "FREQUENT QUESTIONS",
      title: "Before printing a component.",
      items: [
        { question: "Which components can be customised?", answer: "SERIFIL works with insoles, uppers and other components. Feasibility depends on material, geometry and available area." },
        { question: "Is a sample required?", answer: "It is recommended, especially for a new reference. A sample allows us to assess item support, surface and positioning." },
        { question: "Can you work with several references?", answer: "Yes, provided each reference is identified with its artwork, dimensions, quantity and print position." },
      ],
    },
  },
};

export const servicePages: Record<Locale, Record<ServiceKey, ServicePageContent>> = {
  pt: portuguesePages,
  en: englishPages,
};

export function getServicePath(locale: Locale, key: ServiceKey) {
  return `/${locale}/servicos/${slugs[locale][key]}/`;
}

export function getServicePage(locale: Locale, slug: string) {
  return serviceKeys
    .map((key) => servicePages[locale][key])
    .find((page) => page.slug === slug);
}

export function getServiceAlternates(key: ServiceKey) {
  return {
    "pt-PT": getServicePath("pt", key),
    en: getServicePath("en", key),
    "x-default": getServicePath("pt", key),
  };
}
