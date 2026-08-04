import type { ImageMetadata } from "astro";

import santaFeDoSul from "../assets/odontocorreia santa fe do sul.png";
import jales from "../assets/odontocorreia jales.png";
import saoJoseDoRioPreto from "../assets/odontocorreia sao jose clinica.png";
import votuporanga from "../assets/odontocorreia votuporanga.png";
import tresLagoas from "../assets/odontocorreia tres lagoas.png";

/**
 * Fotos de fachada das unidades, indexadas pelo `id` da coleção `unidades`
 * (src/data/unidades.json). Sem foto? cai no placeholder (ver index.astro).
 */
export const fotosUnidades: Record<string, ImageMetadata> = {
  "santa-fe-do-sul": santaFeDoSul,
  jales,
  "sao-jose-do-rio-preto": saoJoseDoRioPreto,
  votuporanga,
  "tres-lagoas": tresLagoas,
};

export function fotoDaUnidade(id: string): ImageMetadata | undefined {
  return fotosUnidades[id];
}
