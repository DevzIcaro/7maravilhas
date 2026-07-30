/**
 * Helpers para os cards de unidade (seção "Nossas unidades" da home):
 * link direto do WhatsApp com mensagem pré-preenchida, e URL do embed do
 * Google Maps (sem precisar de chave de API).
 */

interface UnidadeMapa {
  endereco: string;
  coordenadas: { lat: number; lng: number } | null;
}

/** Google Maps embed público — usa coordenadas quando existem, senão o endereço. */
export function mapaEmbedSrc({ endereco, coordenadas }: UnidadeMapa): string {
  const consulta = coordenadas ? `${coordenadas.lat},${coordenadas.lng}` : endereco;
  return `https://www.google.com/maps?q=${encodeURIComponent(consulta)}&output=embed`;
}

/** Link wa.me a partir do número formatado (ex.: "(17) 99625-6384"), com DDI 55. */
export function linkWhatsapp(numero: string, mensagem: string): string {
  const digitos = numero.replace(/\D/g, "");
  const comDdi = digitos.startsWith("55") ? digitos : `55${digitos}`;
  return `https://wa.me/${comDdi}?text=${encodeURIComponent(mensagem)}`;
}
