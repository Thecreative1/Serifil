# SERIFIL

Site institucional bilingue (PT/EN) da SERIFIL, empresa de serigrafia e impressão industrial em Guimarães, publicado em https://serifil.com/. O objetivo principal é explicar capacidades de produção e transformar visitas em pedidos de orçamento qualificados.

O site tem:

- **Página inicial** (`/pt/`, `/en/`) com serviços, trabalhos, processo, setores, formulário de orçamento e contactos.
- **Quatro páginas de serviço**: serigrafia em PVC, em tecido, sacos em TNT e componentes para calçado (`/pt/servicos/…`).
- **Quadros de serigrafia** (`/pt/quadros/`): ferramenta para desenhar o quadro e pedir orçamento, sem preços.
- **DTF ao metro** (`/pt/dtf/`): calculadora que arruma os desenhos no filme e mostra o preço.
- **Guias** (`/pt/guias/`): fotolitos e DTF.

## Documentação de preservação

- [PRODUCT.md](PRODUCT.md): propósito, público, personalidade, anti-referências e princípios estratégicos.
- [DESIGN.md](DESIGN.md): fonte normativa da identidade visual, tokens, tipografia, composição e componentes.
- [TECHNICAL.md](TECHNICAL.md): arquitetura, dados, integrações, SEO, acessibilidade, testes, build e regras de manutenção.
- [.impeccable/design.json](.impeccable/design.json): extensão legível por ferramentas com movimento, elevação, breakpoints e exemplos de componentes.
- [AGENTS.md](AGENTS.md): regras para agentes de IA (Claude, Codex), incluindo como e quando publicar.

Leia os três documentos Markdown antes de alterar a interface. Uma mudança visual intencional deve atualizar `DESIGN.md` e `.impeccable/design.json` no mesmo commit. Uma mudança de arquitetura, integração ou fluxo deve atualizar `TECHNICAL.md`.

## Desenvolvimento

Requisitos: Node.js compatível com Next.js 16 e npm.

```bash
npm install
npm run dev
```

O servidor local fica disponível em `http://localhost:3000`. As páginas principais são:

- `http://localhost:3000/pt/` e `http://localhost:3000/en/`
- `http://localhost:3000/pt/quadros/` e `http://localhost:3000/pt/dtf/`
- `http://localhost:3000/pt/guias/`

## Verificação

```bash
npm run lint
npm run build
npm run test:e2e
```

O build produz exportação estática em `out/` e prepara o artefacto de alojamento em `dist/`. O build e os testes precisam de rede, porque descarregam as fontes do Google.

## Publicar no site

O site https://serifil.com/ é publicado **apenas a partir da branch `main`**. O workflow `.github/workflows/deploy-pages.yml` corre a cada push para `main` e demora cerca de 1 minuto.

| Situação | Aparece em serifil.com? |
| --- | --- |
| Alterações só no computador, sem commit | Não |
| Commit numa branch que não é `main` (ex.: `agent/menus-guias-en`) | Não |
| Push dessa branch para o GitHub | **Não**: fica apenas guardado no GitHub |
| Push para `main` | Sim, quando o deploy terminar |

As branches `agent/*` são rascunhos para pré-visualizar e rever. Fazer commit ou push nelas **não publica nada**.

### Passos para publicar

1. Confirmar que a verificação passa: `npm run lint` e `npm run test:e2e`.
2. Levar a branch para `main` e enviar para o GitHub:

   ```bash
   git switch main
   git merge --ff-only nome-da-branch
   git push origin main
   ```

   Se `git merge --ff-only` falhar, a `main` recebeu outras alterações entretanto. Atualizar a `main` com `git pull`, integrar essas alterações na branch, voltar a testar e repetir.
3. Confirmar o deploy em GitHub → **Actions** → "Deploy to GitHub Pages" (tem de ficar verde), ou com `gh run list --limit 1`.
4. Abrir a página em https://serifil.com/ e recarregar com **Ctrl+F5** para evitar a cache do browser.

### "Fiz commit mas não vejo nada no site"

1. `git branch --show-current`: se não disser `main`, o commit ficou numa branch e não foi publicado.
2. `git log --oneline -1 origin/main`: o commit tem de aparecer aqui.
3. `gh run list --limit 3`: tem de existir um deploy recente com `success`.
4. Se tudo isto estiver certo, recarregar a página com Ctrl+F5.

## Fontes de verdade

| Tema | Ficheiro |
| --- | --- |
| Estratégia e personalidade | `PRODUCT.md` |
| Design e look | `DESIGN.md` |
| Cores e estilos globais | `app/globals.css` |
| Componentes reutilizáveis | `components/ui/` |
| Estrutura da página | `app/[locale]/page.tsx` |
| Conteúdo PT e EN da página inicial | `data/i18n.ts` |
| Páginas de serviço | `data/service-pages.ts` |
| Guias | `data/guides.ts` |
| Quadros de serigrafia | `data/screens.ts`, `components/screens/ScreenConfigurator.tsx` |
| DTF ao metro (preços, encaixe, textos) | `data/dtf.ts`, `components/dtf/DtfCalculator.tsx` |
| Sitemap e robots | `app/sitemap.ts`, `app/robots.ts` |
| Resumo do site para assistentes de IA | `public/llms.txt` |
| Contactos, localização e endpoint do formulário | `config/brand.ts` |
| Analítica e consentimento | `config/analytics.ts`, `lib/analytics.ts` |
| Contratos de comportamento | `tests/site.spec.ts` |
| Capturas de regressão | `tests/visual.spec.ts` |

## Pendentes (out 2026)

- **Search Console:** pedir indexação de `/pt/guias/o-que-e-dtf/`, `/pt/servicos/serigrafia-tecido/`, `/pt/`, `/en/dtf/`, `/en/guias/what-is-dtf/`, `/pt/servicos/estampagem-t-shirts/` e `/pt/guias/o-que-e-serigrafia/` (a quota diária esgotou a 19 out). O sitemap foi reenviado a 19 out.
- **DTF:** confirmar com o parceiro a largura útil do rolo (58 cm no site) e o espaço entre desenhos (1 cm); definir o preço da aplicação (hoje "sob orçamento"). Fotografia da prensagem já na página e no guia (out 2026); a folha de transfer da mesma montagem tem a gralha "SIRIFIL" e ficou de fora.
- **T-shirts:** a página usa t-shirts dobradas e uma camisola com o logótipo SERIFIL (fotografias retocadas com IA, out 2026); faltam fotografias de trabalhos de clientes.
- **Guia da serigrafia:** confirmar a tabela de tintas (plastisol, base aquosa, para plásticos, cura UV).
- **Páginas seguintes** (pesquisa de sugestões do Google): sacos personalizados com logótipo, fardas e roupa de trabalho, guia comparativo DTF/serigrafia/sublimação/vinil. Serigrafia sempre em primeiro lugar.
- **Fora do código:** perfil Google Business e horário de funcionamento (`brand.openingHours`).

## Regra de segurança

Nunca inventar contactos, números comerciais, certificações, capacidades, prazos ou garantias. Os quadros e o filme DTF são feitos por parceiros: ver as regras de cada um em `AGENTS.md`. Alterações ao conteúdo devem manter paridade entre português e inglês, metadados localizados e dados estruturados.
