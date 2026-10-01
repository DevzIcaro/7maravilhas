import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const maravilhas = defineCollection({
  loader: file("src/data/maravilhas.json"),
  schema: z.object({
    id: z.string(),
    nome: z.string(),
    local: z.string(),
    pais: z.string(),
    continente: z.string(),
    ordem: z.number(),
    ano: z.string(),
    descricao: z.string(),
    // Coordenadas decimais (WGS84); o mapa e o link "Como chegar" são derivados delas.
    coordenadas: z.object({ lat: z.number(), lng: z.number() }),
    // Perfis oficiais do local (null = ainda não cadastrado).
    facebook: z.string().url().nullable(),
    instagram: z.string().url().nullable(),
    // Post do blog com a história do lugar (id em posts.json).
    postId: z.string(),
  }),
});

const equipe = defineCollection({
  loader: file("src/data/equipe.json"),
  schema: z.object({
    id: z.string(),
    nome: z.string(),
    especialidade: z.string(),
    foco: z.string(),
  }),
});

const posts = defineCollection({
  loader: file("src/data/posts.json"),
  schema: z.object({
    id: z.string(),
    numero: z.number(),
    slug: z.string(),
    titulo: z.string(),
    data: z.coerce.date(),
    resumo: z.string(),
    autor: z.string(),
    corpo: z.array(
      z.union([
        z.object({ type: z.literal("p"), text: z.string() }),
        z.object({ type: z.literal("h2"), text: z.string() }),
        z.object({ type: z.literal("ul"), items: z.array(z.string()) }),
      ])
    ),
  }),
});

const depoimentos = defineCollection({
  loader: file("src/data/depoimentos.json"),
  schema: z.object({
    id: z.string(),
    autor: z.string(),
    papel: z.string(),
    texto: z.string(),
  }),
});

export const collections = { maravilhas, equipe, posts, depoimentos };
