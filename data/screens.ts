import type { Locale } from "@/data/i18n";

/**
 * Quadros de serigrafia: serviço à parte dos serviços de impressão, feito por um parceiro que
 * trabalha para a SERIFIL. Nunca mostrar preços nem indicar que a SERIFIL fabrica os quadros.
 *
 * Enquanto `screensPublished` for `false`, /pt/quadros/ e /en/quadros/ são geradas para testes,
 * mas ficam `noindex`, fora do sitemap e sem ligação nos menus.
 */
export const screensPublished = false;

export function getScreensPath(locale: Locale) {
  return `/${locale}/quadros/`;
}

export function getScreensHreflangPaths() {
  return {
    "pt-PT": getScreensPath("pt"),
    en: getScreensPath("en"),
    "x-default": getScreensPath("pt"),
  };
}

export const frameOptions = ["new", "remesh"] as const;

export type FrameOption = (typeof frameOptions)[number];

/**
 * Medidas e malhas de referência no mercado (fornecedores de material de serigrafia, setembro de 2026).
 * Antes de publicar, confirmar com o parceiro quais faz.
 */
export const commonSizes = [
  { width: 30, height: 40 },
  { width: 40, height: 50 },
  { width: 50, height: 60 },
  { width: 60, height: 80 },
] as const;

export const meshOptions = ["43T", "55T", "77T", "90T", "120T", "unsure"] as const;

export type MeshOption = (typeof meshOptions)[number];

/** Limites do desenho e dos campos, em cm. Não são limites de produção. */
export const sizeLimits = { min: 20, max: 150 } as const;

/** Margem indicativa, por lado, entre o caixilho e a área de impressão, em cm. */
export const printMargin = 7.5;

export const maxColours = 6;
export const maxQuantity = 50;

export type ScreenRequest = {
  width: number;
  height: number;
  frame: FrameOption;
  mesh: MeshOption;
  engraving: boolean;
  colours: number;
  quantity: number;
};

export const defaultScreenRequest: ScreenRequest = {
  width: 50,
  height: 60,
  frame: "new",
  mesh: "unsure",
  engraving: false,
  colours: 1,
  quantity: 1,
};

export function clampSize(value: number) {
  return Math.min(sizeLimits.max, Math.max(sizeLimits.min, Math.round(value)));
}

export function formatSize(width: number, height: number) {
  return `${width} × ${height} cm`;
}

type ScreensCopy = {
  htmlLang: string;
  ogLocale: string;
  metaTitle: string;
  metaDescription: string;
  breadcrumbsLabel: string;
  home: string;
  sectionName: string;
  eyebrow: string;
  title: string;
  lead: string;
  toolLabel: string;
  drawingTitle: string;
  canvasLabel: (width: number, height: number) => string;
  canvasHint: string;
  printArea: string;
  legend: { newFrame: string; ownFrame: string; printArea: string; commonSizes: string };
  steps: Record<"size" | "frame" | "mesh" | "engraving" | "quantity", string>;
  commonSizes: string;
  rotate: string;
  width: string;
  height: string;
  sizeNote: string;
  remeshSizeNote: string;
  frameOptions: Record<FrameOption, { title: string; text: string }>;
  meshIntro: string;
  meshUses: Record<Exclude<MeshOption, "unsure">, string>;
  meshUnsure: { title: string; text: string };
  meshNote: string;
  engravingToggle: string;
  engravingText: string;
  colours: string;
  decreaseColours: string;
  increaseColours: string;
  coloursHint: (colours: number) => string;
  adjustQuantity: (colours: number) => string;
  quantity: string;
  decreaseQuantity: string;
  increaseQuantity: string;
  continue: string;
  summaryTitle: string;
  summary: Record<"frame" | "size" | "mesh" | "engraving" | "quantity", string>;
  meshToDefine: string;
  engravingNone: string;
  engravingWith: (colours: number) => string;
  noPrice: string;
  whatsappTitle: string;
  whatsappButton: string;
  whatsappIntro: string;
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

export const screensCopy: Record<Locale, ScreensCopy> = {
  pt: {
    htmlLang: "pt-PT",
    ogLocale: "pt_PT",
    metaTitle: "Quadros de Serigrafia à Medida | SERIFIL",
    metaDescription:
      "Desenhe o seu quadro de serigrafia: medida, malha, caixilho novo ou retelagem e gravação do desenho. Envie o pedido e receba o orçamento.",
    breadcrumbsLabel: "Navegação estrutural",
    home: "Início",
    sectionName: "Quadros de serigrafia",
    eyebrow: "QUADROS DE SERIGRAFIA · PEDIDO À MEDIDA",
    title: "Desenhe o seu quadro.",
    lead:
      "Arraste o canto do quadro ou parta de uma medida habitual. Escolha o caixilho, a malha e se precisa de gravação. Enviamos o orçamento depois de analisar o pedido.",
    toolLabel: "Desenho e opções do quadro",
    drawingTitle: "O seu quadro",
    canvasLabel: (width, height) => `Desenho à escala de um quadro com ${width} por ${height} centímetros`,
    canvasHint: "Arraste o quadrado laranja para mudar a medida. As linhas tracejadas mostram as medidas habituais.",
    printArea: "Área de impressão aprox.",
    legend: {
      newFrame: "Caixilho novo",
      ownFrame: "O seu caixilho",
      printArea: "Área de impressão aprox.",
      commonSizes: "Medidas habituais",
    },
    steps: {
      size: "Medida",
      frame: "Caixilho",
      mesh: "Malha",
      engraving: "Gravação",
      quantity: "Quantidade",
    },
    commonSizes: "Medidas habituais",
    rotate: "Rodar",
    width: "Largura (cm)",
    height: "Altura (cm)",
    sizeNote: "Medida exterior do caixilho. Outras medidas são confirmadas no orçamento.",
    remeshSizeNote: "Na retelagem, indique a medida exterior do seu caixilho.",
    frameOptions: {
      new: { title: "Quadro completo", text: "Caixilho metálico novo com malha esticada." },
      remesh: { title: "Retelagem", text: "Malha nova esticada no seu caixilho metálico." },
    },
    meshIntro: "O número indica fios por centímetro: quanto mais alto, mais detalhe e menos tinta passa.",
    meshUses: {
      "43T": "Desenhos cheios em têxtil. É a malha mais usada e deixa passar muita tinta.",
      "55T": "Têxtil com um pouco mais de detalhe.",
      "77T": "Detalhe fino, tecidos leves, papel e cartão.",
      "90T": "Desenhos detalhados com camada de tinta fina, em papel, plástico ou têxtil delicado.",
      "120T": "O máximo de detalhe: meios-tons e texto pequeno em papel, cartão, vinil e plástico.",
    },
    meshUnsure: {
      title: "Não sei",
      text: "Diga-nos na mensagem o que vai imprimir e a malha fica definida no orçamento.",
    },
    meshNote: "A disponibilidade de cada malha é confirmada no orçamento.",
    engravingToggle: "Gravar o desenho na tela",
    engravingText:
      "A tela é revestida com emulsão e exposta com o fotolito do seu desenho. A gravação é orçamentada à parte.",
    colours: "Número de cores",
    decreaseColours: "Menos cores",
    increaseColours: "Mais cores",
    coloursHint: (colours) => `Em regra, cada cor precisa da sua tela: ${colours} cores são ${colours} quadros.`,
    adjustQuantity: (colours) => `Passar para ${colours} quadros`,
    quantity: "Número de quadros",
    decreaseQuantity: "Menos quadros",
    increaseQuantity: "Mais quadros",
    continue: "Rever e enviar pedido",
    summaryTitle: "O seu pedido",
    summary: {
      frame: "Caixilho",
      size: "Medida",
      mesh: "Malha",
      engraving: "Gravação",
      quantity: "Quantidade",
    },
    meshToDefine: "A definir",
    engravingNone: "Sem gravação",
    engravingWith: (colours) => `Com gravação, ${colours} ${colours === 1 ? "cor" : "cores"}`,
    noPrice: "Sem preços online: respondemos com o orçamento.",
    whatsappTitle: "Prefere WhatsApp?",
    whatsappButton: "Enviar resumo por WhatsApp",
    whatsappIntro: "Olá SERIFIL! Queria orçamento para quadros de serigrafia:",
    formTitle: "Os seus contactos",
    formLabel: "Pedido de quadros de serigrafia",
    name: "Nome",
    company: "Empresa",
    email: "E-mail",
    phone: "Telefone",
    message: "Mensagem",
    messagePlaceholder: "O que vai imprimir, em que material e para quando precisa dos quadros.",
    optional: "opcional",
    privacy: "Autorizo o tratamento destes dados para que a SERIFIL possa responder ao meu pedido.",
    submit: "Enviar pedido",
    submitting: "A enviar pedido",
    submissionError: "Não foi possível enviar o pedido. Verifique a ligação e tente novamente.",
    successTitle: "Pedido enviado.",
    successDescription: "Recebemos o pedido dos seus quadros e respondemos com o orçamento assim que possível.",
    anotherRequest: "Fazer outro pedido",
    subject: "Pedido de quadros de serigrafia através do site Serifil",
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
    metaTitle: "Custom Screen Printing Frames | SERIFIL",
    metaDescription:
      "Draw your screen printing frame: size, mesh, new frame or re-meshing and design exposure. Send your request and receive a quote.",
    breadcrumbsLabel: "Breadcrumb navigation",
    home: "Home",
    sectionName: "Screen printing frames",
    eyebrow: "SCREEN PRINTING FRAMES · MADE TO ORDER",
    title: "Draw your screen.",
    lead:
      "Drag the corner of the frame or start from a common size. Choose the frame, the mesh and whether you need exposure. We send a quote after reviewing your request.",
    toolLabel: "Screen drawing and options",
    drawingTitle: "Your screen",
    canvasLabel: (width, height) => `Scale drawing of a ${width} by ${height} centimetre screen`,
    canvasHint: "Drag the orange square to change the size. Dashed lines show common sizes.",
    printArea: "Approx. print area",
    legend: {
      newFrame: "New frame",
      ownFrame: "Your frame",
      printArea: "Approx. print area",
      commonSizes: "Common sizes",
    },
    steps: {
      size: "Size",
      frame: "Frame",
      mesh: "Mesh",
      engraving: "Exposure",
      quantity: "Quantity",
    },
    commonSizes: "Common sizes",
    rotate: "Rotate",
    width: "Width (cm)",
    height: "Height (cm)",
    sizeNote: "Outside dimensions of the frame. Other sizes are confirmed in the quote.",
    remeshSizeNote: "For re-meshing, enter the outside dimensions of your frame.",
    frameOptions: {
      new: { title: "Complete screen", text: "New metal frame with stretched mesh." },
      remesh: { title: "Re-meshing", text: "New mesh stretched on your own metal frame." },
    },
    meshIntro: "The number is threads per centimetre: the higher it is, the finer the detail and the less ink passes through.",
    meshUses: {
      "43T": "Bold, solid designs on fabric. The most widely used mesh; it lets plenty of ink through.",
      "55T": "Fabric designs with a little more detail.",
      "77T": "Finer detail, lightweight fabrics, paper and card.",
      "90T": "Detailed designs with a thin ink layer, on paper, plastic or delicate fabrics.",
      "120T": "Maximum detail: halftones and small text on paper, card, vinyl and plastic.",
    },
    meshUnsure: {
      title: "Not sure",
      text: "Tell us in your message what you will print and the mesh is defined in the quote.",
    },
    meshNote: "Availability of each mesh is confirmed in the quote.",
    engravingToggle: "Expose the design onto the screen",
    engravingText:
      "The screen is coated with emulsion and exposed with the film positive of your design. Exposure is quoted separately.",
    colours: "Number of colours",
    decreaseColours: "Fewer colours",
    increaseColours: "More colours",
    coloursHint: (colours) => `As a rule, each colour needs its own screen: ${colours} colours means ${colours} screens.`,
    adjustQuantity: (colours) => `Set to ${colours} screens`,
    quantity: "Number of screens",
    decreaseQuantity: "Fewer screens",
    increaseQuantity: "More screens",
    continue: "Review and send request",
    summaryTitle: "Your request",
    summary: {
      frame: "Frame",
      size: "Size",
      mesh: "Mesh",
      engraving: "Exposure",
      quantity: "Quantity",
    },
    meshToDefine: "To be defined",
    engravingNone: "No exposure",
    engravingWith: (colours) => `With exposure, ${colours} ${colours === 1 ? "colour" : "colours"}`,
    noPrice: "No prices online: we reply with a quote.",
    whatsappTitle: "Prefer WhatsApp?",
    whatsappButton: "Send summary on WhatsApp",
    whatsappIntro: "Hello SERIFIL! I'd like a quote for screen printing frames:",
    formTitle: "Your details",
    formLabel: "Screen printing frame request",
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    message: "Message",
    messagePlaceholder: "What you will print, on which material and when you need the screens.",
    optional: "optional",
    privacy: "I consent to the processing of this data so that SERIFIL can respond to my request.",
    submit: "Send request",
    submitting: "Sending request",
    submissionError: "We could not send your request. Check your connection and try again.",
    successTitle: "Request sent.",
    successDescription: "We have received your screen request and will reply with a quote as soon as possible.",
    anotherRequest: "Start another request",
    subject: "Screen printing frame request from the Serifil website",
    errors: {
      name: "Enter your name.",
      email: "Enter a valid email address.",
      phone: "Enter a phone number.",
      privacy: "You must consent to the processing of this data to send your request.",
    },
  },
};

/** Linhas do resumo: usadas no ecrã, nos campos enviados ao Formspree e na mensagem de WhatsApp. */
export function describeScreenRequest(locale: Locale, request: ScreenRequest) {
  const copy = screensCopy[locale];

  return [
    { name: "quadro_caixilho", label: copy.summary.frame, value: copy.frameOptions[request.frame].title },
    { name: "quadro_medida", label: copy.summary.size, value: formatSize(request.width, request.height) },
    { name: "quadro_malha", label: copy.summary.mesh, value: request.mesh === "unsure" ? copy.meshToDefine : request.mesh },
    {
      name: "quadro_gravacao",
      label: copy.summary.engraving,
      value: request.engraving ? copy.engravingWith(request.colours) : copy.engravingNone,
    },
    { name: "quadro_quantidade", label: copy.summary.quantity, value: String(request.quantity) },
  ];
}

export function screenWhatsappMessage(locale: Locale, request: ScreenRequest) {
  return [
    screensCopy[locale].whatsappIntro,
    ...describeScreenRequest(locale, request).map((row) => `- ${row.label}: ${row.value}`),
  ].join("\n");
}
