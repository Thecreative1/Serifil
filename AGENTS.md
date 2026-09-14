# Instruções para agentes: SERIFIL

Antes de alterar o site, ler `README.md`, `PRODUCT.md`, `DESIGN.md` e `TECHNICAL.md`.

## Publicação: só `main` vai para o ar

- serifil.com é publicado pelo GitHub Pages **apenas** a partir de push para `main` (`.github/workflows/deploy-pages.yml`).
- Trabalhar numa branch `agent/<tema>`. Commit ou push nessa branch **não publica**.
- Ao terminar trabalho numa branch, dizer explicitamente ao utilizador: "Está na branch `<nome>` e **não está publicado**. Para aparecer em serifil.com é preciso levar para a `main`." Não usar formulações como "está pronto" ou "já está feito" que possam ser lidas como publicado.
- Publicar só com aprovação explícita do utilizador para essa alteração. Com aprovação:
  1. `npm run lint` e `npm run test:e2e` a passar.
  2. `git switch main`, `git merge --ff-only <branch>`, `git push origin main`.
  3. Acompanhar o deploy até terminar: `gh run list --branch main --limit 1` e `gh run watch <id> --exit-status`.
  4. Verificar ao vivo cada rota alterada (estado 200 e conteúdo novo), por exemplo com `curl -s -o /dev/null -w "%{http_code}" "https://serifil.com/<rota>/?v=$RANDOM"`.
  5. Só então comunicar que está publicado, com as URLs verificadas.
- Se o utilizador disser "fiz commit mas não vejo": verificar `git branch --show-current`, `git log --oneline -1 origin/main` e `gh run list --limit 3`, e explicar em que branch ficou o commit antes de propor o passo seguinte.

## Conteúdo e estrutura

- Paridade PT/EN: qualquer página nova em português tem versão inglesa no mesmo trabalho, com o mesmo padrão de rotas (`/pt/servicos/` ↔ `/en/servicos/`, `/pt/guias/` ↔ `/en/guias/`), hreflang recíproco e o mesmo item nos menus das duas línguas.
- Menus: `data/i18n.ts` → `header.nav` tem os mesmos itens, pela mesma ordem, em PT e EN. Páginas internas passam `activeHref` ao `Header`.
- Nunca inventar preços, prazos, condições, contactos, certificações ou capacidades.
- Posicionamento: parceiro de serigrafia e impressão industrial, que imprime sobre material do cliente e também fornece e personaliza suportes (fornecimento condicional). Nunca apresentar a SERIFIL só como fabricante de sacos.
