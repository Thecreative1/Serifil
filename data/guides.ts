import type { Locale } from "@/data/i18n";
import { getServicePath, type ServiceKey } from "@/data/service-pages";

/**
 * Guias editoriais. Só existem em português; para publicar noutro idioma,
 * acrescentar o locale aqui e o conteúdo completo em `guidesByLocale`.
 */
export const guideLocales = ["pt"] as const satisfies readonly Locale[];

export type GuideLocale = (typeof guideLocales)[number];

export function isGuideLocale(value: string): value is GuideLocale {
  return guideLocales.includes(value as GuideLocale);
}

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
  /** `work`: trabalho produzido pela SERIFIL. `workshop`: equipamento ou oficina. */
  credit: "work" | "workshop";
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
  workshop: string;
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
    workshop: "Oficina da SERIFIL",
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
};

const workshopImages = {
  imagesetter: {
    src: "/images/guias/filmadora-fotolitos.webp",
    alt: "Filmadora AGFA AccuSet 1500 com uma folha de película pousada no topo, na oficina da SERIFIL",
    width: 900,
    height: 1125,
    caption:
      "Filmadora na oficina da SERIFIL. É o equipamento que passa a arte digital para a película que dá origem ao fotolito.",
    credit: "workshop",
  },
  exposure: {
    src: "/images/guias/mesa-exposicao.webp",
    alt: "Mesa de exposição iluminada com uma tela pressionada por pesos e, ao lado, uma processadora de película AGFA Rapiline",
    width: 1440,
    height: 810,
    caption:
      "Mesa de exposição: a tela e o fotolito ficam em contacto, pressionados por pesos, enquanto a luz grava o desenho na emulsão. Ao lado, a processadora de película.",
    credit: "workshop",
  },
  screens: {
    src: "/images/guias/telas-serigrafia.webp",
    alt: "Telas de serigrafia de vários tamanhos encostadas à parede, algumas revestidas com emulsão amarela e roxa",
    width: 1440,
    height: 810,
    caption:
      "Telas de vários formatos. As amarelas e a roxa estão revestidas de emulsão; nas brancas vê-se a malha.",
    credit: "workshop",
  },
  stretcher: {
    src: "/images/guias/esticador-telas.webp",
    alt: "Esticador de telas com grampos vermelhos montado sobre uma bancada de madeira",
    width: 1440,
    height: 810,
    caption:
      "Esticador de telas: a malha é esticada e fixada ao quadro antes de receber a emulsão.",
    credit: "workshop",
  },
} satisfies Record<string, GuideImage>;

const pvcPath = getServicePath("pt", "pvc");
const fabricPath = getServicePath("pt", "fabric");
const nonwovenPath = getServicePath("pt", "nonwoven");
const footwearPath = getServicePath("pt", "footwear");

const fotolitos: Guide = {
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
  image: workshopImages.exposure,
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
        { type: "figure", image: workshopImages.imagesetter, orientation: "portrait" },
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
              text:
                "Cada cor é passada para uma película própria, com essa parte do desenho em preto opaco.",
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
        { type: "figure", image: workshopImages.exposure },
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
            {
              label: "Contacto com a tinta",
              values: ["Não.", "Sim, em cada peça impressa."],
            },
            {
              label: "Quando é preciso refazer",
              values: [
                "Quando mudam o desenho, o tamanho ou a separação de cores.",
                "Quando muda o desenho gravado ou o trabalho exige outra preparação da tela.",
              ],
            },
          ],
        },
        { type: "gallery", images: [workshopImages.screens, workshopImages.stretcher] },
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
              text: `A cor e a textura do material mudam a forma como as cores aparecem. Em [PVC transparente](${pvcPath}), em [TNT](${nonwovenPath}) ou em [tecido](${fabricPath}), a preparação é pensada para que o desenho se leia bem.`,
            },
            {
              title: "Quantidade",
              text:
                "Como a preparação é feita antes da produção, o seu peso no custo de cada unidade tende a ser maior em quantidades pequenas.",
            },
          ],
        },
        {
          type: "figure",
          image: {
            src: "/images/trabalhos/tnt-05.webp",
            alt: "Saco preto em TNT com logótipo impresso a verde e branco",
            width: 1600,
            height: 1200,
            caption: "Logótipo a duas cores sobre TNT preto. Cada cor teve a sua própria preparação.",
            credit: "work",
          },
        },
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
              text:
                "Converta os textos em contornos ou envie as fontes utilizadas, para evitar trocas de letra.",
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
        {
          type: "figure",
          image: {
            src: "/images/trabalhos/pvc-03.webp",
            alt: "Aviso de segurança em três línguas impresso a preto sobre PVC transparente",
            width: 1600,
            height: 1200,
            caption:
              "Texto de pequena dimensão sobre PVC transparente. Em detalhes assim, a qualidade do ficheiro nota-se no resultado.",
            credit: "work",
          },
        },
        {
          type: "paragraph",
          text: `Cada material tem as suas particularidades. Nas páginas de [serigrafia em PVC](${pvcPath}), [serigrafia em tecido](${fabricPath}), [sacos em TNT](${nonwovenPath}) e [componentes para calçado](${footwearPath}) encontra a informação específica a indicar no pedido.`,
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
              text:
                "Indique a data aproximada ou a referência, ou envie uma fotografia da peça já impressa.",
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

const guidesByLocale: Record<GuideLocale, Guide[]> = {
  pt: [fotolitos],
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

export function formatGuideDate(locale: GuideLocale, isoDate: string) {
  return new Intl.DateTimeFormat(guidesUi[locale].htmlLang, {
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
