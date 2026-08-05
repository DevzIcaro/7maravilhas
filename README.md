# Correia Odontologia — Site (Reconstrução)

Reconstrução do site institucional da **Correia Odontologia**, uma rede de clínicas odontológicas com unidades em Santa Fé do Sul, Jales, São José do Rio Preto, Votuporanga (SP) e Três Lagoas (MS).

O objetivo é entregar um site tecnicamente superior (responsividade, performance, SEO e acessibilidade) **mantendo fielmente** a arquitetura, o conteúdo e as cores do site atual. Toda a fonte de verdade de conteúdo está em `PROMPT-DEV-Correia-Odontologia.md`, e as regras de execução para IA/dev estão em `AGENTS.md`. Estes dois arquivos têm precedência sobre qualquer suposição.

**Status:** as 7 rotas estão implementadas e navegáveis, com conteúdo vindo de coleções, SEO por página e animações. O formulário de `/fale-conosco` já está integrado de ponta a ponta (seleção de unidade, data desejada, reCAPTCHA e envio via WhatsApp da unidade escolhida). O modal global "Agende sua consulta" (`BookingModal.tsx`) ainda é placeholder — só fecha e limpa o formulário, sem enviar a lugar nenhum. Faltam principalmente: assets reais restantes (retratos da equipe sem foto, imagem de apoio de Serviços), integrar o `BookingModal` no mesmo padrão do Fale Conosco, e trocar a site key de teste do reCAPTCHA pela real. Ver [Estado atual](#estado-atual), [PENDENCIAS.md](./PENDENCIAS.md) (lista viva, atualizada a cada sessão) e [Pendências](#pendências) abaixo.

---

## Sumário

- [Stack](#stack)
- [Estado atual](#estado-atual)
- [Arquitetura](#arquitetura)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Rotas](#rotas)
- [Coleções de conteúdo](#coleções-de-conteúdo)
- [Imagens e assets (regra crítica)](#imagens-e-assets-regra-crítica)
- [Vídeo do hero](#vídeo-do-hero)
- [Favicon](#favicon)
- [SEO (generalizado por região)](#seo-generalizado-por-região)
- [Design system (UI UX Pro Max)](#design-system-ui-ux-pro-max)
- [Animações](#animações)
- [Acessibilidade e performance](#acessibilidade-e-performance)
- [Ambiente local](#ambiente-local)
- [Deploy](#deploy)
- [Checklist de fidelidade](#checklist-de-fidelidade)
- [Pendências](#pendências)
- [Créditos](#créditos)

---

## Stack

| Camada | Tecnologia | Versão em uso |
|---|---|---|
| Framework | Astro (MPA, HTML estático) | 7.x |
| UI | React (ilhas via `client:load` / `client:visible`) | 19.x |
| Linguagem | TypeScript | — |
| Estilo | Tailwind CSS (via `@tailwindcss/vite`, sem `tailwind.config`) | 4.x |
| Componentes | shadcn/ui (`button`, `carousel`) + Radix (`react-dialog`) | — |
| Animação | anime.js (scroll reveal, filtros, scroll suave) + Framer Motion (Navbar) | animejs 4.x / framer-motion 12.x |
| Carrossel | embla-carousel-react (base do `ui/carousel`) | 8.x |
| Ícones | lucide-react / react-icons (SVG, nunca emoji) | — |
| Sitemap | `@astrojs/sitemap` | 3.x |
| Gerenciador de pacotes | pnpm (Node >= 22.12) | — |

> A escolha do Astro preserva o paradigma **multi-página** do site atual, gera HTML estático (bom para SEO e performance) e permite interatividade pontual via ilhas React.

---

## Estado atual

### Implementado

- **7 rotas** funcionando, todas usando `Layout.astro` com `title`/`description`/`canonical` próprios.
- **Coleções de conteúdo** (`astro:content` + loader `file()`) alimentando todas as páginas: unidades, equipe, serviços, posts e depoimentos — nada de texto fixo espalhado em componentes.
- **Navbar única** (`Navbar.tsx`, React + Framer Motion) substituindo `TopBar` + `Header`: logo, links, dropdown de unidades, menu mobile em tela cheia com scroll interno, trava de scroll do body, fechamento por `Escape` e clique fora.
- **Menu de unidades com scroll animado** (`src/lib/scrollTo.ts`): leva à âncora `#unidade-<id>` da home com scroll suave via anime.js e um pulso de destaque na chegada. Funciona cross-page — fora da home, guarda o alvo em `sessionStorage` e a home completa o scroll no load.
- **Hero em vídeo** (`HeroVideo.astro`): exibição pura, sem controles, sem áudio, sem interação; troca de fonte 720p/1080p por JS, poster como fallback, pausa fora da viewport, e não baixa o vídeo em `prefers-reduced-motion` ou conexão econômica.
- **Modal de agendamento global** (`BookingModal.tsx`, Radix Dialog): abre por qualquer elemento com `data-booking-trigger`, campos Nome / Telefone / E-mail / Mensagem + checkbox "Não sou um robô" bloqueando o envio.
- **Carrossel de depoimentos** (`DepoimentosCarousel.tsx`, embla, `client:visible`) com autoplay, setas e paginação.
- **Carrossel de fotos das unidades** (`SobreNosCarousel.tsx`, Sobre Nós, embla, `client:visible`): só autoplay (4s), um card por vez, sem setas nem paginação — pausa no hover/foco e respeita `prefers-reduced-motion`.
- **Cards de unidade na home** (`index.astro`): foto real da fachada + iframe do Google Maps lado a lado, botões de WhatsApp/Como chegar/Instagram com as cores oficiais de cada marca.
- **Formulário "Fale Conosco" completo** (`fale-conosco.astro`): campos de Unidade (populado da coleção `unidades`), Nome, Telefone, E-mail e Data desejada (tipados/com `autocomplete` e `inputmode` corretos), reCAPTCHA v2 real (site key de teste — trocar antes de publicar, ver Pendências), rate limit de 5 envios/dia por navegador (`localStorage`, soft-limit no cliente) e envio via WhatsApp da unidade escolhida com os dados pré-preenchidos. Cards de contato (telefone com botão de copiar, WhatsApp, endereço, e-mail, Facebook, Instagram) como botões de redirecionamento, cada ícone com a cor da própria marca.
- **Filtros animados**: equipe por cidade e serviços por categoria, com troca em cascata (`animateFilterSwap`) em vez de `display:none` seco, `aria-pressed` nos botões e estado vazio anunciado por `role="status"`.
- **Reveal on scroll** com stagger nos grids marcados com `data-reveal` (inclui os cards de "Diferenciais" em Sobre Nós, cada um com ícone lucide-react), respeitando `prefers-reduced-motion` (e com fallback `<noscript>`).
- **Rodapé reorganizado** (`Footer.astro`): NAP das 5 unidades (bom para SEO local) + navegação; horários e mapa vivem na seção de unidades da home.
- **SEO**: canonical, Open Graph, Twitter Card, JSON-LD (`Organization` + um `Dentist` por unidade com endereço, telefone e geo), `sitemap.xml` gerado, `robots.txt` e `site.webmanifest`.
- **Imagens** via `astro:assets` (`<Image>`/`getImage` com `widths`/`sizes`/`loading`/`decoding`), com `PlaceholderImage.astro` cobrindo o que ainda não tem foto real.
- **Design tokens** da paleta v4 em `src/styles/global.css`, expostos ao Tailwind v4 por `@theme` (`bg-primaria`, `text-secundaria`, etc.) e ao CSS puro por `:root`, com CSS `@layer base`/`@layer components` (evita que regras soltas sobreponham as classes utilitárias do Tailwind).

### Assets reais já no projeto

- Logo (`logo.svg`), foto da recepção (`correia1.png`) e o conjunto completo de favicons.
- **6 retratos de profissionais** (`src/lib/equipeFotos.ts` mapeia foto por `id` da coleção; quem não tem foto cai no placeholder).
- **6 imagens de blog** (`src/lib/postImagens.ts`, mesmo padrão de mapeamento por `id`), uma delas (`consulta.jpg`) reaproveitada também no hero de `/servicos`.
- **5 fotos de fachada das unidades** (`src/lib/unidadeFotos.ts`, arquivos `odontocorreia <cidade>.png`): usadas nos cards de unidade da home (ao lado do mapa) e no carrossel de Sobre Nós.
- Vídeo institucional em `public/media/` (1080p, 720p e poster).

### Ainda com placeholder

Ambientes internos da clínica (fotos de sala/recepção além da já usada em `correia1.png`) e retratos dos profissionais sem foto (hoje 6 de 24 nomes têm retrato).

---

## Arquitetura

O site atual é uma **aplicação multi-página (MPA)** servida por um CMS proprietário (SGC Lemon / Mundo Lemon). A reconstrução **mantém o mesmo paradigma MPA orientado a conteúdo**, trocando o CMS por uma stack estática moderna com o conteúdo em coleções versionadas.

Layout compartilhado por todas as rotas (`src/layouts/Layout.astro`):

```
Navbar         -> logo + HOME / SOBRE / SERVIÇOS / EQUIPE / BLOG + dropdown de unidades  (React, client:load)
[conteúdo da rota]
CTA "Agende uma consulta"  -> dispara o BookingModal
Footer         -> navegação, NAP das 5 unidades, redes, créditos
BookingModal   -> "Agende sua consulta" (global, sem jQuery)                              (React, client:load)
```

Princípios: uma página por rota; sem jQuery (interações em React/JS nativo); imagens otimizadas pelo Astro; SEO técnico por página.

> `TopBar.astro`, `Header.astro` e `Footer.tsx` continuam no repositório mas **não são mais usados** — foram substituídos por `Navbar.tsx` e `Footer.astro`. Remoção pendente.

---

## Estrutura de pastas

Estrutura real do projeto:

```
odonto-repo/
├── public/                          # servido como está (favicons, manifest, robots, vídeo)
│   ├── favicon.* / apple-touch-icon.png / web-app-manifest-*.png / maskable-512x512.png
│   ├── site.webmanifest
│   ├── robots.txt
│   └── media/                       # apresentacao.mp4, apresentacao-720.mp4, apresentacao-poster.jpg
├── src/
│   ├── assets/                      # imagens importadas (logo, favicons, equipe, blog, recepção)
│   ├── components/
│   │   ├── Navbar.tsx               # navegação (React + Framer Motion)
│   │   ├── BookingModal.tsx         # modal de agendamento (Radix Dialog) — ainda placeholder, ver Pendências
│   │   ├── DepoimentosCarousel.tsx  # carrossel de depoimentos (embla, com setas/paginação)
│   │   ├── SobreNosCarousel.tsx     # carrossel de fotos das unidades (embla, só autoplay)
│   │   ├── CTAAgende.astro
│   │   ├── Footer.astro
│   │   ├── HeroVideo.astro
│   │   ├── PlaceholderImage.astro
│   │   ├── TopBar.astro / Header.astro / Footer.tsx   # legado, não usados
│   │   ├── icons/                   # FacebookIcon, InstagramIcon (SVG inline)
│   │   └── ui/                      # shadcn/ui: button, carousel
│   ├── content.config.ts            # schemas Zod das 5 coleções
│   ├── data/                        # dados das coleções em JSON
│   │   ├── unidades.json  equipe.json  servicos.json  posts.json  depoimentos.json
│   ├── layouts/
│   │   └── Layout.astro             # <head>, SEO, JSON-LD, favicons, Navbar/Footer/CTA/Modal
│   ├── lib/
│   │   ├── animations.ts            # revealOnScroll, animateFilterSwap (anime.js)
│   │   ├── scrollTo.ts              # scroll animado até a unidade (cross-page)
│   │   ├── unidadeLinks.ts          # linkTelefone/linkWhatsapp/linkMaps/mapaEmbedSrc
│   │   ├── equipeFotos.ts           # id do profissional -> foto
│   │   ├── postImagens.ts           # id do post -> imagem
│   │   ├── unidadeFotos.ts          # id da unidade -> foto de fachada
│   │   └── utils.ts                 # cn()
│   ├── pages/
│   │   ├── index.astro  sobre-nos.astro  servicos.astro  equipe.astro  fale-conosco.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── ver/[id]/[slug].astro
│   └── styles/
│       └── global.css               # tokens da paleta (@layer base/components) + .btn, .card, .field
├── astro.config.mjs
├── package.json
├── README.md
├── AGENTS.md
├── STYLEGUIDE.md
├── PENDENCIAS.md                    # lista viva de pendências, atualizada a cada sessão
└── PROMPT-DEV-Correia-Odontologia.md
```

---

## Rotas

| Rota | Página | Observações |
|---|---|---|
| `/` | Home | hero em vídeo, destaques, sobre, equipe (6), depoimentos (carrossel), unidades (foto + mapa + botões, âncoras), blog |
| `/sobre-nos` | Sobre Nós | carrossel de fotos das unidades (autoplay) + texto institucional + cards de Diferenciais com ícone |
| `/servicos` | Serviços | 12 serviços com subitens e filtro por categoria |
| `/equipe` | Nossa Equipe | 28 entradas com filtro por cidade |
| `/fale-conosco` | Fale Conosco | cards de contato (ícone = ação: ligar/copiar, WhatsApp, mapa, e-mail, redes) + formulário (Unidade, Nome, Telefone, E-mail, Data desejada, Mensagem, reCAPTCHA) que envia pelo WhatsApp da unidade escolhida |
| `/blog` | Blog (listagem) | 6 posts |
| `/blog/ver/{id}/{slug}` | Post do blog | gerado via `getStaticPaths()` a partir da coleção `posts` |

Conteúdo literal de cada rota: ver `PROMPT-DEV-Correia-Odontologia.md`, Seção 8.

---

## Coleções de conteúdo

Conteúdo modelado com **Astro Content Collections** usando o loader `file()` sobre JSON em `src/data/`, com schema Zod em `src/content.config.ts`:

| Coleção | Itens | Campos principais |
|---|---|---|
| `unidades` | 5 | id, cidade, uf, ordem, endereço, telefone, whatsapp, horários, descrição, facebook, instagram, mapaEmbed, coordenadas |
| `equipe` | 28 | id, nome, especialidade, cro, cidade |
| `servicos` | 12 | id, título, descrição, categoria, subitens[] |
| `posts` | 6 | id, número, slug, título, data, resumo, imagem, autor, corpo[] (blocos `p` / `ul`) |
| `depoimentos` | 10 | id, autor, papel, texto |

Notas:

- A coleção `equipe` tem **uma entrada por profissional × unidade** (24 nomes distintos em 28 entradas), porque o mesmo profissional atende em mais de uma cidade — daí o `id` no formato `nome--cidade`. Distribuição: Jales 7, Rio Preto 6, Votuporanga 6, Santa Fé do Sul 5, Três Lagoas 4.
- O corpo dos posts é estruturado em blocos (`p` / `ul`) em vez de HTML solto, para render seguro e consistente.

Os dados exatos estão no prompt. Nada deve ser adicionado, removido ou reescrito.

---

## Imagens e assets (regra crítica)

**Todas as imagens devem ser importadas como assets** (`import img from "../assets/..."` ou `...?url`) e nunca referenciadas por caminho absoluto de `public/` escrito à mão.

Motivo: em builds com `base` ou em subpasta, caminhos como `/img.png` apontam para a raiz do domínio e quebram no deploy (erro de favicon 404 já vivido no `projeto-arthur`). Importar faz o Astro resolver a URL correta e garante que o arquivo entre no build.

Padrão adotado para conjuntos de imagens: um mapa `id -> ImageMetadata` em `src/lib/` (`equipeFotos.ts`, `postImagens.ts`). Quem não tem entrada no mapa cai automaticamente em `PlaceholderImage.astro`, sem quebrar layout.

Exceções conscientes em `public/`: favicons/manifest (exigidos em caminho fixo por navegadores) e os arquivos de vídeo (servidos direto, com range requests).

- Baixar os assets reais do site atual (fachadas, ambientes, demais retratos) e colocá-los em `src/assets/`.
- Não gerar imagens novas nem inventar fotos. Onde faltar, usar `PlaceholderImage` e marcar `[A CONFIRMAR]`.

---

## Vídeo do hero

O arquivo original fica em `src/assets/`. As versões otimizadas (faixa de áudio removida, `moov` atom no início) ficam em `public/media/` e são servidas diretamente:

- `apresentacao.mp4` (desktop) e `apresentacao-720.mp4` (mobile) — a fonte é escolhida por JS, já que o atributo `media` em `<source>` é ignorado dentro de `<video>`.
- `apresentacao-poster.jpg` — imagem do banner enquanto o vídeo não começa, e substituto permanente em `prefers-reduced-motion` ou conexão econômica (`saveData` / `2g`).
- O vídeo é decorativo: `role="img"` + `aria-label` no contêiner, `aria-hidden` no `<video>`, `pointer-events: none`, controles nativos removidos e nenhum menu de contexto.

---

## Favicon

Usa o favicon/identidade **do próprio site da Correia** — sem marca nova. Os PNG/SVG ficam em `src/assets/` e são importados no `Layout.astro`; o `.ico` e o manifest ficam em `public/` (caminho fixo exigido pelos navegadores), com `?v=2` para furar cache:

```astro
---
import faviconSvg from "../assets/favicon.svg?url";
import favicon32 from "../assets/favicon-32x32.png?url";
---
<link rel="icon" type="image/svg+xml" href={faviconSvg} />
<link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
<link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" sizes="any" />
<link rel="manifest" href="/site.webmanifest?v=2" />
```

Cobertura: `favicon.svg`, 16/32/96px, `apple-touch-icon` 180px, `web-app-manifest` 192/512px, `maskable-512x512.png` e `theme-color`.

---

## SEO (generalizado por região)

Decisão do projeto: **um único site**, sem página dedicada por cidade. O SEO é **generalizado**, cobrindo todas as regiões atendidas dentro do mesmo site.

Implementado no `Layout.astro` (recebe `title`, `description` e `path` de cada página):

- `title` e `meta description` próprios por rota, mencionando a atuação regional (Santa Fé do Sul, Jales, São José do Rio Preto, Votuporanga e Três Lagoas).
- `canonical` construído a partir de `site` + `path`.
- Open Graph e Twitter Card (`summary_large_image`) por página.
- JSON-LD: uma entidade `Organization` (com `sameAs` das redes) e um `Dentist` por unidade, cada um com endereço, telefone, geolocalização e `parentOrganization` apontando para a organização.
- `sitemap.xml` via `@astrojs/sitemap` e `robots.txt` em `public/`.
- Recomendação externa (fora do código): manter um Google Business Profile por unidade.

> Observação profissional: páginas dedicadas por cidade rankeiam melhor em buscas locais. Como a decisão é não fazer site por cidade, seguimos com SEO generalizado; a estrutura de coleções por unidade deixa a porta aberta para gerar páginas locais no futuro sem retrabalho.

---

## Design system (UI UX Pro Max)

O projeto adota a metodologia da skill **UI UX Pro Max** (`nextlevelbuilder/ui-ux-pro-max-skill`), categoria **Dental / Medical Clinic**.

Instalar a skill no ambiente de desenvolvimento:

```bash
# Claude Code (marketplace)
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill

# Ou via CLI (Cursor, Windsurf, Copilot, etc.)
npm install -g ui-ux-pro-max-cli
uipro init --ai cursor
```

Diretrizes adotadas (checklist pré-entrega):

- Ícones em SVG (Lucide). **Nunca** emojis como ícones ou em qualquer lugar.
- `cursor-pointer` em todos os elementos clicáveis.
- Estados de hover com transição suave (token `--transicao: 200ms ease`, dentro da faixa 150–300 ms).
- Contraste de texto mínimo 4.5:1.
- Foco visível global (`:focus-visible` com contorno azul).
- Respeitar `prefers-reduced-motion`.
- Responsivo em 375px, 768px, 1024px e 1440px.

### Tokens (paleta v4 — ver `AGENTS.md`, Seção 2, e `STYLEGUIDE.md` para o histórico das revisões)

Definidos em `src/styles/global.css`, em `@theme` (utilitários Tailwind) e `:root` (CSS puro):

| Token | Cor | Uso |
|---|---|---|
| `primaria` | `#946E17` | dourado profundo — destaque/ícone/texto sobre fundo **claro** |
| `cta` | `#EFBB39` | amarelo dourado vívido — botão sólido principal, sempre com **texto escuro** em cima (`text-texto`), nunca branco |
| `secundaria` | `#2E7695` | azul-oceano — acento, ícones, foco |
| `secundaria-forte` | `#245C74` | azul profundo — texto pequeno, cards escuros |
| `rodape` | `#1C4A5E` | faixas escuras e rodapé |
| `superficie` | `#EDF3F6` | azul-gelo — seções alternadas (`.section-alt`) |
| `texto` | `#2A3B44` | corpo de texto; também o texto sobre o CTA |
| `ouro-claro` | `#E7C871` | título/ícone em card/rodapé escuro |
| `borda` | `#E3E9EC` | bordas e divisórias |
| `branco` | `#FFFFFF` | fundo |

Exceções de marca de terceiros (fora da paleta, só nos ícones/botões de contato): WhatsApp `#25D366`, Google Maps `#EA4335`, Facebook `#1877F2`, gradiente oficial do Instagram.

Classes base disponíveis (dentro de `@layer base`/`@layer components` — nunca soltas, ver nota abaixo): `.btn` (+ `.btn-cta`, `.btn-primaria`, `.btn-outline`, `.btn-secundaria`), `.card`, `.card-dark`, `.field`, `.section-alt`, `.kicker`, `.section-title`, `.section-subtitle`.

> CSS solto (fora de `@layer`) tem prioridade maior que `@layer utilities` do Tailwind e sobrepõe silenciosamente qualquer `text-*`/`bg-*` do HTML — foi a causa de um bug real onde botões com `text-white` renderizavam com a cor errada. Todo CSS novo em `global.css` entra em `@layer base` (resets de elemento) ou `@layer components` (classes como as acima).

---

## Animações

Duas bibliotecas, com papéis separados:

- **anime.js** — animações dirigidas por scroll e por estado de lista, em scripts de página:
  - `revealOnScroll()` (`src/lib/animations.ts`): entrada em cascata dos cards de cada grid `[data-reveal]` via `onScroll` (destaques, equipe, blog na home; Diferenciais em Sobre Nós).
  - `animateFilterSwap()`: troca suave dos cards nos filtros de equipe e serviços.
  - `irParaUnidade()` / `continuarScrollPendente()` (`src/lib/scrollTo.ts`): scroll customizado com duração proporcional à distância e pulso de destaque na chegada.
- **Framer Motion** — transições de UI na `Navbar` (dropdown de unidades e painel mobile, com `AnimatePresence`).
- **embla-carousel-react** (via `ui/carousel.tsx`, shadcn) — base dos dois carrosséis: `DepoimentosCarousel` (com setas/paginação) e `SobreNosCarousel` (só autoplay por `setInterval`, um card por vez, sem controles). Ambos pausam no hover/foco e respeitam `prefers-reduced-motion`.

Todas checam `prefers-reduced-motion` antes de animar. `[data-reveal] > *` começa com `opacity: 0`, e há um `<noscript>` no `Layout` que restaura a opacidade caso o JS não rode.

---

## Acessibilidade e performance

- Mobile-first e responsivo real (não apenas encolhimento).
- Sem preloader em GIF; imagens otimizadas pelo Astro com `widths`/`sizes` e `loading="lazy"` fora da dobra.
- Vídeo com `preload="none"`, pausa fora da viewport e opt-out em conexão econômica.
- `alt` descritivo em todas as imagens; ícones decorativos com `aria-hidden`.
- Breadcrumb com `aria-label`, filtros com `aria-pressed`, estado vazio com `role="status"`.
- Menu mobile com trava de scroll, fechamento por `Escape` e foco visível.
- `prefers-reduced-motion` respeitado em CSS e JS.
- Sem dependência de jQuery.

---

## Ambiente local

Pré-requisitos: Node >= 22.12 e pnpm.

```bash
pnpm install
pnpm dev       # servidor de desenvolvimento
pnpm build     # build de produção -> dist/
pnpm preview   # pré-visualização do build
```

---

## Deploy

`astro.config.mjs` usa `site: 'https://correiaodontologia.com.br'` e `base: '/'` (necessário para canonical, sitemap e JSON-LD corretos).

### Vercel (testes)

- Zero-config para Astro. Conectar o repositório e fazer deploy.
- Como o site roda na raiz do domínio da Vercel, manter `base: '/'`.

### Hostinger (produção / comercial)

- Build local ou em CI: `pnpm build` gera a pasta `dist/`.
- Publicar o conteúdo de `dist/` em `public_html` (hPanel > Gerenciador de Arquivos ou deploy por Git da Hostinger).
- Domínio próprio na raiz: manter `base: '/'`.
- Conferir que os assets importados carregam (a regra de importar imagens evita 404 de caminho).

> Recomendação: manter `base: '/'` nos dois ambientes, já que ambos servem na raiz do domínio (diferente do `projeto-arthur`, que usava subpasta no GitHub Pages).

---

## Checklist de fidelidade

- [x] As 7 rotas existem e abrem.
- [x] Conteúdo vindo de coleções versionadas (sem texto fixo em componentes).
- [x] 5 unidades, 10 depoimentos, 6 posts e os serviços presentes.
- [x] Todas as imagens importadas como assets (nenhum caminho `public/` fixo, exceto favicons/manifest/vídeo).
- [x] Favicon é o da clínica, importado.
- [x] SEO generalizado cobrindo as 5 cidades; schema `Dentist` por unidade.
- [x] Sem emojis em nenhum lugar (código, textos, commits).
- [x] Cores da paleta v4 aplicadas como tokens.
- [x] Fotos reais de fachada das 5 unidades (home + carrossel de Sobre Nós).
- [ ] Fotos reais de ambientes internos e dos retratos de equipe restantes.
- [ ] Conferência palavra por palavra de todo texto com o prompt (Seção 8).
- [ ] Auditoria final de responsivo/acessibilidade/Core Web Vitals nos 4 breakpoints.

---

## Pendências

A lista viva e detalhada (atualizada a cada sessão, com contexto de cada item) fica em **[`PENDENCIAS.md`](./PENDENCIAS.md)**. Resumo do que bloqueia a entrega hoje:

### Bloqueiam a entrega

- **Assets reais faltantes**: ambientes internos da clínica e retratos dos profissionais sem foto (hoje 6 de 24 nomes têm retrato). Ver inventário no prompt, Apêndice A. (Fachada das 5 unidades e imagem de Serviços já resolvidas.)
- **`og-image.jpg`**: o `Layout.astro` aponta para `/og-image.jpg`, que ainda não existe em `public/`.
- **reCAPTCHA com site key de teste**: `/fale-conosco` e o modal "Agende sua consulta" já usam reCAPTCHA v2 de verdade, mas com a site key pública de testes do Google (mostra aviso vermelho "for testing purposes only"). Falta gerar a key real do domínio — passo a passo em `PENDENCIAS.md`.
- **[CRÍTICO] Números de WhatsApp inválidos em `unidades.json`**: confirmado com print do próprio WhatsApp — `(17) 99625-6384` (Santa Fé do Sul e Votuporanga, duplicado) e `(18) 99182-0880` (São José do Rio Preto) não existem no WhatsApp. 3 das 5 unidades estão com o envio do formulário quebrado até o cliente confirmar os números corretos — ver `PENDENCIAS.md`.
- **Remover a opção "Teste (Ícaro)"** do select de unidade em `/fale-conosco` antes de publicar.

### Não bloqueiam

- Remover os componentes legados não usados: `TopBar.astro`, `Header.astro`, `Footer.tsx`.
- Renomear `src/assets/Isabele.png` e o arquivo de vídeo original para o padrão kebab-case dos demais assets.
- Divergência de contagem da equipe: o prompt cita 33 profissionais; a coleção tem 28 entradas (24 nomes distintos). Confirmar a lista definitiva com o cliente.
- Erros de digitação herdados do site original mantidos por fidelidade (ex.: "Harmonização Facil" no filtro de serviços, "Odontolgia" no texto de Serviços) — confirmar se corrige ou preserva.
- `react-icons` é usado pelo `Footer.tsx` legado **e** pelo `FaInstagram` ativo em `index.astro` (botão de Instagram dos cards de unidade) — os demais ícones vêm de `lucide-react` e dos SVG em `components/icons/`. Ao remover o `Footer.tsx`, a dependência continua sendo necessária por causa do `index.astro`.
- `tailwindcss-animate` está no `package.json` e o `BookingModal` usa suas classes (`animate-in`, `fade-in`), mas o plugin não é registrado no `global.css` (Tailwind v4 exige `@plugin`) — então o overlay abre sem fade. Registrar o plugin ou trocar por transição própria.
- Confirmações opcionais com o cliente: telefone fixo distinto em Três Lagoas; inconsistências da Seção 11.

### Decisões já fechadas

- Paleta v4 aprovada (evolução da v2 do prompt, Seção 10.2 — ajustes de contraste AA e CTA claro em 2026-07, ver `AGENTS.md` Seção 2) — ver tabela de tokens acima.
- Barra de topo antiga (endereço, e-mail, redes e telefones das 5 unidades) **removida**: esses dados vivem no rodapé e na seção de unidades (prompt, Seção 6.1).
- Rodapé enxugado: mantém o NAP das 5 unidades; horários e mapa foram para a seção de unidades na home (prompt, Seção 6.5.1).
- Campos dos formulários (`/fale-conosco` e o modal global "Agende sua consulta"): Unidade, Nome, Telefone, E-mail, Data desejada, Horário, Mensagem + reCAPTCHA — envio via WhatsApp da unidade escolhida em ambos (decisão tomada em 2026-08-04, `BookingModal` migrado em 2026-08-05, ver `PENDENCIAS.md`). Telefone aceita só dígitos (filtrado em tempo real).
- Telefone de Três Lagoas: (67) 9208-7829.

---

## Créditos

Desenvolvimento: Ícaro Carneiro.
Conteúdo e identidade: Correia Odontologia.
Metodologia de UI/UX: UI UX Pro Max (`nextlevelbuilder/ui-ux-pro-max-skill`).
