import type { ImageMetadata } from "astro";

/**
 * Fotos de cada maravilha, indexadas pelo `id` da coleção `maravilhas`
 * (src/data/maravilhas.json). Sem entrada aqui, o card usa o PlaceholderImage.
 * Para adicionar: importe o asset de src/assets e mapeie o id.
 */
export const fotosMaravilhas: Record<string, ImageMetadata> = {};

export function fotoDaMaravilha(id: string): ImageMetadata | undefined {
  return fotosMaravilhas[id];
}
