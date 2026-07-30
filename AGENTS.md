# AGENTS.md — Regras de execução para IA / desenvolvedor

Este arquivo define as regras obrigatórias para qualquer IA (ou pessoa) que trabalhe neste repositório. Ele existe para impedir que o agente "fuja" das regras combinadas no prompt de desenvolvimento.

Ordem de precedência das fontes de verdade:

1. `PROMPT-DEV-Correia-Odontologia.md` — conteúdo, arquitetura e cores.
2. `AGENTS.md` — este arquivo (regras de execução).
3. `README.md` — visão geral e operação.

Se houver conflito, valem os arquivos acima nesta ordem. Nunca sobreponha uma decisão sua a estas fontes.

> Nota para o agente: se você lê melhor em outro formato, copie este conteúdo para o arquivo que sua ferramenta usa (`CLAUDE.md`, `.cursorrules`, `.windsurfrules`, etc.). As regras são as mesmas.

---

## 1. Anti-alucinação (inegociável)

1. Não invente conteúdo. Todo texto, nome, telefone, endereço, horário, CRO, serviço, depoimento ou post vem do `PROMPT-DEV-Correia-Odontologia.md`, na forma literal.
2. Não adicione seções, unidades, profissionais ou serviços que não existam no prompt. Não remova nenhum que exista.
3. Não "corrija" dados por conta própria. Inconsistências conhecidas estão na Seção 11 do prompt: mantenha o dado e sinalize ao cliente, não altere sem aprovação.
4. Onde faltar informação, escreva `[A CONFIRMAR]` e pare de assumir. Nunca preencha com suposição.
5. Números de contagem devem bater com o prompt: 5 unidades, 33 profissionais, 10 depoimentos, 6 posts.

## 2. Cores

1. A paleta é a **v4** (evolução da v3, ajustada em 2026-07 a pedido do cliente: o CTA v3 `#8A5E12` ficou "marrom apagado" — o cliente pediu explicitamente "cor clara e amarelo"): dourado profundo `#946E17` (texto/ícone sobre claro, inalterado), **CTA amarelo claro `#EFBB39`** (era `#8A5E12` — agora é fundo claro com TEXTO ESCURO, não branco), azul-oceano `#2E7695` (inalterado), azul profundo `#245C74` (inalterado), azul escuro rodapé `#1C4A5E` (inalterado), azul-gelo `#EDF3F6` (inalterado), tinta `#2A3B44` (inalterado), ouro claro `#E7C871` (inalterado), fundo `#FFFFFF`.
2. Não invente cores fora desta paleta. Definir todos os tokens em `:root`/`@theme` e usar apenas os tokens (sem hex solto no código) — exceção: cores de marca de terceiros (WhatsApp `#25D366`, Google Maps `#EA4335`, gradiente Instagram) nos botões de contato, que não fazem parte da paleta do site.
3. **Regra de direção do dourado** (a causa raiz do bug de contraste anterior): `primaria` é para texto/ícone/fundo sobre **fundo claro** (branco, superfície). `ouro-claro` é para texto/ícone sobre **fundo escuro** (rodapé, cards escuros). Nunca use `primaria` diretamente sobre `rodape` ou `secundaria-forte` — o contraste quebra. Ver `Footer.astro` como referência do padrão correto.
4. **CTA (`cta`) é fundo claro, sempre com texto escuro** (`var(--cor-texto)` / classe `text-texto`), nunca branco — `#EFBB39` com texto branco não passa AA. Todo botão `bg-cta`/`.btn-cta` usa texto escuro: ver `.btn-cta` em `global.css`, `Navbar.tsx` (2×), `Footer.astro`, `src/components/ui/button.tsx`, `src/pages/fale-conosco.astro`.
5. Contraste AA (4.5:1 mínimo, texto normal): `primaria` `#946E17` passa sobre branco; `ouro-claro` `#E7C871` passa sobre `rodape`/`secundaria-forte`; `cta` `#EFBB39` com texto `#2A3B44` em cima passa 6,55:1 (hover `#ECAE13` passa 5,88:1). Título de seção (`section-title`, texto grande) pode usar `primaria` mesmo em `section-alt`, pois entra na exceção de "large text" (≥3:1).
6. A skill de UI/UX define padrão, tipografia e efeitos, mas não substitui a paleta aprovada.
7. **Arquitetura CSS obrigatória — `@layer`**: qualquer CSS solto (fora de classe utilitária Tailwind) em `global.css` — resets de elemento (`a`, `body`, etc.) e classes de componente (`.btn*`, `.card*`, `.footer*`) — DEVE ficar dentro de `@layer base { }` ou `@layer components { }`. CSS "não-camadado" (escrito direto após `@import "tailwindcss"` sem `@layer`) tem prioridade MAIOR que `@layer utilities` do Tailwind independente de especificidade, e silenciosamente sobrepõe qualquer `text-*`/`bg-*` aplicado no HTML. Foi exatamente esse bug que deixava links e botões (mesmo com `text-white`) com a cor errada em todo o site — ver `global.css` para o padrão correto.

## 3. Imagens (regra que já nos custou um bug)

1. Toda imagem é importada como asset: `import x from "../assets/..."` ou `"../assets/...?url"`.
2. Proibido referenciar imagem por caminho absoluto de `public/` escrito à mão (ex.: `/logo.png`). Isso quebra no deploy quando há `base`/subpasta.
3. Favicon idem: importado no `Layout.astro` (ver README). O favicon é o do site da Correia; não crie marca nova.
4. Use as imagens reais baixadas do site atual. Não gere fotos novas. Faltou asset? Placeholder nomeado + `[A CONFIRMAR]`.

## 4. Sem emojis

1. Nenhum emoji em lugar nenhum: código, JSX, textos de UI, comentários, README, mensagens de commit.
2. Ícones sempre em SVG (lucide-react / react-icons / Heroicons).

## 5. SEO generalizado

1. Um único site cobrindo todas as regiões (Santa Fé do Sul, Jales, São José do Rio Preto, Votuporanga, Três Lagoas). Sem página por cidade.
2. `title`/`description` próprios por rota, mencionando a atuação regional.
3. JSON-LD com uma entidade por unidade (as 5), com endereço, telefone e geolocalização.
4. `sitemap.xml`, `robots.txt`, `canonical`, Open Graph e Twitter Card presentes.

## 6. Skill UI UX Pro Max

1. Usar a metodologia da skill `nextlevelbuilder/ui-ux-pro-max-skill`, categoria Dental / Medical Clinic.
2. Cumprir o checklist pré-entrega da skill: `cursor-pointer` em clicáveis; hover 150 a 300 ms; contraste 4.5:1; foco visível; `prefers-reduced-motion`; responsivo em 375/768/1024/1440; ícones SVG, nunca emoji.

## 7. Arquitetura e stack

1. Manter MPA (uma página por rota). Sem jQuery.
2. Stack fixa: Astro + React + TypeScript + Tailwind + shadcn/ui + Framer Motion (mesma do `projeto-arthur`).
3. Conteúdo em coleções editáveis, não fixo em componentes.
4. Componentes globais: `TopBar`, `Header`, `BookingModal`, `CTAAgende`, `Footer`.

## 8. Deploy

1. `base: '/'` (domínio na raiz) tanto na Vercel (testes) quanto na Hostinger (produção).
2. Build: `pnpm build` gera `dist/`. Hostinger recebe o conteúdo de `dist/` em `public_html`.
3. Confirmar que todos os assets importados carregam após o build.

## 9. Antes de finalizar (definition of done)

- [ ] Conteúdo confere palavra por palavra com o prompt.
- [ ] Contagens corretas (5 / 33 / 10 / 6).
- [ ] Todas as imagens importadas; favicon do site importado.
- [ ] Zero emojis.
- [ ] SEO generalizado + schema por unidade + sitemap/robots.
- [ ] Cores amostradas (sem `[A CONFIRMAR]`).
- [ ] Checklist da skill cumprido; responsivo/acessível/rápido.
- [ ] Inconsistências reportadas ao cliente, não corrigidas por conta própria.

## 10. Se algo não estiver especificado

Pergunte ou marque `[A CONFIRMAR]`. Não improvise conteúdo, cor, imagem ou dado de contato. A fidelidade ao site atual é o critério de sucesso deste projeto.
