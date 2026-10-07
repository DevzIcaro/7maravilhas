import type { ImageMetadata } from "astro";

import {
  chichenItza,
  cristoRedentor,
  machuPicchu,
  coliseu,
  tajMahal,
  muralhaDaChina,
  petra,
} from "../assets/maravilhas";

/**
 * Fotos de cada maravilha, indexadas pelo `id` da coleção `maravilhas`
 * (src/data/maravilhas.json). Sem entrada aqui, o card usa o PlaceholderImage.
 */
export const fotosMaravilhas: Record<string, ImageMetadata> = {
  "chichen-itza": chichenItza,
  "cristo-redentor": cristoRedentor,
  "machu-picchu": machuPicchu,
  coliseu,
  "taj-mahal": tajMahal,
  "muralha-da-china": muralhaDaChina,
  petra,
};

export function fotoDaMaravilha(id: string): ImageMetadata | undefined {
  return fotosMaravilhas[id];
}
