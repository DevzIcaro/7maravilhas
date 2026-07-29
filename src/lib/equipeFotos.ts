import type { ImageMetadata } from "astro";

import ademar from "../assets/ademar.png";
import anaLaura from "../assets/ana-laura.png";
import isabele from "../assets/Isabele.png";
import mario from "../assets/mario.png";
import pablo from "../assets/pablo.png";
import valdemilson from "../assets/valdemilson.png";

/**
 * Retratos dos profissionais, indexados pelo `id` da coleção `equipe`
 * (src/data/equipe.json). Quem ainda não tem foto simplesmente não aparece
 * aqui — os componentes caem no placeholder.
 *
 * O mesmo profissional pode atender em mais de uma unidade; por isso há um id
 * (e uma entrada) por cidade.
 */
export const fotosEquipe: Record<string, ImageMetadata> = {
  // Santa Fé do Sul
  "ademar-santana-neto--santa-fe-do-sul": ademar,
  "pablo-henrique-frasson--santa-fe-do-sul": pablo,

  // Três Lagoas
  "mario-eugenio-zaparoli--tres-lagoas": mario,
  "ana-laura-silva-balbino--tres-lagoas": anaLaura,

  // São José do Rio Preto
  "valdemilson-dos-reis-rodrigues-filho--sao-jose-do-rio-preto": valdemilson,
  "isabele-fernanda-boldrin--sao-jose-do-rio-preto": isabele,

  // Mesmos profissionais em outras unidades
  "valdemilson-dos-reis-rodrigues-filho--jales": valdemilson,
  "isabele-fernanda-boldrin--votuporanga": isabele,
  "isabele-f-boldrin--jales": isabele,
};

export function fotoDoProfissional(id: string): ImageMetadata | undefined {
  return fotosEquipe[id];
}
