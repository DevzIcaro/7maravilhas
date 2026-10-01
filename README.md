# Maravilhas do Mundo

Site em Astro + React + Tailwind sobre as Sete Maravilhas do Mundo Moderno (Chichén Itzá, Cristo Redentor, Machu Picchu, Coliseu, Taj Mahal, Muralha da China e Petra), com um panorama das maravilhas do mundo antigo.

## Onde editar o conteúdo

| Arquivo | O que controla |
| --- | --- |
| `src/data/maravilhas.json` | As 7 maravilhas: local, país, ano, descrição, **coordenadas** (o mapa e o link "Como chegar" são gerados a partir delas) e perfis oficiais (`facebook`, `instagram`; `null` = não exibe). |
| `src/data/posts.json` | Posts do blog (um por maravilha + maravilhas antigas). |
| `src/data/equipe.json` | Membros da equipe (fictícios). |
| `src/data/depoimentos.json` | Depoimentos de visitantes (fictícios). |
| `src/data/contato.json` | E-mail e redes do site. Com `email` vazio, os formulários mostram "Envio indisponível". |

## Imagens

Nenhuma imagem de maravilha, post ou equipe está cadastrada: os cards mostram o `PlaceholderImage`. Para colocar uma imagem real, importe o arquivo de `src/assets` e mapeie o `id` em:

- `src/lib/equipeFotos.ts` (equipe)
- `src/lib/maravilhaFotos.ts` (maravilhas e carrossel de "Sobre")
- `src/lib/postImagens.ts` (blog)

As páginas já renderizam `<Image>` automaticamente quando há entrada no mapa.

## Comandos

```bash
pnpm install
pnpm dev
pnpm build
```
