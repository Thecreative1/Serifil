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

export const guideKeys = ["fotolitos"] as const;

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

export type GuideProcessVisual = "artwork" | "film" | "screen" | "print";

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
};

const enPaths = {
  pvc: getServicePath("en", "pvc"),
  fabric: getServicePath("en", "fabric"),
  nonwoven: getServicePath("en", "nonwoven"),
  footwear: getServicePath("en", "footwear"),
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

const guidesByLocale: Record<GuideLocale, Guide[]> = {
  pt: [fotolitos],
  en: [filmPositives],
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
