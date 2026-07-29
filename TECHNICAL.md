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
  layout/                header, menu mobile e footer
  sections/              secções da landing page
  ui/                    primitives reutilizáveis
config/
  analytics.ts           ID, chave de consentimento e evento interno
  brand.ts               contactos, localização, URL e Formspree
  paths.ts               caminhos de assets e rotas localizadas
data/
  i18n.ts                fonte ativa de todo o conteúdo PT e EN
lib/
  analytics.ts           consent mode e eventos sem dados pessoais
public/
  images/                imagem real do hero
scripts/
  prepare-sites-build.mjs preparação de dist/client e dist/server
tests/
  site.spec.ts           contratos funcionais e de conteúdo
  visual.spec.ts         capturas completas desktop e mobile
```

Os ficheiros `data/services.ts`, `data/portfolio.ts`, `data/benefits.ts` e `data/process.ts` não são importados pela aplicação atual. São cópias antigas em português e podem divergir. Até serem removidos ou religados explicitamente, `data/i18n.ts` é a única fonte de verdade de conteúdo apresentado.

## 3. Rotas e renderização

### `/`

`app/(root)/page.tsx` escolhe idioma no cliente por esta ordem:

1. `localStorage` com chave `serifil_locale`.
2. Cookie `serifil_locale`.
3. Preferências do navegador.
4. Português quando algum idioma começa por `pt`; inglês nos restantes casos.

No artefacto de alojamento, `scripts/prepare-sites-build.mjs` cria um worker que trata `/` antes dos assets. A ordem é cookie, país Cloudflare de língua portuguesa e inglês como fallback. O redirect é 307 e preserva a query string.

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
- localização e morada;
- telefone, WhatsApp, email, Instagram e horário;
- website canónico;
- endpoint Formspree;
- coordenadas e URLs Google Maps.

Valores vazios escondem contactos opcionais. Nunca espalhar estes valores por componentes. O telefone e WhatsApp aparecem em testes como contrato explícito e precisam de atualização simultânea.

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
--accent: #e85b2a;
--accent-hover: #ff6b35;
--border: #30332f;
--light-background: #eee9df;
--light-text: #171916;
--light-muted: #63675f;
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
- JSON-LD `LocalBusiness` com catálogo de seis serviços.

A raiz publica JSON-LD `WebSite`. `app/sitemap.ts` inclui páginas localizadas e assets visuais. `app/robots.ts` permite crawling e aponta para o sitemap.

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

`npm run build` executa:

1. `next build`, criando `out/`;
2. `scripts/prepare-sites-build.mjs`;
3. cópia de `out/` para `dist/client/`;
4. criação de `dist/server/index.js` com redirect localizado e fallback 404.

Não editar `out/` ou `dist/` manualmente. São artefactos regeneráveis.

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
- conteúdo PT/EN e troca de idioma.

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
