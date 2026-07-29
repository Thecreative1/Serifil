# SERIFIL

Site institucional bilingue da SERIFIL, empresa de serigrafia e personalização em Guimarães. O objetivo principal é explicar capacidades de produção e transformar visitas em pedidos de orçamento qualificados.

## Documentação de preservação

- [PRODUCT.md](PRODUCT.md): propósito, público, personalidade, anti-referências e princípios estratégicos.
- [DESIGN.md](DESIGN.md): fonte normativa da identidade visual, tokens, tipografia, composição e componentes.
- [TECHNICAL.md](TECHNICAL.md): arquitetura, dados, integrações, SEO, acessibilidade, testes, build e regras de manutenção.
- [.impeccable/design.json](.impeccable/design.json): extensão legível por ferramentas com movimento, elevação, breakpoints e exemplos de componentes.

Leia os três documentos Markdown antes de alterar a interface. Uma mudança visual intencional deve atualizar `DESIGN.md` e `.impeccable/design.json` no mesmo commit. Uma mudança de arquitetura, integração ou fluxo deve atualizar `TECHNICAL.md`.

## Desenvolvimento

Requisitos: Node.js compatível com Next.js 16 e npm.

```bash
npm install
npm run dev
```

O servidor local fica disponível em `http://localhost:3000`. As páginas principais são:

- `http://localhost:3000/pt/`
- `http://localhost:3000/en/`

## Verificação

```bash
npm run lint
npm run build
npm run test:e2e
```

O build produz exportação estática em `out/` e prepara o artefacto de alojamento em `dist/`.

## Fontes de verdade

| Tema | Ficheiro |
| --- | --- |
| Estratégia e personalidade | `PRODUCT.md` |
| Design e look | `DESIGN.md` |
| Cores e estilos globais | `app/globals.css` |
| Componentes reutilizáveis | `components/ui/` |
| Estrutura da página | `app/[locale]/page.tsx` |
| Conteúdo PT e EN | `data/i18n.ts` |
| Contactos, localização e endpoint do formulário | `config/brand.ts` |
| Analítica e consentimento | `config/analytics.ts`, `lib/analytics.ts` |
| Contratos de comportamento | `tests/site.spec.ts` |
| Capturas de regressão | `tests/visual.spec.ts` |

## Regra de segurança

Nunca inventar contactos, números comerciais, certificações, capacidades, prazos ou garantias. Alterações ao conteúdo devem manter paridade entre português e inglês, metadados localizados e dados estruturados.
