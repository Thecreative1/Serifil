import type { Locale } from "@/data/i18n";

/**
 * DTF ao metro: filme DTF impresso a cores, vendido ao metro, com aplicação (prensagem) pela SERIFIL.
 * O filme é impresso por um parceiro, mas isso não se diz no site: nunca escrever que a SERIFIL
 * imprime o filme nem que tem impressora DTF. A aplicação é feita pela SERIFIL.
 *
 * Publicado a 19 out 2026. Com `false`, /pt/dtf/ e /en/dtf/ continuam a ser geradas, mas ficam
 * `noindex`, fora do sitemap e sem ligações na lista de serviços, nos guias e na home.
 */
export const dtfPublished = true;

/** Data da última alteração de conteúdo: usada no sitemap. Atualizar quando o texto, o preço ou as opções mudarem. */
export const dtfDateModified = "2026-10-19";

/** Sem fotografia própria do DTF: usa a imagem de partilha do site. */
export const dtfShareImage = { src: "/og.jpg", width: 1200, height: 630 } as const;

export function getDtfPath(locale: Locale) {
  return `/${locale}/dtf/`;
}

export function getDtfHreflangPaths() {
  return {
    "pt-PT": getDtfPath("pt"),
    en: getDtfPath("en"),
    "x-default": getDtfPath("pt"),
  };
}

/**
 * Preço de venda do filme, sem IVA, decidido pelo utilizador a 19 out 2026: 9 € por metro até 9 m
 * e 8,50 € por metro a partir de 10 m. Os 7 € por metro são o custo do parceiro: nunca mostrar.
 */
export const priceTiers = [
  { fromMetres: 0, price: 9 },
  { fromMetres: 10, price: 8.5 },
] as const;

export const basePrice = priceTiers[0].price;

export function pricePerMetreFor(billedLength: number) {
  return [...priceTiers].reverse().find((tier) => billedLength / 100 >= tier.fromMetres)?.price ?? basePrice;
}

/** O filme é entregue em folhas de um metro: os desenhos nunca ficam cortados entre folhas. */
export const sheetLength = 100;

/** Faturação mínima do filme, em cm. */
export const minimumLength = 50;

/**
 * Largura útil do rolo e espaço entre desenhos, em cm. POR CONFIRMAR com o utilizador:
 * valores habituais para filme de 60 cm.
 */
export const rollWidth = 58;
export const designGap = 1;

/** O filme é cobrado aos 10 cm, com o mínimo de `minimumLength`. */
export const billingStep = 10;

/** Limites dos campos, em cm: a largura nunca passa a largura útil do rolo. */
export const designLimits = { min: 1, maxWidth: rollWidth, maxHeight: 100 } as const;
export const maxDesigns = 6;
export const maxCopies = 500;

export const dtfServiceOptions = ["film", "pressed"] as const;

export type DtfService = (typeof dtfServiceOptions)[number];

/** `look` escolhe a cor e o ícone do desenho (0 a 5) e fica com ele enquanto existir. */
export type DtfDesign = { id: number; look: number; width: number; height: number; copies: number };

export type DtfRequest = { service: DtfService; designs: DtfDesign[] };

/** Medidas habituais de impressão em têxtil, em cm (largura × altura). */
export const dtfPresets = [
  { key: "chest", width: 10, height: 10 },
  { key: "a4", width: 21, height: 30 },
  { key: "a3", width: 30, height: 42 },
  { key: "sleeve", width: 8, height: 30 },
] as const;

export type DtfPresetKey = (typeof dtfPresets)[number]["key"];

export const defaultDtfRequest: DtfRequest = {
  service: "film",
  designs: [{ id: 1, look: 0, width: 21, height: 30, copies: 10 }],
};

export function clampDesignSize(value: number, max: number) {
  return Math.min(max, Math.max(designLimits.min, Math.round(value * 10) / 10));
}

export function clampCopies(value: number) {
  return Math.min(maxCopies, Math.max(1, Math.round(value)));
}

function formatNumber(locale: Locale, value: number, fractionDigits = 0) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-PT" : "en-GB", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits === 0 ? 1 : fractionDigits,
  }).format(value);
}

export function formatDesignSize(locale: Locale, width: number, height: number) {
  return `${formatNumber(locale, width)} × ${formatNumber(locale, height)} cm`;
}

export function formatMetres(locale: Locale, centimetres: number) {
  return `${formatNumber(locale, centimetres / 100, 2)} m`;
}

export function formatEuros(locale: Locale, value: number) {
  return new Intl.NumberFormat(locale === "pt" ? "pt-PT" : "en-GB", { style: "currency", currency: "EUR" }).format(value);
}

export type PlacedPiece = { design: number; x: number; y: number; width: number; height: number };

export type DtfLayout = {
  pieces: PlacedPiece[];
  /** Comprimento de filme ocupado, em cm. */
  length: number;
  /** Comprimento cobrado (aos 10 cm, com mínimo), em cm. */
  billedLength: number;
  pricePerMetre: number;
  price: number;
  perDesign: Array<{ id: number; rotated: boolean; perRow: number; perMetre: number }>;
};

type FreeSpace = { x: number; y: number; width: number; height: number };

/**
 * Encaixe por filas: cada desenho fica na orientação que gasta menos filme e as peças entram das
 * mais altas para as mais baixas. Cada fila abre com a peça mais alta e o espaço que sobra ao lado
 * e por baixo das peças é aproveitado pelas mais pequenas. É uma estimativa, não o encaixe final.
 */
export function layoutDtf(designs: DtfDesign[]): DtfLayout {
  const perDesign: DtfLayout["perDesign"] = [];
  const queue: PlacedPiece[] = [];

  for (const design of designs) {
    const orientations = [
      { width: design.width, height: design.height, rotated: false },
      { width: design.height, height: design.width, rotated: true },
    ]
      .filter((option) => option.width <= rollWidth)
      .map((option) => {
        const perRow = Math.max(1, Math.floor((rollWidth + designGap) / (option.width + designGap)));
        return {
          ...option,
          perRow,
          perMetre: perRow * Math.floor((100 + designGap) / (option.height + designGap)),
          used: Math.ceil(design.copies / perRow) * (option.height + designGap),
        };
      });

    const best = [...orientations].sort((a, b) => a.used - b.used)[0];
    const densest = [...orientations].sort((a, b) => b.perMetre - a.perMetre)[0];
    if (!best || !densest) continue;

    perDesign.push({ id: design.id, rotated: densest.rotated, perRow: densest.perRow, perMetre: densest.perMetre });
    for (let copy = 0; copy < design.copies; copy++) {
      queue.push({ design: design.id, x: 0, y: 0, width: best.width, height: best.height });
    }
  }

  queue.sort((a, b) => b.height - a.height || b.width - a.width || a.design - b.design);

  const pieces: PlacedPiece[] = [];
  let free: FreeSpace[] = [];
  let length = 0;
  // Cada metro é uma folha: nenhuma peça pode atravessar o corte entre folhas.
  const sheetEnd = (y: number) => (Math.floor(y / sheetLength + 1e-9) + 1) * sheetLength;
  const fits = (space: FreeSpace, piece: PlacedPiece) =>
    piece.width <= space.width + 0.001 &&
    piece.height <= space.height + 0.001 &&
    space.y + piece.height <= sheetEnd(space.y) + 0.001;

  for (const piece of queue) {
    let index = free.findIndex((space) => fits(space, piece));

    if (index === -1) {
      // Nova fila no fim do filme, com a altura da peça que a abre; se não couber no que resta
      // da folha, começa no topo da folha seguinte.
      let y = length === 0 ? 0 : length + designGap;
      if (y + piece.height > sheetEnd(y) + 0.001) y = sheetEnd(y);
      free.push({ x: 0, y, width: rollWidth, height: piece.height });
      index = free.length - 1;
    }

    const space = free[index];
    pieces.push({ ...piece, x: space.x, y: space.y });
    length = Math.max(length, space.y + piece.height);

    // O espaço usado divide-se em dois: à direita da peça e por baixo dela.
    const right = { x: space.x + piece.width + designGap, y: space.y, width: space.width - piece.width - designGap, height: piece.height };
    const below = { x: space.x, y: space.y + piece.height + designGap, width: space.width, height: space.height - piece.height - designGap };
    free.splice(index, 1, ...[right, below].filter((part) => part.width > 0 && part.height > 0));
    free = free.sort((a, b) => a.y - b.y || a.x - b.x);
  }

  const billedLength = pieces.length ? Math.max(minimumLength, Math.ceil(length / billingStep - 1e-9) * billingStep) : 0;
  const pricePerMetre = pricePerMetreFor(billedLength);

  return { pieces, length, billedLength, pricePerMetre, price: (billedLength / 100) * pricePerMetre, perDesign };
}

type DtfCopy = {
  htmlLang: string;
  ogLocale: string;
  metaTitle: string;
  metaDescription: string;
  serviceType: string;
  breadcrumbsLabel: string;
  home: string;
  services: string;
  sectionName: string;
  eyebrow: string;
  title: string;
  lead: string;
  imageAlt: string;
  howTitle: string;
  howSteps: Array<{ title: string; text: string }>;
  toolLabel: string;
  rollTitle: string;
  rollLabel: (length: string, pieces: number) => string;
  rollHint: string;
  pieces: (count: number) => string;
  metre: (count: number) => string;
  steps: Record<"designs" | "service", string>;
  designsIntro: string;
  design: (index: number) => string;
  width: string;
  height: string;
  copies: string;
  removeDesign: (index: number) => string;
  addDesign: string;
  presets: Record<DtfPresetKey, string>;
  presetsLabel: string;
  maxDesigns: string;
  fitsPerMetre: (count: number, rotated: boolean) => string;
  serviceOptions: Record<DtfService, { title: string; text: string }>;
  pressedNote: string;
  resultLength: string;
  resultPrice: string;
  priceNote: string;
  perMetre: string;
  estimateNote: string;
  continue: string;
  summaryTitle: string;
  summary: Record<"service" | "designs" | "length" | "price" | "pressing", string>;
  pressingQuote: string;
  pressingNone: string;
  offers: Array<{ name: string; description: string }>;
  questions: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  relatedEyebrow: string;
  relatedTitle: string;
  relatedDescription: string;
  artworkTitle: string;
  artworkText: string;
  emailButton: string;
  emailSubject: string;
  emailIntro: string;
  emailAttachReminder: string;
  whatsappButton: string;
  whatsappIntro: string;
  whatsappArtworkLine: string;
  formArtworkNote: string;
  successArtwork: string;
  formTitle: string;
  formLabel: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  messagePlaceholder: string;
  optional: string;
  privacy: string;
  submit: string;
  submitting: string;
  submissionError: string;
  successTitle: string;
  successDescription: string;
  anotherRequest: string;
  subject: string;
  errors: Record<"name" | "email" | "phone" | "privacy", string>;
};

export const dtfCopy: Record<Locale, DtfCopy> = {
  pt: {
    htmlLang: "pt-PT",
    ogLocale: "pt_PT",
    metaTitle: "DTF ao Metro e Aplicação em Têxtil | SERIFIL",
    metaDescription:
      "DTF ao metro desde 8,50 € + IVA: transfers a cores para pequenas produções, só o filme ou já prensado nas suas peças. Calcule online quantos desenhos cabem.",
    serviceType: "Impressão DTF ao metro",
    breadcrumbsLabel: "Navegação estrutural",
    home: "Início",
    services: "Serviços",
    sectionName: "DTF ao metro",
    eyebrow: "DTF ao metro",
    title: "Encha o seu metro.",
    lead:
      "Transfers a cores, sem quadros nem fotolitos, para pequenas produções. Junte os seus desenhos, veja quanto filme ocupam e escolha se leva só o filme ou se prensamos nas suas peças.",
    imageAlt: "SERIFIL, serigrafia e impressão industrial em Guimarães",
    howTitle: "Como funciona o DTF",
    howSteps: [
      { title: "Impressão no filme", text: "O desenho é impresso a cores num filme, com uma base branca por trás." },
      { title: "Pó adesivo", text: "O filme leva pó adesivo, que é fundido para fixar a impressão." },
      { title: "Prensagem", text: "Com calor e pressão, o desenho passa do filme para a peça." },
    ],
    toolLabel: "Calculadora de DTF ao metro",
    rollTitle: "O seu filme",
    rollLabel: (length, pieces) => `Desenho à escala do filme DTF: ${pieces} desenhos em ${length}`,
    rollHint: `Filme com ${rollWidth} cm úteis de largura e ${designGap} cm entre desenhos. As linhas tracejadas marcam o fim de cada folha de um metro: nenhum desenho fica cortado.`,
    pieces: (count) => `${count} ${count === 1 ? "desenho" : "desenhos"}`,
    metre: (count) => `${count} m`,
    steps: { designs: "Desenhos", service: "Serviço" },
    designsIntro: "Indique a medida real de cada desenho e quantas vezes o quer. Pode juntar vários desenhos no mesmo filme.",
    design: (index) => `Desenho ${index}`,
    width: "Largura (cm)",
    height: "Altura (cm)",
    copies: "Quantidade",
    removeDesign: (index) => `Remover desenho ${index}`,
    addDesign: "Adicionar desenho",
    presets: {
      chest: "Peito 10 × 10",
      a4: "A4 21 × 30",
      a3: "A3 30 × 42",
      sleeve: "Manga 8 × 30",
    },
    presetsLabel: "Medidas habituais",
    maxDesigns: `Até ${maxDesigns} desenhos por pedido. Para mais, diga-nos na mensagem.`,
    fitsPerMetre: (count, rotated) => `Cabem ${count} num metro${rotated ? ", rodado" : ""}.`,
    serviceOptions: {
      film: { title: "Só o filme", text: "Recebe o filme pronto a prensar e aplica na sua prensa." },
      pressed: { title: "Filme e aplicação", text: "Prensamos os desenhos nas peças que nos entregar." },
    },
    pressedNote: "Na mensagem, diga-nos que peças são, de que tecido e onde vai cada desenho. A aplicação é orçamentada à parte.",
    resultLength: "Filme",
    resultPrice: "Estimativa",
    priceNote: "+ IVA",
    perMetre: "9 € por metro até 9 m e 8,50 € a partir de 10 m, + IVA. Cobrado aos 10 cm, mínimo 0,5 m",
    estimateNote: "Estimativa do filme, confirmada depois de vermos os ficheiros.",
    continue: "Rever e enviar pedido",
    summaryTitle: "O seu pedido",
    summary: {
      service: "Serviço",
      designs: "Desenhos",
      length: "Filme",
      price: "Filme (estim.)",
      pressing: "Aplicação",
    },
    pressingQuote: "Sob orçamento",
    pressingNone: "Sem aplicação",
    offers: [
      { name: "DTF ao metro", description: "Filme DTF impresso a cores, pronto a prensar, desde 8,50 € por metro + IVA." },
      { name: "Aplicação de DTF em têxtil", description: "Prensagem dos transfers DTF nas peças do cliente." },
    ],
    questions: {
      eyebrow: "PERGUNTAS FREQUENTES",
      title: "Antes de pedir o DTF.",
      items: [
        {
          question: "O que é DTF?",
          answer:
            "DTF quer dizer «direct to film». O desenho é impresso a cores num filme, com uma base branca e pó adesivo, e depois é transferido para a peça com uma prensa de calor. Não precisa de quadros nem de fotolitos, por isso serve bem para poucas peças e desenhos com muitas cores.",
        },
        {
          question: "Quanto custa o DTF ao metro?",
          answer: `9 € por metro de filme até 9 m e 8,50 € por metro a partir de 10 m, mais IVA. O filme é cobrado aos 10 cm, com um mínimo de meio metro. A calculadora estima quantos metros ocupam os seus desenhos; o valor final é confirmado depois de vermos os ficheiros. A aplicação nas peças é orçamentada à parte.`,
        },
        {
          question: "Posso juntar vários desenhos no mesmo metro?",
          answer:
            "Sim. Paga o filme, não o desenho: pode encher o metro com desenhos diferentes, em várias medidas. Junte-os na calculadora para ver quanto filme ocupam.",
        },
        {
          question: "Quando compensa o DTF e quando compensa a serigrafia?",
          answer:
            "O DTF compensa em pequenas produções, desenhos com muitas cores, degradês ou fotografias. Em séries grandes com poucas cores, a [serigrafia em tecido](/pt/servicos/serigrafia-tecido/) costuma compensar mais. Se tiver dúvidas, diga-nos a quantidade e mostre o desenho.",
        },
        {
          question: "Como preparo o ficheiro?",
          answer:
            "Envie cada desenho à medida real, em PNG com fundo transparente a 300 dpi, ou em PDF. Pode enviar por e-mail ou WhatsApp, a partir do resumo do pedido.",
        },
        {
          question: "Qual é o prazo?",
          answer:
            "Só o filme fica pronto rapidamente. Com aplicação, o prazo depende do número de peças e é indicado no orçamento.",
        },
      ],
    },
    relatedEyebrow: "OUTROS SERVIÇOS",
    relatedTitle: "Serigrafia para a sua produção.",
    relatedDescription:
      "Serigrafia e impressão industrial sobre materiais fornecidos pelo cliente ou em projetos completos, em Guimarães.",
    artworkTitle: "Envie os seus desenhos",
    artworkText:
      "O formulário não aceita ficheiros. Envie os desenhos por e-mail ou WhatsApp, já com o resumo do pedido, em PNG com fundo transparente a 300 dpi ou em PDF, à medida real.",
    emailButton: "Enviar desenhos por e-mail",
    emailSubject: "Pedido de DTF ao metro",
    emailIntro: "Olá SERIFIL! Envio em anexo os desenhos para este pedido de DTF:",
    emailAttachReminder: "(Anexe os ficheiros dos desenhos antes de enviar.)",
    whatsappButton: "Enviar resumo por WhatsApp",
    whatsappIntro: "Olá SERIFIL! Queria fazer um pedido de DTF ao metro:",
    whatsappArtworkLine: "Envio os desenhos a seguir nesta conversa.",
    formArtworkNote: "Os desenhos não seguem por este formulário: envie-os por e-mail ou WhatsApp, a partir do resumo do pedido.",
    successArtwork: "Falta enviar os desenhos? Envie-os agora por e-mail, já com o resumo do pedido.",
    formTitle: "Os seus contactos",
    formLabel: "Pedido de DTF ao metro",
    name: "Nome",
    company: "Empresa",
    email: "E-mail",
    phone: "Telefone",
    message: "Mensagem",
    messagePlaceholder: "Para quando precisa e, com aplicação, que peças são, de que tecido e onde vai cada desenho.",
    optional: "opcional",
    privacy: "Autorizo o tratamento destes dados para que a SERIFIL possa responder ao meu pedido.",
    submit: "Enviar pedido",
    submitting: "A enviar pedido",
    submissionError: "Não foi possível enviar o pedido. Verifique a ligação e tente novamente.",
    successTitle: "Pedido enviado.",
    successDescription: "Recebemos o seu pedido de DTF e respondemos assim que possível.",
    anotherRequest: "Fazer outro pedido",
    subject: "Pedido de DTF ao metro através do site Serifil",
    errors: {
      name: "Indique o seu nome.",
      email: "Introduza um endereço de e-mail válido.",
      phone: "Indique um contacto telefónico.",
      privacy: "É necessário autorizar o tratamento destes dados para enviar o pedido.",
    },
  },
  en: {
    htmlLang: "en",
    ogLocale: "en_GB",
    metaTitle: "DTF Transfers by the Metre and Heat Pressing | SERIFIL",
    metaDescription:
      "DTF transfers by the metre from €8.50 + VAT: full-colour transfers for small runs, film only or pressed onto your garments. Work out online how many designs fit.",
    serviceType: "DTF printing by the metre",
    breadcrumbsLabel: "Breadcrumb navigation",
    home: "Home",
    services: "Services",
    sectionName: "DTF by the metre",
    eyebrow: "DTF transfers by the metre",
    title: "Fill your metre.",
    lead:
      "Full-colour transfers with no screens or film positives, for small runs. Add your designs, see how much film they take and choose film only or pressing onto your garments.",
    imageAlt: "SERIFIL, screen printing and industrial printing in Guimarães",
    howTitle: "How DTF works",
    howSteps: [
      { title: "Printing on film", text: "The design is printed in full colour on film, with a white base behind it." },
      { title: "Adhesive powder", text: "The film is coated with adhesive powder, which is cured to fix the print." },
      { title: "Heat pressing", text: "Heat and pressure transfer the design from the film to the garment." },
    ],
    toolLabel: "DTF by the metre calculator",
    rollTitle: "Your film",
    rollLabel: (length, pieces) => `Scale drawing of the DTF film: ${pieces} designs on ${length}`,
    rollHint: `Film with ${rollWidth} cm usable width and ${designGap} cm between designs. Dashed lines mark the end of each one-metre sheet: no design is cut.`,
    pieces: (count) => `${count} ${count === 1 ? "design" : "designs"}`,
    metre: (count) => `${count} m`,
    steps: { designs: "Designs", service: "Service" },
    designsIntro: "Enter the actual size of each design and how many you need. You can combine several designs on the same film.",
    design: (index) => `Design ${index}`,
    width: "Width (cm)",
    height: "Height (cm)",
    copies: "Quantity",
    removeDesign: (index) => `Remove design ${index}`,
    addDesign: "Add design",
    presets: {
      chest: "Chest 10 × 10",
      a4: "A4 21 × 30",
      a3: "A3 30 × 42",
      sleeve: "Sleeve 8 × 30",
    },
    presetsLabel: "Common sizes",
    maxDesigns: `Up to ${maxDesigns} designs per request. For more, tell us in your message.`,
    fitsPerMetre: (count, rotated) => `${count} fit on one metre${rotated ? ", rotated" : ""}.`,
    serviceOptions: {
      film: { title: "Film only", text: "You receive the film ready to press and apply it with your own press." },
      pressed: { title: "Film and pressing", text: "We press the designs onto the garments you bring us." },
    },
    pressedNote: "In your message, tell us what the garments are, the fabric and where each design goes. Pressing is quoted separately.",
    resultLength: "Film",
    resultPrice: "Estimate",
    priceNote: "+ VAT",
    perMetre: "€9 per metre up to 9 m and €8.50 from 10 m, + VAT. Charged per 10 cm, minimum 0.5 m",
    estimateNote: "Film estimate, confirmed once we have seen your files.",
    continue: "Review and send request",
    summaryTitle: "Your request",
    summary: {
      service: "Service",
      designs: "Designs",
      length: "Film",
      price: "Film (est.)",
      pressing: "Pressing",
    },
    pressingQuote: "Quoted separately",
    pressingNone: "No pressing",
    offers: [
      { name: "DTF transfers by the metre", description: "Full-colour DTF film, ready to press, from €8.50 per metre + VAT." },
      { name: "DTF heat pressing on textiles", description: "Pressing DTF transfers onto the customer's garments." },
    ],
    questions: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Before you order DTF.",
      items: [
        {
          question: "What is DTF?",
          answer:
            "DTF stands for “direct to film”. The design is printed in full colour on film, with a white base and adhesive powder, and then transferred to the garment with a heat press. It needs no screens or film positives, so it suits small quantities and designs with many colours.",
        },
        {
          question: "How much does DTF by the metre cost?",
          answer: `€9 per metre of film up to 9 m and €8.50 per metre from 10 m, plus VAT. Film is charged per 10 cm, with a minimum of half a metre. The calculator estimates how many metres your designs take; the final amount is confirmed once we have seen your files. Pressing onto garments is quoted separately.`,
        },
        {
          question: "Can I combine several designs on the same metre?",
          answer:
            "Yes. You pay for the film, not the design: you can fill the metre with different designs in several sizes. Add them to the calculator to see how much film they take.",
        },
        {
          question: "When is DTF better than screen printing?",
          answer:
            "DTF pays off for small runs, designs with many colours, gradients or photos. For large runs with few colours, [fabric screen printing](/en/servicos/fabric-screen-printing/) is usually better value. If in doubt, tell us the quantity and show us the design.",
        },
        {
          question: "How should I prepare my files?",
          answer:
            "Send each design at actual size, as a PNG with a transparent background at 300 dpi, or as a PDF. You can send them by email or WhatsApp from the request summary.",
        },
        {
          question: "What is the turnaround?",
          answer:
            "Film only is ready quickly. With pressing, the turnaround depends on the number of garments and is given in the quote.",
        },
      ],
    },
    relatedEyebrow: "OTHER SERVICES",
    relatedTitle: "Screen printing for your production.",
    relatedDescription:
      "Industrial screen printing on materials supplied by the client or as complete projects, in Guimarães.",
    artworkTitle: "Send your designs",
    artworkText:
      "The form does not accept files. Send your designs by email or WhatsApp, together with the request summary, as PNG with a transparent background at 300 dpi or as PDF, at actual size.",
    emailButton: "Email the designs",
    emailSubject: "DTF by the metre request",
    emailIntro: "Hello SERIFIL! Please find attached the designs for this DTF request:",
    emailAttachReminder: "(Attach the design files before sending.)",
    whatsappButton: "Send summary on WhatsApp",
    whatsappIntro: "Hello SERIFIL! I'd like to order DTF by the metre:",
    whatsappArtworkLine: "I'll send the designs next in this chat.",
    formArtworkNote: "The designs are not sent through this form: send them by email or WhatsApp from the request summary.",
    successArtwork: "Still need to send the designs? Email them now, together with the request summary.",
    formTitle: "Your details",
    formLabel: "DTF by the metre request",
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    message: "Message",
    messagePlaceholder: "When you need it and, with pressing, what the garments are, the fabric and where each design goes.",
    optional: "optional",
    privacy: "I consent to the processing of this data so that SERIFIL can respond to my request.",
    submit: "Send request",
    submitting: "Sending request",
    submissionError: "We could not send your request. Check your connection and try again.",
    successTitle: "Request sent.",
    successDescription: "We have received your DTF request and will reply as soon as possible.",
    anotherRequest: "Start another request",
    subject: "DTF by the metre request from the Serifil website",
    errors: {
      name: "Enter your name.",
      email: "Enter a valid email address.",
      phone: "Enter a phone number.",
      privacy: "You must consent to the processing of this data to send your request.",
    },
  },
};

/** Linhas do resumo: usadas no ecrã, nos campos enviados ao Formspree e na mensagem de WhatsApp. */
export function describeDtfRequest(locale: Locale, request: DtfRequest) {
  const copy = dtfCopy[locale];
  const layout = layoutDtf(request.designs);
  const designs = request.designs
    .map((design) => `${formatDesignSize(locale, design.width, design.height)} × ${design.copies}`)
    .join("; ");

  return [
    { name: "dtf_servico", label: copy.summary.service, value: copy.serviceOptions[request.service].title },
    { name: "dtf_desenhos", label: copy.summary.designs, value: designs },
    { name: "dtf_filme", label: copy.summary.length, value: formatMetres(locale, layout.billedLength) },
    { name: "dtf_preco_filme", label: copy.summary.price, value: `${formatEuros(locale, layout.price)} ${copy.priceNote}` },
    {
      name: "dtf_aplicacao",
      label: copy.summary.pressing,
      value: request.service === "pressed" ? copy.pressingQuote : copy.pressingNone,
    },
  ];
}

function summaryLines(locale: Locale, request: DtfRequest) {
  return describeDtfRequest(locale, request).map((row) => `- ${row.label}: ${row.value}`);
}

export function dtfWhatsappMessage(locale: Locale, request: DtfRequest) {
  const copy = dtfCopy[locale];
  return [copy.whatsappIntro, ...summaryLines(locale, request), copy.whatsappArtworkLine].join("\n");
}

/**
 * E-mail com o resumo do pedido para o cliente anexar os desenhos.
 * O formulário não aceita ficheiros: o plano grátis do Formspree não inclui anexos.
 */
export function dtfEmailUrl(locale: Locale, request: DtfRequest, email: string) {
  const copy = dtfCopy[locale];
  const body = [copy.emailIntro, "", ...summaryLines(locale, request), "", copy.emailAttachReminder].join("\r\n");
  return `mailto:${email}?subject=${encodeURIComponent(copy.emailSubject)}&body=${encodeURIComponent(body)}`;
}
