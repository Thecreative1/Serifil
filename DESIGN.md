---
name: SERIFIL
description: Uma oficina de precisão digital para serigrafia e personalização em Guimarães.
colors:
  workshop-charcoal: "#111210"
  machine-surface: "#1b1d1a"
  raised-machine-surface: "#242722"
  warm-ink: "#f5f1e8"
  muted-steel: "#a6aaa4"
  printing-orange: "#e85b2a"
  printing-orange-hover: "#ff6b35"
  machine-border: "#30332f"
  technical-paper: "#eee9df"
  ink-dark: "#171916"
  paper-muted: "#63675f"
  field-placeholder: "#858a82"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(3.25rem, 9.8vw, 9.2rem)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.075em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 6vw, 5.8rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.055em"
  title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3.8rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.05em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    lineHeight: 1.5
    letterSpacing: "0.16em"
rounded:
  square: "0px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  section-sm: "80px"
  section-md: "112px"
  section-lg: "144px"
components:
  button-primary:
    backgroundColor: "{colors.printing-orange}"
    textColor: "{colors.ink-dark}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "12px 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.printing-orange-hover}"
    textColor: "{colors.ink-dark}"
  button-secondary:
    backgroundColor: "{colors.workshop-charcoal}"
    textColor: "{colors.warm-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "12px 20px"
    height: "48px"
  input:
    backgroundColor: "{colors.machine-surface}"
    textColor: "{colors.warm-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "12px 16px"
    height: "48px"
  service-primary:
    backgroundColor: "{colors.printing-orange}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.square}"
    padding: "56px"
---

# Design System: SERIFIL

## 1. Overview

**Creative North Star: "A Oficina de Precisão"**

O site deve parecer a extensão digital de uma oficina organizada: matéria escura, linhas de construção visíveis, papel técnico quente e um laranja que lembra tinta de impressão. A composição transmite rigor sem ficar fria, usando escala tipográfica, imagens reais de produção e contacto direto para aproximar o visitante do trabalho.

O sistema é industrial, quadrado e deliberadamente gráfico. A hierarquia nasce do contraste entre grandes títulos Archivo e texto Inter muito legível, não de ornamentos. O site rejeita a aparência de uma loja barata de t-shirts, uma gráfica antiga, um catálogo genérico de brindes, um template de agência ou um site automaticamente produzido por inteligência artificial.

O contentor principal tem largura máxima de 1440px, com margens laterais de 20px em mobile, 32px a partir de 640px e 48px a partir de 1024px. As secções respiram verticalmente em três ritmos: 80px, 112px e 144px. A composição alterna superfícies escuras com blocos claros de papel técnico e usa grelhas assimétricas para dar prioridade ao conteúdo mais importante.

**Key Characteristics:**

- Escuro industrial com uma única voz laranja forte.
- Tipografia condensada por tracking negativo e grande contraste de escala.
- Cantos totalmente quadrados, linhas finas e superfícies planas.
- Fotografia real de produção como prova de competência.
- Ritmo editorial direto, mas sem estética de revista ou decoração nostálgica.
- Movimento curto, progressivo e sempre removível por preferência do utilizador.

## 2. Colors

A paleta combina carvão esverdeado, tinta marfim, superfícies de máquina e laranja de impressão com blocos ocasionais de papel técnico quente.

### Primary

- **Laranja de Impressão** (`printing-orange`): ação principal, etiquetas de secção, números, ícones de confirmação e o serviço de maior prioridade. É o sinal funcional da marca.
- **Laranja de Impressão Vivo** (`printing-orange-hover`): estado hover de ações laranja. Nunca é uma segunda cor decorativa.

### Neutral

- **Carvão de Oficina** (`workshop-charcoal`): fundo dominante do site e base da navegação.
- **Superfície de Máquina** (`machine-surface`): secções elevadas por tom, campos e blocos secundários.
- **Superfície de Máquina Elevada** (`raised-machine-surface`): estado ou camada ligeiramente mais clara.
- **Tinta Quente** (`warm-ink`): texto principal sobre superfícies escuras.
- **Aço Suave** (`muted-steel`): texto secundário e informação de apoio sobre fundo escuro.
- **Linha de Máquina** (`machine-border`): divisores e contornos de 1px.
- **Papel Técnico** (`technical-paper`): secções claras do processo, introdução e chamada para orçamento.
- **Tinta Escura** (`ink-dark`): texto sobre laranja e papel técnico.
- **Papel Atenuado** (`paper-muted`): texto secundário sobre superfícies claras.
- **Placeholder Industrial** (`field-placeholder`): texto de apoio dentro dos campos.

**The One Ink Rule.** O laranja é reservado a ações, orientação, prioridade e estado. Nunca criar gradientes, brilho néon ou uma segunda cor saturada concorrente.

**The Alternating Material Rule.** O fundo escuro representa máquina e produção; o papel técnico claro representa explicação e processo. A alternância deve reforçar a narrativa, não formar um padrão decorativo previsível.

## 3. Typography

**Display Font:** Archivo (com Arial como fallback)  
**Body Font:** Inter (com Arial como fallback)

**Character:** Archivo dá peso mecânico e compacto aos títulos. Inter mantém instruções, descrições, navegação e formulários claros. A combinação deve sentir-se rigorosa, próxima e prática.

### Hierarchy

- **Display** (900, `clamp(3.25rem, 9.8vw, 9.2rem)`, 0.82): apenas para o H1, em maiúsculas, com tracking muito apertado.
- **Headline** (700, `clamp(2.4rem, 6vw, 5.8rem)`, 0.94): títulos principais de secção, normalmente em sentence case.
- **Title** (700, `clamp(2rem, 3.6vw, 3.8rem)`, 0.94): títulos de serviços, trabalhos e blocos destacados.
- **Body** (400, 1rem, 1.75): texto corrido. Limite habitual entre 46ch e 65ch; nunca ultrapassar 72ch.
- **Label** (800, 0.75rem, 0.16em, uppercase): kickers e micro-rótulos. Não repetir acima de todos os elementos menores.

**The Compressed Headline Rule.** Títulos Archivo usam tracking negativo e line-height apertado como assinatura. Nunca aplicar este tratamento ao corpo de texto.

**The Readable Production Rule.** Informação técnica, formulários e descrições ficam em Inter com line-height generoso. Nunca usar maiúsculas em parágrafos.

## 4. Elevation

O sistema é plano por defeito. Profundidade é comunicada por alternância tonal, bordas de 1px e sobreposição espacial. Sombras aparecem apenas em elementos fixos que precisam de se separar do conteúdo, como a barra de contacto e o painel de consentimento.

### Shadow Vocabulary

- **Contacto Flutuante** (`0 10px 32px rgba(0, 0, 0, 0.28)`): separa os atalhos de telefone e WhatsApp do conteúdo.
- **Consentimento Elevado** (`0 -18px 45px rgba(0, 0, 0, 0.32)`): eleva o painel de privacidade a partir do limite inferior.

**The Flat by Default Rule.** Cartões, serviços, campos e navegação não recebem sombra. Se um bloco normal parece flutuar, a sombra está errada.

**The One Pixel Structure Rule.** Separação estrutural usa linhas de 1px em `machine-border` ou equivalentes claros. Barras laterais coloridas são proibidas.

## 5. Components

### Buttons

Os botões são placas de ação quadradas, compactas e inequívocas.

- **Shape:** cantos totalmente quadrados (0px), altura mínima de 48px e padding base de 12px por 20px.
- **Primary:** fundo `printing-orange`, texto `ink-dark`, Inter bold em maiúsculas e tracking de 0.08em.
- **Hover / Focus:** hover muda apenas para `printing-orange-hover`; foco usa outline laranja de 2px com offset de 4px.
- **Secondary:** fundo carvão semitransparente, linha `machine-border` e texto `warm-ink`; hover reforça linha e superfície.
- **Dark:** fundo `ink-dark` e texto `warm-ink`, usado apenas sobre papel técnico.
- **Icon:** seta ArrowUpRight de 16px; no hover desloca 2px para cima e para a direita.

### Cards / Containers

Blocos são peças de uma grelha, não cartões decorativos.

- **Corner Style:** 0px em todos os contentores.
- **Background:** carvão, superfície de máquina, laranja de impressão ou papel técnico conforme prioridade narrativa.
- **Shadow Strategy:** sem sombra em repouso.
- **Border:** linha contínua de 1px, normalmente `machine-border`.
- **Internal Padding:** 28px em mobile, 40px em tablet e até 56px em desktop.
- **Variation:** tamanhos e tratamentos variam por prioridade. Nunca repetir grelhas de cartões idênticos.

### Inputs / Fields

Campos devem parecer ferramentas claras e robustas.

- **Style:** superfície de máquina, linha de 1px, cantos de 0px, altura mínima de 48px e padding de 12px por 16px.
- **Focus:** linha laranja e ring laranja de 1px; labels permanecem visíveis.
- **Hover:** linha mais clara sem deslocamento.
- **Error:** mensagem textual em tom salmão claro, `role="alert"`, `aria-invalid` e associação por `aria-describedby`.
- **Disabled / Busy:** botão de envio a 70% de opacidade e cursor de espera.

### Navigation

A navegação desktop é uma barra fixa de 80px, aumentando para 96px em ecrãs largos. Antes do scroll tem carvão translúcido; depois ganha fundo quase opaco e linha inferior. O seletor de idioma é uma unidade segmentada e o idioma ativo inverte tinta e fundo.

Em mobile, o botão tem alvo de 48px e abre um diálogo de ecrã inteiro. O diálogo bloqueia scroll, prende o foco, fecha por Escape e devolve o foco ao botão de origem.

### Section Heading

O cabeçalho de secção usa uma grelha assimétrica: kicker estreito à esquerda e título amplo à direita. O título é fluido, muito apertado e pode ter descrição até 62ch. Em mobile, os elementos empilham-se com 28px de intervalo.

### Service Priority Block

O serviço principal ocupa mais área e usa fundo laranja integral. Serviços de apoio vivem em superfície escura; serviços complementares tornam-se linhas estruturadas. Esta diferença é semântica e deve acompanhar o campo `emphasis`.

### Hero

O hero combina uma fotografia real de serigrafia, overlay escuro horizontal, grelha industrial subtil e H1 de escala extrema. A fotografia fica em `object-cover` com foco horizontal em 62%. O texto entra em quatro passos entre 0ms e 340ms, com duração de 900ms.

### Motion

Revelações usam apenas opacity e translateY de 24px durante 700ms, com `cubic-bezier(0.16, 1, 0.3, 1)`. O marquee é linear durante 36s. `prefers-reduced-motion: reduce` reduz animações e transições a 0.01ms e mantém o conteúdo visível.

## 6. Do's and Don'ts

### Do:

- **Do** manter o laranja `printing-orange` ligado a ação, orientação, prioridade ou estado.
- **Do** usar fotografia real de produção com alt text específico e útil.
- **Do** manter o contentor máximo de 1440px e os ritmos de secção de 80px, 112px e 144px.
- **Do** limitar corpo de texto a 46ch–65ch e preservar o contraste de escala entre títulos e descrições.
- **Do** alternar carvão e papel técnico apenas quando a narrativa muda entre produção e explicação.
- **Do** preservar foco visível, teclado completo, alvos mínimos de 44px e redução de movimento.
- **Do** manter todos os componentes quadrados e estruturados por linhas de 1px.

### Don't:

- **Don't** fazer o site parecer uma loja barata de t-shirts, uma gráfica antiga, um catálogo genérico de brindes, um template de agência ou um site automaticamente produzido por inteligência artificial.
- **Don't** usar excesso de cor, efeitos decorativos sem função, fotografias corporativas genéricas, promessas vagas ou dados comerciais inventados.
- **Don't** usar gradientes no texto, vidro decorativo, brilho néon ou cantos arredondados.
- **Don't** usar `border-left` ou `border-right` com mais de 1px como faixa colorida de destaque.
- **Don't** criar grelhas repetidas de cartões idênticos com ícone, título e texto.
- **Don't** aplicar sombras a cartões ou campos normais.
- **Don't** animar propriedades de layout ou introduzir bounce e elastic.
- **Don't** repetir pequenos kickers em maiúsculas acima de cada elemento.
