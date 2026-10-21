import type { Locale } from "@/data/i18n";

export const serviceKeys = ["pvc", "fabric", "nonwoven", "footwear", "tshirts", "bags"] as const;

export type ServiceKey = (typeof serviceKeys)[number];

type ServiceImage = {
  src: string;
  alt: string;
  /** Fotografia ilustrativa do processo: não é um trabalho produzido pela SERIFIL. */
  illustrative?: boolean;
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
  /**
   * Técnicas apresentadas em separado, quando a página usa mais do que uma.
   * `featured` destaca a técnica principal (a serigrafia, feita pela SERIFIL).
   */
  techniques?: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      name: string;
      badge: string;
      summary: string;
      points: string[];
      link: { href: string; label: string };
      featured?: boolean;
    }>;
  };
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
  guides: string;
  quoteTitle: string;
  contact: string;
};

const slugs: Record<Locale, Record<ServiceKey, string>> = {
  pt: {
    pvc: "serigrafia-pvc",
    fabric: "serigrafia-tecido",
    nonwoven: "sacos-tnt",
    footwear: "componentes-calcado",
    tshirts: "estampagem-t-shirts",
    bags: "sacos-personalizados",
  },
  en: {
    pvc: "pvc-screen-printing",
    fabric: "fabric-screen-printing",
    nonwoven: "non-woven-bags",
    footwear: "footwear-components",
    tshirts: "t-shirt-printing",
    bags: "custom-bags",
  },
};

export const servicePageUi: Record<Locale, ServicePageUi> = {
  pt: {
    breadcrumbsLabel: "Navegação estrutural",
    home: "Início",
    services: "Serviços",
    quote: "Pedir orçamento",
    seeWork: "Ver trabalhos",
    realWork: "Trabalho produzido pela SERIFIL",
    relatedEyebrow: "OUTROS MATERIAIS E APLICAÇÕES",
    relatedTitle: "Explore as restantes soluções.",
    relatedDescription:
      "Cada suporte pede uma preparação própria. Consulte as páginas relacionadas ou envie-nos uma amostra para avaliação.",
    learnMore: "Saber mais",
    guides: "Guias relacionados",
    materialGuides: "Materiais e aplicações",
    materialGuidesDescription:
      "Perceba como trabalhamos cada suporte e que informação ajuda a preparar o seu projeto.",
    quoteTitle: "Tem um projeto neste material?",
    contact: "Fale connosco sobre o seu projeto",
  },
  en: {
    breadcrumbsLabel: "Breadcrumb navigation",
    home: "Home",
    services: "Services",
    quote: "Request a quote",
    seeWork: "See our work",
    realWork: "Work produced by SERIFIL",
    relatedEyebrow: "OTHER MATERIALS AND APPLICATIONS",
    relatedTitle: "Explore our other solutions.",
    relatedDescription:
      "Each substrate requires its own preparation. Explore the related pages or send us a sample for assessment.",
    learnMore: "Learn more",
    guides: "Related guides",
    materialGuides: "Materials and applications",
    materialGuidesDescription:
      "Understand how each substrate is approached and what information helps us prepare your project.",
    quoteTitle: "Have a project involving this material?",
    contact: "Talk to us about your project",
  },
};

const portuguesePages: Record<ServiceKey, ServicePageContent> = {
  pvc: {
    key: "pvc",
    slug: slugs.pt.pvc,
    shortName: "Serigrafia em PVC",
    metaTitle: "Serigrafia em PVC para Sacos e Embalagens | SERIFIL",
    metaDescription:
      "Impressão serigráfica em PVC transparente ou colorido para sacos, capas, embalagem e proteção. Produção personalizada em Guimarães.",
    eyebrow: "SERIGRAFIA EM PVC · GUIMARÃES",
    title: "Impressão em PVC, preparada para o suporte real.",
    lead:
      "Personalização de peças de PVC transparente ou colorido com logótipos, elementos gráficos e informação técnica.",
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
            "Confirmamos dimensões, posição e cores. Quando existem várias cores, cada cor requer uma separação própria.",
        },
        {
          title: "Preparação da tela e impressão",
          description:
            "A imagem é preparada na tela e a tinta é transferida para o PVC através da malha.",
        },
        {
          title: "Secagem e verificação",
          description:
            "O método de secagem é definido e a compatibilidade é verificada em função do material e do resultado pretendido.",
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
            "Sim. A transparência e a cor do suporte são consideradas na preparação, porque influenciam a leitura das cores e do grafismo.",
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
    metaTitle: "Impressão e Serigrafia em Tecido em Guimarães | SERIFIL",
    metaDescription:
      "Impressão em tecido por serigrafia para sacos, capas, porta-fatos, vestuário e roupa profissional. Personalização têxtil para empresas em Guimarães.",
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
          title: "Avaliação do tecido",
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
            "A tinta é transferida e o processo de cura é adaptado à combinação de tinta, tecido e utilização prevista.",
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
          alt: "Peça em tecido claro com texto impresso a preto",
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
          question: "E para poucas peças com muitas cores?",
          answer:
            "Em séries curtas, com fotografias, degradês ou muitas cores, o [DTF ao metro](/pt/dtf/) pode compensar mais, porque não precisa de fotolitos nem de telas. Explicamos as diferenças no [guia do DTF](/pt/guias/o-que-e-dtf/).",
        },
        {
          question: "O que devo indicar sobre a lavagem?",
          answer:
            "Explique como a peça será utilizada e lavada. A durabilidade final depende do material, da tinta, da cura e dos cuidados posteriores.",
        },
      ],
    },
  },
  nonwoven: {
    key: "nonwoven",
    slug: slugs.pt.nonwoven,
    shortName: "Sacos em TNT",
    metaTitle: "Sacos em TNT Personalizados e Serigrafia | SERIFIL",
    metaDescription:
      "O que é TNT e como personalizar sacos em tecido não tecido por serigrafia. Produção para empresas, comércio e marcas em Guimarães.",
    eyebrow: "SACOS EM TNT · GUIMARÃES",
    title: "TNT: o tecido não tecido que também comunica a sua marca.",
    lead:
      "Impressão de logótipos e grafismos em sacos, capas e outras peças de tecido não tecido para empresas e marcas.",
    image: {
      src: "/images/trabalhos/tnt-05.webp",
      alt: "Saco preto em TNT com impressão verde e branca",
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
          alt: "Saco preto em TNT com logótipo impresso a duas cores",
        },
        {
          src: "/images/trabalhos/tnt-03.webp",
          alt: "Sacos em tecido não tecido personalizados para uma marca",
        },
        {
          src: "/images/trabalhos/tnt-04.webp",
          alt: "Saco azul em TNT com logótipo branco",
        },
      ],
    },
    preparation: {
      eyebrow: "PREPARAR O PEDIDO",
      title: "Dados para orçamentar sacos em TNT.",
      description:
        "Se o saco já estiver definido, envie uma fotografia ou amostra. Se ainda não tiver escolhido o saco ou o material, indique a aplicação prevista.",
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
    metaTitle: "Impressão em Componentes para Calçado | SERIFIL",
    metaDescription:
      "Impressão e personalização de palmilhas, palas e outros componentes para a indústria do calçado. Produção em Guimarães.",
    eyebrow: "SETOR DO CALÇADO · GUIMARÃES",
    title: "Impressão adaptada a cada componente.",
    lead:
      "Personalização de palmilhas, palas e outros componentes utilizados na produção de calçado, com avaliação do material e da fase de montagem.",
    image: {
      src: "/images/hero-serigrafia.webp",
      alt: "Aplicação de tinta através de uma tela no processo de serigrafia",
      illustrative: true,
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
      { label: "CONTEXTO", value: "Produção para empresas da indústria do calçado." },
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
      title: "Impressão e identificação de componentes de calçado.",
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
  tshirts: {
    key: "tshirts",
    slug: slugs.pt.tshirts,
    shortName: "Estampagem de t-shirts",
    metaTitle: "Estampagem de T-shirts em Serigrafia em Guimarães | SERIFIL",
    metaDescription:
      "Estampagem de t-shirts e camisolas em serigrafia, feita pela SERIFIL em Guimarães: cores vivas e resistentes. DTF para poucas peças. Envio para todo o país.",
    eyebrow: "ESTAMPAGEM DE T-SHIRTS · GUIMARÃES",
    title: "T-shirts estampadas em serigrafia.",
    lead:
      "Estampamos t-shirts, sweats e camisolas em serigrafia, na nossa produção em Guimarães: cores vivas, resistentes às lavagens e com melhor preço por peça em séries. Para poucas peças com muitas cores, também fazemos DTF.",
    // Trabalho real retocado com IA: illustrative evita a legenda "Trabalho produzido pela SERIFIL".
    image: {
      src: "/images/servicos/tshirts-dobradas.webp",
      alt: "T-shirts dobradas, azul, verde e bege, com o logótipo SERIFIL estampado a laranja",
      illustrative: true,
    },
    introduction: {
      title: "Serigrafia feita por nós, do quadro à peça.",
      paragraphs: [
        "A serigrafia é o nosso trabalho de todos os dias. Preparamos a arte, gravamos as telas e imprimimos cada cor na nossa produção em Guimarães, com acompanhamento direto do início ao fim.",
        "Pode entregar-nos as suas peças ou pedir-nos que as fornecemos. O fornecimento depende do modelo, das cores, dos tamanhos e da quantidade, e é confirmado no orçamento.",
      ],
    },
    facts: [
      { label: "PRODUÇÃO", value: "Serigrafia feita pela SERIFIL, em Guimarães." },
      { label: "PEÇAS", value: "T-shirts, sweats e camisolas, suas ou fornecidas por nós." },
      { label: "ENVIO", value: "Para todo o país." },
    ],
    techniques: {
      eyebrow: "DUAS TÉCNICAS",
      title: "Serigrafia para séries. DTF para poucas peças.",
      description: "Escolhemos a técnica pela quantidade e pelo desenho. Na dúvida, envie-nos o desenho e a quantidade e dizemos-lhe o que compensa.",
      items: [
        {
          name: "Serigrafia",
          badge: "Feita na SERIFIL",
          summary: "A escolha para séries de t-shirts com o mesmo desenho, em empresas, fardas, eventos e marcas.",
          points: [
            "Cores vivas e opacas, também em t-shirts escuras",
            "Resistente ao uso e às lavagens",
            "O preço por peça desce com a quantidade",
            "Preparação e impressão na nossa produção, com acompanhamento direto",
          ],
          link: { href: "/pt/guias/o-que-e-serigrafia/", label: "Como funciona a serigrafia" },
          featured: true,
        },
        {
          name: "DTF",
          badge: "Para poucas peças",
          summary: "Quando são poucas peças, muitas cores ou nomes diferentes em cada uma.",
          points: [
            "Sem fotolitos nem telas",
            "Fotografias, degradês e muitas cores",
            "Nomes e números diferentes por peça",
          ],
          link: { href: "/pt/dtf/", label: "Calcular o DTF ao metro" },
        },
      ],
    },
    technique: {
      eyebrow: "COMO ESTAMPAMOS",
      title: "A serigrafia, passo a passo.",
      description: "Cada cor do desenho tem a sua tela e a sua passagem. É este cuidado que dá cores fortes e duradouras.",
      steps: [
        {
          title: "Peças e arte",
          description: "Confirmamos as peças, a quantidade por tamanho e a posição. A arte é ajustada à medida e separada por cores.",
        },
        {
          title: "Fotolitos e telas",
          description: "Cada cor passa para um fotolito e é gravada na sua tela, com a malha adequada ao desenho e ao tecido.",
        },
        {
          title: "Impressão",
          description: "As cores são impressas uma a uma, alinhadas entre si, em cada peça.",
        },
        {
          title: "Cura",
          description: "A tinta é curada com calor para resistir ao uso e às lavagens.",
        },
      ],
    },
    applications: {
      eyebrow: "PARA QUEM",
      title: "T-shirts para empresas, equipas e eventos.",
      description:
        "A técnica e a peça são escolhidas pelo uso: uma farda lavada todas as semanas pede decisões diferentes de uma t-shirt para um evento.",
      items: [
        "T-shirts e sweats com o logótipo da empresa",
        "Fardas e roupa de trabalho",
        "Equipas desportivas, com nomes e números",
        "Eventos, associações e festas",
        "Marcas de roupa e merchandising",
      ],
    },
    gallery: {
      eyebrow: "TRABALHOS EM TÊXTIL",
      title: "Têxteis estampados pela SERIFIL.",
      images: [
        {
          src: "/images/servicos/camisola-serifil.webp",
          alt: "Camisola verde com o logótipo SERIFIL estampado nas costas",
        },
        {
          src: "/images/trabalhos/tecido-01.webp",
          alt: "Tecido preto com impressão dourada",
        },
        {
          src: "/images/trabalhos/tecido-02.webp",
          alt: "Capa em tecido preto com logótipo branco",
        },
        {
          src: "/images/trabalhos/tecido-03.webp",
          alt: "Peça em tecido claro com texto impresso a preto",
        },
      ],
    },
    preparation: {
      eyebrow: "PREPARAR O PEDIDO",
      title: "O que nos deve indicar.",
      description: "Com esta informação conseguimos escolher a técnica e responder com o orçamento.",
      items: [
        { label: "Peças", value: "Modelo, cor e composição, e se são suas ou se as fornecemos." },
        { label: "Quantidade", value: "Número de peças por tamanho." },
        { label: "Desenho", value: "Ficheiro, número de cores e medidas." },
        { label: "Posição", value: "Peito, costas, manga ou outra zona." },
        { label: "Prazo", value: "Data em que precisa das peças." },
      ],
    },
    questions: {
      eyebrow: "PERGUNTAS FREQUENTES",
      title: "Antes de estampar t-shirts.",
      items: [
        {
          question: "Fornecem as t-shirts?",
          answer:
            "Sim. Podemos fornecer t-shirts e camisolas, conforme o modelo, as cores, os tamanhos e a quantidade. Também estampamos as peças que nos entregar.",
        },
        {
          question: "Qual é a quantidade mínima?",
          answer:
            "Depende do desenho. Na serigrafia, a preparação das telas é feita uma vez por cor, por isso o preço por peça desce com a quantidade. Para poucas peças, o [DTF ao metro](/pt/dtf/) pode compensar mais.",
        },
        {
          question: "Serigrafia ou DTF: qual escolher?",
          answer:
            "Para séries com o mesmo desenho, a serigrafia dá cores mais fortes e duradouras e fica mais barata por peça. O DTF é para poucas peças, fotografias, degradês ou nomes diferentes. Explicamos as duas no [guia da serigrafia](/pt/guias/o-que-e-serigrafia/) e no [guia do DTF](/pt/guias/o-que-e-dtf/).",
        },
        {
          question: "Enviam para fora de Guimarães?",
          answer: "Sim. Produzimos em Guimarães e enviamos para todo o país.",
        },
        {
          question: "Quanto tempo demora?",
          answer:
            "Depende da técnica, da quantidade e de as peças serem suas ou fornecidas por nós. O prazo é indicado no orçamento.",
        },
      ],
    },
  },
  // Confirmado pelo utilizador (out 2026): a SERIFIL fornece sacos em TNT e de pano (algodão) já personalizados.
  // Sacos de PVC, papel ou outros só sobre sacos do cliente. Sem mínimos, prazos nem envio prometidos.
  bags: {
    key: "bags",
    slug: slugs.pt.bags,
    shortName: "Sacos personalizados",
    metaTitle: "Sacos Personalizados com Logótipo em Serigrafia | SERIFIL",
    metaDescription:
      "Sacos personalizados com o logótipo da sua empresa: sacos em TNT e de pano (algodão) fornecidos e estampados em serigrafia pela SERIFIL, em Guimarães.",
    eyebrow: "SACOS PERSONALIZADOS · GUIMARÃES",
    title: "Sacos com o logótipo da sua marca.",
    lead:
      "Fornecemos sacos em TNT e sacos de pano em algodão e estampamo-los em serigrafia, na nossa produção em Guimarães. Também estampamos as suas peças, entregues por si, sob consulta.",
    image: {
      src: "/images/trabalhos/tnt-01.webp",
      alt: "Saco preto em TNT com «Merry Christmas» impresso a dourado",
    },
    introduction: {
      title: "Escolha o saco. Nós tratamos da impressão.",
      paragraphs: [
        "Um saco com o logótipo leva a marca para fora da loja, da feira ou do evento. Há dois tipos de saco que fornecemos já personalizados: em TNT (tecido não tecido) e de pano, em algodão.",
        "O modelo, a cor, a medida e a quantidade dos sacos são confirmados no orçamento, porque o fornecimento depende do que estiver disponível. Se já tem os sacos, imprimimos sobre eles depois de avaliar o material.",
      ],
    },
    facts: [
      { label: "SACOS", value: "TNT e pano (algodão), fornecidos por nós ou seus." },
      { label: "IMPRESSÃO", value: "Serigrafia feita pela SERIFIL, em Guimarães." },
      { label: "ORÇAMENTO", value: "Modelo, quantidade e impressão confirmados caso a caso." },
    ],
    techniques: {
      eyebrow: "DOIS TIPOS DE SACO",
      title: "TNT ou pano?",
      description: "Os dois levam bem a serigrafia. A escolha depende do uso: diga-nos para que é o saco e ajudamos a decidir.",
      items: [
        {
          name: "Sacos em TNT",
          badge: "Tecido não tecido",
          summary: "Leves e com corpo, muito usados no comércio, em feiras e em eventos.",
          points: [
            "Leve, com estrutura própria",
            "Para lojas, feiras, eventos e apresentação de produto",
            "Gramagem, cor e medida definidas no orçamento",
          ],
          link: { href: getServicePath("pt", "nonwoven"), label: "Saber mais sobre o TNT" },
        },
        {
          name: "Sacos de pano",
          badge: "Algodão",
          summary: "Sacos de algodão, para usar e reutilizar durante muito tempo.",
          points: [
            "Tecido natural, agradável ao toque",
            "Para ofertas, merchandising e lojas",
            "Modelo, cor e medida definidos no orçamento",
          ],
          link: { href: getServicePath("pt", "fabric"), label: "Serigrafia em tecido" },
        },
      ],
    },
    technique: {
      eyebrow: "COMO FUNCIONA",
      title: "Do logótipo ao saco impresso.",
      description: "Na serigrafia, cada cor do logótipo tem a sua tela e a sua passagem. É o que dá cores fortes e um preço por saco que desce com a quantidade.",
      steps: [
        {
          title: "Saco e arte",
          description: "Confirmamos o saco, a quantidade e a posição. O logótipo é ajustado à medida e separado por cores.",
        },
        {
          title: "Fotolitos e telas",
          description: "Cada cor passa para um fotolito e é gravada na sua tela.",
        },
        {
          title: "Impressão",
          description: "As cores são impressas uma a uma, alinhadas entre si, em cada saco.",
        },
        {
          title: "Secagem",
          description: "A tinta seca ou cura conforme o material do saco.",
        },
      ],
    },
    applications: {
      eyebrow: "PARA QUEM",
      title: "Sacos para vender, oferecer e promover.",
      description:
        "A finalidade ajuda a escolher o saco: um saco de loja pede decisões diferentes de um saco oferecido num evento.",
      items: [
        "Lojas e comércio",
        "Feiras, congressos e eventos",
        "Ofertas e merchandising de empresas",
        "Associações e clubes",
        "Embalagem e apresentação de produto",
      ],
    },
    gallery: {
      eyebrow: "TRABALHOS EM SACOS",
      title: "Sacos impressos pela SERIFIL.",
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
    preparation: {
      eyebrow: "PREPARAR O PEDIDO",
      title: "O que nos deve indicar.",
      description: "Com esta informação respondemos com o orçamento. Se ainda não escolheu o saco, diga-nos para que o vai usar.",
      items: [
        { label: "Saco", value: "TNT ou pano, medida, tipo de asa e cor, e se é seu ou fornecido por nós." },
        { label: "Quantidade", value: "Número aproximado de sacos." },
        { label: "Logótipo", value: "Ficheiro, idealmente vetorial, e número de cores." },
        { label: "Impressão", value: "Tamanho e posição, num lado ou nos dois." },
        { label: "Prazo", value: "Data em que precisa dos sacos." },
      ],
    },
    questions: {
      eyebrow: "PERGUNTAS FREQUENTES",
      title: "Antes de personalizar sacos.",
      items: [
        {
          question: "Fornecem os sacos?",
          answer:
            "Sim. Fornecemos sacos em TNT e sacos de pano em algodão, já personalizados. O modelo, a cor e a medida dependem da disponibilidade e são confirmados no orçamento.",
        },
        {
          question: "Imprimem sacos que eu já tenho?",
          answer:
            "Sim, depois de avaliarmos o material. A serigrafia também funciona em [PVC](/pt/servicos/serigrafia-pvc/) e em muitos outros suportes.",
        },
        {
          question: "Qual é a quantidade mínima?",
          answer:
            "Depende do saco e do logótipo. Na serigrafia, as telas são preparadas uma vez por cor, por isso o preço por saco desce com a quantidade. Diga-nos quantos precisa e respondemos com o orçamento.",
        },
        {
          question: "Quantas cores posso imprimir?",
          answer:
            "Cada cor tem a sua tela e a sua passagem, por isso logótipos com poucas cores sólidas são os que mais compensam. Explicamos porquê no [guia da serigrafia](/pt/guias/o-que-e-serigrafia/).",
        },
        {
          question: "Quanto tempo demora?",
          answer:
            "Depende do saco, da quantidade e de os sacos serem seus ou fornecidos por nós. O prazo é indicado no orçamento.",
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
    metaTitle: "PVC Screen Printing for Bags and Packaging | SERIFIL",
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
        { title: "Screen preparation and printing", description: "The image is prepared on the screen and ink is transferred through the mesh onto the PVC." },
        { title: "Drying and verification", description: "The drying method is defined and compatibility is verified according to the material and intended result." },
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
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
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
    metaTitle: "Fabric Printing and Textile Screen Printing | SERIFIL",
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
        "Composition, weave, texture, colour and finish change how ink is deposited. A smooth fabric and a more open weave may require different print preparation even when they receive the same artwork.",
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
        { title: "Fabric assessment", description: "We consider composition, colour, texture, item format and conditions of use." },
        { title: "Colour separation", description: "Artwork is adjusted to the print size and colour-separated for printing." },
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
      title: "Different fabrics, the same attention to detail.",
      images: [
        { src: "/images/trabalhos/tecido-02.webp", alt: "Black fabric cover with a white logo" },
        { src: "/images/trabalhos/tecido-03.webp", alt: "Light fabric item with black printed lettering" },
        { src: "/images/trabalhos/tecido-04.webp", alt: "Dark fabric customised with a printed brand" },
      ],
    },
    preparation: {
      eyebrow: "PREPARE YOUR REQUEST",
      title: "Information that helps us decide.",
      description: "The more we know about the item and its use, the more efficiently and accurately we can assess it.",
      items: [
        { label: "Article", value: "Item type, fabric composition and colour." },
        { label: "Quantity", value: "Approximate number and size variations." },
        { label: "Graphic", value: "Dimensions, position and number of colours." },
        { label: "Use", value: "Washing, abrasion or other relevant conditions." },
        { label: "Deadline", value: "Required production date." },
      ],
    },
    questions: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Before customising fabric.",
      items: [
        { question: "Does screen printing work on every fabric?", answer: "Many fabrics can be printed, but composition, texture, finish and item format need assessment. A sample helps confirm the solution." },
        { question: "Can you print several colours?", answer: "Yes. Each colour is prepared and printed separately, which should be considered in the artwork and quote." },
        {
          question: "What about a few garments with many colours?",
          answer:
            "For short runs with photos, gradients or many colours, [DTF by the metre](/en/dtf/) may be better value, as it needs no film positives or screens. Our [DTF guide](/en/guias/what-is-dtf/) explains the differences.",
        },
        { question: "What should I say about washing?", answer: "Explain how the item will be used and washed. Final durability depends on the material, ink, curing and aftercare." },
      ],
    },
  },
  nonwoven: {
    ...portuguesePages.nonwoven,
    slug: slugs.en.nonwoven,
    shortName: "Non-woven bags",
    metaTitle: "Custom Non-Woven Bags and Screen Printing | SERIFIL",
    metaDescription:
      "What non-woven fabric is and how bags are customised with screen printing. Production for businesses and brands in Guimarães.",
    eyebrow: "NON-WOVEN BAGS · GUIMARÃES",
    title: "Non-woven material that carries your brand.",
    lead:
      "Printing of logos and graphics on bags, covers and other non-woven items for businesses and brands.",
    image: { src: "/images/trabalhos/tnt-05.webp", alt: "Black non-woven bag with green and white printing" },
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
        "Ink is transferred through a screen. Material weight, texture and porosity are considered to control ink deposit and artwork legibility.",
      steps: [
        { title: "Identify the material", description: "We confirm the item, weight when available, colour, texture and finish." },
        { title: "Prepare the artwork", description: "Artwork is sized and colour-separated for printing." },
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
        { src: "/images/trabalhos/tnt-02.webp", alt: "Black non-woven bag with a two-colour logo" },
        { src: "/images/trabalhos/tnt-03.webp", alt: "Custom non-woven bags produced for a brand" },
        { src: "/images/trabalhos/tnt-04.webp", alt: "Blue non-woven bag with a white logo" },
      ],
    },
    preparation: {
      eyebrow: "PREPARE YOUR REQUEST",
      title: "Information needed to quote non-woven bags.",
      description: "If you have already selected the bag, send a photograph or sample. If not, tell us about its intended use.",
      items: [
        { label: "Format", value: "Bag size, handle type, seams and folds." },
        { label: "Material", value: "Colour, weight and composition, when available." },
        { label: "Quantity", value: "Approximate number of units." },
        { label: "Print", value: "Size, position and number of colours." },
        { label: "Artwork", value: "Logo or graphic, ideally in vector format." },
      ],
    },
    questions: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "The essentials about non-wovens.",
      items: [
        { question: "Is a non-woven a plastic or a fabric?", answer: "Non-woven describes a fibrous structure. It can be made from different raw materials, including polymers, so the composition of the specific item should be confirmed." },
        { question: "Is non-woven material the same as conventional fabric?", answer: "No. Conventional fabric is woven or knitted. In a non-woven, fibres are consolidated through other processes." },
        { question: "Can you print bags of different weights?", answer: "Yes, but weight, texture and porosity change how the substrate behaves. The item should be assessed before production." },
      ],
    },
  },
  footwear: {
    ...portuguesePages.footwear,
    slug: slugs.en.footwear,
    shortName: "Footwear components",
    metaTitle: "Printing on Footwear Components | SERIFIL",
    metaDescription:
      "Printing and customisation of insoles, vamps and other components for the footwear industry. Production in Guimarães, Portugal.",
    eyebrow: "FOOTWEAR INDUSTRY · GUIMARÃES",
    title: "Printing adapted to each footwear component.",
    lead:
      "Customisation of insoles, vamps and other components used in footwear production, with assessment of the material and assembly stage.",
    image: {
      src: "/images/hero-serigrafia.webp",
      alt: "Ink being applied through a screen during the screen printing process",
      illustrative: true,
    },
    introduction: {
      title: "The component defines the preparation.",
      paragraphs: [
        "In footwear production, print may be applied to components made from different materials and with different shapes and finishes. The position of the artwork and the production stage at which the item is printed should be considered from the start.",
        "We work from the supplied item and the client’s specification. A sample allows us to assess the usable area, positioning, surface compatibility and handling during production.",
      ],
    },
    facts: [
      { label: "COMPONENTS", value: "Insoles, vamps and other items subject to assessment." },
      { label: "PRINT", value: "Branding, identification and graphic elements." },
      { label: "CONTEXT", value: "Production for businesses in the footwear industry." },
    ],
    technique: {
      eyebrow: "HOW IT WORKS",
      title: "From sample to production run.",
      description:
        "Screen printing transfers ink through a prepared screen. The component format influences how the item is held, positioned and reproduced consistently.",
      steps: [
        { title: "Sample assessment", description: "We review material, format, finish, usable area and the stage at which the item will be printed." },
        { title: "Define the print", description: "We confirm dimensions, position, orientation and number of colours." },
        { title: "Technical preparation", description: "The screen and holding method are prepared for the supplied item." },
        { title: "Production", description: "The print is repeated according to the approved reference and the agreed production setup for the run." },
      ],
    },
    applications: {
      eyebrow: "APPLICATIONS",
      title: "Printing and identification for footwear components.",
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
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Before printing a component.",
      items: [
        { question: "Which components can be customised?", answer: "SERIFIL works with insoles, vamps and other components. Feasibility depends on material, geometry and available area." },
        { question: "Is a sample required?", answer: "It is recommended, especially for a new reference. A sample allows us to assess how the item can be held during printing, as well as its surface and positioning." },
        { question: "Can you work with several references?", answer: "Yes, provided each reference is identified with its artwork, dimensions, quantity and print position." },
      ],
    },
  },
  tshirts: {
    ...portuguesePages.tshirts,
    slug: slugs.en.tshirts,
    shortName: "T-shirt printing",
    metaTitle: "T-shirt Screen Printing in Portugal | SERIFIL",
    metaDescription:
      "T-shirt and sweatshirt screen printing by SERIFIL in Guimarães, Portugal: bright, durable colours. DTF for small batches. Shipped across Portugal.",
    eyebrow: "T-SHIRT PRINTING · GUIMARÃES",
    title: "T-shirts screen printed by us.",
    lead:
      "We screen print T-shirts and sweatshirts in our own production in Guimarães: bright colours that stand up to washing, with a better price per item on runs. For a few items in many colours, we also do DTF.",
    // Real work retouched with AI: illustrative hides the "Work produced by SERIFIL" caption.
    image: {
      src: "/images/servicos/tshirts-dobradas.webp",
      alt: "Folded blue, green and beige T-shirts with the SERIFIL logo printed in orange",
      illustrative: true,
    },
    introduction: {
      title: "Screen printing done by us, from screen to garment.",
      paragraphs: [
        "Screen printing is our everyday work. We prepare the artwork, expose the screens and print each colour in our own production in Guimarães, with direct follow-up from start to finish.",
        "You can send us your own garments or ask us to supply them. Supply depends on the model, colours, sizes and quantity, and is confirmed in the quote.",
      ],
    },
    facts: [
      { label: "PRODUCTION", value: "Screen printing done by SERIFIL in Guimarães." },
      { label: "GARMENTS", value: "T-shirts and sweatshirts, yours or supplied by us." },
      { label: "SHIPPING", value: "Across Portugal." },
    ],
    techniques: {
      eyebrow: "TWO TECHNIQUES",
      title: "Screen printing for runs. DTF for small batches.",
      description: "We choose the technique by quantity and design. If in doubt, send us the design and the quantity and we will tell you what pays off.",
      items: [
        {
          name: "Screen printing",
          badge: "Done by SERIFIL",
          summary: "The choice for runs of T-shirts with the same design, for businesses, uniforms, events and brands.",
          points: [
            "Bright, opaque colours, also on dark T-shirts",
            "Stands up to use and washing",
            "The price per item falls as the quantity grows",
            "Prepared and printed in our own production, with direct follow-up",
          ],
          link: { href: "/en/guias/what-is-screen-printing/", label: "How screen printing works" },
          featured: true,
        },
        {
          name: "DTF",
          badge: "For small batches",
          summary: "For a few garments, many colours or different names on each one.",
          points: [
            "No film positives or screens",
            "Photos, gradients and many colours",
            "Different names and numbers per garment",
          ],
          link: { href: "/en/dtf/", label: "Work out DTF by the metre" },
        },
      ],
    },
    technique: {
      eyebrow: "HOW WE PRINT",
      title: "Screen printing, step by step.",
      description: "Each colour of the design has its own screen and its own pass. That care is what gives strong, lasting colours.",
      steps: [
        {
          title: "Garments and artwork",
          description: "We confirm the garments, quantity per size and position. The artwork is sized and separated by colour.",
        },
        {
          title: "Film positives and screens",
          description: "Each colour is output to a film positive and exposed on its own screen, with the right mesh for the design and fabric.",
        },
        {
          title: "Printing",
          description: "The colours are printed one by one, in register, on each garment.",
        },
        {
          title: "Curing",
          description: "The ink is heat cured so it stands up to use and washing.",
        },
      ],
    },
    applications: {
      eyebrow: "WHO IT IS FOR",
      title: "T-shirts for businesses, teams and events.",
      description:
        "The technique and the garment are chosen by use: a uniform washed every week calls for different decisions from an event T-shirt.",
      items: [
        "T-shirts and sweatshirts with your company logo",
        "Uniforms and workwear",
        "Sports teams, with names and numbers",
        "Events, associations and parties",
        "Clothing brands and merchandise",
      ],
    },
    gallery: {
      eyebrow: "TEXTILE WORK",
      title: "Textiles printed by SERIFIL.",
      images: [
        { src: "/images/servicos/camisola-serifil.webp", alt: "Green sweatshirt with the SERIFIL logo printed on the back" },
        { src: "/images/trabalhos/tecido-01.webp", alt: "Black fabric with gold printing" },
        { src: "/images/trabalhos/tecido-02.webp", alt: "Black fabric cover with a white logo" },
        { src: "/images/trabalhos/tecido-03.webp", alt: "Light fabric item with black printed text" },
      ],
    },
    preparation: {
      eyebrow: "PREPARING YOUR REQUEST",
      title: "What to tell us.",
      description: "With this information we can choose the technique and reply with a quote.",
      items: [
        { label: "Garments", value: "Model, colour and composition, and whether they are yours or supplied by us." },
        { label: "Quantity", value: "Number of garments per size." },
        { label: "Design", value: "File, number of colours and dimensions." },
        { label: "Position", value: "Chest, back, sleeve or another area." },
        { label: "Deadline", value: "When you need the garments." },
      ],
    },
    questions: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Before printing T-shirts.",
      items: [
        {
          question: "Do you supply the T-shirts?",
          answer:
            "Yes. We can supply T-shirts and sweatshirts, depending on the model, colours, sizes and quantity. We also print on garments you bring us.",
        },
        {
          question: "What is the minimum quantity?",
          answer:
            "It depends on the design. With screen printing, the screens are prepared once per colour, so the price per item falls as the quantity grows. For a few garments, [DTF by the metre](/en/dtf/) may be better value.",
        },
        {
          question: "Screen printing or DTF: which should I choose?",
          answer:
            "For runs with the same design, screen printing gives stronger, longer-lasting colours and costs less per item. DTF is for a few garments, photos, gradients or different names. Both are explained in our [screen printing guide](/en/guias/what-is-screen-printing/) and [DTF guide](/en/guias/what-is-dtf/).",
        },
        {
          question: "Do you ship outside Guimarães?",
          answer: "Yes. We produce in Guimarães and ship across Portugal.",
        },
        {
          question: "How long does it take?",
          answer:
            "It depends on the technique, the quantity and whether the garments are yours or supplied by us. The lead time is given in the quote.",
        },
      ],
    },
  },
  bags: {
    ...portuguesePages.bags,
    slug: slugs.en.bags,
    shortName: "Custom bags",
    metaTitle: "Custom Printed Bags with Your Logo | SERIFIL",
    metaDescription:
      "Custom bags with your company logo: non-woven and cotton cloth bags supplied and screen printed by SERIFIL in Guimarães, Portugal.",
    eyebrow: "CUSTOM BAGS · GUIMARÃES",
    title: "Bags with your brand’s logo.",
    lead:
      "We supply non-woven bags and cotton cloth bags and screen print them in our own production in Guimarães. We can also print on items you bring us, on request.",
    image: {
      src: "/images/trabalhos/tnt-01.webp",
      alt: "Black non-woven bag with “Merry Christmas” printed in gold",
    },
    introduction: {
      title: "Choose the bag. We take care of the print.",
      paragraphs: [
        "A bag with your logo takes your brand beyond the shop, the trade fair or the event. There are two kinds of bag we supply already customised: non-woven and cotton cloth.",
        "The model, colour, size and quantity of the bags are confirmed in the quote, because supply depends on availability. If you already have bags, we print on them after assessing the material.",
      ],
    },
    facts: [
      { label: "BAGS", value: "Non-woven and cotton cloth, supplied by us or yours." },
      { label: "PRINT", value: "Screen printing done by SERIFIL in Guimarães." },
      { label: "QUOTE", value: "Model, quantity and print confirmed case by case." },
    ],
    techniques: {
      eyebrow: "TWO KINDS OF BAG",
      title: "Non-woven or cotton?",
      description: "Both take screen printing well. The choice depends on use: tell us what the bag is for and we will help you decide.",
      items: [
        {
          name: "Non-woven bags",
          badge: "Non-woven fabric",
          summary: "Light bags with body, widely used in retail, at trade fairs and at events.",
          points: [
            "Light, with its own structure",
            "For shops, trade fairs, events and product presentation",
            "Weight, colour and size set in the quote",
          ],
          link: { href: getServicePath("en", "nonwoven"), label: "More about non-woven" },
        },
        {
          name: "Cloth bags",
          badge: "Cotton",
          summary: "Cotton bags, made to be used and reused for a long time.",
          points: [
            "Natural fabric, pleasant to the touch",
            "For gifts, merchandise and shops",
            "Model, colour and size set in the quote",
          ],
          link: { href: getServicePath("en", "fabric"), label: "Fabric screen printing" },
        },
      ],
    },
    technique: {
      eyebrow: "HOW IT WORKS",
      title: "From logo to printed bag.",
      description: "In screen printing, each colour of the logo has its own screen and its own pass. That gives strong colours and a price per bag that falls as the quantity grows.",
      steps: [
        {
          title: "Bag and artwork",
          description: "We confirm the bag, quantity and position. The logo is sized and separated by colour.",
        },
        {
          title: "Film positives and screens",
          description: "Each colour is output to a film positive and exposed on its own screen.",
        },
        {
          title: "Printing",
          description: "The colours are printed one by one, in register, on each bag.",
        },
        {
          title: "Drying",
          description: "The ink is dried or cured according to the bag material.",
        },
      ],
    },
    applications: {
      eyebrow: "WHO IT IS FOR",
      title: "Bags to sell, give away and promote.",
      description:
        "The purpose helps choose the bag: a shop bag calls for different decisions from a bag handed out at an event.",
      items: [
        "Shops and retail",
        "Trade fairs, conferences and events",
        "Corporate gifts and merchandise",
        "Associations and clubs",
        "Packaging and product presentation",
      ],
    },
    gallery: {
      eyebrow: "BAG WORK",
      title: "Bags printed by SERIFIL.",
      images: [
        { src: "/images/trabalhos/tnt-02.webp", alt: "Black non-woven bag with a two-colour printed logo" },
        { src: "/images/trabalhos/tnt-03.webp", alt: "Black non-woven bag with white print" },
        { src: "/images/trabalhos/tnt-04.webp", alt: "Blue non-woven bag with a white logo" },
        { src: "/images/trabalhos/tnt-05.webp", alt: "Black non-woven bag with green and white print" },
      ],
    },
    preparation: {
      eyebrow: "PREPARING YOUR REQUEST",
      title: "What to tell us.",
      description: "With this information we can reply with a quote. If you have not chosen the bag yet, tell us what you will use it for.",
      items: [
        { label: "Bag", value: "Non-woven or cloth, size, handle type and colour, and whether it is yours or supplied by us." },
        { label: "Quantity", value: "Approximate number of bags." },
        { label: "Logo", value: "File, ideally vector, and number of colours." },
        { label: "Print", value: "Size and position, on one side or both." },
        { label: "Deadline", value: "When you need the bags." },
      ],
    },
    questions: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Before customising bags.",
      items: [
        {
          question: "Do you supply the bags?",
          answer:
            "Yes. We supply non-woven bags and cotton cloth bags, already customised. The model, colour and size depend on availability and are confirmed in the quote.",
        },
        {
          question: "Can you print bags I already have?",
          answer:
            "Yes, after assessing the material. Screen printing also works on [PVC](/en/servicos/pvc-screen-printing/) and many other substrates.",
        },
        {
          question: "What is the minimum quantity?",
          answer:
            "It depends on the bag and the logo. With screen printing, the screens are prepared once per colour, so the price per bag falls as the quantity grows. Tell us how many you need and we will reply with a quote.",
        },
        {
          question: "How many colours can I print?",
          answer:
            "Each colour has its own screen and its own pass, so logos with a few solid colours are the best value. Our [screen printing guide](/en/guias/what-is-screen-printing/) explains why.",
        },
        {
          question: "How long does it take?",
          answer:
            "It depends on the bag, the quantity and whether the bags are yours or supplied by us. The lead time is given in the quote.",
        },
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
