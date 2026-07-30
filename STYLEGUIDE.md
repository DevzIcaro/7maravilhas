# Guia de estilo — Correia Odontologia

Referência rápida de tokens e componentes. A fonte dos estilos é `src/styles/global.css`. Paleta v4 (ver `AGENTS.md`, Seção 2 — CTA reajustado em 2026-07 para amarelo claro a pedido do cliente; evolução da v3, que já havia corrigido contraste AA; evolução da v2 do `PROMPT-DEV-Correia-Odontologia.md`, Seção 10.2).

## Tokens de cor

| Token CSS | Utilitário Tailwind | Hex | Uso |
|---|---|---|---|
| `--cor-primaria` | `primaria` | `#946E17` | Dourado profundo. Destaque dominante **sobre fundo claro**: títulos de seção, links, ícones, contornos, datas. Passa 4,66:1 em branco. |
| `--cor-cta` | `cta` | `#EFBB39` | Amarelo dourado vívido. Botão sólido principal (Agende / Enviar), **texto escuro** (`--cor-texto`) em cima — passa 6,55:1. Nunca use texto branco sobre este fundo. |
| `--cor-secundaria` | `secundaria` | `#2E7695` | Azul-oceano. Confiança/conforto: kickers, subtítulos, links, ícones (acento). Passa 5,07:1 em branco. |
| `--cor-secundaria-forte` | `secundaria-forte` | `#245C74` | Azul profundo. Texto pequeno sobre branco (7,35:1) e fundo de cards de destaque. |
| `--cor-rodape` | `rodape` | `#1C4A5E` | Azul escuro. Rodapé e faixas escuras. |
| `--cor-superficie` | `superficie` | `#EDF3F6` | Azul-gelo. Fundo alternado de seções. |
| `--cor-texto` | `texto` | `#2A3B44` | Tinta. Corpo de texto sobre fundo claro; também texto sobre o CTA amarelo. |
| `--cor-ouro-claro` | `ouro-claro` | `#E7C871` | Dourado claro. Texto/ícone/contorno **sobre fundo escuro** (rodapé 5,89:1, cards escuros 4,51:1) — nunca `primaria` aqui, veja regra abaixo. |
| `--cor-borda` | `borda` | `#E3E9EC` | Bordas e divisórias. |
| `--cor-fundo` | `branco` | `#FFFFFF` | Fundo padrão. |

Estados de hover são bem mais escuros/saturados que o tom base, para o hover ficar perceptível: `--cor-primaria-hover` `#7C5C13`, `--cor-cta-hover` `#ECAE13` (passa 5,88:1 com texto escuro). Todo `.btn` também ganha leve elevação no hover (`translateY(-1px)` + sombra).

## Regra de direção do dourado (importante)

`primaria` é calibrado para texto/ícone/borda **sobre fundo claro** (branco, `superficie`). `ouro-claro` é o par calibrado para **fundo escuro** (`rodape`, `secundaria-forte`). Os dois tons não são intercambiáveis — usar `primaria` sobre o rodapé (como no bug antigo) derruba o contraste para ~2:1. Ver `Footer.astro` para o padrão correto (ícones sociais, títulos de coluna e botão "Fale conosco" usam `ouro-claro`, com hover invertendo para texto escuro sobre preenchimento dourado). `cta` é um caso à parte: é claro como `primaria`, mas leva texto escuro (`--cor-texto`), não branco.

## Regras de contraste (acessibilidade AA — 4.5:1 texto normal, 3:1 texto grande/UI)

- `#2E7695` (azul-oceano) para títulos, links e acentos sobre claro. Para texto pequeno/corrido use `#245C74`.
- `#946E17` (dourado) para texto/ícone sobre claro; `#E7C871` para texto/ícone sobre escuro.
- Texto sobre cards escuros e rodapé é sempre branco (ou `ouro-claro`, que já é claro o bastante para ser o próprio texto). **Exceção: texto sobre o CTA (`#EFBB39`) é sempre escuro** (`--cor-texto`), pois o fundo é claro.
- Foco visível: contorno azul-oceano de 3px (já aplicado via `:focus-visible`).
- Cores de marca de terceiros (WhatsApp, Google Maps, Instagram) nos botões de contato das unidades são exceção deliberada à paleta — não são tokens do sistema.

## Arquitetura CSS: `@layer` (obrigatório)

Todo CSS solto em `global.css` — resets de elemento (`a`, `body`, `:focus-visible`) e classes de componente (`.btn*`, `.card*`, `.footer*`, `.kicker`, `.section-*`, `.field*`) — fica dentro de `@layer base { }` ou `@layer components { }`. CSS escrito fora de qualquer `@layer` tem prioridade maior que `@layer utilities` do Tailwind, independente de especificidade, e sobrepõe silenciosamente qualquer `text-*`/`bg-*` do HTML. Foi a causa raiz de um bug em que links e botões com `text-white` renderizavam com a cor errada em todo o site. Ao adicionar CSS novo em `global.css`, sempre coloque dentro do `@layer` correspondente.

## Componentes prontos (classes)

Botões:

```html
<button class="btn btn-cta">+ Agende uma consulta</button>
<button class="btn btn-primaria">Saiba mais</button>
<button class="btn btn-outline">Nossos serviços</button>
<button class="btn btn-secundaria">Falar no WhatsApp</button>
```

Título de seção:

```html
<p class="kicker">Desde 2018 cuidando do seu sorriso</p>
<h2 class="section-title">Conheça nossa equipe</h2>
<p class="section-subtitle">Profissionais de ponta para atender você</p>
```

Cards:

```html
<!-- card claro -->
<article class="card">
  <h3>Ortodontia</h3>
  <p>Corrige a posição dos dentes com aparelhos modernos.</p>
</article>

<!-- card escuro (serviço em destaque) -->
<article class="card-dark">
  <h3>Implantes</h3>
  <p>Suportes de titânio para substituir as raízes dentárias.</p>
</article>
```

Campo de formulário:

```html
<input class="field" type="text" placeholder="Seu nome" aria-label="Seu nome" />
```

Superfícies:

```html
<section class="section-alt"> ... </section>   <!-- fundo azul-gelo -->
<footer class="footer"> ... </footer>          <!-- fundo azul escuro -->
```

## Uso com Tailwind

Como o `@theme` do Tailwind v4 expõe a paleta, os utilitários funcionam direto:

```html
<h2 class="text-primaria font-extrabold">Serviços</h2>
<div class="bg-superficie text-texto p-6 rounded-lg">...</div>
<button class="bg-cta text-texto px-6 py-3 rounded-lg hover:brightness-95">Enviar</button>
```

## Regras (ver AGENTS.md)

- Usar apenas os tokens; não escrever hex solto no código.
- Ícones em SVG (lucide-react / Heroicons); nunca emojis.
- `cursor-pointer` em todos os clicáveis; hover 150–300ms; `prefers-reduced-motion` respeitado (já no global.css).
- Responsivo em 375 / 768 / 1024 / 1440.
