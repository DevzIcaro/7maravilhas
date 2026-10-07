import contatoJson from "../data/contato.json";

/**
 * Contato institucional do site (rodapé e "Fale conosco").
 * Fonte única: src/data/contato.json. Campo `null` = não exibido no site.
 * Os perfis sociais de cada maravilha ficam em src/data/maravilhas.json.
 */
export interface Contato {
  email: string | null;
  whatsapp: string | null;
  facebook: string | null;
  instagram: string | null;
}

export const contato: Contato = contatoJson;
