---
target: primeira dobra da página SERIFIL
total_score: 26
p0_count: 0
p1_count: 3
timestamp: 2026-07-22T19-58-17Z
slug: components-sections-hero-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3 | Os estados de foco existem, mas a navegação por âncoras não mostra persistentemente a secção atual. |
| 2 | Match System / Real World | 3 | A produção é visível, mas a capacidade concreta aparece depois de um slogan genérico. |
| 3 | User Control and Freedom | 3 | Existem saídas claras para orçamento, trabalhos e secção seguinte. |
| 4 | Consistency and Standards | 3 | Sistema coeso; as setas diagonais sugerem links externos, embora sejam âncoras internas. |
| 5 | Error Prevention | 2 | O pedido de orçamento não preserva o serviço que motivou o clique. |
| 6 | Recognition Rather Than Recall | 3 | As ações têm texto, mas o comprador precisa de transportar mentalmente o contexto até ao formulário. |
| 7 | Flexibility and Efficiency | 2 | Não há atalho de orçamento específico por serviço para compradores recorrentes. |
| 8 | Aesthetic and Minimalist Design | 3 | Visual focado, mas o título domina demasiado a história de produção. |
| 9 | Error Recovery | 2 | A recuperação depende do formulário posterior; o hero não prepara nem contextualiza o pedido. |
| 10 | Help and Documentation | 2 | Falta indicar o que o cliente deve preparar e o que acontece após o pedido. |
| **Total** |  | **26/40** | **Aceitável, com uma base forte e trabalho relevante de diferenciação e conversão.** |

## Anti-Patterns Verdict

**Avaliação visual:** não parece imediatamente um template automático, porque evita cartões repetidos, glassmorphism, gradientes no texto, números falsos e a composição SaaS habitual. A fotografia de produção e a referência a Guimarães dão credibilidade. Contudo, existe um conjunto reconhecível de códigos “industrial premium”: oficina escura, laranja de segurança, grelha técnica, título gigante em maiúsculas, kicker pequeno e setas Lucide. A página está bem executada, mas ainda não é totalmente específica da SERIFIL.

**Análise determinística:** indisponível. O detector terminou com código 1 e a mensagem exata `Error: bundled detector not found.` Os dois módulos candidatos do detector não existem na instalação local. Não existe contagem de findings, regras ou falsos positivos, e não devem ser reportados como zero.

**Visual overlays:** não existem overlays visíveis. O runtime de navegador respondeu `No browser is available`, a lista de browsers foi `[]` e não foi possível criar uma aba, testar mutação ou injetar `detect.js`. A captura fornecida e o código de `Hero.tsx` foram usados como evidência alternativa.

## Overall Impression

A reação inicial é positiva: parece uma empresa organizada, atual e ligada à produção. O maior potencial de melhoria é fazer com que essa força visual explique imediatamente por que uma empresa de calçado ou embalagem deve escolher a SERIFIL. Hoje o cartaz vence; a proposta comercial chega em segundo lugar.

## What's Working

1. **Composição confiante:** título, fotografia assimétrica, fundo escuro e laranja criam impacto sem cair num hero centrado e genérico.
2. **Direção ligada à produção:** mãos, equipamento e tinta são mais credíveis do que fotografia corporativa ou mockups de t-shirts.
3. **Base acessível:** âncoras nativas, texto alternativo útil, foco visível, CTAs com altura confortável e suporte para movimento reduzido.

## Priority Issues

### [P1] O hero vende o slogan antes de vender a capacidade da SERIFIL

- **Why it matters:** um comprador de calçado ou embalagem precisa de reconhecer rapidamente o material e o produto que pode encomendar.
- **Fix:** manter o slogan oficial, mas dar mais protagonismo imediato a “Impressão em plástico e sacos para calçado, produzida em Guimarães” através do kicker, texto de apoio ou uma linha técnica mais forte.
- **Suggested command:** `impeccable clarify`

### [P1] A produção real funciona mais como wallpaper do que como prova

- **Why it matters:** o overlay muito escuro, a grelha e o título de quatro linhas escondem parte da ação, do equipamento e da textura que transmitem confiança.
- **Fix:** reservar 35–45% do enquadramento para uma zona de imagem menos coberta, reduzir a grelha e articular o crop em torno de uma ação reconhecível.
- **Suggested command:** `impeccable layout`

### [P1] O CTA de orçamento perde o contexto do serviço

- **Why it matters:** o cliente volta a escolher e explicar no formulário aquilo que já estava a consultar; isso aumenta esforço e reduz a qualidade do lead.
- **Fix:** transportar o serviço selecionado para o formulário e indicar, de forma breve, que informação deve enviar: material, quantidade, prazo e ficheiro, se isso corresponder ao processo real.
- **Suggested command:** `impeccable clarify`

### [P2] O comportamento tipográfico é frágil em ecrãs estreitos

- **Why it matters:** `line-height: .82`, tracking muito negativo, mínimo de 3.25rem e altura mínima de 760px podem empurrar os CTAs para baixo e prejudicar zoom a 200%.
- **Fix:** controlar quebras por breakpoint, aliviar line-height e tracking no telemóvel e deixar o conteúdo determinar a altura mínima em ecrãs pequenos.
- **Suggested command:** `impeccable adapt`

### [P2] O CTA secundário comunica de forma ambígua

- **Why it matters:** a seta diagonal costuma indicar destino externo, enquanto “Ver trabalhos” apenas desloca a página; o contorno também perde contraste sobre a fotografia.
- **Fix:** reforçar o contorno ou preenchimento e usar uma seta vertical ou nenhum ícone nas âncoras internas.
- **Suggested command:** `impeccable polish`

## Cognitive Load

Foram identificadas 3 falhas em 8 critérios, correspondendo a carga cognitiva moderada:

- A hierarquia é visualmente forte, mas estrategicamente invertida: a frase genérica recebe mais peso do que a capacidade concreta.
- O primeiro ecrã expõe cinco links de navegação, um CTA no header, dois CTAs no hero e um indicador de scroll.
- O contexto do serviço não acompanha o utilizador até ao formulário.

Chunking, agrupamento, foco principal, sequência e progressive disclosure estão bem resolvidos.

## Emotional Journey

- **Chegada:** competência, energia e seriedade industrial.
- **Pico:** tipografia grande sobre a máquina cria uma impressão memorável.
- **Vale:** o comprador procura confirmação sobre materiais, tipos de saco, ficheiros e quantidades, mas o hero não responde.
- **Decisão:** o orçamento está visível, porém falta explicar o que preparar e qual o passo seguinte.
- **Fecho do hero:** “Produção própria · Acompanhamento técnico · Prazos claros” tranquiliza, mas ainda é uma afirmação genérica sem prova imediata.

## Persona Red Flags

**Jordan, visitante pela primeira vez:** encontra rapidamente o botão principal, mas não percebe em cinco segundos se a oferta principal é plástico, têxtil ou merchandising. O CTA não antecipa o que será pedido.

**Riley, utilizador que testa limites:** questiona promessas como “prazos claros” e “acompanhamento técnico” sem condições ou processo visível. Deteta que o pedido não preserva o serviço de origem.

**Casey, utilizador móvel distraído:** beneficia de botões grandes, mas o título alto e a altura mínima do hero podem atrasar a ação principal. O crop móvel pode perder a parte importante da fotografia.

**Marta, responsável de compras numa empresa de calçado:** precisa de confirmação imediata sobre sacos para calçado, plásticos compatíveis, tratamento de ficheiros, quantidades e planeamento. A página transmite confiança, mas ainda não apresenta evidência suficiente para uma decisão B2B rápida.

## Minor Observations

- O comprimento do texto de apoio é disciplinado e legível.
- “SERIFIL · PRODUÇÃO EM GUIMARÃES” é útil e específico.
- A paleta laranja, carvão e marfim tem bom contraste e personalidade.
- A fotografia provisória é adequada, mas as fotografias reais serão decisivas para a credibilidade.
- O projeto ainda não tem `DESIGN.md`; documentar o sistema ajudará a evitar deriva tipográfica e cores pontuais.

## Questions to Consider

- Se o hero pudesse responder a uma única pergunta do comprador em cinco segundos, deveria indicar o material, o produto final ou a vantagem de produção local?
- A página deve sentir-se primeiro como um cartaz de marca ou como uma parceira de produção? Neste momento, o cartaz vence.
- Que prova verdadeira pode aparecer antes do CTA: validação de ficheiros, aprovação de amostra, orientação de quantidades ou etapas de produção?
- Associações e eventos são públicos tão prioritários como calçado e embalagem, ou estão a diluir o posicionamento inicial?
