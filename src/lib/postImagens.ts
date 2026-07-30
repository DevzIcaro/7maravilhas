import type { ImageMetadata } from "astro";

import sorrisoRadiante from "../assets/sorriso-radiante.jpg";
import pastaDeDente from "../assets/pasta-de-dente.jpg";
import dentes from "../assets/dentes.jpg";
import clareamento from "../assets/clareamento.jpg";
import aparelho from "../assets/aparelho.jpg";
import consulta from "../assets/consulta.jpg";

/**
 * Fotos do blog (Pexels, uso livre), indexadas pelo `id` da coleção `posts`
 * (src/data/posts.json). Post sem entrada aqui cai automaticamente no
 * PlaceholderImage.
 */
export const imagensPosts: Record<string, ImageMetadata> = {
  "3": sorrisoRadiante, // Dentes brancos e saudáveis: Dicas para um sorriso radiante
  "4": consulta, // A importância da odontopediatria para a saúde bucal das crianças
  "5": aparelho, // Aparelho ortodôntico: Transformando sorrisos e autoestima
  "6": dentes, // Implantes dentários: Solução para a perda de dentes
  "7": clareamento, // Clareamento dental: Dicas para um sorriso mais branco
  "8": pastaDeDente, // Saúde bucal e saúde geral: Uma conexão importante
};

export function imagemDoPost(id: string): ImageMetadata | undefined {
  return imagensPosts[id];
}
