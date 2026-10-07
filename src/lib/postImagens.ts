import type { ImageMetadata } from "astro";

import { fotosMaravilhas } from "./maravilhaFotos";

/**
 * Imagens do blog, indexadas pelo `id` da coleção `posts` (src/data/posts.json).
 * Os posts 1 a 7 contam a história de cada maravilha e reaproveitam a foto dela;
 * os posts 8 e 9 (maravilhas antigas e perdidas) usam imagens de arquitetura
 * antiga e ruínas. Post sem entrada aqui cai no PlaceholderImage.
 */
export const imagensPosts: Record<string, ImageMetadata> = {
  "1": fotosMaravilhas["chichen-itza"],
  "2": fotosMaravilhas["cristo-redentor"],
  "3": fotosMaravilhas["machu-picchu"],
  "4": fotosMaravilhas["coliseu"],
  "5": fotosMaravilhas["taj-mahal"],
  "6": fotosMaravilhas["muralha-da-china"],
  "7": fotosMaravilhas["petra"],
  "8": fotosMaravilhas["coliseu"], // maravilhas do mundo antigo
  "9": fotosMaravilhas["petra"], // maravilhas perdidas (ruínas)
};

export function imagemDoPost(id: string): ImageMetadata | undefined {
  return imagensPosts[id];
}
