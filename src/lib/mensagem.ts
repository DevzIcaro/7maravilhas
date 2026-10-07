import { contato } from "./contato";

/**
 * Monta o link mailto: para o formulário de contato, ou `null` quando o
 * e-mail do site ainda não foi cadastrado em src/data/contato.json.
 */
export function linkMailto(assunto: string, corpo: string): string | null {
  if (!contato.email) return null;
  return `mailto:${contato.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
}

/**
 * Monta o link wa.me com a mensagem preenchida, ou `null` quando o WhatsApp
 * do site não foi cadastrado em src/data/contato.json. Assume DDI 55 (Brasil).
 */
export function linkWhatsapp(mensagem: string): string | null {
  const digitos = (contato.whatsapp ?? "").replace(/\D/g, "");
  if (!digitos) return null;
  const numero = digitos.startsWith("55") && digitos.length > 11 ? digitos : `55${digitos}`;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}
