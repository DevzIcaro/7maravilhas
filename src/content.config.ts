import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const unidades = defineCollection({
  loader: file("src/data/unidades.json"),
  schema: z.object({
    id: z.string(),
    cidade: z.string(),
    uf: z.enum(["SP", "MS"]),
    ordem: z.number(),
    endereco: z.string(),
    telefone: z.string(),
    whatsapp: z.string(),
    horarios: z.string(),
    descricao: z.string(),
    facebook: z.string().url().nullable(),
    instagram: z.string().url().nullable(),
    redesTexto: z.string().nullable(),
    mapaEmbed: z.boolean(),
    coordenadas: z.object({ lat: z.number(), lng: z.number() }).nullable(),
  }),
});

const equipe = defineCollection({
  loader: file("src/data/equipe.json"),
  schema: z.object({
    id: z.string(),
    nome: z.string(),
    especialidade: z.string(),
    cro: z.string(),
    cidade: z.string(),
  }),
});

const servicos = defineCollection({
  loader: file("src/data/servicos.json"),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    descricao: z.string(),
    categoria: z.string(),
    subitens: z.array(z.object({ titulo: z.string(), descricao: z.string() })),
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
    imagem: z.string(),
    autor: z.string(),
    corpo: z.array(
      z.union([
        z.object({ type: z.literal("p"), text: z.string() }),
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

export const collections = { unidades, equipe, servicos, posts, depoimentos };
