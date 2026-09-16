import type { Locale } from "@/data/i18n";

/**
 * Quadros de serigrafia: serviço à parte dos serviços de impressão, feito por um parceiro que
 * trabalha para a SERIFIL. Nunca mostrar preços nem indicar que a SERIFIL fabrica os quadros.
 *
 * Publicado a 16 set 2026. Com `false`, /pt/quadros/ e /en/quadros/ continuam a ser geradas,
 * mas ficam `noindex`, fora do sitemap e sem ligações na lista de serviços, nos guias e na home.
 */
export const screensPublished = true;

/** Data da última alteração de conteúdo: usada no sitemap. Atualizar quando o texto ou as opções mudarem. */
export const screensDateModified = "2026-09-16";

/** Fotografia de quadros com tela (equipamento de um parceiro): partilha nas redes e Google Imagens. */
export const screensShareImage = { src: "/images/quadros/quadros-serigrafia-og.jpg", width: 1200, height: 630 } as const;
export const screensPhoto = { src: "/images/guias/telas-serigrafia.webp", width: 1440, height: 810 } as const;

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

/** Medidas e malhas confirmadas com o parceiro (setembro de 2026). A medida é a exterior do caixilho. */
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
  serviceType: string;
  breadcrumbsLabel: string;
  home: string;
  services: string;
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
  meshSpec: (mesh: string | null) => string;
  engravingToggle: string;
  engravingText: string;
  colours: string;
  decreaseColours: string;
  increaseColours: string;
  quantityPerColour: (colours: number) => string;
  quantitySpec: (quantity: number) => string;
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
  offers: Array<{ name: string; description: string }>;
  photoAlt: string;
  photoLabel: string;
  photoCaption: string;
  questions: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  relatedEyebrow: string;
  relatedTitle: string;
  relatedDescription: string;
  artworkTitle: string;
  artworkTitleEngraving: string;
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

export const screensCopy: Record<Locale, ScreensCopy> = {
  pt: {
    htmlLang: "pt-PT",
    ogLocale: "pt_PT",
    metaTitle: "Quadros de Serigrafia à Medida e Retelagem | SERIFIL",
    metaDescription:
      "Quadros de serigrafia à medida: caixilho novo ou retelagem, malha de 43T a 120T e gravação do desenho. Desenhe o quadro online e peça orçamento.",
    serviceType: "Quadros de serigrafia",
    breadcrumbsLabel: "Navegação estrutural",
    home: "Início",
    services: "Serviços",
    sectionName: "Quadros de serigrafia",
    eyebrow: "Quadros de serigrafia à medida",
    title: "Desenhe o seu quadro.",
    lead:
      "Quadro completo com caixilho novo ou retelagem do seu caixilho, com a malha certa e gravação do desenho. Arraste o canto do quadro ou parta de uma medida habitual e envie o pedido de orçamento.",
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
    meshSpec: (mesh) => (mesh ? `Malha ${mesh}` : "Malha a definir"),
    engravingToggle: "Gravar o desenho na tela",
    engravingText:
      "A tela é revestida com emulsão e exposta com o fotolito do seu desenho. A gravação é orçamentada à parte.",
    colours: "Número de cores",
    decreaseColours: "Menos cores",
    increaseColours: "Mais cores",
    quantityPerColour: (colours) => `Um quadro por cor: com ${colours} cores são precisos pelo menos ${colours} quadros.`,
    quantitySpec: (quantity) => `${quantity} ${quantity === 1 ? "quadro" : "quadros"}`,
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
    offers: [
      { name: "Quadro de serigrafia completo", description: "Caixilho metálico novo com malha esticada, à medida." },
      { name: "Retelagem de quadros de serigrafia", description: "Malha nova esticada no caixilho metálico do cliente." },
      {
        name: "Gravação de quadros de serigrafia",
        description: "Tela revestida com emulsão e exposta com o fotolito do desenho, um quadro por cor.",
      },
    ],
    photoAlt: "Quadros de serigrafia de vários tamanhos encostados à parede, alguns com a tela revestida de emulsão amarela e roxa",
    photoLabel: "Preparação da impressão",
    photoCaption: "Quadros de vários formatos. Nos amarelos e no roxo a tela já está revestida de emulsão; nos brancos vê-se a malha.",
    questions: {
      eyebrow: "PERGUNTAS FREQUENTES",
      title: "Antes de pedir os quadros.",
      items: [
        {
          question: "O que é a retelagem de um quadro de serigrafia?",
          answer:
            "É a substituição da malha: é esticada uma malha nova no seu caixilho metálico, que volta a ser usado. No desenho, escolha «Retelagem» e indique a medida exterior do caixilho.",
        },
        {
          question: "A medida do quadro é interior ou exterior?",
          answer:
            "É sempre a medida exterior do caixilho. As medidas habituais são 30 × 40, 40 × 50, 50 × 60 e 60 × 80 cm, na vertical ou na horizontal. Outras medidas são confirmadas no orçamento.",
        },
        {
          question: "Que malha escolher: 43T, 55T, 77T, 90T ou 120T?",
          answer:
            "O número indica fios por centímetro. A 43T serve desenhos cheios em têxtil e deixa passar muita tinta; a 55T dá um pouco mais de detalhe em têxtil; a 77T serve detalhe fino, tecidos leves, papel e cartão; a 90T, desenhos detalhados com camada de tinta fina; a 120T, meios-tons e texto pequeno em papel, cartão, vinil e plástico. Se não tiver a certeza, escolha «Não sei» e diga-nos o que vai imprimir.",
        },
        {
          question: "Quantos quadros são precisos para um desenho a várias cores?",
          answer:
            "Em regra, um quadro por cor: cada cor é gravada na sua tela e impressa numa passagem própria. Um desenho a três cores precisa de pelo menos três quadros, e a ferramenta ajusta a quantidade quando muda o número de cores.",
        },
        {
          question: "Como é feita a gravação do desenho na tela?",
          answer:
            "A tela é revestida com emulsão e exposta com o [fotolito](/pt/guias/fotolitos/) do seu desenho. Envie o desenho por e-mail ou WhatsApp, a partir do resumo do pedido, de preferência em formato vetorial (PDF, AI, EPS ou SVG) e com as medidas reais. A gravação é orçamentada à parte.",
        },
        {
          question: "Porque é que não há preços no site?",
          answer:
            "O valor depende da medida, do caixilho, da malha, da gravação e da quantidade. Envie o pedido com as opções escolhidas e respondemos com o orçamento.",
        },
      ],
    },
    relatedEyebrow: "OUTROS SERVIÇOS",
    relatedTitle: "Serigrafia para a sua produção.",
    relatedDescription:
      "Serigrafia e impressão industrial sobre materiais fornecidos pelo cliente ou em projetos completos, em Guimarães.",
    artworkTitle: "Tem um desenho ou referência?",
    artworkTitleEngraving: "Envie o desenho para a gravação",
    artworkText:
      "O formulário não aceita ficheiros. Envie o desenho por e-mail ou WhatsApp, já com o resumo do pedido, de preferência em formato vetorial (PDF, AI, EPS ou SVG) e com as medidas reais.",
    emailButton: "Enviar desenho por e-mail",
    emailSubject: "Pedido de quadros de serigrafia",
    emailIntro: "Olá SERIFIL! Envio em anexo o desenho para este pedido de quadros de serigrafia:",
    emailAttachReminder: "(Anexe o ficheiro do desenho antes de enviar.)",
    whatsappButton: "Enviar resumo por WhatsApp",
    whatsappIntro: "Olá SERIFIL! Queria orçamento para quadros de serigrafia:",
    whatsappArtworkLine: "Envio o desenho a seguir nesta conversa.",
    formArtworkNote: "O desenho não segue por este formulário: envie-o por e-mail ou WhatsApp, a partir do resumo do pedido.",
    successArtwork: "Falta o desenho? Envie-o agora por e-mail, já com o resumo do pedido.",
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
    metaTitle: "Custom Screen Printing Frames and Re-meshing | SERIFIL",
    metaDescription:
      "Custom screen printing frames: new frame or re-meshing, 43T to 120T mesh and design exposure. Draw your screen online and request a quote.",
    serviceType: "Screen printing frames",
    breadcrumbsLabel: "Breadcrumb navigation",
    home: "Home",
    services: "Services",
    sectionName: "Screen printing frames",
    eyebrow: "Custom screen printing frames",
    title: "Draw your screen.",
    lead:
      "A complete screen with a new frame, or re-meshing of your own frame, with the right mesh and design exposure. Drag the corner of the frame or start from a common size and send your quote request.",
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
    meshSpec: (mesh) => (mesh ? `Mesh ${mesh}` : "Mesh to be defined"),
    engravingToggle: "Expose the design onto the screen",
    engravingText:
      "The screen is coated with emulsion and exposed with the film positive of your design. Exposure is quoted separately.",
    colours: "Number of colours",
    decreaseColours: "Fewer colours",
    increaseColours: "More colours",
    quantityPerColour: (colours) => `One screen per colour: ${colours} colours need at least ${colours} screens.`,
    quantitySpec: (quantity) => `${quantity} ${quantity === 1 ? "screen" : "screens"}`,
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
    offers: [
      { name: "Complete screen printing frame", description: "New metal frame with stretched mesh, made to size." },
      { name: "Screen printing frame re-meshing", description: "New mesh stretched on the customer's own metal frame." },
      {
        name: "Screen exposure",
        description: "Screen coated with emulsion and exposed with the film positive of the design, one screen per colour.",
      },
    ],
    photoAlt: "Screen printing frames of various sizes leaning against a wall, some with the mesh coated in yellow and purple emulsion",
    photoLabel: "Print preparation",
    photoCaption: "Screens in several formats. The yellow and purple ones are already coated with emulsion; on the white ones you can see the mesh.",
    questions: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "Before you order screens.",
      items: [
        {
          question: "What is re-meshing a screen printing frame?",
          answer:
            "It means replacing the mesh: new mesh is stretched on your own metal frame, which is used again. In the drawing, choose “Re-meshing” and enter the outside dimensions of the frame.",
        },
        {
          question: "Are the screen dimensions inside or outside?",
          answer:
            "Always the outside dimensions of the frame. Common sizes are 30 × 40, 40 × 50, 50 × 60 and 60 × 80 cm, portrait or landscape. Other sizes are confirmed in the quote.",
        },
        {
          question: "Which mesh should I choose: 43T, 55T, 77T, 90T or 120T?",
          answer:
            "The number is threads per centimetre. 43T suits bold, solid designs on fabric and lets plenty of ink through; 55T gives a little more detail on fabric; 77T suits finer detail, lightweight fabrics, paper and card; 90T, detailed designs with a thin ink layer; 120T, halftones and small text on paper, card, vinyl and plastic. If you are not sure, choose “Not sure” and tell us what you will print.",
        },
        {
          question: "How many screens does a multi-colour design need?",
          answer:
            "As a rule, one screen per colour: each colour is exposed on its own screen and printed in a separate pass. A three-colour design needs at least three screens, and the tool adjusts the quantity when you change the number of colours.",
        },
        {
          question: "How is the design exposed onto the screen?",
          answer:
            "The screen is coated with emulsion and exposed with the [film positive](/en/guias/film-positives/) of your design. Send the artwork by email or WhatsApp from the request summary, preferably as a vector file (PDF, AI, EPS or SVG) at actual size. Exposure is quoted separately.",
        },
        {
          question: "Why are there no prices on the website?",
          answer:
            "The price depends on size, frame, mesh, exposure and quantity. Send your request with the options you chose and we reply with a quote.",
        },
      ],
    },
    relatedEyebrow: "OTHER SERVICES",
    relatedTitle: "Screen printing for your production.",
    relatedDescription:
      "Industrial screen printing on materials supplied by the client or as complete projects, in Guimarães.",
    artworkTitle: "Have artwork or a reference?",
    artworkTitleEngraving: "Send the artwork for exposure",
    artworkText:
      "The form does not accept files. Send the artwork by email or WhatsApp, together with the request summary, preferably as a vector file (PDF, AI, EPS or SVG) at actual size.",
    emailButton: "Email the artwork",
    emailSubject: "Screen printing frame request",
    emailIntro: "Hello SERIFIL! Please find attached the artwork for this screen printing frame request:",
    emailAttachReminder: "(Attach the artwork file before sending.)",
    whatsappButton: "Send summary on WhatsApp",
    whatsappIntro: "Hello SERIFIL! I'd like a quote for screen printing frames:",
    whatsappArtworkLine: "I'll send the artwork next in this chat.",
    formArtworkNote: "The artwork is not sent through this form: send it by email or WhatsApp from the request summary.",
    successArtwork: "Still need to send the artwork? Email it now, together with the request summary.",
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

function summaryLines(locale: Locale, request: ScreenRequest) {
  return describeScreenRequest(locale, request).map((row) => `- ${row.label}: ${row.value}`);
}

export function screenWhatsappMessage(locale: Locale, request: ScreenRequest) {
  const copy = screensCopy[locale];
  return [
    copy.whatsappIntro,
    ...summaryLines(locale, request),
    ...(request.engraving ? [copy.whatsappArtworkLine] : []),
  ].join("\n");
}

/**
 * E-mail com o resumo do pedido para o cliente anexar o desenho.
 * O formulário não aceita ficheiros: o plano grátis do Formspree não inclui anexos.
 */
export function screenEmailUrl(locale: Locale, request: ScreenRequest, email: string) {
  const copy = screensCopy[locale];
  const body = [copy.emailIntro, "", ...summaryLines(locale, request), "", copy.emailAttachReminder].join("\r\n");
  return `mailto:${email}?subject=${encodeURIComponent(copy.emailSubject)}&body=${encodeURIComponent(body)}`;
}
