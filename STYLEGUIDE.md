# Guia de estilo — Correia Odontologia

Referência rápida de tokens e componentes. A fonte dos estilos é `src/styles/global.css`. Paleta v2 aprovada (ver `PROMPT-DEV-Correia-Odontologia.md`, Seção 10.2).

## Tokens de cor

| Token CSS | Utilitário Tailwind | Hex | Uso |
|---|---|---|---|
| `--cor-primaria` | `primaria` | `#C89B3C` | Ouro satinado. Destaque dominante: títulos de seção, links do menu, ícones, contornos, datas. |
| `--cor-cta` | `cta` | `#A9762A` | Âmbar bronze. Botão sólido principal (Agende / Enviar), texto branco. |
| `--cor-secundaria` | `secundaria` | `#3E86A8` | Azul-oceano. Confiança/conforto: kickers, subtítulos, links, ícones (acento). |
| `--cor-secundaria-forte` | `secundaria-forte` | `#245C74` | Azul profundo. Texto pequeno sobre branco (AA) e fundo de cards de destaque. |
| `--cor-rodape` | `rodape` | `#1C4A5E` | Azul escuro. Rodapé e faixas escuras. |
| `--cor-superficie` | `superficie` | `#EDF3F6` | Azul-gelo. Fundo alternado de seções. |
| `--cor-texto` | `texto` | `#2A3B44` | Tinta. Corpo de texto sobre fundo claro. |
| `--cor-ouro-claro` | `ouro-claro` | `#E7C871` | Título dourado sobre card/rodapé escuro (contraste alto). |
| `--cor-borda` | `borda` | `#E3E9EC` | Bordas e divisórias. |
| `--cor-fundo` | `branco` | `#FFFFFF` | Fundo padrão. |

Estados de hover derivam por escurecimento leve (~7%): `--cor-primaria-hover` `#B48B36`, `--cor-cta-hover` `#986A26`.

## Regras de contraste (acessibilidade AA)

- `#3E86A8` (azul-oceano) para títulos, links e acentos. Para texto pequeno/corrido use `#245C74`.
- Texto sobre CTA, cards escuros e rodapé é sempre branco.
- Foco visível: contorno azul-oceano de 3px (já aplicado via `:focus-visible`).

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
<button class="bg-cta text-branco px-6 py-3 rounded-lg hover:brightness-95">Enviar</button>
```

## Regras (ver AGENTS.md)

- Usar apenas os tokens; não escrever hex solto no código.
- Ícones em SVG (lucide-react / Heroicons); nunca emojis.
- `cursor-pointer` em todos os clicáveis; hover 150–300ms; `prefers-reduced-motion` respeitado (já no global.css).
- Responsivo em 375 / 768 / 1024 / 1440.
