import { contato } from "./contato";

/**
 * Monta o link mailto: para o formulário de contato, ou `null` quando o
 * e-mail do site ainda não foi cadastrado em src/data/contato.json.
 */
export function linkMailto(assunto: string, corpo: string): string | null {
  if (!contato.email) return null;
  return `mailto:${contato.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
}
