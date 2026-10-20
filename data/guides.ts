import type { Locale } from "@/data/i18n";
import { getServicePath, type ServiceKey } from "@/data/service-pages";

/**
 * Guias editoriais. Cada guia é publicado em todos os idiomas de `guideLocales`;
 * `key` liga as versões PT e EN (hreflang e seletor de idioma).
 */
export const guideLocales = ["pt", "en"] as const satisfies readonly Locale[];

export type GuideLocale = (typeof guideLocales)[number];

export function isGuideLocale(value: string): value is GuideLocale {
  return guideLocales.includes(value as GuideLocale);
}

export const guideKeys = ["fotolitos", "dtf", "serigrafia"] as const;

export type GuideKey = (typeof guideKeys)[number];

/** Ligações internas dentro do texto: [texto](/caminho/). */
export const inlineLinkPattern = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export function stripInlineLinks(text: string) {
  return text.replace(inlineLinkPattern, "$1");
}

export type GuideImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  /**
   * `work`: trabalho produzido pela SERIFIL.
   * `process`: equipamento ou etapa do processo. As fotografias de equipamento são de um parceiro
   * que trabalha para a SERIFIL: nunca indicar que são instalações da SERIFIL.
   */
  credit: "work" | "process";
};

export type GuideProcessVisual = "artwork" | "film" | "screen" | "print" | "dtf-film" | "powder" | "press";

export type GuideBlock =
  | { type: "paragraph"; text: string }
  | { type: "note"; text: string }
  | { type: "checklist"; items: Array<{ title: string; text: string }> }
  | {
      type: "comparison";
      columns: [string, string];
      rows: Array<{ label: string; values: [string, string] }>;
    }
  | {
      type: "process";
      caption: string;
      steps: Array<{ visual: GuideProcessVisual; title: string; text: string }>;
    }
  | { type: "figure"; image: GuideImage; orientation?: "landscape" | "portrait" }
  | { type: "gallery"; images: GuideImage[] };

export type GuideSection = {
  id: string;
  title: string;
  blocks: GuideBlock[];
};

export type Guide = {
  key: GuideKey;
  slug: string;
  /** Apenas guias `published` geram página, entram na listagem e no sitemap. */
  status: "draft" | "published";
  shortTitle: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  eyebrow: string;
  lead: string;
  /** Datas ISO (AAAA-MM-DD). */
  datePublished: string;
  dateModified: string;
  image: GuideImage;
  summary: string[];
  sections: GuideSection[];
  relatedServices: ServiceKey[];
};

type GuidesUi = {
  htmlLang: string;
  hreflang: string;
  dateLocale: string;
  ogLocale: string;
  sectionName: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  breadcrumbsLabel: string;
  home: string;
  listEyebrow: string;
  listTitle: string;
  listDescription: string;
  readGuide: string;
  readingTime: (minutes: number) => string;
  published: string;
  summaryTitle: string;
  tocTitle: string;
  realWork: string;
  process: string;
  relatedServicesEyebrow: string;
  relatedServicesTitle: string;
  relatedServicesDescription: string;
  moreGuidesEyebrow: string;
  quoteTitle: string;
  quoteDescription: string;
  quote: string;
};

export const guidesUi: Record<GuideLocale, GuidesUi> = {
  pt: {
    htmlLang: "pt-PT",
    hreflang: "pt-PT",
    dateLocale: "pt-PT",
    ogLocale: "pt_PT",
    sectionName: "Guias",
    metaTitle: "Guias de Serigrafia | SERIFIL",
    metaDescription:
      "Guias práticos de serigrafia e impressão industrial: fotolitos, telas, cores e preparação de ficheiros. Informação da SERIFIL, em Guimarães.",
    eyebrow: "GUIAS DE SERIGRAFIA",
    title: "Guias de Serigrafia",
    lead:
      "Explicações práticas sobre o processo de impressão, para preparar melhor cada projeto e perceber o que influencia um orçamento.",
    breadcrumbsLabel: "Navegação estrutural",
    home: "Início",
    listEyebrow: "GUIAS PUBLICADOS",
    listTitle: "Do ficheiro à peça impressa.",
    listDescription:
      "Cada guia explica uma etapa do trabalho de serigrafia e o que convém saber antes de pedir orçamento.",
    readGuide: "Ler guia",
    readingTime: (minutes) => `${minutes} min de leitura`,
    published: "Publicado a",
    summaryTitle: "Em resumo",
    tocTitle: "Neste guia",
    realWork: "Trabalho produzido pela SERIFIL",
    process: "Preparação da impressão",
    relatedServicesEyebrow: "SERVIÇOS RELACIONADOS",
    relatedServicesTitle: "Onde aplicamos este processo.",
    relatedServicesDescription:
      "A preparação da arte é comum a todos os suportes. Conheça o que muda em cada material.",
    moreGuidesEyebrow: "MAIS GUIAS",
    quoteTitle: "Tem um trabalho para imprimir?",
    quoteDescription:
      "Envie a arte, o suporte, o número de cores e a quantidade aproximada. Com essa informação conseguimos avaliar o pedido e entrar em contacto consigo.",
    quote: "Pedir orçamento",
  },
  en: {
    htmlLang: "en",
    hreflang: "en",
    dateLocale: "en-GB",
    ogLocale: "en_GB",
    sectionName: "Guides",
    metaTitle: "Screen Printing Guides | SERIFIL",
    metaDescription:
      "Practical guides to screen printing and industrial printing: film positives, screens, colours and artwork preparation. From SERIFIL in Guimarães, Portugal.",
    eyebrow: "SCREEN PRINTING GUIDES",
    title: "Screen Printing Guides",
    lead:
      "Practical explanations of the printing process, to help you prepare each project and understand what affects a quote.",
    breadcrumbsLabel: "Breadcrumb navigation",
    home: "Home",
    listEyebrow: "PUBLISHED GUIDES",
    listTitle: "From file to printed item.",
    listDescription:
      "Each guide explains one stage of screen printing and what is worth knowing before requesting a quote.",
    readGuide: "Read guide",
    readingTime: (minutes) => `${minutes} min read`,
    published: "Published",
    summaryTitle: "In short",
    tocTitle: "In this guide",
    realWork: "Work produced by SERIFIL",
    process: "Print preparation",
    relatedServicesEyebrow: "RELATED SERVICES",
    relatedServicesTitle: "Where we use this process.",
    relatedServicesDescription:
      "Artwork preparation is common to every substrate. See what changes with each material.",
    moreGuidesEyebrow: "MORE GUIDES",
    quoteTitle: "Have a job to print?",
    quoteDescription:
      "Send the artwork, substrate, number of colours and approximate quantity. With that information we can assess your request and get back to you.",
    quote: "Request a quote",
  },
};

const imageFiles = {
  imagesetter: { src: "/images/guias/filmadora-fotolitos.webp", width: 900, height: 1125, credit: "process" },
  exposure: { src: "/images/guias/mesa-exposicao.webp", width: 1440, height: 810, credit: "process" },
  screens: { src: "/images/guias/telas-serigrafia.webp", width: 1440, height: 810, credit: "process" },
  stretcher: { src: "/images/guias/esticador-telas.webp", width: 1440, height: 810, credit: "process" },
  nonwovenWork: { src: "/images/trabalhos/tnt-05.webp", width: 1600, height: 1200, credit: "work" },
  pvcWork: { src: "/images/trabalhos/pvc-03.webp", width: 1600, height: 1200, credit: "work" },
} as const;

type GuideImageKey = keyof typeof imageFiles;

const imageCopy: Record<GuideLocale, Record<GuideImageKey, { alt: string; caption: string }>> = {
  pt: {
    imagesetter: {
      alt: "Filmadora AGFA AccuSet 1500 com uma folha de película pousada no topo",
      caption:
        "Filmadora: o equipamento que passa a arte digital para a película que dá origem ao fotolito.",
    },
    exposure: {
      alt: "Mesa de exposição iluminada com uma tela pressionada por pesos e, ao lado, uma processadora de película AGFA Rapiline",
      caption:
        "Mesa de exposição: a tela e o fotolito ficam em contacto, pressionados por pesos, enquanto a luz grava o desenho na emulsão. Ao lado, a processadora de película.",
    },
    screens: {
      alt: "Telas de serigrafia de vários tamanhos encostadas à parede, algumas revestidas com emulsão amarela e roxa",
      caption:
        "Telas de vários formatos. As amarelas e a roxa estão revestidas de emulsão; nas brancas vê-se a malha.",
    },
    stretcher: {
      alt: "Esticador de telas com grampos vermelhos montado sobre uma bancada de madeira",
      caption: "Esticador de telas: a malha é esticada e fixada ao quadro antes de receber a emulsão.",
    },
    nonwovenWork: {
      alt: "Saco preto em TNT com logótipo impresso a verde e branco",
      caption: "Logótipo a duas cores sobre TNT preto. Cada cor teve a sua própria preparação.",
    },
    pvcWork: {
      alt: "Aviso de segurança em três línguas impresso a preto sobre PVC transparente",
      caption:
        "Texto de pequena dimensão sobre PVC transparente. Em detalhes assim, a qualidade do ficheiro nota-se no resultado.",
    },
  },
  en: {
    imagesetter: {
      alt: "AGFA AccuSet 1500 imagesetter with a sheet of film resting on top",
      caption:
        "Imagesetter: the equipment that outputs the digital artwork onto the film that becomes the film positive.",
    },
    exposure: {
      alt: "Illuminated exposure unit with a screen held down by weights and, next to it, an AGFA Rapiline film processor",
      caption:
        "Exposure unit: the screen and film are held in contact by weights while the light fixes the design in the emulsion. Alongside it, the film processor.",
    },
    screens: {
      alt: "Screen printing screens of various sizes leaning against a wall, some coated with yellow and purple emulsion",
      caption:
        "Screens in various sizes. The yellow and purple ones are coated with emulsion; on the white ones you can see the bare mesh.",
    },
    stretcher: {
      alt: "Screen stretcher with red toggle clamps mounted on a wooden workbench",
      caption: "Screen stretcher: the mesh is stretched and fixed to the frame before it is coated with emulsion.",
    },
    nonwovenWork: {
      alt: "Black non-woven bag with a logo printed in green and white",
      caption: "Two-colour logo on black non-woven material. Each colour had its own preparation.",
    },
    pvcWork: {
      alt: "Safety warning in three languages printed in black on clear PVC",
      caption: "Small text printed on clear PVC. With detail like this, the quality of the file shows in the result.",
    },
  },
};

function guideImage(locale: GuideLocale, key: GuideImageKey): GuideImage {
  return { ...imageFiles[key], ...imageCopy[locale][key] };
}

const ptPaths = {
  pvc: getServicePath("pt", "pvc"),
  fabric: getServicePath("pt", "fabric"),
  nonwoven: getServicePath("pt", "nonwoven"),
  footwear: getServicePath("pt", "footwear"),
  tshirts: getServicePath("pt", "tshirts"),
  bags: getServicePath("pt", "bags"),
};

const enPaths = {
  pvc: getServicePath("en", "pvc"),
  fabric: getServicePath("en", "fabric"),
  nonwoven: getServicePath("en", "nonwoven"),
  footwear: getServicePath("en", "footwear"),
  tshirts: getServicePath("en", "tshirts"),
  bags: getServicePath("en", "bags"),
};

const fotolitos: Guide = {
  key: "fotolitos",
  slug: "fotolitos",
  status: "published",
  shortTitle: "Fotolitos",
  title: "Fotolitos: o que são e para que servem na serigrafia",
  metaTitle: "Fotolitos: o que são e para que servem na serigrafia | SERIFIL",
  metaDescription:
    "O que é um fotolito, como se distingue da tela e que ficheiros preparar para um orçamento de serigrafia. Guia prático da SERIFIL, em Guimarães.",
  excerpt:
    "O que é um fotolito, qual a diferença para a tela, porque é que o número de cores pesa no orçamento e que ficheiros deve enviar.",
  eyebrow: "GUIAS DE SERIGRAFIA · PREPARAÇÃO",
  lead:
    "Antes de a tinta chegar ao saco, ao PVC ou ao tecido, o desenho tem de ser gravado numa tela. O fotolito é a peça que torna essa passagem possível. Perceber como funciona ajuda a preparar a arte, a ler um orçamento e a planear repetições.",
  datePublished: "2026-09-14",
  dateModified: "2026-09-14",
  image: guideImage("pt", "exposure"),
  summary: [
    "O fotolito é uma película transparente com o desenho a imprimir em preto opaco.",
    "Serve para gravar o desenho na tela. Não é ele que imprime.",
    "Em regra, cada cor do desenho precisa do seu fotolito e da sua tela.",
    "Ficheiros vetoriais, medidas reais e cores identificadas evitam preparação adicional.",
    "Numa repetição, identifique a encomenda anterior e qualquer alteração à arte.",
  ],
  sections: [
    {
      id: "o-que-e-um-fotolito",
      title: "O que é um fotolito?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Um fotolito é uma película transparente onde o desenho a imprimir aparece em preto opaco. Funciona como um molde de luz: as zonas pretas bloqueiam a luz e as zonas transparentes deixam-na passar.",
        },
        {
          type: "paragraph",
          text:
            "O fotolito não imprime nada nem toca na peça final. É uma ferramenta de preparação, usada antes da impressão para gravar o desenho na tela. Como na serigrafia cada cor é impressa separadamente, um desenho a várias cores dá origem, em regra, a um fotolito por cor.",
        },
        { type: "figure", image: guideImage("pt", "imagesetter"), orientation: "portrait" },
      ],
    },
    {
      id: "como-e-usado",
      title: "Como é usado no processo",
      blocks: [
        {
          type: "paragraph",
          text:
            "Entre o ficheiro enviado pelo cliente e a peça impressa há quatro etapas principais. O fotolito está no meio: é a ligação entre a arte digital e a tela.",
        },
        {
          type: "process",
          caption: "Esquema simplificado do processo, para um desenho a duas cores.",
          steps: [
            {
              visual: "artwork",
              title: "Arte final",
              text:
                "O ficheiro é verificado e ajustado ao tamanho real de impressão. Se o desenho tiver várias cores, é separado cor a cor.",
            },
            {
              visual: "film",
              title: "Fotolitos",
              text: "Cada cor é passada para uma película própria, com essa parte do desenho em preto opaco.",
            },
            {
              visual: "screen",
              title: "Gravação da tela",
              text:
                "A tela, revestida com uma emulsão sensível à luz, é exposta com o fotolito por cima. Onde há preto, a emulsão não endurece e é depois removida com água, deixando a malha aberta.",
            },
            {
              visual: "print",
              title: "Impressão",
              text:
                "A raclete empurra a tinta pelas zonas abertas da malha e o desenho passa para o suporte. Cada cor tem a sua passagem.",
            },
          ],
        },
        { type: "figure", image: guideImage("pt", "exposure") },
      ],
    },
    {
      id: "fotolito-ou-tela",
      title: "Fotolito e tela: qual é a diferença?",
      blocks: [
        {
          type: "paragraph",
          text:
            "São duas peças diferentes, usadas em momentos diferentes, e é frequente confundi-las. O fotolito serve para gravar; a tela serve para imprimir.",
        },
        {
          type: "comparison",
          columns: ["Fotolito", "Tela"],
          rows: [
            {
              label: "O que é",
              values: [
                "Película transparente com o desenho em preto opaco.",
                "Quadro com uma malha esticada, revestida de emulsão.",
              ],
            },
            {
              label: "Para que serve",
              values: [
                "Transferir o desenho para a tela durante a preparação.",
                "Imprimir: a tinta passa pelas zonas abertas da malha.",
              ],
            },
            { label: "Contacto com a tinta", values: ["Não.", "Sim, em cada peça impressa."] },
            {
              label: "Quando é preciso refazer",
              values: [
                "Quando mudam o desenho, o tamanho ou a separação de cores.",
                "Quando muda o desenho gravado ou o trabalho exige outra preparação da tela.",
              ],
            },
          ],
        },
        { type: "gallery", images: [guideImage("pt", "screens"), guideImage("pt", "stretcher")] },
      ],
    },
    {
      id: "cores-e-orcamento",
      title: "Como as cores e a preparação influenciam o orçamento",
      blocks: [
        {
          type: "paragraph",
          text:
            "Antes de imprimir a primeira peça há trabalho de preparação: rever a arte, fazer os fotolitos, gravar as telas e acertar a posição de cada cor. Esse trabalho depende sobretudo do desenho, e não da quantidade.",
        },
        {
          type: "checklist",
          items: [
            {
              title: "Número de cores",
              text:
                "Em regra, cada cor precisa do seu fotolito, da sua tela e da sua passagem de impressão, com as cores alinhadas entre si. Um logótipo a três cores exige mais preparação do que o mesmo logótipo a uma cor.",
            },
            {
              title: "Tamanho e posições",
              text:
                "A área do desenho condiciona o tamanho da película e da tela. Imprimir em mais do que um local da peça, como frente e verso, pode acrescentar preparação e passagens.",
            },
            {
              title: "Estado da arte",
              text:
                "Um ficheiro vetorial pronto a usar poupa trabalho. Uma imagem de baixa resolução, textos por converter ou cores por definir podem obrigar a preparar a arte antes de fazer os fotolitos.",
            },
            {
              title: "Detalhe e degradês",
              text:
                "Traços muito finos, letras pequenas, fotografias e degradês pedem mais cuidado e nem sempre se adaptam a todos os suportes. Convém avaliá-los antes de fechar o desenho.",
            },
            {
              title: "Suporte",
              text: `A cor e a textura do material mudam a forma como as cores aparecem. Em [PVC transparente](${ptPaths.pvc}), em [TNT](${ptPaths.nonwoven}) ou em [tecido](${ptPaths.fabric}), a preparação é pensada para que o desenho se leia bem.`,
            },
            {
              title: "Quantidade",
              text:
                "Como a preparação é feita antes da produção, o seu peso no custo de cada unidade tende a ser maior em quantidades pequenas.",
            },
          ],
        },
        { type: "figure", image: guideImage("pt", "nonwovenWork") },
        {
          type: "note",
          text:
            "Este guia não substitui um orçamento. Para uma avaliação rigorosa, indique a arte, o suporte, o número de cores, o tamanho de impressão e a quantidade aproximada.",
        },
      ],
    },
    {
      id: "ficheiros-a-enviar",
      title: "Que ficheiros deve enviar",
      blocks: [
        {
          type: "paragraph",
          text:
            "Quanto mais completa for a informação, menos dúvidas ficam por esclarecer antes de fazer os fotolitos. Use esta lista para preparar o envio.",
        },
        {
          type: "checklist",
          items: [
            {
              title: "Arte em formato vetorial",
              text:
                "Por exemplo PDF vetorial, AI, EPS ou SVG. Os ficheiros vetoriais mantêm a nitidez em qualquer tamanho.",
            },
            {
              title: "Textos convertidos em curvas",
              text: "Converta os textos em contornos ou envie as fontes utilizadas, para evitar trocas de letra.",
            },
            {
              title: "Cores identificadas",
              text:
                "Indique quantas cores tem o desenho e, se a correspondência de cor for importante, a referência de cada uma, por exemplo Pantone.",
            },
            {
              title: "Medidas e posição",
              text:
                "Tamanho final da impressão e local na peça. Uma fotografia ou um esboço com a posição marcada ajuda.",
            },
            {
              title: "Informação sobre o suporte",
              text: "Tipo de material, cor e, se possível, fotografia ou amostra da peça.",
            },
            {
              title: "Se só tiver uma imagem",
              text:
                "Envie a versão com mais qualidade que tiver, em JPG ou PNG. Pode ser necessário preparar a arte antes de avançar, o que é analisado com o pedido.",
            },
          ],
        },
        { type: "figure", image: guideImage("pt", "pvcWork") },
        {
          type: "paragraph",
          text: `Cada material tem as suas particularidades. Nas páginas de [serigrafia em PVC](${ptPaths.pvc}), [serigrafia em tecido](${ptPaths.fabric}), [sacos em TNT](${ptPaths.nonwoven}) e [componentes para calçado](${ptPaths.footwear}) encontra a informação específica a indicar no pedido.`,
        },
      ],
    },
    {
      id: "repetir-uma-encomenda",
      title: "Repetir uma encomenda: o que considerar",
      blocks: [
        {
          type: "paragraph",
          text:
            "Quando um trabalho se repete, parte da preparação pode já estar feita. Isso depende do que se mantém igual e deve ser confirmado caso a caso.",
        },
        {
          type: "checklist",
          items: [
            {
              title: "Identifique a encomenda anterior",
              text: "Indique a data aproximada ou a referência, ou envie uma fotografia da peça já impressa.",
            },
            {
              title: "Confirme que a arte é a mesma",
              text:
                "Uma alteração pequena, como um contacto, uma data ou um tamanho diferente, implica em regra um novo fotolito e uma nova gravação da tela para a cor afetada.",
            },
            {
              title: "Verifique cores e suporte",
              text:
                "Mudar a cor da tinta, o material ou a cor da peça pode exigir ajustes, mesmo com o mesmo desenho.",
            },
            {
              title: "Pergunte pela preparação anterior",
              text:
                "Se é possível reaproveitar fotolitos ou telas de um trabalho anterior é algo a confirmar no pedido de orçamento.",
            },
            {
              title: "Guarde a arte aprovada",
              text:
                "Ter o ficheiro final guardado facilita qualquer repetição, mesmo que seja necessário preparar tudo de novo.",
            },
          ],
        },
      ],
    },
  ],
  relatedServices: ["pvc", "fabric", "nonwoven", "footwear"],
};

const filmPositives: Guide = {
  key: "fotolitos",
  slug: "film-positives",
  status: "published",
  shortTitle: "Film positives",
  title: "Film positives: what they are and what they do in screen printing",
  metaTitle: "Film Positives in Screen Printing: What They Are | SERIFIL",
  metaDescription:
    "What a film positive is, how it differs from the screen and which files to prepare for a screen printing quote. A practical guide from SERIFIL in Portugal.",
  excerpt:
    "What a film positive is, how it differs from the screen, why the number of colours affects the quote and which files to send.",
  eyebrow: "SCREEN PRINTING GUIDES · PREPARATION",
  lead:
    "Before ink reaches a bag, a PVC item or a fabric, the design has to be transferred onto a screen. The film positive is what makes that step possible. Understanding how it works helps you prepare artwork, read a quote and plan repeat orders.",
  datePublished: "2026-09-14",
  dateModified: "2026-09-14",
  image: guideImage("en", "exposure"),
  summary: [
    "A film positive is a transparent film with the design printed in opaque black.",
    "It is used to transfer the design onto the screen. It does not print anything itself.",
    "As a rule, each colour in the design needs its own film and its own screen.",
    "Vector files, actual print sizes and identified colours avoid extra preparation.",
    "For a repeat order, identify the previous job and any change to the artwork.",
  ],
  sections: [
    {
      id: "what-is-a-film-positive",
      title: "What is a film positive?",
      blocks: [
        {
          type: "paragraph",
          text:
            "A film positive is a transparent sheet on which the design to be printed appears in opaque black. It works like a light mask: the black areas block the light and the clear areas let it through.",
        },
        {
          type: "paragraph",
          text:
            "The film never touches the ink or the finished item. It is a preparation tool, used before printing to transfer the design onto the screen. Because each colour is printed separately in screen printing, a multi-colour design usually needs one film per colour.",
        },
        { type: "figure", image: guideImage("en", "imagesetter"), orientation: "portrait" },
      ],
    },
    {
      id: "how-it-is-used",
      title: "How it is used in the process",
      blocks: [
        {
          type: "paragraph",
          text:
            "There are four main stages between the file sent by the client and the printed item. The film positive sits in the middle, linking the digital artwork to the screen.",
        },
        {
          type: "process",
          caption: "Simplified diagram of the process for a two-colour design.",
          steps: [
            {
              visual: "artwork",
              title: "Final artwork",
              text:
                "The file is checked and set to the actual print size. If the design has several colours, it is separated colour by colour.",
            },
            {
              visual: "film",
              title: "Film positives",
              text: "Each colour is output onto its own film, with that part of the design in opaque black.",
            },
            {
              visual: "screen",
              title: "Screen exposure",
              text:
                "The screen, coated with light-sensitive emulsion, is exposed with the film on top. Where the film is black, the emulsion does not harden and is later washed out with water, leaving the mesh open.",
            },
            {
              visual: "print",
              title: "Printing",
              text:
                "The squeegee pushes ink through the open areas of the mesh and the design is transferred to the substrate. Each colour has its own pass.",
            },
          ],
        },
        { type: "figure", image: guideImage("en", "exposure") },
      ],
    },
    {
      id: "film-or-screen",
      title: "Film positive or screen: what is the difference?",
      blocks: [
        {
          type: "paragraph",
          text:
            "They are two different items, used at different stages, and they are often confused. The film is used to transfer the design; the screen is used to print it.",
        },
        {
          type: "comparison",
          columns: ["Film positive", "Screen"],
          rows: [
            {
              label: "What it is",
              values: [
                "A transparent film with the design in opaque black.",
                "A frame with stretched mesh, coated with emulsion.",
              ],
            },
            {
              label: "What it does",
              values: [
                "Transfers the design onto the screen during preparation.",
                "Prints: ink passes through the open areas of the mesh.",
              ],
            },
            { label: "Contact with ink", values: ["No.", "Yes, for every printed item."] },
            {
              label: "When it must be remade",
              values: [
                "When the design, size or colour separation changes.",
                "When the exposed design changes or the job needs a different screen preparation.",
              ],
            },
          ],
        },
        { type: "gallery", images: [guideImage("en", "screens"), guideImage("en", "stretcher")] },
      ],
    },
    {
      id: "colours-and-quotes",
      title: "How colours and preparation affect the quote",
      blocks: [
        {
          type: "paragraph",
          text:
            "Before the first item is printed, there is preparation work: checking the artwork, producing the films, exposing the screens and registering each colour. That work depends mainly on the design, not on the quantity.",
        },
        {
          type: "checklist",
          items: [
            {
              title: "Number of colours",
              text:
                "As a rule, each colour needs its own film, its own screen and its own printing pass, with the colours aligned to one another. A three-colour logo needs more preparation than the same logo in one colour.",
            },
            {
              title: "Size and print positions",
              text:
                "The size of the design determines the size of the film and screen. Printing in more than one position, such as front and back, may add preparation and passes.",
            },
            {
              title: "State of the artwork",
              text:
                "A print-ready vector file saves work. A low-resolution image, live text or undefined colours may mean the artwork has to be prepared before the films are made.",
            },
            {
              title: "Detail and gradients",
              text:
                "Very fine lines, small text, photographs and gradients need more care and do not suit every substrate. They are worth assessing before the design is finalised.",
            },
            {
              title: "Substrate",
              text: `The colour and texture of the material change how colours appear. On [clear PVC](${enPaths.pvc}), [non-woven material](${enPaths.nonwoven}) or [fabric](${enPaths.fabric}), preparation is planned so that the design reads well.`,
            },
            {
              title: "Quantity",
              text:
                "Because preparation happens before production, its share of the cost per item tends to be higher for small quantities.",
            },
          ],
        },
        { type: "figure", image: guideImage("en", "nonwovenWork") },
        {
          type: "note",
          text:
            "This guide is not a quote. For an accurate assessment, tell us about the artwork, substrate, number of colours, print size and approximate quantity.",
        },
      ],
    },
    {
      id: "files-to-send",
      title: "Which files to send",
      blocks: [
        {
          type: "paragraph",
          text:
            "The more complete the information, the fewer questions remain before the films are made. Use this list to prepare what you send.",
        },
        {
          type: "checklist",
          items: [
            {
              title: "Vector artwork",
              text: "For example vector PDF, AI, EPS or SVG. Vector files stay sharp at any size.",
            },
            {
              title: "Text converted to outlines",
              text: "Convert text to outlines or send the fonts used, to avoid font substitution.",
            },
            {
              title: "Identified colours",
              text:
                "Say how many colours the design has and, if colour matching matters, give a reference for each one, for example Pantone.",
            },
            {
              title: "Size and position",
              text: "Final print size and position on the item. A photo or sketch with the position marked helps.",
            },
            {
              title: "Substrate details",
              text: "Type of material, colour and, if possible, a photo or sample of the item.",
            },
            {
              title: "If you only have an image",
              text:
                "Send the highest-quality version you have, as JPG or PNG. The artwork may need preparing before going ahead, which is assessed with your request.",
            },
          ],
        },
        { type: "figure", image: guideImage("en", "pvcWork") },
        {
          type: "paragraph",
          text: `Each material has its own particularities. The pages on [PVC screen printing](${enPaths.pvc}), [fabric screen printing](${enPaths.fabric}), [non-woven bags](${enPaths.nonwoven}) and [footwear components](${enPaths.footwear}) explain what to include in your request.`,
        },
      ],
    },
    {
      id: "repeat-orders",
      title: "Repeat orders: what to consider",
      blocks: [
        {
          type: "paragraph",
          text:
            "When a job is repeated, part of the preparation may already be done. That depends on what stays the same and should be confirmed case by case.",
        },
        {
          type: "checklist",
          items: [
            {
              title: "Identify the previous order",
              text: "Give the approximate date or reference, or send a photo of the printed item.",
            },
            {
              title: "Check the artwork is identical",
              text:
                "A small change, such as a contact detail, a date or a different size, usually means a new film and a new screen exposure for the colour affected.",
            },
            {
              title: "Check colours and substrate",
              text:
                "Changing the ink colour, the material or the colour of the item may require adjustments, even with the same design.",
            },
            {
              title: "Ask about previous preparation",
              text:
                "Whether films or screens from a previous job can be reused is something to confirm when requesting a quote.",
            },
            {
              title: "Keep the approved artwork",
              text:
                "Keeping the final file makes any repeat easier, even if everything has to be prepared again.",
            },
          ],
        },
      ],
    },
  ],
  relatedServices: ["pvc", "fabric", "nonwoven", "footwear"],
};

/** Fotografia da prensagem (trabalho real retocado com IA): crédito "process", nunca "work". */
const dtfShare = { src: "/images/dtf/dtf-og.jpg", width: 1200, height: 630, credit: "process" } as const;

/**
 * Guia do DTF. Regras: nunca dizer quem imprime o filme nem que a SERIFIL tem impressora DTF;
 * a aplicação (prensagem) é feita pela SERIFIL. Os preços repetem os de `data/dtf.ts`.
 */
const dtfPt: Guide = {
  key: "dtf",
  slug: "o-que-e-dtf",
  status: "published",
  shortTitle: "DTF",
  title: "DTF: o que é e como funciona a impressão DTF em têxtil",
  metaTitle: "O que é DTF e como funciona a impressão DTF | SERIFIL",
  metaDescription:
    "O que é o DTF, como se faz, quando compensa face à serigrafia e como preparar o ficheiro. Guia prático da SERIFIL, em Guimarães, com DTF ao metro.",
  excerpt:
    "O que é o DTF, as quatro etapas do processo, quando compensa face à serigrafia e como preparar os ficheiros para encher um metro de filme.",
  eyebrow: "GUIAS DE IMPRESSÃO · DTF",
  lead:
    "O DTF permite estampar desenhos a cores em têxtil sem quadros nem fotolitos. É uma boa solução para poucas peças, muitas cores ou desenhos que mudam de peça para peça. Este guia explica como funciona e o que convém saber antes de encomendar.",
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  image: { ...dtfShare, alt: "Prensa de calor a aplicar um transfer DTF com o logótipo SERIFIL numa t-shirt azul", caption: "Prensagem de um transfer DTF numa t-shirt." },
  summary: [
    "DTF quer dizer «direct to film»: o desenho é impresso num filme e depois transferido para a peça com calor.",
    "Não precisa de fotolitos nem de telas, por isso o número de cores não muda a preparação.",
    "Compensa em pequenas produções, desenhos com muitas cores, degradês ou fotografias.",
    "Envie cada desenho à medida real, em PNG com fundo transparente a 300 dpi ou em PDF.",
    "O filme é vendido ao metro e pode juntar vários desenhos no mesmo metro.",
  ],
  sections: [
    {
      id: "o-que-e-o-dtf",
      title: "O que é o DTF?",
      blocks: [
        {
          type: "paragraph",
          text:
            "DTF é a sigla de «direct to film», impressão direta em filme. O desenho é impresso a cores sobre um filme transparente, com uma camada de tinta branca por trás das cores. Depois recebe um pó adesivo que, com calor, o fixa ao tecido.",
        },
        {
          type: "paragraph",
          text:
            "Ao contrário da serigrafia, não há [fotolitos](/pt/guias/fotolitos/) nem telas para preparar. O filme sai pronto a prensar, seja para uma peça ou para cem, e cada metro pode levar desenhos diferentes. É por isso que o DTF é vendido ao metro: paga-se o filme que os desenhos ocupam.",
        },
      ],
    },
    {
      id: "como-funciona",
      title: "Como funciona, passo a passo",
      blocks: [
        {
          type: "paragraph",
          text: "Do ficheiro à peça estampada há quatro etapas. As três primeiras fazem o filme; a última passa o desenho para o tecido.",
        },
        {
          type: "process",
          caption: "Esquema simplificado do processo DTF.",
          steps: [
            {
              visual: "artwork",
              title: "Ficheiro",
              text: "Cada desenho é preparado à medida real, com fundo transparente, e os desenhos são arrumados lado a lado na largura do filme.",
            },
            {
              visual: "dtf-film",
              title: "Impressão no filme",
              text: "O desenho é impresso a cores sobre o filme, em espelho, com uma camada de branco por cima para que as cores se vejam em tecidos escuros.",
            },
            {
              visual: "powder",
              title: "Pó adesivo",
              text: "Ainda com a tinta fresca, o filme recebe um pó adesivo que só agarra onde há impressão. Com calor, o pó funde e fica pronto a colar.",
            },
            {
              visual: "press",
              title: "Prensagem",
              text: "O filme é posto sobre a peça e prensado com calor e pressão. Depois de arrefecer o necessário, retira-se o filme e o desenho fica no tecido.",
            },
          ],
        },
      ],
    },
    {
      id: "dtf-ou-serigrafia",
      title: "DTF ou serigrafia?",
      blocks: [
        {
          type: "paragraph",
          text: "São técnicas diferentes, cada uma com o seu lugar. A escolha depende sobretudo da quantidade, do número de cores e do suporte.",
        },
        {
          type: "comparison",
          columns: ["DTF", "Serigrafia"],
          rows: [
            {
              label: "Preparação",
              values: ["Nenhuma: o desenho vai direto do ficheiro para o filme.", "Um fotolito e uma tela por cor, antes de imprimir."],
            },
            {
              label: "Cores",
              values: ["Indiferente: fotografias, degradês e muitas cores.", "Cada cor acrescenta preparação e uma passagem."],
            },
            {
              label: "Quantidades",
              values: ["Poucas peças, séries curtas e desenhos diferentes por peça.", "Séries maiores, em que a preparação se dilui."],
            },
            {
              label: "Suportes",
              values: ["Têxteis.", "Têxtil, PVC, TNT, componentes e outros suportes."],
            },
            {
              label: "Acabamento",
              values: ["Camada fina por cima do tecido.", "A tinta fica no material; o toque depende da tinta."],
            },
          ],
        },
        {
          type: "paragraph",
          text: `Em séries grandes com poucas cores, a [serigrafia em tecido](${ptPaths.fabric}) costuma compensar mais. Se tiver dúvidas, envie o desenho e a quantidade e dizemos-lhe o que faz mais sentido.`,
        },
      ],
    },
    {
      id: "pecas",
      title: "Em que peças se pode aplicar",
      blocks: [
        {
          type: "paragraph",
          text:
            "O DTF adere à maioria dos têxteis, em cores claras ou escuras: algodão, poliéster e misturas, em t-shirts, sweats, sacos de pano, roupa de trabalho e muitas outras peças.",
        },
        {
          type: "note",
          text:
            "Tecidos muito texturados, impermeáveis, com acabamentos especiais ou sensíveis ao calor devem ser confirmados antes. Se quiser que prensemos nas suas peças, diga-nos que peças são e de que tecido.",
        },
      ],
    },
    {
      id: "preparar-o-ficheiro",
      title: "Como preparar o ficheiro",
      blocks: [
        {
          type: "paragraph",
          text: "O filme reproduz exatamente o ficheiro, por isso vale a pena prepará-lo bem. Use esta lista antes de enviar.",
        },
        {
          type: "checklist",
          items: [
            { title: "Medida real", text: "Prepare cada desenho no tamanho em que vai ficar na peça. Um logótipo de peito tem, em regra, entre 8 e 10 cm de largura." },
            { title: "Fundo transparente", text: "Em PNG, o fundo tem de ser transparente. Um fundo branco seria impresso como um retângulo branco." },
            { title: "Resolução", text: "300 dpi à medida real. Imagens de baixa resolução ficam com contornos serrilhados." },
            { title: "Formato", text: "PNG com fundo transparente ou PDF. Envie um ficheiro por desenho." },
            { title: "Traços finos", text: "Linhas e letras muito finas podem não aderir bem ao tecido. Evite traços com menos de 1 mm." },
            { title: "Vários desenhos", text: "Pode juntar vários desenhos no mesmo filme. Diga-nos quantas vezes quer cada um." },
          ],
        },
      ],
    },
    {
      id: "aplicar-e-cuidar",
      title: "Aplicar e cuidar das peças",
      blocks: [
        {
          type: "paragraph",
          text:
            "Se levar só o filme, aplica-o com uma prensa de calor. A temperatura, o tempo e o momento de retirar o filme dependem do filme: confirme connosco os valores antes de prensar a primeira peça.",
        },
        {
          type: "checklist",
          items: [
            { title: "Lavar do avesso", text: "Vire a peça do avesso antes de lavar e evite temperaturas altas." },
            { title: "Sem ferro sobre o desenho", text: "Se passar a peça a ferro, faça-o do avesso ou com um pano por cima." },
            { title: "Sem lixívia nem secador forte", text: "Produtos agressivos e calor intenso desgastam o desenho mais depressa." },
          ],
        },
      ],
    },
    {
      id: "preco",
      title: "Quanto custa o DTF ao metro",
      blocks: [
        {
          type: "paragraph",
          text:
            "O filme custa 9 € por metro até 9 m e 8,50 € por metro a partir de 10 m, mais IVA. É cobrado aos 10 cm, com um mínimo de meio metro. A aplicação nas suas peças é orçamentada à parte.",
        },
        {
          type: "paragraph",
          text:
            "Na [calculadora de DTF ao metro](/pt/dtf/) junta os seus desenhos, vê como ficam arrumados no filme e quanto custam, e envia o pedido.",
        },
      ],
    },
  ],
  relatedServices: ["fabric"],
};

const dtfEn: Guide = {
  key: "dtf",
  slug: "what-is-dtf",
  status: "published",
  shortTitle: "DTF",
  title: "DTF: what it is and how DTF printing on textiles works",
  metaTitle: "What Is DTF Printing and How Does It Work | SERIFIL",
  metaDescription:
    "What DTF is, how it is made, when it beats screen printing and how to prepare your files. A practical guide from SERIFIL in Portugal, with DTF by the metre.",
  excerpt:
    "What DTF is, the four stages of the process, when it beats screen printing and how to prepare your files to fill a metre of film.",
  eyebrow: "PRINTING GUIDES · DTF",
  lead:
    "DTF lets you print full-colour designs on textiles with no screens or film positives. It suits small runs, many colours or designs that change from garment to garment. This guide explains how it works and what is worth knowing before you order.",
  datePublished: "2026-10-19",
  dateModified: "2026-10-19",
  image: { ...dtfShare, alt: "Heat press applying a DTF transfer with the SERIFIL logo to a blue T-shirt", caption: "Heat pressing a DTF transfer onto a T-shirt." },
  summary: [
    "DTF stands for “direct to film”: the design is printed on film and then transferred to the garment with heat.",
    "It needs no film positives or screens, so the number of colours does not change the preparation.",
    "It pays off for small runs and for designs with many colours, gradients or photos.",
    "Send each design at actual size, as a PNG with a transparent background at 300 dpi or as a PDF.",
    "The film is sold by the metre and you can combine several designs on the same metre.",
  ],
  sections: [
    {
      id: "what-is-dtf",
      title: "What is DTF?",
      blocks: [
        {
          type: "paragraph",
          text:
            "DTF stands for “direct to film”. The design is printed in full colour on a clear film, with a layer of white ink behind the colours. It then receives an adhesive powder which, with heat, bonds it to the fabric.",
        },
        {
          type: "paragraph",
          text:
            "Unlike screen printing, there are no [film positives](/en/guias/film-positives/) or screens to prepare. The film comes out ready to press, whether for one garment or a hundred, and each metre can carry different designs. That is why DTF is sold by the metre: you pay for the film your designs take up.",
        },
      ],
    },
    {
      id: "how-it-works",
      title: "How it works, step by step",
      blocks: [
        {
          type: "paragraph",
          text: "There are four stages from file to printed garment. The first three make the film; the last one transfers the design to the fabric.",
        },
        {
          type: "process",
          caption: "Simplified diagram of the DTF process.",
          steps: [
            {
              visual: "artwork",
              title: "File",
              text: "Each design is prepared at actual size with a transparent background, and the designs are laid out side by side across the width of the film.",
            },
            {
              visual: "dtf-film",
              title: "Printing on film",
              text: "The design is printed in colour on the film, mirrored, with a layer of white on top so the colours show on dark fabrics.",
            },
            {
              visual: "powder",
              title: "Adhesive powder",
              text: "While the ink is still wet, the film receives an adhesive powder that only sticks where there is print. With heat, the powder melts and is ready to bond.",
            },
            {
              visual: "press",
              title: "Heat pressing",
              text: "The film is placed on the garment and pressed with heat and pressure. Once it has cooled as needed, the film is peeled off and the design stays on the fabric.",
            },
          ],
        },
      ],
    },
    {
      id: "dtf-or-screen-printing",
      title: "DTF or screen printing?",
      blocks: [
        {
          type: "paragraph",
          text: "They are different techniques, each with its place. The choice mainly depends on quantity, number of colours and substrate.",
        },
        {
          type: "comparison",
          columns: ["DTF", "Screen printing"],
          rows: [
            {
              label: "Preparation",
              values: ["None: the design goes straight from file to film.", "One film positive and one screen per colour before printing."],
            },
            {
              label: "Colours",
              values: ["No difference: photos, gradients and many colours.", "Each colour adds preparation and a print pass."],
            },
            {
              label: "Quantities",
              values: ["Small runs, short series and different designs per garment.", "Larger runs, where the preparation is spread out."],
            },
            {
              label: "Substrates",
              values: ["Textiles.", "Textiles, PVC, non-woven fabric, components and other substrates."],
            },
            {
              label: "Finish",
              values: ["A thin layer on top of the fabric.", "The ink sits in the material; the feel depends on the ink."],
            },
          ],
        },
        {
          type: "paragraph",
          text: `For large runs with few colours, [fabric screen printing](${enPaths.fabric}) is usually better value. If in doubt, send us the design and the quantity and we will tell you what makes more sense.`,
        },
      ],
    },
    {
      id: "garments",
      title: "Which garments it works on",
      blocks: [
        {
          type: "paragraph",
          text:
            "DTF bonds to most textiles, light or dark: cotton, polyester and blends, on T-shirts, sweatshirts, cloth bags, workwear and many other items.",
        },
        {
          type: "note",
          text:
            "Heavily textured, waterproof, specially finished or heat-sensitive fabrics should be checked first. If you want us to press onto your garments, tell us what they are and what fabric they are made of.",
        },
      ],
    },
    {
      id: "preparing-the-file",
      title: "How to prepare your file",
      blocks: [
        {
          type: "paragraph",
          text: "The film reproduces the file exactly, so it is worth preparing it well. Use this checklist before sending.",
        },
        {
          type: "checklist",
          items: [
            { title: "Actual size", text: "Prepare each design at the size it will be on the garment. A chest logo is usually 8 to 10 cm wide." },
            { title: "Transparent background", text: "In a PNG the background must be transparent. A white background would be printed as a white rectangle." },
            { title: "Resolution", text: "300 dpi at actual size. Low-resolution images end up with jagged edges." },
            { title: "Format", text: "PNG with a transparent background or PDF. Send one file per design." },
            { title: "Fine lines", text: "Very thin lines and small lettering may not bond well to the fabric. Avoid strokes thinner than 1 mm." },
            { title: "Several designs", text: "You can combine several designs on the same film. Tell us how many of each you need." },
          ],
        },
      ],
    },
    {
      id: "applying-and-care",
      title: "Applying and caring for garments",
      blocks: [
        {
          type: "paragraph",
          text:
            "If you take the film only, you apply it with a heat press. Temperature, time and when to peel the film depend on the film: check the settings with us before pressing the first garment.",
        },
        {
          type: "checklist",
          items: [
            { title: "Wash inside out", text: "Turn the garment inside out before washing and avoid high temperatures." },
            { title: "No iron on the design", text: "If you iron the garment, do it inside out or with a cloth on top." },
            { title: "No bleach or hot tumble drying", text: "Harsh products and strong heat wear the design faster." },
          ],
        },
      ],
    },
    {
      id: "price",
      title: "How much DTF by the metre costs",
      blocks: [
        {
          type: "paragraph",
          text:
            "The film costs €9 per metre up to 9 m and €8.50 per metre from 10 m, plus VAT. It is charged per 10 cm, with a minimum of half a metre. Pressing onto your garments is quoted separately.",
        },
        {
          type: "paragraph",
          text:
            "In the [DTF by the metre calculator](/en/dtf/) you add your designs, see how they are laid out on the film and what they cost, and send your request.",
        },
      ],
    },
  ],
  relatedServices: ["fabric"],
};

/**
 * Guia principal: o que é a serigrafia. Os outros guias (fotolitos, DTF) aprofundam partes dele.
 * Tintas descritas de forma geral, sem afirmar que a SERIFIL usa cada uma.
 */
const serigrafiaPt: Guide = {
  key: "serigrafia",
  slug: "o-que-e-serigrafia",
  status: "published",
  shortTitle: "Serigrafia",
  title: "Serigrafia: o que é e como funciona",
  metaTitle: "Serigrafia: o que é e como funciona | SERIFIL",
  metaDescription:
    "O que é a serigrafia, como funciona passo a passo, em que materiais se usa, que tintas existem e quando compensa. Guia prático da SERIFIL, em Guimarães.",
  excerpt:
    "O que é a serigrafia, as etapas do processo, os suportes e as tintas, as vantagens e os limites, e quando compensa outra técnica.",
  eyebrow: "GUIAS DE SERIGRAFIA · FUNDAMENTOS",
  lead:
    "A serigrafia é uma das técnicas de impressão mais versáteis: imprime em tecido, PVC, TNT e muitos outros materiais, com cores vivas e resistentes. Este guia explica como funciona e quando é a escolha certa.",
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  image: guideImage("pt", "screens"),
  summary: [
    "Na serigrafia, a tinta passa através de uma tela de malha fina, só nas zonas abertas do desenho.",
    "Cada cor tem o seu fotolito, a sua tela e a sua passagem de impressão.",
    "Imprime em tecido, PVC, TNT, componentes e muitos outros suportes.",
    "Compensa sobretudo em séries com poucas cores; em poucas peças a muitas cores, o DTF pode ser melhor.",
    "A tinta escolhe-se pelo suporte e pelo uso que a peça vai ter.",
  ],
  sections: [
    {
      id: "o-que-e-a-serigrafia",
      title: "O que é a serigrafia?",
      blocks: [
        {
          type: "paragraph",
          text:
            "A serigrafia é uma técnica de impressão em que a tinta é empurrada através de uma tela de malha fina, esticada num quadro. Nas zonas do desenho a malha está aberta e a tinta passa; no resto está tapada e a tinta fica retida.",
        },
        {
          type: "paragraph",
          text: `Cada cor do desenho é impressa separadamente, com a sua tela. Por isso um logótipo a uma cor é mais simples de preparar do que um desenho a quatro cores. A peça que permite gravar o desenho na tela é o [fotolito](/pt/guias/fotolitos/).`,
        },
        { type: "figure", image: guideImage("pt", "screens") },
      ],
    },
    {
      id: "como-funciona",
      title: "Como funciona, passo a passo",
      blocks: [
        {
          type: "paragraph",
          text: "Do ficheiro à peça impressa há quatro etapas principais. As três primeiras são preparação; a impressão é a última.",
        },
        {
          type: "process",
          caption: "Esquema simplificado do processo de serigrafia, para um desenho a duas cores.",
          steps: [
            {
              visual: "artwork",
              title: "Arte final",
              text: "O ficheiro é ajustado ao tamanho real de impressão e separado cor a cor.",
            },
            {
              visual: "film",
              title: "Fotolitos",
              text: "Cada cor passa para uma película transparente, com essa parte do desenho em preto opaco.",
            },
            {
              visual: "screen",
              title: "Gravação da tela",
              text: "A tela, revestida com emulsão sensível à luz, é exposta com o fotolito. Onde há preto, a emulsão sai com água e a malha fica aberta.",
            },
            {
              visual: "print",
              title: "Impressão",
              text: "A raclete empurra a tinta pela malha aberta para o suporte. Depois, a tinta seca ou é curada, conforme o tipo.",
            },
          ],
        },
        {
          type: "paragraph",
          text: `Os quadros e as telas são uma parte importante da preparação. Se precisa de quadros para imprimir, pode desenhá-los na nossa [ferramenta de quadros de serigrafia](/pt/quadros/).`,
        },
      ],
    },
    {
      id: "onde-se-usa",
      title: "Em que materiais se usa",
      blocks: [
        {
          type: "paragraph",
          text: "A serigrafia adapta-se a superfícies planas e a peças confecionadas, desde que a tinta seja a adequada ao material.",
        },
        {
          type: "checklist",
          items: [
            { title: "Tecido e vestuário", text: `Sacos, capas, t-shirts, sweats e roupa de trabalho. Veja [serigrafia em tecido](${ptPaths.fabric}), [estampagem de t-shirts](${ptPaths.tshirts}) e [sacos personalizados](${ptPaths.bags}).` },
            { title: "PVC e plásticos", text: `Sacos, embalagens e peças técnicas em PVC transparente ou colorido. Veja [serigrafia em PVC](${ptPaths.pvc}).` },
            { title: "TNT", text: `Sacos e capas em tecido não tecido. Veja [sacos em TNT](${ptPaths.nonwoven}).` },
            { title: "Componentes", text: `Palmilhas, palas e outras peças de produção. Veja [componentes para calçado](${ptPaths.footwear}).` },
          ],
        },
        { type: "figure", image: guideImage("pt", "nonwovenWork") },
      ],
    },
    {
      id: "tintas",
      title: "Que tintas se usam",
      blocks: [
        {
          type: "paragraph",
          text:
            "Não há uma tinta para tudo. A escolha depende do material, da cor da peça e do uso que vai ter: uma peça lavada todas as semanas pede uma tinta diferente de um saco promocional.",
        },
        {
          type: "comparison",
          columns: ["Tipo de tinta", "Para que serve"],
          rows: [
            { label: "Plastisol", values: ["Tinta para têxtil, muito usada em vestuário.", "Cores opacas, que se veem bem em tecidos escuros. Cura com calor."] },
            { label: "Base aquosa", values: ["Tinta para têxtil à base de água.", "Toque mais suave, sobretudo em tecidos claros."] },
            { label: "Para plásticos", values: ["Tintas formuladas para PVC e outros plásticos.", "Aderem a superfícies lisas, onde as tintas têxteis não agarram."] },
            { label: "Cura UV", values: ["Tintas que secam com luz ultravioleta.", "Usadas sobretudo em plásticos, papel e superfícies rígidas."] },
          ],
        },
        {
          type: "note",
          text: "A tinta e a cura são escolhidas em cada trabalho, depois de avaliar o material. Se tiver uma amostra da peça, envie-a com o pedido.",
        },
      ],
    },
    {
      id: "vantagens-e-limites",
      title: "Vantagens e limites",
      blocks: [
        {
          type: "checklist",
          items: [
            { title: "Cores vivas e opacas", text: "A camada de tinta é mais espessa do que noutras técnicas e cobre bem, mesmo em fundos escuros." },
            { title: "Resistência", text: "Com a tinta e a cura certas, aguenta bem o uso e as lavagens." },
            { title: "Económica em séries", text: "Depois da preparação, cada peça imprime-se depressa: o custo por peça desce com a quantidade." },
            { title: "Muitos suportes", text: "Tecido, PVC, TNT e componentes, com a tinta adequada a cada um." },
            { title: "Preparação por cor", text: "Cada cor precisa do seu fotolito e da sua tela, o que pesa em poucas peças." },
            { title: "Fotografias e degradês", text: "São possíveis, mas exigem mais preparação e nem sempre se adaptam a todos os suportes." },
          ],
        },
      ],
    },
    {
      id: "serigrafia-ou-dtf",
      title: "Serigrafia ou DTF?",
      blocks: [
        {
          type: "paragraph",
          text: `Em têxtil, a alternativa mais comum é o DTF: o desenho é impresso num filme e transferido com calor, sem fotolitos nem telas. Compensa em poucas peças, com muitas cores, fotografias ou nomes diferentes. Explicamos tudo no [guia do DTF](/pt/guias/o-que-e-dtf/) e pode calcular o filme na página de [DTF ao metro](/pt/dtf/).`,
        },
        {
          type: "paragraph",
          text: "Para séries com poucas cores, sobretudo em PVC, TNT e componentes, a serigrafia continua a ser a escolha mais habitual.",
        },
      ],
    },
    {
      id: "pedir-orcamento",
      title: "O que indicar num pedido de orçamento",
      blocks: [
        {
          type: "checklist",
          items: [
            { title: "Suporte", text: "Material, cor e, se possível, uma fotografia ou amostra da peça." },
            { title: "Desenho", text: "Ficheiro vetorial (PDF, AI, EPS ou SVG) e número de cores." },
            { title: "Medidas e posição", text: "Tamanho da impressão e local na peça." },
            { title: "Quantidade", text: "Número aproximado de peças." },
            { title: "Prazo", text: "Data em que precisa do trabalho." },
          ],
        },
        {
          type: "paragraph",
          text: `No guia dos [fotolitos](/pt/guias/fotolitos/) explicamos em detalhe que ficheiros enviar e como o número de cores pesa no orçamento.`,
        },
      ],
    },
  ],
  relatedServices: ["pvc", "fabric", "nonwoven", "footwear", "tshirts", "bags"],
};

const serigrafiaEn: Guide = {
  key: "serigrafia",
  slug: "what-is-screen-printing",
  status: "published",
  shortTitle: "Screen printing",
  title: "Screen printing: what it is and how it works",
  metaTitle: "Screen Printing: What It Is and How It Works | SERIFIL",
  metaDescription:
    "What screen printing is, how it works step by step, which materials and inks it uses and when it pays off. A practical guide from SERIFIL in Portugal.",
  excerpt:
    "What screen printing is, the stages of the process, substrates and inks, its strengths and limits, and when another technique is better.",
  eyebrow: "SCREEN PRINTING GUIDES · BASICS",
  lead:
    "Screen printing is one of the most versatile printing techniques: it prints on fabric, PVC, non-woven material and much more, with bright, durable colours. This guide explains how it works and when it is the right choice.",
  datePublished: "2026-10-20",
  dateModified: "2026-10-20",
  image: guideImage("en", "screens"),
  summary: [
    "In screen printing, ink passes through a fine mesh screen, only where the design is open.",
    "Each colour has its own film positive, its own screen and its own print pass.",
    "It prints on fabric, PVC, non-woven material, components and many other substrates.",
    "It pays off mainly on runs with few colours; for a few items in many colours, DTF may be better.",
    "The ink is chosen for the substrate and the way the item will be used.",
  ],
  sections: [
    {
      id: "what-is-screen-printing",
      title: "What is screen printing?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Screen printing is a printing technique in which ink is pushed through a fine mesh stretched on a frame. Where the design is, the mesh is open and the ink passes through; everywhere else it is blocked and the ink stays behind.",
        },
        {
          type: "paragraph",
          text: `Each colour of the design is printed separately, with its own screen. That is why a one-colour logo is simpler to prepare than a four-colour design. The item used to transfer the design onto the screen is the [film positive](/en/guias/film-positives/).`,
        },
        { type: "figure", image: guideImage("en", "screens") },
      ],
    },
    {
      id: "how-it-works",
      title: "How it works, step by step",
      blocks: [
        {
          type: "paragraph",
          text: "There are four main stages from file to printed item. The first three are preparation; printing comes last.",
        },
        {
          type: "process",
          caption: "Simplified diagram of the screen printing process, for a two-colour design.",
          steps: [
            {
              visual: "artwork",
              title: "Final artwork",
              text: "The file is set to the actual print size and separated colour by colour.",
            },
            {
              visual: "film",
              title: "Film positives",
              text: "Each colour is output onto a clear film, with that part of the design in opaque black.",
            },
            {
              visual: "screen",
              title: "Screen exposure",
              text: "The screen, coated with light-sensitive emulsion, is exposed with the film positive. Where there is black, the emulsion washes out and the mesh stays open.",
            },
            {
              visual: "print",
              title: "Printing",
              text: "The squeegee pushes the ink through the open mesh onto the substrate. The ink then dries or is cured, depending on its type.",
            },
          ],
        },
        {
          type: "paragraph",
          text: `Frames and screens are a big part of the preparation. If you need screens for your own printing, you can draw them in our [screen printing frame tool](/en/quadros/).`,
        },
      ],
    },
    {
      id: "materials",
      title: "Which materials it works on",
      blocks: [
        {
          type: "paragraph",
          text: "Screen printing works on flat surfaces and on finished items, as long as the ink suits the material.",
        },
        {
          type: "checklist",
          items: [
            { title: "Fabric and clothing", text: `Bags, covers, T-shirts, sweatshirts and workwear. See [fabric screen printing](${enPaths.fabric}), [T-shirt printing](${enPaths.tshirts}) and [custom bags](${enPaths.bags}).` },
            { title: "PVC and plastics", text: `Bags, packaging and technical parts in clear or coloured PVC. See [PVC screen printing](${enPaths.pvc}).` },
            { title: "Non-woven material", text: `Non-woven bags and covers. See [non-woven bags](${enPaths.nonwoven}).` },
            { title: "Components", text: `Insoles, vamps and other production parts. See [footwear components](${enPaths.footwear}).` },
          ],
        },
        { type: "figure", image: guideImage("en", "nonwovenWork") },
      ],
    },
    {
      id: "inks",
      title: "Which inks are used",
      blocks: [
        {
          type: "paragraph",
          text:
            "There is no single ink for everything. The choice depends on the material, the colour of the item and how it will be used: an item washed every week needs a different ink from a promotional bag.",
        },
        {
          type: "comparison",
          columns: ["Ink type", "What it is for"],
          rows: [
            { label: "Plastisol", values: ["A textile ink widely used on clothing.", "Opaque colours that show well on dark fabrics. Cured with heat."] },
            { label: "Water-based", values: ["A water-based textile ink.", "A softer feel, especially on light fabrics."] },
            { label: "For plastics", values: ["Inks formulated for PVC and other plastics.", "They bond to smooth surfaces where textile inks do not."] },
            { label: "UV-cured", values: ["Inks that dry under ultraviolet light.", "Used mainly on plastics, paper and rigid surfaces."] },
          ],
        },
        {
          type: "note",
          text: "The ink and curing are chosen for each job after assessing the material. If you have a sample of the item, send it with your request.",
        },
      ],
    },
    {
      id: "strengths-and-limits",
      title: "Strengths and limits",
      blocks: [
        {
          type: "checklist",
          items: [
            { title: "Bright, opaque colours", text: "The ink layer is thicker than with other techniques and covers well, even on dark backgrounds." },
            { title: "Durability", text: "With the right ink and curing, it stands up well to use and washing." },
            { title: "Good value on runs", text: "Once prepared, each item prints quickly: the cost per item falls as the quantity grows." },
            { title: "Many substrates", text: "Fabric, PVC, non-woven material and components, each with the right ink." },
            { title: "Preparation per colour", text: "Each colour needs its own film positive and screen, which weighs on small quantities." },
            { title: "Photos and gradients", text: "They are possible, but need more preparation and do not suit every substrate." },
          ],
        },
      ],
    },
    {
      id: "screen-printing-or-dtf",
      title: "Screen printing or DTF?",
      blocks: [
        {
          type: "paragraph",
          text: `On textiles, the most common alternative is DTF: the design is printed on film and transferred with heat, with no film positives or screens. It pays off for a few garments, many colours, photos or different names. Our [DTF guide](/en/guias/what-is-dtf/) explains it in full, and you can work out the film on the [DTF by the metre](/en/dtf/) page.`,
        },
        {
          type: "paragraph",
          text: "For runs with few colours, especially on PVC, non-woven material and components, screen printing remains the usual choice.",
        },
      ],
    },
    {
      id: "requesting-a-quote",
      title: "What to include in a quote request",
      blocks: [
        {
          type: "checklist",
          items: [
            { title: "Substrate", text: "Material, colour and, if possible, a photo or sample of the item." },
            { title: "Design", text: "Vector file (PDF, AI, EPS or SVG) and number of colours." },
            { title: "Size and position", text: "Print size and position on the item." },
            { title: "Quantity", text: "Approximate number of items." },
            { title: "Deadline", text: "When you need the job." },
          ],
        },
        {
          type: "paragraph",
          text: `Our [film positives](/en/guias/film-positives/) guide explains in detail which files to send and how the number of colours affects the quote.`,
        },
      ],
    },
  ],
  relatedServices: ["pvc", "fabric", "nonwoven", "footwear", "tshirts", "bags"],
};

const guidesByLocale: Record<GuideLocale, Guide[]> = {
  pt: [fotolitos, dtfPt, serigrafiaPt],
  en: [filmPositives, dtfEn, serigrafiaEn],
};

export function getPublishedGuides(locale: GuideLocale) {
  return guidesByLocale[locale]
    .filter((guide) => guide.status === "published")
    .sort((first, second) => second.datePublished.localeCompare(first.datePublished));
}

export function getPublishedGuide(locale: GuideLocale, slug: string) {
  return getPublishedGuides(locale).find((guide) => guide.slug === slug);
}

export function getGuideIndexPath(locale: GuideLocale) {
  return `/${locale}/guias/`;
}

export function getGuidePath(locale: GuideLocale, slug: string) {
  return `/${locale}/guias/${slug}/`;
}

type LocalePaths = Partial<Record<GuideLocale, string>>;

function toHreflangPaths(paths: LocalePaths) {
  const languages: Record<string, string> = {};
  for (const locale of guideLocales) {
    const path = paths[locale];
    if (path) languages[guidesUi[locale].hreflang] = path;
  }
  const fallback = paths.pt ?? paths.en;
  if (fallback) languages["x-default"] = fallback;
  return languages;
}

function getGuideLocalePaths(key: GuideKey): LocalePaths {
  const paths: LocalePaths = {};
  for (const locale of guideLocales) {
    const guide = getPublishedGuides(locale).find((item) => item.key === key);
    if (guide) paths[locale] = getGuidePath(locale, guide.slug);
  }
  return paths;
}

function getGuideIndexLocalePaths(): LocalePaths {
  const paths: LocalePaths = {};
  for (const locale of guideLocales) {
    if (getPublishedGuides(locale).length > 0) paths[locale] = getGuideIndexPath(locale);
  }
  return paths;
}

/** Caminhos relativos por código hreflang (pt-PT, en, x-default) de um guia. */
export function getGuideHreflangPaths(key: GuideKey) {
  return toHreflangPaths(getGuideLocalePaths(key));
}

/** Caminhos relativos por código hreflang do índice de guias. */
export function getGuideIndexHreflangPaths() {
  return toHreflangPaths(getGuideIndexLocalePaths());
}

/** Destinos do seletor de idioma: versão equivalente ou, na falta dela, o índice de guias. */
export function getGuideLanguageHrefs(key?: GuideKey): Record<GuideLocale, string> {
  const paths = key ? getGuideLocalePaths(key) : getGuideIndexLocalePaths();
  return {
    pt: paths.pt ?? getGuideIndexPath("pt"),
    en: paths.en ?? getGuideIndexPath("en"),
  };
}

export function formatGuideDate(locale: GuideLocale, isoDate: string) {
  return new Intl.DateTimeFormat(guidesUi[locale].dateLocale, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

function blockText(block: GuideBlock): string[] {
  switch (block.type) {
    case "paragraph":
    case "note":
      return [block.text];
    case "checklist":
      return block.items.flatMap((item) => [item.title, item.text]);
    case "comparison":
      return [...block.columns, ...block.rows.flatMap((row) => [row.label, ...row.values])];
    case "process":
      return [block.caption, ...block.steps.flatMap((step) => [step.title, step.text])];
    case "figure":
      return [block.image.caption];
    case "gallery":
      return block.images.map((image) => image.caption);
  }
}

export function getGuideReadingMinutes(guide: Guide) {
  const words = [
    guide.lead,
    ...guide.summary,
    ...guide.sections.flatMap((section) => [section.title, ...section.blocks.flatMap(blockText)]),
  ]
    .map(stripInlineLinks)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

export function getGuideImages(guide: Guide) {
  const images = [
    guide.image,
    ...guide.sections.flatMap((section) =>
      section.blocks.flatMap((block) => {
        if (block.type === "figure") return [block.image];
        if (block.type === "gallery") return block.images;
        return [];
      }),
    ),
  ];

  return images.filter((image, index) => images.findIndex((item) => item.src === image.src) === index);
}
