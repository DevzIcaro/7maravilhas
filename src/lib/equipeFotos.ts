import type { ImageMetadata } from "astro";

import { helena, rafael, mariana, gabriel, isadora } from "../assets/equipe";

/**
 * Retratos dos membros da equipe, indexados pelo `id` da coleção `equipe`
 * (src/data/equipe.json). Sem entrada aqui, a página usa o PlaceholderImage.
 */
export const fotosEquipe: Record<string, ImageMetadata> = {
  "helena-duarte-nascimento": helena,
  "rafael-albuquerque-teixeira": rafael,
  "mariana-cavalcanti-rocha": mariana,
  "gabriel-moreira-lacerda": gabriel,
  "isadora-pimentel-couto": isadora,
};

export function fotoDoProfissional(id: string): ImageMetadata | undefined {
  return fotosEquipe[id];
}
