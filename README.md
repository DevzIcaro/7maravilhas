# Correia Odontologia — Site (Reconstrução)

Reconstrução do site institucional da **Correia Odontologia**, uma rede de clínicas odontológicas com unidades em Santa Fé do Sul, Jales, São José do Rio Preto, Votuporanga (SP) e Três Lagoas (MS).

O objetivo é entregar um site tecnicamente superior (responsividade, performance, SEO e acessibilidade) **mantendo fielmente** a arquitetura, o conteúdo e as cores do site atual. Toda a fonte de verdade de conteúdo está em `PROMPT-DEV-Correia-Odontologia.md`, e as regras de execução para IA/dev estão em `AGENTS.md`. Estes dois arquivos têm precedência sobre qualquer suposição.

---

## Sumário

- [Stack](#stack)
- [Arquitetura](#arquitetura)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Rotas](#rotas)
- [Coleções de conteúdo](#coleções-de-conteúdo)
- [Imagens e assets (regra crítica)](#imagens-e-assets-regra-crítica)
- [Favicon](#favicon)
- [SEO (generalizado por região)](#seo-generalizado-por-região)
- [Design system (UI UX Pro Max)](#design-system-ui-ux-pro-max)
- [Acessibilidade e performance](#acessibilidade-e-performance)
- [Ambiente local](#ambiente-local)
- [Deploy](#deploy)
- [Checklist de fidelidade](#checklist-de-fidelidade)
- [Pendências](#pendências)
- [Créditos](#créditos)

---

## Stack

Mesma base tecnológica do projeto `projeto-arthur`:

| Camada | Tecnologia |
|---|---|
| Framework | Astro (MPA, HTML estático) |
| UI | React (ilhas via `client:load` / `client:visible`) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS |
| Componentes | shadcn/ui |
| Animação | Framer Motion |
| Ícones | lucide-react / react-icons (SVG, nunca emoji) |
| Gerenciador de pacotes | pnpm |

> A escolha do Astro preserva o paradigma **multi-página** do site atual, gera HTML estático (bom para SEO e performance) e permite interatividade pontual via ilhas React.

---

## Arquitetura

O site atual é uma **aplicação multi-página (MPA)** servida por um CMS proprietário (SGC Lemon / Mundo Lemon). A reconstrução **mantém o mesmo paradigma MPA orientado a conteúdo**, trocando o CMS por uma stack estática moderna com o conteúdo em coleções versionadas.

Layout compartilhado por todas as rotas:

```
TopBar        -> endereço, redes, e-mail, telefones das unidades
Header/Nav    -> logo + HOME / SOBRE NÓS / SERVIÇOS / FALE CONOSCO / BLOG
[conteúdo da rota]
CTA "Agende uma consulta"  -> abre o BookingModal
Footer        -> mapa do site, contatos das 5 unidades, mapa Google, créditos
BookingModal  -> "Agende sua consulta" (global, sem jQuery)
```

Componentes globais reutilizáveis: `TopBar`, `Header`, `BookingModal`, `CTAAgende`, `Footer`.

Princípios: uma página por rota; sem jQuery (interações em React/JS nativo); imagens otimizadas pelo Astro; SEO técnico por página.

---

## Estrutura de pastas

Estrutura-alvo (a implementar), espelhando `projeto-arthur`:

```
odontologia-correia/
├── public/                     # apenas o estritamente necessário (ver regra de imagens)
├── src/
│   ├── assets/                 # TODAS as imagens ficam aqui e são importadas
│   │   ├── favicon.(svg|png|ico)
│   │   ├── logo.png
│   │   └── unidades/ servicos/ equipe/ blog/ ...
│   ├── components/
│   │   ├── TopBar.tsx
│   │   ├── Header.tsx
│   │   ├── BookingModal.tsx
│   │   ├── CTAAgende.tsx
│   │   ├── Footer.tsx
│   │   └── ui/                 # shadcn/ui
│   ├── content/                # coleções (Markdown/JSON): unidades, equipe, servicos, posts, depoimentos
│   ├── layouts/
│   │   └── Layout.astro        # <head>, SEO, imports de favicon
│   ├── pages/
│   │   ├── index.astro
│   │   ├── sobre-nos.astro
│   │   ├── servicos.astro
│   │   ├── equipe.astro
│   │   ├── fale-conosco.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── ver/[id]/[slug].astro
│   └── styles/
├── astro.config.mjs
├── package.json
├── README.md
├── AGENTS.md
└── PROMPT-DEV-Correia-Odontologia.md
```

---

## Rotas

| Rota | Página |
|---|---|
| `/` | Home |
| `/sobre-nos` | Sobre Nós |
| `/servicos` | Serviços |
| `/equipe` | Nossa Equipe |
| `/fale-conosco` | Fale Conosco |
| `/blog` | Blog (listagem) |
| `/blog/ver/{id}/{slug}` | Post do blog (detalhe) |

Conteúdo literal de cada rota: ver `PROMPT-DEV-Correia-Odontologia.md`, Seção 8.

---

## Coleções de conteúdo

Conteúdo modelado como coleções editáveis (Astro Content Collections), evitando texto fixo em componentes:

- `unidades` — 5 unidades (cidade, uf, endereço, telefone, whatsapp, horários, redes, fotos)
- `equipe` — 33 profissionais (nome, especialidade, cro, cidade)
- `servicos` — cards de serviço (título, descrição, imagem, categoria)
- `posts` — 6 posts do blog (id, slug, título, data, resumo, imagem, corpo)
- `depoimentos` — 10 depoimentos (autor, papel, texto)

Os dados exatos estão no prompt. Nada deve ser adicionado, removido ou reescrito.

---

## Imagens e assets (regra crítica)

**Todas as imagens devem ser importadas como assets** (`import img from "../assets/..."` ou `...?url`) e nunca referenciadas por caminho absoluto de `public/` escrito à mão.

Motivo: em builds com `base` ou em subpasta, caminhos como `/img.png` apontam para a raiz do domínio e quebram no deploy (erro de favicon 404 já vivido no `projeto-arthur`). Importar faz o Astro resolver a URL correta e garante que o arquivo entre no build.

- Baixar os assets reais do site atual (logo, fotos de unidades, serviços, equipe, banners) e colocá-los em `src/assets/`.
- Não gerar imagens novas nem inventar fotos. Onde faltar, usar placeholder nomeado e marcar `[A CONFIRMAR]`.

---

## Favicon

Usar o favicon/identidade **do próprio site da Correia** — não criar marca nova.

- Fonte: favicon atual da clínica ou o logotipo `images/logo.png` do site.
- Colocar em `src/assets/` e importar no `Layout.astro` (mesmo padrão à prova de deploy usado no `projeto-arthur`):

```astro
---
import faviconSvg from "../assets/favicon.svg?url";
import faviconIco from "../assets/favicon.ico?url";
---
<link rel="icon" type="image/svg+xml" href={faviconSvg} />
<link rel="icon" type="image/x-icon" href={faviconIco} />
```

---

## SEO (generalizado por região)

Decisão do projeto: **um único site**, sem página dedicada por cidade. O SEO é **generalizado**, cobrindo todas as regiões atendidas dentro do mesmo site.

- `title` e `meta description` mencionando a atuação regional (Santa Fé do Sul, Jales, São José do Rio Preto, Votuporanga e Três Lagoas).
- `meta keywords` cobrindo as cidades e principais serviços (implantes, lentes, ortodontia, clareamento, etc.).
- Dados estruturados (JSON-LD): uma entidade `Dentist`/`LocalBusiness` por unidade (as 5), com endereço, telefone e geolocalização de cada uma, agrupadas sob a organização Correia Odontologia.
- `canonical`, `sitemap.xml`, `robots.txt` e Open Graph/Twitter Card por página.
- Cada rota com `title`/`description` próprios (não repetir o mesmo em todas).
- Recomendação externa (fora do código): manter um Google Business Profile por unidade.

> Observação profissional: páginas dedicadas por cidade rankeiam melhor em buscas locais. Como a decisão é não fazer site por cidade, seguimos com SEO generalizado; a estrutura de coleções por unidade deixa a porta aberta para gerar páginas locais no futuro sem retrabalho.

---

## Design system (UI UX Pro Max)

O projeto adota a metodologia da skill **UI UX Pro Max** (`nextlevelbuilder/ui-ux-pro-max-skill`) para as decisões de UI/UX, usando a categoria **Dental / Medical Clinic**.

Instalar a skill no ambiente de desenvolvimento:

```bash
# Claude Code (marketplace)
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill

# Ou via CLI (Cursor, Windsurf, Copilot, etc.)
npm install -g ui-ux-pro-max-cli
uipro init --ai cursor
```

Diretrizes adotadas da skill (checklist pré-entrega):

- Ícones em SVG (Lucide/Heroicons). **Nunca** emojis como ícones ou em qualquer lugar.
- `cursor-pointer` em todos os elementos clicáveis.
- Estados de hover com transição suave (150 a 300 ms).
- Contraste de texto mínimo 4.5:1.
- Estados de foco visíveis para navegação por teclado.
- Respeitar `prefers-reduced-motion`.
- Responsivo em 375px, 768px, 1024px e 1440px.

> As **cores** são a paleta v2 aprovada (ver prompt, Seção 10.2) — evolução das cores reais do site: ouro satinado + azul-oceano. A skill orienta padrão, tipografia e efeitos, mas não substitui a paleta aprovada.

---

## Acessibilidade e performance

- Mobile-first e responsivo real (não apenas encolhimento).
- Core Web Vitals no verde: remover preloader em GIF, otimizar imagens (Astro), lazy-load.
- `alt` descritivo em todas as imagens, foco visível, contraste adequado.
- Sem dependência de jQuery.

---

## Ambiente local

Pré-requisitos: Node 22 e pnpm.

```bash
pnpm install
pnpm dev       # servidor de desenvolvimento
pnpm build     # build de produção -> dist/
pnpm preview   # pré-visualização do build
```

---

## Deploy

O site tem dois destinos:

### Vercel (testes)

Deploy de teste durante o desenvolvimento.

- Zero-config para Astro. Conectar o repositório e fazer deploy.
- Como o site roda na raiz do domínio da Vercel, usar `base: '/'` no `astro.config.mjs`.

### Hostinger (produção / comercial)

Destino comercial final.

- Build local ou em CI: `pnpm build` gera a pasta `dist/`.
- Publicar o conteúdo de `dist/` em `public_html` (via hPanel > Gerenciador de Arquivos ou deploy por Git da Hostinger).
- Domínio próprio na raiz: manter `base: '/'`.
- Conferir que os assets importados carregam (a regra de importar imagens evita 404 de caminho).

> Recomendação: manter `base: '/'` nos dois ambientes, já que ambos servem na raiz do domínio (diferente do `projeto-arthur`, que usava subpasta no GitHub Pages).

---

## Checklist de fidelidade

- [ ] As 7 rotas existem e abrem.
- [ ] Todo texto confere palavra por palavra com o prompt (Seção 8), sem adicionar/remover.
- [ ] 5 unidades, 33 profissionais, 10 depoimentos, 6 posts e todos os serviços presentes.
- [ ] Todas as imagens importadas como assets (nenhum caminho `public/` fixo).
- [ ] Favicon é o da clínica, importado.
- [ ] SEO generalizado cobrindo as 5 cidades; schema por unidade.
- [ ] Sem emojis em nenhum lugar (código, textos, commits).
- [ ] Cores amostradas do site real (nenhum `[A CONFIRMAR]` restante).
- [ ] Responsivo, acessível e rápido — sem alterar conteúdo/cor.

---

## Pendências

Nenhuma pendência bloqueante. Todos os itens foram resolvidos (ver prompt):

- Paleta v2 aprovada (prompt, Seção 10.2): ouro `#C89B3C`, CTA bronze `#A9762A`, azul-oceano `#3E86A8`, azul profundo `#245C74`, rodapé `#1C4A5E`, azul-gelo `#EDF3F6`, texto `#2A3B44`, fundo `#FFFFFF`. Evolução aprovada a partir das cores reais amostradas (Seção 10.1).
- Campos do modal de agendamento e da página "Fale Conosco": Nome, Telefone, E-mail, Mensagem + reCAPTCHA (Seções 6.3 e 8.5).
- Corpo completo dos 6 posts do blog (prompt, Seção 8.6).
- Telefone de Três Lagoas: (67) 9208-7829 (listado no rodapé do site).
- Inventário de imagens reais para baixar e importar (prompt, Apêndice A).

Confirmações opcionais com o cliente (não bloqueiam): telefone fixo distinto em Três Lagoas; inconsistências da Seção 11; campo "Unidade" e labels nos formulários.

---

## Créditos

Desenvolvimento: Ícaro Carneiro.
Conteúdo e identidade: Correia Odontologia.
Metodologia de UI/UX: UI UX Pro Max (`nextlevelbuilder/ui-ux-pro-max-skill`).
