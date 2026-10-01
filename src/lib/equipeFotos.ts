import type { ImageMetadata } from "astro";

/**
 * Retratos dos membros da equipe, indexados pelo `id` da coleção `equipe`
 * (src/data/equipe.json). Sem entrada aqui, a página usa o PlaceholderImage.
 * Para adicionar: importe o asset de src/assets e mapeie o id.
 */
export const fotosEquipe: Record<string, ImageMetadata> = {};

export function fotoDoProfissional(id: string): ImageMetadata | undefined {
  return fotosEquipe[id];
}
