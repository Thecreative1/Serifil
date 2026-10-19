# Arquitetura Técnica: SERIFIL

Este documento preserva as decisões técnicas que mantêm o site rápido, bilingue, acessível, indexável e orientado a pedidos de orçamento. Atualize-o quando mudar arquitetura, integrações, rotas, dados ou contratos testados.

## 1. Visão geral

- Framework: Next.js 16 com App Router.
- Interface: React 19 e TypeScript em modo `strict`.
- Estilos: Tailwind CSS 4, PostCSS e tokens CSS em `app/globals.css`.
- Ícones: `lucide-react`.
- Fontes: Archivo e Inter, carregadas por `next/font/google`.
- Saída: exportação estática por `output: "export"`.
- Testes: Playwright em desktop, mobile, comportamento, SEO, analítica e formulário.
- Idiomas: português (`pt-PT`) e inglês (`en`).

O site é uma landing page longa. A estrutura visual é composta no servidor e apenas as áreas com interação ou estado são client components.

## 2. Mapa de diretórios

```text
app/
  (root)/                entrada em / e escolha automática de idioma
  [locale]/              páginas estáticas /pt/ e /en/
  globals.css            tokens, base, grelha e movimento
  robots.ts              robots.txt
  sitemap.ts             sitemap localizado e imagens
components/
  analytics/             consentimento, Google Analytics e links medidos
  dtf/                   calculadora de DTF ao metro (DtfCalculator)
  guides/                peças dos guias: migalhas, esquema de processo, ligações
  layout/                header, menu mobile, footer e contacto flutuante
  screens/               ferramenta de quadros (ScreenConfigurator)
  sections/              secções da landing page, páginas de serviço e guias
  ui/                    primitives reutilizáveis
config/
  analytics.ts           ID, chave de consentimento e evento interno
  brand.ts               contactos, localização, URL e Formspree
  paths.ts               caminhos de assets e rotas localizadas
data/
  i18n.ts                fonte ativa de todo o conteúdo PT e EN
  service-pages.ts       páginas de serviço PT e EN
  guides.ts              guias editoriais PT e EN e estado de publicação
  screens.ts             quadros de serigrafia: opções, textos, SEO e resumo
  dtf.ts                 DTF ao metro: preços, encaixe no filme, textos, SEO e resumo
lib/
  analytics.ts           consent mode e eventos sem dados pessoais
public/
  images/                imagem real do hero e trabalhos otimizados
scripts/
  optimize-portfolio-images.mjs     WebP das fotografias de trabalhos
  optimize-guide-images.mjs         WebP das fotografias de equipamento dos guias
  optimize-screens-images.mjs       imagem de partilha dos quadros
  generate-service-share-images.mjs JPEG 1200×630 de partilha das páginas de serviço
  generate-brand-icons.mjs          ícones da marca
  serve-static.mjs                  servidor estático usado pelos testes (porta 3100)
tests/
  site.spec.ts           contratos funcionais e de conteúdo
  visual.spec.ts         capturas completas desktop e mobile
```

Os ficheiros `data/services.ts`, `data/portfolio.ts`, `data/benefits.ts` e `data/process.ts` não são importados pela aplicação atual. São cópias antigas em português e podem divergir. Até serem removidos ou religados explicitamente, `data/i18n.ts` é a única fonte de verdade de conteúdo apresentado.

## 3. Rotas e renderização

### `/`

`app/(root)/page.tsx` escolhe idioma no cliente por esta ordem:

0. Robôs (motores de busca e pré-visualizações de links, detetados pelo user agent) vão sempre para `/pt/`, o `x-default`. O Googlebot apresenta-se em inglês: sem esta regra era enviado para `/en/` e o Google tratava a raiz como a página inglesa (visto no Search Console em out 2026).
1. `localStorage` com chave `serifil_locale`.
2. Cookie `serifil_locale`.
3. Preferências do navegador.
4. Português quando algum idioma começa por `pt`; inglês nos restantes casos.

No GitHub Pages, a página estática em `/` escolhe o idioma no cliente e encaminha para a rota localizada correspondente.

### `/pt/` e `/en/`

`app/[locale]/layout.tsx`:

- limita parâmetros a `pt` e `en`;
- gera metadata localizada;
- define `lang`;
- carrega fontes;
- monta consentimento e analítica.

`app/[locale]/page.tsx`:

- escolhe o objeto de tradução;
- monta dados estruturados `LocalBusiness`;
- compõe as secções na ordem narrativa;
- adiciona contactos flutuantes;
- termina com footer.

Não adicionar um idioma sem atualizar `locales`, `translations`, metadata, sitemap, redirects, seletor de idioma e testes.

### `/pt/guias/`, `/en/guias/` e `/<locale>/guias/<slug>/`

Secção editorial "Guias de Serigrafia" / "Screen Printing Guides", em português e inglês, com o mesmo padrão das páginas de serviço (segmento `guias` partilhado, slug traduzido). O conteúdo vive em `data/guides.ts`:

- `guideLocales` define os idiomas; cada guia tem `key`, que liga as versões PT e EN para hreflang, sitemap e seletor de idioma;
- um guia novo só deve ser publicado quando existir nos dois idiomas, para os menus PT e EN continuarem iguais;
- cada guia tem `status`; apenas `published` gera página, entra na listagem, no JSON-LD e no sitemap. Rascunhos incompletos ficam como `draft`;
- o corpo é uma lista de secções com blocos tipados (`paragraph`, `note`, `checklist`, `comparison`, `process`, `figure`, `gallery`), renderizados por `components/sections/GuideArticle.tsx`;
- ligações internas no texto usam a sintaxe `[texto](/caminho/)`, construídas com `getServicePath` para não divergirem das rotas.

Guias publicados: fotolitos (`/pt/guias/fotolitos/` ↔ `/en/guias/film-positives/`, set 2026) e DTF (`/pt/guias/o-que-e-dtf/` ↔ `/en/guias/what-is-dtf/`, out 2026). O esquema de processo (`components/guides/ProcessDiagram.tsx`) tem desenhos para serigrafia (`artwork`, `film`, `screen`, `print`) e para DTF (`dtf-film`, `powder`, `press`). O guia do DTF não tem fotografia própria e usa `og.jpg` como imagem de partilha.

Cada página de serviço mostra "Guias relacionados" (`serviceGuides` em `components/sections/ServiceDetail.tsx`): fotolitos em todas e, na serigrafia em tecido, também o DTF. As respostas das perguntas frequentes dos serviços aceitam a sintaxe de ligação `[texto](/caminho/)`.

Cada guia publica canonical, hreflang recíproco (`x-default` para PT), Open Graph `article`, JSON-LD `Article` e `BreadcrumbList`; o índice publica `CollectionPage`. O link "Guias"/"Guides" do menu é um caminho absoluto: `Header`, `MobileMenu` e `Footer` só prefixam `homeHref` a âncoras `#`.

### `/pt/quadros/` e `/en/quadros/`

Ferramenta "Quadros de serigrafia". O cliente desenha o quadro à escala, arrastando o canto ou partindo de uma medida habitual. Escolhe caixilho novo ou retelagem, a malha, a gravação e a quantidade. Envia o pedido pelo Formspree (campos `quadro_*`) ou por WhatsApp com o resumo. O desenho não vai no formulário, porque o plano grátis do Formspree não aceita ficheiros. Segue por e-mail (`mailto:` para `brand.email`, com o resumo no corpo) ou pelo WhatsApp. Para ter anexos no próprio formulário é preciso um plano pago do Formspree (Personal ou superior).

- É um serviço à parte dos serviços de impressão, porque os quadros são feitos por um parceiro. Não entra em `service-pages.ts` nem no formulário principal. Nunca mostra preços nem diz que a SERIFIL fabrica os quadros.
- Publicado a 16 set 2026 (`screensPublished = true`). Aparece como item 05 da lista "Materiais e aplicações" da home (`Services`), nas ligações relacionadas das páginas de serviço (`ServiceDetail`), dos guias (`GuideServiceLinks`) e do DTF ao metro ("Outros serviços", que por sua vez aparece nos outros serviços da página de quadros), e no fim do `OfferCatalog` da home, com `url`. O `Header` marca "Serviços" como ativo e as migalhas são Início / Serviços / Quadros de serigrafia. Não tem item próprio no menu principal.
- Com `screensPublished = false`, as páginas continuam a ser geradas, mas ficam `noindex`, fora do sitemap e sem nenhuma das ligações acima.
- Conteúdo, opções, resumo, perguntas frequentes e textos de SEO em `data/screens.ts`. Interação em `components/screens/ScreenConfigurator.tsx` (client component; o desenho é SVG com pointer events e os campos numéricos são a alternativa por teclado).
- Com gravação, a quantidade de quadros nunca fica abaixo do número de cores (um quadro por cor). Acompanha as cores enquanto o cliente não a aumentar à mão.
- As medidas habituais (30×40, 40×50, 50×60, 60×80 cm, medida exterior do caixilho) e as malhas (43T, 55T, 77T, 90T, 120T) foram confirmadas com o parceiro em setembro de 2026.

SEO da página de quadros:

- `title` até 60 caracteres e `description` até 160, com "quadros de serigrafia", "retelagem" e as malhas. O H1 junta o nome do serviço (em `section-kicker`) e a chamada "Desenhe o seu quadro.", sem mudar o aspeto.
- Perguntas frequentes visíveis (`details`) com H3 e ligação ao guia de fotolitos; as mesmas respostas vão para `FAQPage`, sem a sintaxe de ligação (`stripInlineLinks`).
- JSON-LD em `@graph`: `WebPage`, `ImageObject`, `Service` (com `serviceType`, `areaServed` e `OfferCatalog` de quadro completo, retelagem e gravação, sem preços), `FAQPage` e `BreadcrumbList`.
- Imagem de partilha própria, `public/images/quadros/quadros-serigrafia-og.jpg` (1200×630), gerada por `scripts/optimize-screens-images.mjs` a partir de `../fotos serifil/guias/telas.jpg`. A fotografia das telas (`public/images/guias/telas-serigrafia.webp`) aparece junto às perguntas. Ambas são de um parceiro: descrevem o que se vê, nunca instalações da SERIFIL.
- Sitemap com prioridade 0.8, `lastmod` fixo em `screensDateModified` e as duas imagens. Atualizar a data quando o conteúdo mudar.
- A página não define `robots`: herda do layout `index, follow` e `max-image-preview: large`.

### `/pt/dtf/` e `/en/dtf/`

Calculadora "DTF ao metro", publicada a 19 out 2026 (`dtfPublished = true`). Conteúdo, preços, encaixe e textos em `data/dtf.ts`; interação em `components/dtf/DtfCalculator.tsx` (client component).

Regras de negócio:

- O filme é impresso por um parceiro, mas **isso não se diz no site**: nunca escrever que a SERIFIL imprime o filme nem que tem impressora DTF. A aplicação (prensagem) é feita pela SERIFIL e é sempre orçamentada à parte.
- Os 7 € por metro são o custo do parceiro e nunca aparecem no site (há testes que o verificam). O preço de venda está em `priceTiers`: 9 € por metro até 9 m e 8,50 € a partir de 10 m, sem IVA, cobrado aos 10 cm (`billingStep`) com mínimo de 0,5 m (`minimumLength`). O guia do DTF repete estes valores em texto: mudar o preço obriga a rever `data/guides.ts`.
- Provisório, por confirmar com o parceiro: largura útil do rolo de 58 cm (`rollWidth`) e 1 cm entre desenhos (`designGap`).

Encaixe no filme (`layoutDtf`):

1. Cada desenho fica na orientação que gasta menos filme; "Cabem N num metro" usa a orientação mais densa.
2. As peças entram das mais altas para as mais baixas. Cada fila abre com a peça mais alta e o espaço livre à direita e por baixo das peças é aproveitado pelas menores (lista de espaços livres, divisão em guilhotina).
3. Cada metro é uma folha (`sheetLength = 100`): nenhuma peça atravessa a linha do metro; se não couber no resto da folha, passa para o topo da seguinte.
4. É uma estimativa: a página diz que o valor é confirmado depois de vermos os ficheiros.

Interface:

- Começa com um só desenho (10 × A4) e permite até 6 (`maxDesigns`), pelas medidas habituais ou por "Adicionar desenho".
- Cada desenho tem um aspeto (`look`): cor e silhueta `lucide-react` (gato, pinheiro, peixe, pássaro, flor, tartaruga), iguais no cartão e nas peças do filme. Um desenho novo recebe o primeiro aspeto livre e mantém-no enquanto existir.
- Clicar num cartão ou numa peça seleciona o desenho: o cartão fica com contorno laranja, as outras peças ficam esbatidas e o filme rola até à primeira peça do desenho escolhido (útil porque os desenhos pequenos ficam no fim).
- O pedido segue pelo Formspree com campos `dtf_*`, ou por e-mail/WhatsApp com o resumo, porque os ficheiros não vão no formulário.

SEO: título "DTF ao Metro e Estampagem de T-shirts | SERIFIL" (pesquisas "estampagem de t-shirts guimarães" no Search Console), `Service` + `FAQPage` + `BreadcrumbList`, `dtfDateModified` no sitemap. Aparece em Serviços como os quadros (lista da home, páginas de serviço, guias, `OfferCatalog`), sem item próprio no menu. Com `dtfPublished = false`, fica `noindex` e sem ligações.

### Menus e contacto rápido

- `Header` recebe `activeHref` com o `href` do item da secção atual (`#servicos` nas páginas de serviço, `/<locale>/guias/` nos guias). O item fica com `aria-current="true"` no desktop e no menu móvel. A home não marca nenhum item.
- `components/layout/FloatingContact.tsx` (Ligar e WhatsApp) é usado na home, nas páginas de serviço e nos guias.
- O teste "mantém menus consistentes" verifica o item ativo, o contacto flutuante, a mesma estrutura de menu em PT e EN e a ausência de sobreposição do header a 1024, 1280 e 1440px nas duas línguas.

As fotografias de equipamento estão em `public/images/guias/`, geradas por `scripts/optimize-guide-images.mjs` a partir de `../fotos serifil/guias/`. As legendas distinguem trabalho produzido pela SERIFIL (`credit: "work"`) de equipamento e processo (`credit: "process"`, etiqueta "Preparação da impressão"). O equipamento fotografado pertence a um parceiro que trabalha para a SERIFIL: legendas e textos alternativos descrevem a função do equipamento e nunca o apresentam como instalações da SERIFIL.

## 4. Fontes de dados

### Estratégia

`PRODUCT.md` define público, objetivo, personalidade, anti-referências e princípios. Nenhuma mudança visual ou de conteúdo deve contrariá-lo silenciosamente.

### Conteúdo

`data/i18n.ts` contém os dois objetos completos de conteúdo e exporta `SiteContent`. Componentes recebem apenas a fatia necessária, como `SiteContent["hero"]`. Isto mantém estrutura e linguagem separadas.

Regra de alteração:

1. Alterar português e inglês na mesma mudança.
2. Manter as mesmas chaves e a mesma ordem de itens.
3. Confirmar labels acessíveis, mensagens de erro e texto de consentimento.
4. Rever metadata, dados estruturados e testes quando mudar serviços ou posicionamento.

### Configuração operacional

`config/brand.ts` é a fonte de verdade para:

- nome e descritor;
- titular da atividade e NIF;
- localização, morada e código postal (`postalCode`), apresentado nos contactos, junto ao mapa e na informação legal, e incluído no JSON-LD `PostalAddress`;
- telefone, WhatsApp, email, Instagram, Facebook e horário;
- website canónico;
- endpoint Formspree;
- coordenadas e URLs Google Maps.

Valores vazios escondem contactos opcionais. Nunca espalhar estes valores por componentes. O telefone e WhatsApp aparecem em testes como contrato explícito e precisam de atualização simultânea.

Os links de WhatsApp são construídos exclusivamente por `lib/whatsapp.ts`. `whatsappUrl(mensagem?)` normaliza `brand.whatsapp` para dígitos e codifica a mensagem com `encodeURIComponent`. Nunca montar um `wa.me` à mão num componente.

As mensagens pré-preenchidas vivem em `data/i18n.ts`, em `contact`, e seguem a regra dos dois idiomas na mesma alteração:

- `whatsappMessage` — botão da secção de contacto, convida a descrever o projeto;
- `whatsappMessageFloating` — atalho flutuante, mensagem curta de entrada.

Manter os textos curtos e sem emojis. O `aria-label` dos links continua a ser `WhatsApp <telefone>` e nunca inclui a mensagem, porque os testes selecionam por esse nome acessível. Os testes fazem match por prefixo (`a[href^="https://wa.me/351910508706"]`) e verificam o `?text=` esperado nos dois idiomas.

A informação legal é apresentada no rodapé por um elemento HTML `details`, fechado por defeito e sem dependência de JavaScript. O email legal só é renderizado quando `brand.email` contém um valor real; nunca publicar o label vazio ou um placeholder.

## 5. Sistema visual

`DESIGN.md` é a especificação normativa. `app/globals.css` é a implementação base e `.impeccable/design.json` preserva extensões legíveis por ferramentas.

Tokens CSS ativos:

```css
--background: #111210;
--surface: #1b1d1a;
--surface-light: #242722;
--text-primary: #f5f1e8;
--text-secondary: #a6aaa4;
--accent: #ff5c00;
--accent-hover: #ff7330;
--border: #30332f;
--light-background: #eee9df;
--light-text: #171916;
--light-muted: #63675f;
--light-border: #c9c3b8;
--field-placeholder: #858a82;
```

Os tokens são mapeados para Tailwind por `@theme inline`. Novas cores reutilizadas devem nascer como token. Valores únicos só são aceitáveis para estados específicos, por exemplo erros e overlays de fotografia.

O contentor canónico está em `components/ui/Container.tsx`: largura máxima de 1440px e padding lateral responsivo de 20px, 32px e 48px.

## 6. Componentes e fronteiras

### Server components por defeito

Secções de conteúdo, footer e primitives sem estado permanecem server components. Não adicionar `"use client"` sem uma necessidade real de browser, estado, efeito ou evento.

### Client components atuais

- `Header`: estado de scroll e abertura do menu.
- `MobileMenu`: focus trap, Escape e bloqueio de scroll.
- `Reveal`: IntersectionObserver e progressive enhancement.
- `QuoteForm`: validação, envio, estados e foco pós-sucesso.
- `GoogleAnalytics`: consentimento e carregamento condicionado.
- `TrackedLink`: eventos de analítica.
- `CookiePreferencesButton`: reabertura das preferências.
- `LocalePreference`: persistência do idioma.
- `ScreenConfigurator`: desenho e pedido dos quadros.
- `DtfCalculator`: encaixe no filme, seleção de desenhos e pedido de DTF.
- Raiz `app/(root)/page.tsx`: escolha de idioma e encaminhamento.

### Primitives

- `Button`: variantes `primary`, `secondary` e `dark`.
- `Container`: largura e gutters.
- `FormField`: label, input, select, textarea e erro.
- `Reveal`: entrada progressiva com fallback visível.
- `SectionHeading`: hierarquia e grelha canónica.

Reutilize primitives antes de duplicar classes. Uma nova variante recorrente deve ser adicionada ao primitive e documentada em `DESIGN.md`.

## 7. Fluxo do formulário

O formulário de orçamento é enviado para `brand.quoteEndpoint` por `fetch` com `FormData` e `Accept: application/json`.

Validação atual:

- nome obrigatório;
- email com formato básico válido;
- telefone obrigatório;
- serviço obrigatório;
- quantidade obrigatória;
- data obrigatória e não anterior ao dia local;
- mensagem com pelo menos 15 caracteres;
- consentimento de privacidade obrigatório.

Comportamento:

1. Valida no cliente sem navegação.
2. Move o foco para o primeiro campo inválido.
3. Mostra erros com `role="alert"`, `aria-invalid` e `aria-describedby`.
4. Usa campo honeypot `_gotcha`.
5. Mostra estado busy durante envio.
6. No sucesso, limpa o formulário, foca o painel `role="status"` e mede `generate_lead`.
7. No erro de rede, preserva o formulário e mostra alerta.

Nunca enviar nome, email, telefone, mensagem ou outros dados pessoais para analítica.

## 8. Analítica e privacidade

O Google Analytics só é carregado depois de consentimento `granted`.

- Measurement ID: definido em `config/analytics.ts`.
- Persistência: `localStorage`, chave `serifil_analytics_consent`.
- Consent Mode: `analytics_storage` pode ser granted ou denied; todas as opções de publicidade ficam denied.
- Preferências: o footer dispara o evento interno `serifil:open-analytics-preferences`.

Eventos permitidos:

- `click_to_call`
- `generate_lead`
- `language_change`
- `map_click`
- `whatsapp_click`

Todos incluem `page_language`. Parâmetros devem descrever contexto de interação, nunca conteúdo de formulário ou identificadores pessoais.

## 9. SEO e descoberta

Cada locale publica:

- title e description localizados;
- canonical próprio;
- hreflang `pt-PT`, `en` e `x-default`;
- Open Graph e Twitter card;
- robots index/follow;
- JSON-LD `LocalBusiness` com catálogo dos oito serviços de impressão e, no fim, dos quadros de serigrafia e do DTF ao metro (com `url`).

A raiz publica JSON-LD `WebSite`, fica `noindex, follow` e tem Open Graph próprio (`og.jpg`), para que um link partilhado para serifil.com mostre pré-visualização. O `x-default` é sempre a versão portuguesa (`/pt/…`), também na raiz. `app/sitemap.ts` inclui páginas localizadas e assets visuais. `app/robots.ts` permite crawling e aponta para o sitemap.

Regras de metadados verificadas na auditoria de out 2026:

- `title` até 60 caracteres e `description` até 160, terminando com ` | SERIFIL` (marca sempre em maiúsculas).
- As páginas de serviço partilham imagens JPEG 1200×630 em `public/images/servicos/<chave>-og.jpg`, geradas por `scripts/generate-service-share-images.mjs` a partir da fotografia do topo de cada serviço. O WebP não aparece em todas as pré-visualizações (WhatsApp incluído). Mudar a fotografia de um serviço implica voltar a correr o script.
- `public/llms.txt` lista as páginas de serviço, os quadros, o DTF e os guias nas duas línguas; uma página nova entra lá no mesmo trabalho.

Google Search Console (propriedade de domínio `sc-domain:serifil.com`). Em out 2026: 72 cliques e 1,78 mil impressões em 3 meses, a maioria pela marca. Pesquisas com potencial: "estampagem de t-shirts (na hora) guimarães", "impressão em tecido", "fotolito", "tnt significado tecido". Depois de publicar páginas novas: reenviar o sitemap e pedir indexação na inspeção de URL (há uma quota diária de pedidos).

Quando mudar domínio, serviços, contacto ou imagem:

1. atualizar `config/brand.ts`;
2. rever metadata em `data/i18n.ts`;
3. rever sitemap e JSON-LD;
4. atualizar os testes com o novo contrato.

## 10. Acessibilidade

Objetivo: WCAG 2.2 nível AA.

Contratos preservados:

- um único H1;
- HTML semântico e landmarks;
- navegação e formulários nomeados;
- foco visível de 2px;
- alvos de toque de pelo menos 44px, normalmente 48px;
- menu mobile com focus trap, Escape e devolução de foco;
- informação legal consultável por teclado através de disclosure nativo;
- labels persistentes em todos os campos;
- erros programaticamente associados;
- alt text específico na imagem de produção;
- `prefers-reduced-motion`;
- conteúdo visível quando IntersectionObserver não existe;
- ausência de overflow horizontal entre 320px e 1920px.

## 11. Performance e assets

- A imagem do hero usa `next/image`, `priority`, `sizes="100vw"` e formatos AVIF/WebP quando disponíveis.
- As fotografias de trabalhos são normalizadas para WebP 1600×1200px pelo script `optimize-portfolio-images.mjs` e carregadas de forma diferida com `next/image`.
- A exportação estática usa imagens não otimizadas em runtime, adequada ao alojamento sem servidor Next.
- O mapa usa iframe lazy.
- Fontes usam `display: "swap"`.
- Animações limitam-se principalmente a `opacity` e `transform`.
- `overflow-x: clip` é proteção, não substituto para corrigir componentes largos.

Novos assets devem entrar em `public/`, usar `assetPath()` quando renderizados e receber dimensões, formato comprimido e texto alternativo adequados.

## 12. Build e alojamento

Comandos:

```bash
npm run dev
npm run lint
npm run build
npm run start
npm run test:e2e
```

O build descarrega as fontes do Google (`next/font/google`): sem rede, `npm run build` e `npm run test:e2e` falham com "Failed to fetch Inter/Archivo". O `npm run dev` funciona sem rede, com fontes de recurso.

`npm run build` executa `next build` e cria a exportação estática em `out/`. O workflow `.github/workflows/deploy-pages.yml` envia esse diretório para o GitHub Pages e publica-o **apenas quando há push para a branch `main`**.

Nenhuma outra branch é publicada. As branches `agent/*` e restantes servem para trabalho e revisão: commit ou push nelas não altera serifil.com. O processo de publicação e o diagnóstico "fiz commit mas não vejo" estão em `README.md` → "Publicar no site"; as regras para agentes estão em `AGENTS.md`.

Não editar `out/` manualmente. É um artefacto regenerável.

## 13. Testes e critérios de conclusão

`tests/site.spec.ts` cobre:

- estrutura, imagem e âncoras;
- overflow em seis viewports;
- menu mobile e teclado;
- consentimento, revogação e eventos;
- validação e sucesso do formulário;
- ausência de dados pessoais na analítica;
- contactos e mapa;
- metadata, robots, sitemap e JSON-LD;
- conteúdo PT/EN e troca de idioma;
- ferramenta de quadros (sem preços) e calculadora de DTF (preços, mínimo, escalão dos 10 m, folhas de um metro, seleção, sem os 7 € de custo e sem referir o parceiro);
- guias PT/EN (fotolitos e DTF) e ligações entre serviços, guias, quadros e DTF;
- encaminhamento da raiz: robôs para `/pt/`, visitantes para o seu idioma.

Os testes correm sobre a build estática (`npm run serve:test`, porta 3100). Para testar contra `npm run dev`, usar `http://localhost:<porta>` e não `127.0.0.1`: o Next bloqueia recursos de desenvolvimento noutras origens e a página não hidrata.

`tests/visual.spec.ts` gera:

- `test-results/serifil-desktop-complete.png` a 1440×900;
- `test-results/serifil-mobile-complete.png` a 375×812.

Antes de considerar uma alteração concluída:

```bash
npm run lint
npm run build
npm run test:e2e
```

Rever também ambas as capturas completas quando a mudança toca layout, tipografia, cor, imagem ou conteúdo.

## 14. Checklist de preservação

### Alteração visual

- Confirmar compatibilidade com `PRODUCT.md`.
- Atualizar tokens em `app/globals.css`.
- Atualizar `DESIGN.md` e `.impeccable/design.json`.
- Testar 320, 375, 768, 1024, 1440 e 1920px.
- Validar foco, contraste e reduced motion.
- Comparar capturas completas.

### Alteração de conteúdo

- Atualizar PT e EN.
- Rever serviços do formulário, JSON-LD e metadata.
- Não inventar factos comerciais.
- Confirmar que labels e mensagens acessíveis continuam claras.

### Alteração técnica

- Preservar exportação estática, salvo decisão explícita.
- Evitar client components desnecessários.
- Atualizar ou adicionar testes para o novo contrato.
- Atualizar este documento no mesmo commit.

### Publicação

- Uma alteração só está publicada quando o commit está em `origin/main`; estar noutra branch, mesmo no GitHub, não chega.
- Confirmar que o run "Deploy to GitHub Pages" desse commit terminou com sucesso.
- Verificar a URL ao vivo (estado 200 e conteúdo novo) antes de comunicar que está publicado.
