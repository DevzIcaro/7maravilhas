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

1. A paleta a implementar é a **v2 aprovada** pelo cliente (prompt, Seção 10.2): ouro satinado `#C89B3C`, âmbar bronze CTA `#A9762A`, azul-oceano `#3E86A8`, azul profundo `#245C74`, azul escuro rodapé `#1C4A5E`, azul-gelo `#EDF3F6`, tinta `#2A3B44`, fundo `#FFFFFF`. É uma evolução aprovada das cores reais do site (Seção 10.1, referência).
2. Não invente cores fora desta paleta. Definir todos os tokens em `:root` e usar apenas os tokens (sem hex solto no código).
3. Contraste AA: `#3E86A8` para títulos/acento; texto pequeno usa `#245C74`. Texto sobre CTA/superfícies escuras é branco.
4. A skill de UI/UX define padrão, tipografia e efeitos, mas não substitui a paleta aprovada.

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
